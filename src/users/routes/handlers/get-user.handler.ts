import {Request, Response} from "express";
import {HttpStatus} from "../../../core/types/http-statuses";
import {errorHandler} from "../../../core/errors/error.handler";
import {usersQueryRepository} from "../../repositories/user.query-repository";

export async function getUserHandler(req: Request, res: Response) {
        try{
            const id = req.params.id as string;
            const user = await usersQueryRepository.findUserByIdOrFail(id);
            const userOutput = usersQueryRepository.mapToUserOutput(user);
            res.status(HttpStatus.Ok).send(userOutput);
        } catch(err){
            errorHandler(err, res);
        }
    }
