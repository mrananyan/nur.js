import { Connection } from 'typeorm';
import { Factory, Seed, times } from 'typeorm-seeding';

import { Photo } from '../../api/models/Photo';
import { User } from '../../api/models/User';

export class CreatePhotos implements Seed {

    public async seed(factory: Factory, connection: Connection): Promise<any> {
        const em = connection.createEntityManager();
        await times(10, async (n) => {
            const photo = await factory(Photo)().seed();
            const user = await factory(User)().make();
            user.photos = [photo];
            return await em.save(user);
        });
    }

}
