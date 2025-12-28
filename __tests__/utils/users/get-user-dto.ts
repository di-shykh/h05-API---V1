import {UserInputDto} from "../../../src/users/application/dtos/user.input-dto";

export function getUserDto(): UserInputDto {
    return {
        login: 'new login',
        password: 'password',
        email: 'email@email.com',
    }
}