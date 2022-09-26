import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello() : string {
        return "<h2 style='color:green;'>Hello from NESTJS <3</h2>";
    }
}