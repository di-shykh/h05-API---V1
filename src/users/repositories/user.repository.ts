import {UserDB} from "../routes/output/user.db";
import {userCollection} from "../../db/mongo.bd";

export const userRepository = {
    async createUser(newUser: UserDB): Promise<string> {
        const insertedUser = await userCollection.insertOne(newUser);
        return insertedUser.insertedId.toString();
    },
}