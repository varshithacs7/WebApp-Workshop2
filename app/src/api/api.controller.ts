import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { responseObject } from 'src/common/dto/api.dto';
import { UserEntity } from 'src/common/entity/authuser.entity';
import { ApiService } from './api.service';

@Controller()
export class ApiController {

    constructor (
        private apiService: ApiService
    ) {}

    @Get()
    index(): string {
        return this.apiService.index();
    }

    @Get('users')
    getUsers() : Promise<object> {
        return this.apiService.getAllUsers()
    }

    @Get('user/:id')
    getUser(@Param() data : any ) : Promise<object> {
        console.log(`Param:  ${data.id}`)
        return this.apiService.getUser(parseInt(data.id)||0)
    } 
    
    @Post('create-user')
    createUser(@Body() userData: UserEntity) : Promise<responseObject> {
        return this.apiService.createUser(userData);
    }

    @Post('update-user')
    updateUser(@Body() userData: UserEntity) : Promise<responseObject> {
        return this.apiService.updateUser(userData);
    }

    @Post('delete-user')
    deleteUser(@Body() userData: UserEntity) : Promise<responseObject> {
        return this.apiService.deleteUser(userData);
    }

    @Get('search-user')
    findUser (@Query('name') name: any) {
        return this.apiService.findUser(name);
    }
    
}
