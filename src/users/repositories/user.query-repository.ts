import {WithId} from "mongodb";
import {User} from "../domain/user";
import {userCollection} from "../../db/mongo.bd";

export const usersQueryRepository = {
    async findUserByIdOrFail(id: string): Promise<WithId<User> {

    },
    async isEmailUnique(email: string): Promise<Boolean> {
        const emailNomilized = email.toLowerCase().trim();
        const userId = await userCollection.findOne({email: emailNomilized});
        return !userId;
    },
    async isLoginUnique(login: string): Promise<Boolean> {

    }
}