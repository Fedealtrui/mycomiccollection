import Post from '../models/Posts.js'
import createId from "../helpers/idgen.js"

const getPosts = async (req, res ) => {
const posts = await Post.find().where('userId').equals(req.usuario._id)

res.json(posts)
}


const createPost = async (req, res ) => {
   const usuario = req.usuario
      try {
          const post = new Post(req.body)
          post.id = createId()
          post.userId = usuario._id
          const AlmacenarPost = await post.save()
      } catch (error) {
          res.json(`${error.message}`)
      }
      res.json({"msg":"post creado"})
    }


const getPost = async (req, res ) => {
    const {id} = req.params;
    const post = await Post.findById(id)
    if (post){
        res.json(post)
    }
    if(!post){
        const error = new Error ('este post no existe')
        res.status(404).json({msg: error.message})
    }
    
}


const updatePost = async (req, res ) => {
    const {id} = req.params;
    const post = await Post.findById(id)
    if (!post){
        const error = new Error ('este post no existe')
        res.status(404).json({msg: error.message})
    }
    if (post.userId.toString()!== req.usuario._id.toString()){
        const error = new Error ('No puedes hacer esto')
        res.status(401).json({msg:error.message})
    }

    post.title = req.body.title || post.title
    post.body = req.body.body || post.body
    try {
        const updatedpost = await post.save()
        res.json(updatedpost)
    } catch (error) {
        
    }
}

const deletePost = async (req, res ) => {
    const {id} = req.params;
    const post = await Post.findById(id)
    if (!post){
        const error = new Error ('este post no existe')
        res.status(404).json({msg: error.message})
    }
    if (post.userId.toString()!== req.usuario._id.toString()){
        const error = new Error ('No puedes hacer esto')
        res.status(401).json({msg:error.message})
    }
try {
    await Post.deleteOne()
    res.status(200).json({msg:"post deleted"})
} catch (error) {
    console.log(error)
}
    
}


export { 
    getPost,
    getPosts,
    createPost,
    updatePost,
    deletePost
}