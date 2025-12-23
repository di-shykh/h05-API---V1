import {UserCreateInput} from "../input/create-user.input";
import {errorHandler} from "../../../core/errors/error.handler";
import {Request, Response} from "express";
import {HttpStatus} from "../../../core/types/http-statuses";
import {UserOutput} from "../output/user-output";

export async function createUserHandler(req: Request<{},{}, UserCreateInput>, res: Response): Promise<void> {
    try {
        const createdUser = await usersService.createUser(req.body);
        const insertedUser = await usersQueryRepository.findOrFail(createdUser);
        const userOutput: UserOutput = usersQueryRepository.mapToUserOutput(insertedUser);
    }catch(e: unknown) {
        errorHandler(e,res);
    }
}