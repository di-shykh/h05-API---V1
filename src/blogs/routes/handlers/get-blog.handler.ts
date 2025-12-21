import {Request, Response} from "express";
import {HttpStatus} from "../../../core/types/http-statuses";
import {errorHandler} from "../../../core/errors/error.handler";
import {blogsQueryRepository} from "../../repositories/blogs.query-repository";

export async function getBlogHandler(req: Request, res: Response) {
    try {
        const id = req.params.id as string;

        const blog = await blogsQueryRepository.findBlogByIdOrFail(id);
        const blogOutput = blogsQueryRepository.mapToBlogOutput(blog);
        res.status(HttpStatus.Ok).send(blogOutput);
    } catch (e: unknown) {
       errorHandler(e, res);
    }
}
