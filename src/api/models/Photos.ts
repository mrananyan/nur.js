import {IsEmpty, IsNotEmpty} from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { Users } from './Users';

@Entity()
export class Photos {

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

    @ManyToOne(() => Users, user => user.photos)
    @JoinColumn({ name: 'user_id' })
    public user: Users;

    public toString(): string {
        return `${this.path}`;
    }

}
