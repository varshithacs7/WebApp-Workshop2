import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Like } from "typeorm";
// import { paginate, Pagination, IPaginationOptions } from "nestjs-typeorm-paginate";
import { Observable, from, throwError } from "rxjs";
import { switchMap, map, catchError } from "rxjs/operators";
import { UserEntity } from "../entities/user.entity";
import { User } from "../dto/user.dto";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class UserService {
    userUrl = "http://localhost:3007/api/users";

    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>, private authService: AuthService) {}

    createUser(user: User): Observable<User> {
        return this.authService.hashPassword(user.password).pipe(
            switchMap((passwordHash: string) => {
                const newUser = new UserEntity();
                newUser.name = user.name;
                newUser.username = user.username;
                newUser.email = user.email;
                newUser.password = passwordHash;

                return from(this.userRepository.save(newUser)).pipe(
                    map((user: User) => {
                        const { password, ...result } = user;
                        return result;
                    }),
                    catchError(err => throwError(err))
                );
            })
        );
    }

    updateOneUser(id: number, user: User): Observable<any> {
        delete user.email;
        delete user.password;

        return from(this.userRepository.update(id, user)).pipe(switchMap(() => this.findOneUser(id)));
    }

    deleteOneUser(id: number): Observable<any> {
        return from(this.userRepository.delete(id));
    }

    findOneUser(id: number): Observable<User> {
        return from(this.userRepository.findOne({ relations: ["blogEntries"], where: { id } })).pipe(
            map((user: User) => {
                const { password, ...result } = user;
                return result;
            })
        );
    }

    validateUser(email: string, password: string): Observable<User> {
        return from(this.userRepository.findOne({ select: ["id", "password", "name", "username", "email"], where: { email } })).pipe(
            switchMap((user: User) =>
                this.authService.comparePasswords(password, user.password).pipe(
                    map((match: boolean) => {
                        if (match) {
                            const { password, ...result } = user;
                            return result;
                        } else {
                            throw Error;
                        }
                    })
                )
            )
        );
    }

    userLogin(user: User): Observable<string> {
        return this.validateUser(user.email, user.password).pipe(
            switchMap((user: User) => {
                if (user) {
                    return this.authService.generateJWT(user).pipe(map((jwt: string) => jwt));
                } else {
                    return "Wrong Credentials";
                }
            })
        );
    }

    findAllUsers(): Observable<User[]> {
        return from(this.userRepository.find()).pipe(
            map((users: User[]) => {
                users.forEach(function (v) {
                    delete v.password;
                });
                return users;
            })
        );
    }

    // findAllUsers(page: number, limit: number, username: string): Observable<any> {
    //     limit = limit > 100 ? 100 : limit;

    //     if (username === null || username === undefined) {
    //         return this.paginate({ page: Number(page), limit: Number(limit), route: this.userUrl });
    //     } else {
    //         return this.paginateFilterByUsername({ page: Number(page), limit: Number(limit), route: this.userUrl }, { username });
    //     }
    // }

    // paginate(options: IPaginationOptions): Observable<Pagination<User>> {
    //     return from(paginate<User>(this.userRepository, options)).pipe(
    //         map((usersPageable: Pagination<User>) => {
    //             usersPageable.items.forEach(function (v) {
    //                 delete v.password;
    //             });
    //             return usersPageable;
    //         })
    //     );
    // }

    // paginateFilterByUsername(options: IPaginationOptions, user: User): Observable<Pagination<User>> {
    //     return from(
    //         this.userRepository.findAndCount({
    //             skip: Number(options.page) * Number(options.limit) || 0,
    //             take: Number(options.limit) || 10,
    //             order: { id: "ASC" },
    //             select: ["id", "name", "username", "email"],
    //             where: [{ username: Like(`%${user.username}%`) }],
    //         })
    //     ).pipe(
    //         map(([users, totalUsers]) => {
    //             const usersPageable: Pagination<User> = {
    //                 items: users,
    //                 links: {
    //                     first: options.route + `?limit=${options.limit}`,
    //                     previous: options.route + ``,
    //                     next: options.route + `?limit=${options.limit}&page=${Number(options.page) + 1}`,
    //                     last: options.route + `?limit=${options.limit}&page=${Math.ceil(totalUsers / Number(options.limit))}`,
    //                 },
    //                 meta: {
    //                     currentPage: Number(options.page),
    //                     itemCount: users.length,
    //                     itemsPerPage: Number(options.limit),
    //                     totalItems: totalUsers,
    //                     totalPages: Math.ceil(totalUsers / Number(options.limit)),
    //                 },
    //             };
    //             return usersPageable;
    //         })
    //     );
    // }
}
