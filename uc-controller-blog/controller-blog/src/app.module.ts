import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./user/user.controller";
import { BlogController } from "./blog/blog.controller";
import { UserService } from "./user/user.service";
import { BlogService } from "./blog/blog.service";
import { UserEntity } from "./entities/user.entity";
import { BlogEntryEntity } from "./entities/blog-entry.entity";
import { JwtAuthGuard } from "./guards/jwt-guard";
import { JwtStrategy } from "./guards/jwt-strategy";
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
    providers: [JwtAuthGuard, JwtStrategy, AuthService, UserService, BlogService],
})
export class AppModule {}
