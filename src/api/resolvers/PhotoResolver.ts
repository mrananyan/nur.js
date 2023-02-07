import DataLoader from 'dataloader';
import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { Service } from 'typedi';

import { DLoader } from '../../decorators/DLoader';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Context } from '../Context';
import { Photos as PhotoModel } from '../models/Photos';
import { Users as UserModel } from '../models/Users';
import { PhotoService } from '../services/PhotoService';
import { PhotoInput } from '../types/input/PhotoInput';
import { Photo } from '../types/Photo';

@Service()
@Resolver(of => Photo)
export class PhotoResolver {

    constructor(
        private photoService: PhotoService,
        @Logger(__filename) private log: LoggerInterface,
        @DLoader(UserModel) private userLoader: DataLoader<string, UserModel>
    ) { }

    @Query(returns => [Photo])
    public photos(@Ctx() { requestId }: Context): Promise<PhotoModel[]> {
        this.log.info(`{${requestId}} Find all users`);
        return this.photoService.find();
    }

    @Mutation(returns => Photo)
    public async addPhoto(@Arg('photo') photo: PhotoInput): Promise<PhotoModel> {
        const newPhoto = new PhotoModel();
        newPhoto.path = photo.path;
        newPhoto.kind = photo.kind;
        newPhoto.description = photo.description;
        return this.photoService.create(newPhoto);
    }

    @FieldResolver()
    public async owner(@Root() photo: PhotoModel): Promise<any> {
        if (photo.userId) {
            return this.userLoader.load(photo.userId);
        }
    }

}
