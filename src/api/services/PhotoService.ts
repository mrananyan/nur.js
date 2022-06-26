import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import uuid from 'uuid';

import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Photo } from '../models/Photo';
import { User } from '../models/User';
import { PhotoRepository } from '../repositories/PhotoRepository';
import { events } from '../subscribers/events';

@Service()
export class PhotoService {

    constructor(
        @OrmRepository() private photoRepository: PhotoRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(): Promise<Photo[]> {
        this.log.info('Find all Photos');
        return this.photoRepository.find();
    }

    public findByUser(user: User): Promise<Photo[]> {
        this.log.info('Find all photos of the user', user.toString());
        return this.photoRepository.find({
            where: {
                userId: user.id,
            },
        });
    }

    public findOne(id: string): Promise<Photo | undefined> {
        this.log.info('Find one photo');
        return this.photoRepository.findOne({ id });
    }

    public async create(photo: Photo): Promise<Photo> {
        this.log.info('Create a new photo => ', photo.toString());
        photo.id = uuid.v1();
        const newPhoto = await this.photoRepository.save(photo);
        this.eventDispatcher.dispatch(events.photo.created, newPhoto);
        return newPhoto;
    }

    public update(id: string, photo: Photo): Promise<Photo> {
        this.log.info('Update a photo');
        photo.id = id;
        return this.photoRepository.save(photo);
    }

    public async delete(id: string): Promise<void> {
        this.log.info('Delete a photo');
        await this.photoRepository.delete(id);
        return;
    }

}
