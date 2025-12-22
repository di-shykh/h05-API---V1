import express, { Express } from 'express';
import { blogsRouter } from './blogs/routes/blogs.router';
import { postsRouter } from './posts/routes/posts.router';
import { testingRouter } from './testing/routes/testing.router';
import {POSTS_PATH, BLOGS_PATH, TESTING_PATH, AUTH_PATH, USERS_PATH} from "./core/paths/paths";
import {HttpStatus} from "./core/types/http-statuses";
import {usersRouter} from "./users/routes/user.router";

export const setupApp = (app: Express) => {
    app.use(express.json());

    app.get('/', (req, res) => {
        res.status(HttpStatus.Ok).send('hello world!');
    });

    app.use(BLOGS_PATH, blogsRouter);
    app.use(POSTS_PATH, postsRouter);
    app.use(TESTING_PATH,testingRouter);
    app.use(AUTH_PATH, authRouter);
    app.use(USERS_PATH, usersRouter);

    console.log('✅ Routers initialized:'); // 🔥
    console.log('- Blogs:', BLOGS_PATH);
    console.log('- Posts:', POSTS_PATH);
    console.log('- Testing:', TESTING_PATH);

    return app;
}