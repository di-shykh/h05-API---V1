
import {Request, Response} from "express";
import {HttpStatus} from "../../../core/types/http-statuses";
import {blogsService} from "../../application/blog.service";
import {errorHandler} from "../../../core/errors/error.handler";
import {BlogCreateInput} from "../input/blog-create.input";
import {blogsQueryRepository} from "../../repositories/blogs.query-repository";


export async function createBlogHandler(
    req: Request<{},{},BlogCreateInput>,
    res: Response
) {
    try{
        const createdBlogId = await blogsService.create(req.body);
        const createdBlog = await blogsQueryRepository.findBlogByIdOrFail(createdBlogId);
        const blogOutput = blogsQueryRepository.mapToBlogOutput(createdBlog);
        res.status(HttpStatus.Created).send(blogOutput);

    } catch(err: unknown){
        errorHandler(err, res);
    }
}
