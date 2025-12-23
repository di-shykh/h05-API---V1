import {Request, Response} from "express";
import {HttpStatus} from "../../../core/types/http-statuses";
import {PostCreateInput} from "../input/post-create.input";
import {postsService} from "../../application/post.services";
import {errorHandler} from "../../../core/errors/error.handler";
import {postsQueryRepository} from "../../repositories/posts.query-repository";

export async function createPostHandler(req: Request<{},{},PostCreateInput>, res: Response) {
   try{
      const createdPost = await postsService.createPost(req.body);
      const insertedPost = await postsQueryRepository.findPostByIdOrFail(createdPost);
      const postOutput = postsQueryRepository.mapToPostOutput(insertedPost);
      res.status(HttpStatus.Created).send(postOutput);
   } catch (e: unknown) {
       errorHandler(e, res);
   }
}

