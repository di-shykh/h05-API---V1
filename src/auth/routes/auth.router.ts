import {Router} from "express";
import {loginOrEmailValidation, passwordValidation} from "../../users/routes/user.input-dto.validation-middleware";
import {inputValidationResultMiddleware} from "../../core/middlewares/validation/input-validation.result.middleware";

export const authRouter: Router = Router({});

authRouter.post(
    "/login",
    passwordValidation,
    loginOrEmailValidation,
    inputValidationResultMiddleware,

)