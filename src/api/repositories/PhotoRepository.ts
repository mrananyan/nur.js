import { EntityRepository, Repository } from 'typeorm';

import { Photos } from '../models/Photo';

@EntityRepository(Photos)
export class PhotoRepository extends Repository<Photos> {

    public findByUserIds(ids: string[]): Promise<Photos[]> {
        return this.createQueryBuilder()
            .select()
            .where(`photos.user_id IN (${ids.map(id => `'${id}'`).join(', ')})`)
            .getMany();
    }

}
