import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsUUID, ValidateNested } from 'class-validator';
import {
    Authorized, Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put, Req
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

import { UserNotFoundError } from '../errors/UserNotFoundError';
import { Users } from '../models/Users';
import { UserService } from '../services/UserService';
import { PhotoResponse } from './PhotoController';

class BaseUser {
    @IsNotEmpty()
    public firstName: string;

    @IsNotEmpty()
    public lastName: string;

    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @IsNotEmpty()
    public username: string;
}

export class UserResponse extends BaseUser {
    @IsUUID()
    public id: string;

    @ValidateNested({ each: true })
    @Type(() => PhotoResponse)
    public photo: PhotoResponse[];
}

class CreateUserBody extends BaseUser {
    @IsNotEmpty()
    public password: string;
}

@Authorized()
@JsonController('/users')
@OpenAPI({ security: [{ basicAuth: [] }] })
export class UserController {

    constructor(
        private userService: UserService
    ) { }

    @Get()
    @ResponseSchema(UserResponse, { isArray: true })
    public find(): Promise<Users[]> {
        return this.userService.find();
    }

    @Get('/me')
    @ResponseSchema(UserResponse, { isArray: true })
    public findMe(@Req() req: any): Promise<Users[]> {
        return req.user;
    }

    @Get('/:id')
    @OnUndefined(UserNotFoundError)
    @ResponseSchema(UserResponse)
    public one(@Param('id') id: string): Promise<Users | undefined> {
        return this.userService.findOne(id);
    }

    @Post()
    @ResponseSchema(UserResponse)
    public create(@Body() body: CreateUserBody): Promise<Users> {
        const user = new Users();
        user.email = body.email;
        user.firstName = body.firstName;
        user.lastName = body.lastName;
        user.password = body.password;
        user.username = body.username;

        return this.userService.create(user);
    }

    @Put('/:id')
    @ResponseSchema(UserResponse)
    public update(@Param('id') id: string, @Body() body: BaseUser): Promise<Users> {
        const user = new Users();
        user.email = body.email;
        user.firstName = body.firstName;
        user.lastName = body.lastName;
        user.username = body.username;

        return this.userService.update(id, user);
    }

    @Delete('/:id')
    public delete(@Param('id') id: string): Promise<void> {
        return this.userService.delete(id);
    }

}
