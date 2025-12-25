import {UserCreateInput} from "../routes/input/create-user.input";
import {usersQueryRepository} from "../repositories/user.query-repository";
import {bcryptService} from "../../auth/adapters/bcrypt.service";
import {UserDB} from "../routes/output/user.db";
import {userRepository} from "../repositories/user.repository";

export const usersService = {
    async createUser(userInputDto: UserCreateInput): Promise<string> {
        const {login, email, password} = userInputDto;
        if (!usersQueryRepository.isUnique(login)) {

        }
        if (!usersQueryRepository.isUnique(email)) {

        }
        const passwordHash = await bcryptService.generateHash(password);
        const newUser: UserDB = {
            login,
            email,
            passwordHash,
            createdAt: new Date().toISOString(),
        }
        const newUserId = await userRepository.createUser(newUser);
        return newUserId;
    }
}