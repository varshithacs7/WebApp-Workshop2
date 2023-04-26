import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import type { Observable } from "rxjs";
import { User } from "../dto/user.dto";

@Injectable()
export class UserService {
    constructor(@Inject("BLOG") private readonly client: ClientProxy) {}

    createUser(user): Observable<User | Object> {
        return this.client.send("createUser", { user });
    }

    userLogin(user): Observable<Object> {
        return this.client.send("userLogin", { user });
    }

    findOneUser(params): Observable<User> {
        return this.client.send("findOneUser", { params });
    }

    indexUser(page, limit, username): Observable<any> {
        return this.client.send("indexUser", { page, limit, username });
    }

    deleteOneUser(id): Observable<any> {
        return this.client.send("deleteOneUser", { id });
    }

    updateOneUser(id, user): Observable<any> {
        return this.client.send("updateOneUser", { id, user });
    }

    updateRoleOfUser(id, user): Observable<User> {
        return this.client.send("updateRoleOfUser", { id, user });
    }
}
