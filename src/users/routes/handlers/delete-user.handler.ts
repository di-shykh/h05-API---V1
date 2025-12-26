import {Request, Response} from "express";
import {errorHandler} from "../../../core/errors/error.handler";
import {usersService} from "../../application/user.services";
import {HttpStatus} from "../../../core/types/http-statuses";

export async function deleteUserHandler(req: Request<{id: string}>, res: Response) {
    try{
        const id: string = req.params.id;
        const deletedUser = await usersService.deleteUser(id);
        res.sendStatus(HttpStatus.NoContent);
    } catch (e: unknown) {
        errorHandler(e,res);
    }


}