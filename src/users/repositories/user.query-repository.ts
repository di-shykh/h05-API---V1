import {WithId} from "mongodb";
import {User} from "../domain/user";

export const usersQueryRepository = {
    async findUserByIdOrFail(id: string): Promise<WithId<User> {

    }
}