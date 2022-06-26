import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import * as uuid from 'uuid';

import { Photo } from '../../api/models/Photo';

define(Photo, (faker: typeof Faker) => {
    const path = faker.image.cats();

    const photo = new Photo();
    photo.id = uuid.v1();
    photo.path = path;
    photo.kind = 'avatar';
    return photo;
});
