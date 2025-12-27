import {Router} from "express";
import {paginationAndSortingValidation} from "../../core/middlewares/validation/query-pagination-sorting.validation";
import {UserSortField} from "./input/user-sort-field";
import {inputValidationResultMiddleware} from "../../core/middlewares/validation/input-validation.result.middleware";
import {getUserListHandler} from "./handlers/get-user-list.handler";
import {superAdminMiddleware} from "../../auth/middlewares/super-admin.guard-middleware";
import {userCreateValidation} from "./user.input-dto.validation-middleware";
import {createUserHandler} from "./handlers/create-user.handler";
import {idValidator} from "../../core/middlewares/validation/params-id.validation-middleware";
import {deleteUserHandler} from "./handlers/delete-user.handler";
import {query} from "express-validator";

export const usersRouter: Router = Router({});

usersRouter
    .get(
        "",
        superAdminMiddleware,
        [
            ...paginationAndSortingValidation(UserSortField),
            query('searchLoginTerm').optional().isString().trim(),
            query('searchEmailTerm').optional().isString().trim()
        ],
        inputValidationResultMiddleware,
        getUserListHandler
    )
    .post(
        "",
        superAdminMiddleware,
        userCreateValidation,
        inputValidationResultMiddleware,
        createUserHandler
    )
    .delete(
        "/:id",
        superAdminMiddleware,
        idValidator,
        inputValidationResultMiddleware,
        deleteUserHandler
    );
