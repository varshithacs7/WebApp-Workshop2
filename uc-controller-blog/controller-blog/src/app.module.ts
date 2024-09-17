import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true })],
    controllers: [AppController],
    providers: [AppService],
    TypeOrmModule.forRoot({
            type: "postgres",
            url: process.env.DATABASE_URL,
            autoLoadEntities: true,
            synchronize: true,
        }),
        TypeOrmModule.forFeature([UserEntity, BlogEntryEntity]),
})
export class AppModule {}
