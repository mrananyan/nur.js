import { Field, ID, Int, ObjectType } from 'type-graphql';

import { User } from './User';

@ObjectType({
    description: 'Photo object.',
})

export class Photo {

    @Field(type => ID)
    public id: string;

    @Field({
        description: 'The path of the photo.',
    })
    public path: string;

    @Field(type => Int, {
        description: 'The description of the photo.',
    })
    public description: string;

    @Field(type => Int, {
        description: 'The kind of the photo.',
    })
    public kind: string;

    @Field(type => User, {
        nullable: true,
    })
    public owner: User;

}
