import {Request, Response} from "express";
import {errorHandler} from "../../../core/errors/error.handler";
import {PostQueryInput} from "../../../posts/routes/input/post-query.input";
import {HttpStatus} from "../../../core/types/http-statuses";
import {matchedData} from "express-validator";
import {postsQueryRepository} from "../../../posts/repositories/posts.query-repository";

export async function getBlogPostListHandler(
    req: Request<{id: string}>,
    res: Response,
    ) {
    try {
        const blogId = req.params.id;
        const queryInput = req.query as unknown as unknown as PostQueryInput;
        const sanitizedQuery = matchedData<PostQueryInput>(req, {
            locations: ['query'],
            includeOptionals: true,
        });
        const { items, totalCount } = await postsQueryRepository.findPostsByBlogId(blogId, sanitizedQuery);
        const postListOutput = postsQueryRepository.mapToPostListPaginatedOutput(items,
            sanitizedQuery.pageNumber,
            sanitizedQuery.pageSize,
            totalCount,
        );
        res.status(HttpStatus.Ok).send(postListOutput);
    }
    catch (e: unknown) {
        errorHandler(e,res);
    }
}