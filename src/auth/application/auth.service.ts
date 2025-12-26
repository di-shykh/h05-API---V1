import {usersRepository} from "../../users/repositories/user.repository";
import {bcryptService} from "../adapters/bcrypt.service";

export const authService = {
    async loginUser(loginOrEmail: string, password: string): Promise<{accessToken: string}|null> {
        const user = await usersRepository.findByLoginOrEmail(loginOrEmail);
        if (!user) return null;
        const result = await bcryptService.checkPassword(password, user.passwordHash);
        if (!result) return null;
        return {accessToken: 'tocken'};
    }
}