import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePhotoTable1655992006023 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'photos',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    length: '255',
                    isPrimary: true,
                    isNullable: false,
                }, {
                    name: 'user_id',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'path',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'kind',
                    type: 'enum',
                    enum: ['avatar', 'cover', 'post', 'photo', 'general', 'other'],
                    isPrimary: false,
                    isNullable: true,
                },  {
                    name: 'description',
                    type: 'text',
                    isPrimary: false,
                    isNullable: true,
                },
            ],
        });
        await queryRunner.createTable(table);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('photos');
    }

}
