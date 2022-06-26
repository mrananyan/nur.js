import { Field, InputType, Int } from 'type-graphql';

import { Photo } from '../Photo';

@InputType()
export class PhotoInput implements Partial<Photo> {

    @Field()
    public path: string;

    @Field(type => Int, {
        description: 'The description of the photo',
    })
    public description: string;

    @Field(type => Int, {
        description: 'The kind of the photo',
    })
    public kind: string;

}
