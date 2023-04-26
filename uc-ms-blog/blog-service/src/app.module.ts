import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { UserController } from "./user/user.controller";
import { UserService } from "./user/user.service";
import { UserEntity } from "./entities/user.entity";
import { BlogEntryEntity } from "./entities/blog-entry.entity";
import { BlogController } from "./blog/blog.controller";
import { BlogService } from "./blog/blog.service";
import { AuthService } from "./auth/auth.service";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get("JWT_SECRET"),
                signOptions: { expiresIn: "10000s" },
            }),
        }),
        TypeOrmModule.forRoot({
            type: "postgres",
            url: process.env.DATABASE_URL,
            autoLoadEntities: true,
            synchronize: true,
        }),
        TypeOrmModule.forFeature([UserEntity, BlogEntryEntity]),
    ],
    controllers: [UserController, BlogController],
    providers: [UserService, BlogService, AuthService],
})
export class AppModule {}
