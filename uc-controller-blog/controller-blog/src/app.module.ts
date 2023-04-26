import { Module } from "@nestjs/common";
import { Transport, ClientProxyFactory } from "@nestjs/microservices";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { UserController } from "./user/user.controller";
import { BlogController } from "./blog/blog.controller";
import { UserService } from "./user/user.service";
import { BlogService } from "./blog/blog.service";

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule],
    controllers: [UserController, BlogController],
    providers: [
        {
            provide: "BLOG",
            useFactory: () => {
                return ClientProxyFactory.create({
                    transport: Transport.TCP,
                    options: {
                        host: "service-uc-blog",
                        port: 3022,
                    },
                });
            },
        },
        UserService,
        BlogService,
    ],
})
export class AppModule {}
