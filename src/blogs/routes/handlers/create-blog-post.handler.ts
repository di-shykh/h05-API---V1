import {Request, Response} from "express";
import {HttpStatus} from "../../../core/types/http-statuses";
import {PostCreateInput} from "../../../posts/routes/input/post-create.input";
import {postsService} from "../../../posts/application/post.services";
import {errorHandler} from "../../../core/errors/error.handler";
import {blogsService} from "../../application/blog.service";
import {postsQueryRepository} from "../../../posts/repositories/posts.query-repository";
import {blogsQueryRepository} from "../../repositories/blogs.query-repository";

export async function createBlogPostHandler(req: Request<{id: string}, PostCreateInput>, res: Response) {
    try{
        const blogId = req.params.id;
        const blog = await blogsQueryRepository.findBlogByIdOrFail(blogId);
        const postData = req.body;
        const createdPostId = await postsService.createPost({
            title: postData.title,
            shortDescription: postData.shortDescription,
            content: postData.content,
            blogId});
        const createdPost = await postsQueryRepository.findPostByIdOrFail(createdPostId);
        const postOutput = postsQueryRepository.mapToPostOutput(createdPost);
        res.status(HttpStatus.Created).send(postOutput);
    }
    catch (e: unknown) {
        errorHandler(e,res);
    }
}