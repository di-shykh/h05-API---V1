import {Post} from "../domain/post";
import {PostInputDto} from "../application/dtos/post.input-dto";
import {postCollection} from "../../db/mongo.bd";
import {ObjectId} from "mongodb";
import {RepositoryNotFoundError} from "../../core/errors/repository-not-found.error";

export const postsRepository = {

    async createPost(newPost: Post): Promise<string> {
        const insertPost = await postCollection.insertOne(newPost);
        return insertPost.insertedId.toString();
    },
   async updatePost(id: string, dto: PostInputDto): Promise<void> {
        const updatePostResult = await postCollection.updateOne(
            {_id: new ObjectId(id)},
            {
                $set: {
                    title: dto.title,
                    shortDescription: dto.shortDescription,
                    content: dto.content,
                    blogId: dto.blogId,
                }
            });
        if (updatePostResult.matchedCount < 1) {
            throw new RepositoryNotFoundError("Post not found.");
        }

        return;
    },
    async deletePost(id: string): Promise<void> {
        const deletePostResult = await postCollection.deleteOne({_id: new ObjectId(id)});
        if (deletePostResult.deletedCount < 1) {
            throw new RepositoryNotFoundError("Post not found.");
        }
        return;
    },
}

