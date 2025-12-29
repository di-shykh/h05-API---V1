import express, {Express} from "express";
import {setupApp} from "../../../src/setup-app";
import {generateBasicAuthToken} from "../../utils/generate-admin-auth-token";
import {runDB, stopDb} from "../../../src/db/mongo.bd";
import {SETTINGS} from "../../../src/core/settings/settings";
import {clearDb} from "../../utils/clear-db";
import {getUserDto} from "../../utils/users/get-user-dto";
import {createUser} from "../../utils/users/create-user";
import request from "supertest";
import {AUTH_PATH} from "../../../src/core/paths/paths";
import {HttpStatus} from "../../../src/core/types/http-statuses";

describe("Check Auth", () => {
    const app: Express = express();
    setupApp(app);
    const adminToken: string = generateBasicAuthToken();
    beforeAll(async () => {
        await runDB(SETTINGS.MONGO_URL_TEST);
        await clearDb(app);
    });
    afterAll(async () => {
        stopDb();
    });
    it("should send 204 status when authenticated", async () => {
        const user = await createUser(app, {
            ...getUserDto(),
            login: 'Anya',
            password: '12345678',
            email: 'anna@email.com'
        })

        const response = await request(app)
            .post(`${AUTH_PATH}/login`)
            .send({
                loginOrEmail: 'Anya',
                password: '12345678',
            })
            .expect(HttpStatus.NoContent);

        expect(response.status).toEqual(HttpStatus.NoContent);

        const response2 = await request(app)
            .post(`${AUTH_PATH}/login`)
            .send({
                loginOrEmail: 'anna@email.com',
                password: '12345678',
            })
            .expect(HttpStatus.NoContent);
        expect(response2.status).toEqual(HttpStatus.NoContent);
    })
    it("should send 400 status when user was not found", async () => {

        const user = await createUser(app, {
            ...getUserDto(),
            login: 'Alya',
            password: '12345678',
            email: 'alya@email.com'
        })

        const response = await request(app)
            .post(`${AUTH_PATH}/login`)
            .send({
                loginOrEmail: '',
                password: '123456789',
            })
            .expect(HttpStatus.BadRequest);

        expect(response.status).toEqual(HttpStatus.BadRequest);

        const response2 = await request(app)
            .post(`${AUTH_PATH}/login`)
            .send({
                loginOrEmail: 'anuaf',
                password: '12345678',
            })
            .expect(HttpStatus.Unauthorized);

        expect(response2.status).toEqual(HttpStatus.Unauthorized);

        const response3 = await request(app)
            .post(`${AUTH_PATH}/login`)
            .send({
                loginOrEmail: 'alya@email.com',
                password: '1234567812',
            })
            .expect(HttpStatus.Unauthorized);

        expect(response3.status).toEqual(HttpStatus.Unauthorized);

        const response4 = await request(app)
            .post(`${AUTH_PATH}/login`)
            .send({
                loginOrEmail: 'alya1@email.com',
                password: '12345678',
            })
            .expect(HttpStatus.Unauthorized);

        expect(response4.status).toEqual(HttpStatus.Unauthorized);
        const response5 = await request(app)
            .post(`${AUTH_PATH}/login`)
            .send({
                loginOrEmail: 'sdfsdfsdfsfsdf',
                password: '',
            })
            .expect(HttpStatus.BadRequest);

        expect(response5.status).toEqual(HttpStatus.BadRequest);
    })
})
