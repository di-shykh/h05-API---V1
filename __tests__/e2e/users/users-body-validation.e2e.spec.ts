import {UserInputDto} from "../../../src/users/application/dtos/user.input-dto";
import {getUserDto} from "../../utils/users/get-user-dto";
import {generateBasicAuthToken} from "../../utils/generate-admin-auth-token";
import express from "express";
import {setupApp} from "../../../src/setup-app";
import {runDB, stopDb} from "../../../src/db/mongo.bd";
import {SETTINGS} from "../../../src/core/settings/settings";
import {clearDb} from "../../utils/clear-db";
import request from "supertest";
import {USERS_PATH} from "../../../src/core/paths/paths";
import {HttpStatus} from "../../../src/core/types/http-statuses";
import {createUser} from "../../utils/users/create-user";

describe('User Body validation', () => {
    const app = express();
    setupApp(app);
    const adminAuthToken = generateBasicAuthToken();
    const correctTestUserData: UserInputDto = getUserDto();

    beforeAll(async () => {
        await runDB(SETTINGS.MONGO_URL_TEST);
        await clearDb(app);
    })
    afterAll(async () => {
        await stopDb();
    })
    it("should not create a user with incorrect body passed; POST /hometask_05/api/users", async () => {
        await request(app)
            .post(USERS_PATH)
            .send(correctTestUserData)
            .expect(HttpStatus.Unauthorized);

        const invalidDataSet1 = await request(app)
            .post(USERS_PATH)
            .set('Authorization', adminAuthToken)
            .send({
                ...correctTestUserData,
                login: "",
                password: "",
                email: "",
            })
            .expect(HttpStatus.BadRequest);
        expect(invalidDataSet1.body.errorsMessages).toHaveLength(3);

        const invalidDataSet2 = await request(app)
            .post(USERS_PATH)
            .set('Authorization', adminAuthToken)
            .send({
                ...correctTestUserData,
                login: "      ",
                password: "       ",
                email: "randomString",
            })
            .expect(HttpStatus.BadRequest);
        expect(invalidDataSet2.body.errorsMessages).toHaveLength(3);

        const invalidDataSet3 = await request(app)
            .post(USERS_PATH)
            .set('Authorization', adminAuthToken)
            .send({
                ...correctTestUserData,
                login: "di",
                password: "shgk",
                email: "randomString",
            })
            .expect(HttpStatus.BadRequest);
        expect(invalidDataSet3.body.errorsMessages).toHaveLength(3);

        const invalidDataSet4 = await request(app)
            .post(USERS_PATH)
            .set('Authorization', adminAuthToken)
            .send({
                ...correctTestUserData,
                login: "didgllfgdfjkl",
                password: "shgkgjs;gjldjgsdjg;lsdjgkljsgjsgjsjlsjsl",
                email: "randomString",
            })
            .expect(HttpStatus.BadRequest);
        expect(invalidDataSet4.body.errorsMessages).toHaveLength(3);
    })
    it('should not create a user with not unique email or login; POST /hometask_05/api/users', async () => {
        await createUser(app, {
            ...correctTestUserData,
            login: "diana",
            password: "1234567",
            email: "example@gmail.com",
        });
        expect(HttpStatus.Created);

        const dublicateEmailUser = await request(app)
            .post(USERS_PATH)
            .set('Authorization', adminAuthToken)
            .send({
                ...correctTestUserData,
                login: "diana12",
                password: "1234567",
                email: "example@gmail.com",
            })
            .expect(HttpStatus.BadRequest);
        expect(dublicateEmailUser.body.errorsMessages).toHaveLength(1);

        const dublicateLoginUser = await request(app)
            .post(USERS_PATH)
            .set('Authorization', adminAuthToken)
            .send({
                ...correctTestUserData,
                login: "diana",
                password: "1234567",
                email: "exampfsle@gmail.com",
            })
            .expect(HttpStatus.BadRequest);
        expect(dublicateLoginUser.body.errorsMessages).toHaveLength(1);

        const dublicateEmailAndLoginUser = await request(app)
            .post(USERS_PATH)
            .set('Authorization', adminAuthToken)
            .send({
                ...correctTestUserData,
                login: "diana",
                password: "1234567",
                email: "example@gmail.com",
            })
            .expect(HttpStatus.BadRequest);
        expect(dublicateEmailAndLoginUser.body.errorsMessages).toHaveLength(1);
    })
    it("should not delete user with wrong id; DELETE /hometask_05/api/users/:id", async () => {
        const newUser = await createUser(app, {
            ...correctTestUserData,
            login: "someLog",
            password: "1234567",
            email: "emaildi@gmail.com"
        })

        const incorrectId = newUser.id.slice(0,-2)+"qq";

        const response = await request(app)
            .delete(`${USERS_PATH}/${incorrectId}`)
            .set('Authorization', adminAuthToken)
            .expect(HttpStatus.BadRequest);//тут должно быть 404! посмотри позже!

        expect(response.body).toBeDefined();
        if (response.body.errorsMessages) {
            expect(response.body.errorsMessages).toHaveLength(1);
            expect(response.body.errorsMessages[0].field).toBe('id');
            expect(response.body.errorsMessages[0].message).toContain('Incorrect');
        }
    })
})