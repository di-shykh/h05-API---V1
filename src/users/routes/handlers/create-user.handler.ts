import {UserCreateInput} from "../input/create-user.input";
import {errorHandler} from "../../../core/errors/error.handler";
import {Request, Response} from "express";
import {HttpStatus} from "../../../core/types/http-statuses";
import {UserOutput} from "../output/user-output";
import {usersQueryRepository} from "../../repositories/user.query-repository";
import {usersService} from "../../application/user.services";

export async function createUserHandler(req: Request<{},{}, UserCreateInput>, res: Response): Promise<void> {
    try {
        const createdUser = await usersService.createUser(req.body);
        const insertedUser = await usersQueryRepository.findUserByIdOrFail(createdUser);
        const userOutput: UserOutput = usersQueryRepository.mapToUserOutput(insertedUser);
        res.status(HttpStatus.Created).send(userOutput);
    }catch(e: unknown) {
        errorHandler(e,res);
    }
}