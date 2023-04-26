import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { User } from "../../dto/user.dto";
import { AuthService } from "../services/auth.service";

@Injectable()
export class UserIsUserGuard implements CanActivate {
    constructor(private readonly authService: AuthService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        const params = request.params;
        const user: User = request.user;

        return this.authService.checkUserAndPermission(user, params);
    }
}
