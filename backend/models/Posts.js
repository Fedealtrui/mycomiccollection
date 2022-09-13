import mongoose from 'mongoose'


const postSchema = mongoose.Schema({
    id:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
        unique: true,
        trim: true,
    },
    title:{
        type: String,
        required: true,
        trim: true,
    },
    body:{
        type: String,
        required: true,
        
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "Usuario"
        },
    
    ],
    about: {
        type:mongoose.Schema.Types.ObjectId,
            ref: "Comic",
            default: null
    }, 
    

},
{
    timestamps: true,
}
)


const Post = mongoose.model("Post", postSchema)


export default Post