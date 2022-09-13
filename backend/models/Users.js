import mongoose from "mongoose"
import bcrypt from "bcrypt"



const userSchema = mongoose.Schema({

    id: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    token: {
        type: String,
        trim: true,
        unique: true,
    },
    userName: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    friends : [String],
    emailverif: {
        type:Boolean,
        required: true,
        default:false
    }


},
{
    timestamps: true,
}
);


userSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        next()
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

});

userSchema.methods.comprobarPass = async function(passwordForm){
    return await bcrypt.compare(passwordForm, this.password)
}


const Usuario = mongoose.model("Usuario", userSchema)

export default Usuario