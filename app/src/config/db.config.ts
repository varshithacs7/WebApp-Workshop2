import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const dbconfig: TypeOrmModuleOptions = {
    type: 'postgres',
    port: parseInt(<string>process.env.POSTGRES_PORT),
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    synchronize: false,

    entities: ["dist/**/*.entity{.ts,.js}"],
}