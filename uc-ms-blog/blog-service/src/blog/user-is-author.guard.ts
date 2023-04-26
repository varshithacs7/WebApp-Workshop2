import { CanActivate, Injectable, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { switchMap, map } from "rxjs/operators";
import { UserService } from "../user/user.service";
import { BlogService } from "./blog.service";
import { User } from "../dto/user.dto";
import { BlogEntry } from "../dto/blog-entry.dto";

@Injectable()
export class UserIsAuthorGuard implements CanActivate {
    constructor(private userService: UserService, private blogService: BlogService) {}

    canActivate(context: ExecutionContext): Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        const params = request.params;
        const blogEntryId: number = Number(params.id);
        const user: User = request.user;

        return this.userService.findOneUser(user.id).pipe(
            switchMap((user: User) =>
                this.blogService.findOneBlog(blogEntryId).pipe(
                    map((blogEntry: BlogEntry) => {
                        let hasPermission = false;

                        if (user.id === blogEntry.author.id) {
                            hasPermission = true;
                        }

                        return user && hasPermission;
                    })
                )
            )
        );
    }
}
