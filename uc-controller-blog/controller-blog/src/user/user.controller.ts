import { Controller, Post, Body, Get, Param, Delete, Put, UseGuards, Query } from "@nestjs/common";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { JwtAuthGuard } from "../guards/jwt-guard";
import { UserService } from "./user.service";
import { User } from "../dto/user.dto";

@Controller("users")
export class UserController {
    constructor(private userService: UserService) {}

    @Post("create")
    createUser(@Body() user: User): Observable<User | Object> {
        return this.userService.createUser(user).pipe(
            map((user: User) => user),
            catchError(err => of({ error: err.message }))
        );
    }

    @UseGuards(JwtAuthGuard)
    @Put(":id")
    updateOneUser(@Param("id") id: string, @Body() user: User): Observable<any> {
        return this.userService.updateOneUser(Number(id), user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    deleteOneUser(@Param("id") id: string): Observable<any> {
        return this.userService.deleteOneUser(Number(id));
    }

    @Get(":id")
    findOneUser(@Param() params): Observable<User> {
        return this.userService.findOneUser(params.id);
    }

    @Post("login")
    userLogin(@Body() user: User): Observable<Object> {
        return this.userService.userLogin(user).pipe(
            map((jwt: string) => {
                return { access_token: jwt };
            })
        );
    }

    @UseGuards(JwtAuthGuard)
    @Get("")
    findAllUsers(): Observable<any> {
        return this.userService.findAllUsers();
    }

    /** function with pagination */
    // @Get("")
    // findAllUsers(@Query("page") page: number = 1, @Query("limit") limit: number = 10, @Query("username") username: string): Observable<any> {
    //     return this.userService.findAllUsers(page, limit, username);
    // }
}
