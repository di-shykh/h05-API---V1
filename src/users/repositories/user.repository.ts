import {UserDB} from "../routes/output/user.db";
import {userCollection} from "../../db/mongo.bd";
import {ObjectId} from "mongodb";
import {RepositoryNotFoundError} from "../../core/errors/repository-not-found.error";

export const usersRepository = {
    async createUser(newUser: UserDB): Promise<string> {
        const insertedUser = await userCollection.insertOne(newUser);
        return insertedUser.insertedId.toString();
    },
    async deleteUser(id: string): Promise<void> {
        const deletedUser = await userCollection.deleteOne({_id: new ObjectId(id)});
        if(deletedUser.deletedCount<1) {
            throw new RepositoryNotFoundError("User not found");
        }
        return;
    }
}