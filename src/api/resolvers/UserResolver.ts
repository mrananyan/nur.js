import { FieldResolver, Query, Resolver, Root } from 'type-graphql';
import { Service } from 'typedi';

import { Users as UserModel } from '../models/Users';
import { PhotoService } from '../services/PhotoService';
import { UserService } from '../services/UserService';
import { User } from '../types/User';

@Service()
@Resolver(of => User)
export class UserResolver {

    constructor(
        private userService: UserService,
        private photoService: PhotoService
        ) {}

    @Query(returns => [User])
    public users(): Promise<any> {
      return this.userService.find();
    }

    @FieldResolver()
    public async photos(@Root() user: UserModel): Promise<any> {
        return this.photoService.findByUser(user);
    }

}
