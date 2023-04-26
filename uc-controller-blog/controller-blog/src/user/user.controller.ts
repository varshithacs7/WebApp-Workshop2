import { Controller, Post, Body, Get, Param, Delete, Put, UseGuards, Query, UploadedFile, Request, Res, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Observable, of } from "rxjs";
import { tap, map } from "rxjs/operators";
import { diskStorage } from "multer";
import { v4 as uuidv4 } from "uuid";
import path = require("path");
import { join } from "path";
import { hasRoles } from "../auth/decorators/roles.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { UserIsUserGuard } from "../auth/guards/UserIsUser.guard";
import { UserService } from "./user.service";
import { User, UserRole } from "../dto/user.dto";

export const storage = {
    storage: diskStorage({
        destination: "./uploads/user-profile-images",
        filename: (_req, file, cb) => {
            const filename: string = path.parse(file.originalname).name.replace(/\s/g, "") + uuidv4();
            const extension: string = path.parse(file.originalname).ext;

            cb(null, `${filename}${extension}`);
        },
    }),
};

@Controller("users")
export class UserController {
    constructor(private userService: UserService) {}

    @Post("create")
    createUser(@Body() user: User): Observable<User | Object> {
        return this.userService.createUser(user);
    }

    @Post("login")
    userLogin(@Body() user: User): Observable<Object> {
        return this.userService.userLogin(user);
    }

    @Get(":id")
    findOneUser(@Param() params): Observable<User> {
        return this.userService.findOneUser(params);
    }

    @Get("")
    indexUser(@Query("page") page: number = 1, @Query("limit") limit: number = 10, @Query("username") username: string): Observable<any> {
        return this.userService.indexUser(page, limit, username);
    }

    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(":id")
    deleteOneUser(@Param("id") id: string): Observable<any> {
        return this.userService.deleteOneUser(id);
    }

    @UseGuards(JwtAuthGuard, UserIsUserGuard)
    @Put(":id")
    updateOneUser(@Param("id") id: string, @Body() user: User): Observable<any> {
        return this.userService.updateOneUser(id, user);
    }

    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(":id/role")
    updateRoleOfUser(@Param("id") id: string, @Body() user: User): Observable<User> {
        return this.userService.updateRoleOfUser(id, user);
    }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor("file", storage))
    @Post("upload")
    uploadUserFile(@UploadedFile() file, @Request() req): Observable<Object> {
        const user: User = req.user;

        return this.userService.updateOneUser(user.id, { profileImage: file.filename }).pipe(
            tap((user: User) => console.log(user)),
            map((user: User) => ({ profileImage: user.profileImage }))
        );
    }

    @Get("profile-image/:imagename")
    findProfileImage(@Param("imagename") imagename, @Res() res): Observable<Object> {
        return of(res.sendFile(join(process.cwd(), "uploads/profileimages/" + imagename)));
    }
}
