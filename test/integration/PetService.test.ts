import { Container } from 'typedi';
import { Connection } from 'typeorm';

import { Photos } from '../../src/api/models/Photos';
import { PhotoService } from '../../src/api/services/PhotoService';
import { closeDatabase, createDatabaseConnection, migrateDatabase } from '../utils/database';
import { configureLogger } from '../utils/logger';

describe('PetService', () => {

    // -------------------------------------------------------------------------
    // Setup up
    // -------------------------------------------------------------------------

    let connection: Connection;
    beforeAll(async () => {
        configureLogger();
        connection = await createDatabaseConnection();
    });
    beforeEach(() => migrateDatabase(connection));

    // -------------------------------------------------------------------------
    // Tear down
    // -------------------------------------------------------------------------

    afterAll(() => closeDatabase(connection));

    // -------------------------------------------------------------------------
    // Test cases
    // -------------------------------------------------------------------------

    test('should create a new pet in the database', async (done) => {
        const photo = new Photos();
        photo.id = 'xxxxxxxx-xxxx-xxx-Nxxx-xxxxxxxxxxxx';
        photo.path = 'https://example.com/photo.jpg';
        photo.description = 'test';
        photo.kind = 'cover';
        const service = Container.get<PhotoService>(PhotoService);
        const resultCreate = await service.create(photo);
        expect(resultCreate.path).toBe(photo.path);
        expect(resultCreate.kind).toBe(photo.kind);

        const resultFind = await service.findOne(resultCreate.id);
        if (resultFind) {
            expect(resultFind.path).toBe(photo.path);
            expect(resultFind.kind).toBe(photo.kind);
        } else {
            fail('Could not find pet');
        }
        done();
    });

});
