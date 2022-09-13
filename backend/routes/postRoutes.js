import  express  from 'express'
import {
    getPost,
    getPosts,
    createPost,
    updatePost,
    deletePost
} from '../controllers/postController.js'

import checkAuth from '../middleware/checkAuth.js'

const postRouter = express.Router()

postRouter.route('/')
    .get(checkAuth, getPosts)
    .post(checkAuth, createPost)

    postRouter.route('/:id')
    .get(checkAuth, getPost)
    .put(checkAuth, updatePost)
    .delete(checkAuth,deletePost)


export default postRouter