import {IsEmpty, IsNotEmpty} from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { User } from './User';

@Entity()
export class Photo {

    @PrimaryColumn('uuid')
    public id: string;

    @IsNotEmpty()
    @Column()
    public path: string;

    @IsNotEmpty()
    @Column()
    public kind: string;

    @IsEmpty()
    @Column()
    public description: string;

    @Column({
        name: 'user_id',
        nullable: true,
    })
    public userId: string;

    @ManyToOne(() => User, user => user.photos)
    @JoinColumn({ name: 'user_id' })
    public user: User;

    public toString(): string {
        return `${this.path}`;
    }

}
