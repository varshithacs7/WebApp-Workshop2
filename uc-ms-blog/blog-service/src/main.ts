import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Transport } from "@nestjs/microservices";

const microserviceOptions = {
    transport: Transport.TCP,
    options: {
        host: "0.0.0.0",
        port: 3022,
    },
};

async function bootstrap() {
    const app = await NestFactory.createMicroservice(AppModule, microserviceOptions);
    await app.listen();
}

bootstrap();
