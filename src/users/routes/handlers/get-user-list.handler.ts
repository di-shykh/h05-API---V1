import {errorHandler} from "../../../core/errors/error.handler";
import {UserQueryInput} from "../input/user-query.input";
import {setDefaultSortAndPaginationIfNotExist} from "../../../core/helpers/set-default-sort-and-pagination";
import {matchedData} from "express-validator";
import {HttpStatus} from "../../../core/types/http-statuses";
import {Request, Response} from "express";
import {usersQueryRepository} from "../../repositories/user.query-repository";

export async function getUserListHandler(req: Request, res: Response) {
    try{
        const query = req.query as unknown as UserQueryInput;
        const sanitizedQuery = matchedData<UserQueryInput>(req, {
            locations: ['query'],
            includeOptionals: true,
        });
        const queryInput = setDefaultSortAndPaginationIfNotExist(sanitizedQuery);
        const {items, totalCount} = await usersQueryRepository.findManyUsers(queryInput);
        const userListOutput = usersQueryRepository.mapToUserListPaginatedOutput(items,
            queryInput.pageNumber,
            queryInput.pageSize,
            totalCount,);
        res.status(HttpStatus.Ok).send(userListOutput);
    } catch (e: unknown) {
        errorHandler(e, res);
    }
}