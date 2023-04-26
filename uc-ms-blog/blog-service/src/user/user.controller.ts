import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { Pagination } from "nestjs-typeorm-paginate";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { UserService } from "./user.service";
import { User } from "../dto/user.dto";

@Controller()
export class UserController {
    constructor(private userService: UserService) {}

    @MessagePattern("createUser")
    createUser(data: any): Observable<User | Object> {
        const user: User = data.user;
        return this.userService.createUser(user).pipe(
            map((user: User) => user),
            catchError(err => of({ error: err.message }))
        );
    }

    @MessagePattern("userLogin")
    userLogin(data: any): Observable<Object> {
        const user: User = data.user;
        return this.userService.userLogin(user).pipe(
            map((jwt: string) => {
                return { access_token: jwt };
            })
        );
    }

    @MessagePattern("findOneUser")
    findOneUser(data: any): Observable<User> {
        const params: any = data.params;
        return this.userService.findOneUser(params.id);
    }

    @MessagePattern("indexUser")
    indexUser(data: any): Observable<Pagination<User>> {
        let { page, limit, username } = data;
        limit = limit > 100 ? 100 : limit;

        if (username === null || username === undefined) {
            return this.userService.paginate({ page: Number(page), limit: Number(limit), route: "http://localhost:3000/api/users" });
        } else {
            return this.userService.paginateFilterByUsername(
                { page: Number(page), limit: Number(limit), route: "http://localhost:3000/api/users" },
                { username }
            );
        }
    }

    @MessagePattern("deleteOneUser")
    deleteOneUser(data: any): Observable<any> {
        return this.userService.deleteOneUser(Number(data.id));
    }

    @MessagePattern("updateOneUser")
    updateOneUser(data: any): Observable<any> {
        const { id, user } = data;
        return this.userService.updateOneUser(Number(id), user);
    }

    @MessagePattern("updateRoleOfUser")
    updateRoleOfUser(data: any): Observable<User> {
        const { id, user } = data;
        return this.userService.updateRoleOfUser(Number(id), user);
    }
}
