import { EntityRepository, Repository } from 'typeorm';

import { Photo } from '../models/Photo';

@EntityRepository(Photo)
export class PhotoRepository extends Repository<Photo> {

    public findByUserIds(ids: string[]): Promise<Photo[]> {
        return this.createQueryBuilder()
            .select()
            .where(`photos.user_id IN (${ids.map(id => `'${id}'`).join(', ')})`)
            .getMany();
    }

}
