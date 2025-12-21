import {Request, Response} from "express";
import {HttpStatus} from "../../../core/types/http-statuses";
import {PostQueryInput} from "../input/post-query.input";
import {matchedData} from "express-validator";
import {setDefaultSortAndPaginationIfNotExist} from "../../../core/helpers/set-default-sort-and-pagination";
import {errorHandler} from "../../../core/errors/error.handler";
import {postsQueryRepository} from "../../repositories/posts.query-repository";

export async function getPostListHandler(req: Request, res: Response) {
    try{
        const query = req.query as unknown as PostQueryInput;
        const sanitizedQuery = matchedData<PostQueryInput>(req, {
            locations: ['query'],
            includeOptionals: true,
        });
        const queryInput = setDefaultSortAndPaginationIfNotExist(sanitizedQuery);
        const {items, totalCount} = await postsQueryRepository.findManyPosts(queryInput);
        const postsListOutput = postsQueryRepository.mapToPostListPaginatedOutput(items,
            queryInput.pageNumber,
            queryInput.pageSize,
            totalCount,
        )
        res.status(HttpStatus.Ok).send(postsListOutput);
    }catch (e: unknown) {
        errorHandler(e, res);
    }
}