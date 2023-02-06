import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import * as uuid from 'uuid';

import { Photos } from '../../api/models/Photos';

define(Photos, (faker: typeof Faker) => {
    const path = faker.image.cats();

    const photo = new Photos();
    photo.id = uuid.v1();
    photo.path = path;
    photo.kind = 'avatar';
    return photo;
});
