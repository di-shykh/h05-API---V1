import {Request, Response} from "express";
import {HttpStatus} from "../../../core/types/http-statuses";
import {errorHandler} from "../../../core/errors/error.handler";
import {postsQueryRepository} from "../../repositories/posts.query-repository";

export async function getPostHandler(req: Request, res: Response) {
    try{
        const id = req.params.id as string;
        const post = await postsQueryRepository.findPostByIdOrFail(id);
        const postOutput = postsQueryRepository.mapToPostOutput(post);
        res.status(HttpStatus.Ok).send(postOutput);
    } catch (e: unknown ) {
        errorHandler(e, res);
    }
}
