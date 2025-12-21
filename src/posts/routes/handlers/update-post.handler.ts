import {Request, Response} from "express";
import {HttpStatus} from "../../../core/types/http-statuses";
import {postsService} from "../../application/post.services";
import {PostUpdateInput} from "../input/post-update.input";
import {errorHandler} from "../../../core/errors/error.handler";

export async function updatePostHandler(req: Request<{id: string}, {}, PostUpdateInput>, res: Response) {
    try{
        const id = req.params.id;
        const updatedPost = await postsService.updatePost(id, req.body);
        res.sendStatus(HttpStatus.NoContent);
    } catch (e: unknown) {
        errorHandler(e, res);
    }

}
