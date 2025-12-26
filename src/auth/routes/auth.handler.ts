import {LoginInputDto} from "../application/dtos/loginInputDto";
import {Request, Response} from "express";
import {HttpStatus} from "../../core/types/http-statuses";
import {authService} from "../application/auth.service";

export async function authHandler(req: Request <{}, {}, LoginInputDto>, res: Response) {

    const {loginOrEmail, password} = req.body;
    const accessToken = await authService.loginUser(loginOrEmail, password);
    if(!accessToken) {
        return res.sendStatus(HttpStatus.Unauthorized);
    }
    return res.status(HttpStatus.NoContent).send({accessToken});
}