import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { deleteUser, getUser, responseObject } from 'src/common/dto/api.dto';
import { UserEntity } from 'src/common/entity/authuser.entity';
import { ILike, Like, Repository } from 'typeorm';

@Injectable()
export class ApiService {

    constructor(
        @InjectRepository(UserEntity) private readonly user: Repository<UserEntity>
    ) {}

    index () : string {
        return "Hello world";
    }

    async getAllUsers () : Promise<UserEntity[]> {
        const result = await this.user.find()
        return result;
    }

    async getUser (id: number) : Promise<getUser> {
        console.log(`Service : ${id}`)
        const dbResult = await this.user.findOneBy({id: id});
        
        let result: getUser;

        if (dbResult) {
            result = {
                status: "success",
                message: "Found user",
                data: dbResult
            }
        } else {
            result = {
                status: "fail",
                message: "User id not found",
            }
        }
        return result;
    }

    async createUser(userData: UserEntity) : Promise<responseObject> {
        
        console.log(`User data: ${JSON.stringify(userData)}`);

        const dbResult = await this.user.insert({
            emailId: userData.emailId,
            firstName: userData.firstName,
            lastName: userData.lastName,
            zipCode: userData.zipCode
        }).catch((err)=>{
            console.log(err.message)
            throw new BadRequestException('Duplicate email id');
        })
        const result :responseObject = {
            status: "success",
            message: "User created"
        }
        return result;
    }

    async updateUser(userData: UserEntity) : Promise<responseObject> {

        const dbResult = await this.user.update(
            { emailId: userData.emailId },
            { 
                emailId: userData.emailId,
                firstName: userData.firstName,
                lastName: userData.lastName,
                zipCode: userData.zipCode
            }
        ).catch((err)=>{
            console.log(err.message)
            throw new BadRequestException('Some error');
        })

        let result :responseObject;

        if (dbResult.affected > 0) {
            result = {
                status: "success",
                message: "Updated successfully"
            }
        } else {
            result = {
                status: "fail",
                message: "User not found"
            }
        }

        return result;
    }

    async deleteUser(userData: deleteUser) : Promise<responseObject> {

        const dbResult = await this.user.delete(
            { emailId: userData.emailId },
        ).catch((err)=>{
            console.log(err.message)
            throw new BadRequestException('Some error');
        })

        let result :responseObject;

        if (dbResult.affected > 0) {
            result = {
                status: "success",
                message: "Deleted successfully"
            }
        } else {
            result = {
                status: "fail",
                message: "User not found"
            }
        }

        return result;
    }

    async findUser (name : string) : Promise<getUser> {
        const dbResult = await this.user.find({
            where: [
                { firstName: ILike(`%${name}%`) },
                { lastName: ILike(`%${name}%`) }
            ]
        })

        let result : getUser;
        if (dbResult.length) {
            result = {
                status: "success",
                message: `Found ${dbResult.length} results`,
                data: dbResult
            }
        } else {
            result = {
                status: "fail",
                message: `No results found`
            }
        }

        return result;
    }
}
