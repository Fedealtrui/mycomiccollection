import jwt  from "jsonwebtoken";
import Usuario from "../models/Users.js";



const checkAuth = async (req, res, next) =>{
    let token;
    if (
        req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            try {
                token = req.headers.authorization.split(' ')[1];
                const decoded = jwt.verify(token, process.env.JWT_SECRET)

                req.usuario = await Usuario.findById(decoded.id).select('-password -emailverif -token -createdAt -updatedAt -__v ')
                
                return next()
            } catch (error) {
                return res.status(404).json({msg:"hubo un error"})
            }

        }
if(!token){
    const error = new Error ('Invalid Token')
    res.status(401).json({msg: error.message})
}
 
}

export default checkAuth