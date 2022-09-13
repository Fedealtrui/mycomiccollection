import jwt from "jsonwebtoken"

const jwtGen = (id) =>{

    return jwt.sign( { id }, process.env.JWT_SECRET )
}


export default jwtGen