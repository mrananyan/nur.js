import { EntityRepository, Repository } from 'typeorm';

import { Photos } from '../models/Photos';

@EntityRepository(Photos)
export class PhotoRepository extends Repository<Photos> {

    // @ts-ignore
    public findByUserIds(ids: string[]): Promise<Photos[]> {
        return this.createQueryBuilder()
            .select()
            .where(`photos.user_id IN (${ids.map(id => `'${id}'`).join(', ')})`)
            .getMany();
    }

}
