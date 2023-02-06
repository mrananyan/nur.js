import { Connection } from 'typeorm';
import { Factory, Seed, times } from 'typeorm-seeding';

import { Photos } from '../../api/models/Photos';
import { Users } from '../../api/models/Users';

export class CreatePhotos implements Seed {

    public async seed(factory: Factory, connection: Connection): Promise<any> {
        const em = connection.createEntityManager();
        await times(10, async (n) => {
            const photo = await factory(Photos)().seed();
            const user = await factory(Users)().make();
            user.photos = [photo];
            return await em.save(user);
        });
    }

}
