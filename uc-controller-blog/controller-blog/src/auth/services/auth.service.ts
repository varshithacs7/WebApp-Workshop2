import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Observable, from } from "rxjs";
import { map } from "rxjs/operators";
import { UserEntity } from "../../entities/user.entity";
import { User } from "../../dto/user.dto";

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserEntity) private readonly authUser: Repository<UserEntity>) {}

    checkUserHasRoleAndPermission(user: User, roles: any): Observable<any> {
        return this.findOne(user.id).pipe(
            map((user: User) => {
                const hasRole = () => roles.indexOf(user.role) > -1;
                let hasPermission: boolean = false;

                if (hasRole()) {
                    hasPermission = true;
                }
                return user && hasPermission;
            })
        );
    }

    checkUserAndPermission(user: User, params: any): Observable<any> {
        return this.findOne(user.id).pipe(
            map((user: User) => {
                let hasPermission = false;

                if (user.id === Number(params.id)) {
                    hasPermission = true;
                }

                return user && hasPermission;
            })
        );
    }

    findOne(id: number): Observable<User> {
        return from(this.authUser.findOne({ relations: ["blogEntries"], where: { id } })).pipe(
            map((user: User) => {
                const { password, ...result } = user;
                return result;
            })
        );
    }
}
