import Usuario from "../models/Users.js"
import createId from "../helpers/idgen.js"
import jwtGen from "../helpers/jwtGen.js"
import { emailRegistro } from "../helpers/email.js"
const getUsers =  (req, res) =>{
        res.send('usuarios')
}


const getUser = (req, res) =>{
    res.send('usuario')
}

const createUser = async (req, res) =>{
    //Revision de duplicados
        const {email} = req.body
        const existeUsuario = await Usuario.findOne({ email })

    if(existeUsuario){
        const error = new Error ('Ya has registrado ese email')
        return res.status(400).json({msg: error.message})
    } else{
    try {
        const usuario = new Usuario(req.body)
        usuario.id = createId()
        usuario.token = jwtGen(usuario.id)
        await usuario.save()
            
        //Email de verificacion

        emailRegistro({
            email: usuario.email,
            usuario: usuario.userName,
            token: usuario.token
        })


    } catch (error) {
        console.log(error)
    }
}
    res.json({"msg":"usuario creado"})
}


const updateUser = (req, res) =>{
    res.send('actualizando usuario')
}

const deleteUser = (req, res) => {
    res.send('eliminando usuario')
}

const autenticate = async(req, res) =>{
    const { userName, password } = req.body
    //COMPROBART SI EXISTE
    const usuario = await Usuario.findOne({userName})
    if (!usuario) {
         const error = new Error('El Usuario no existe')
         return res.status(404).json({msg: error.message})
    }
    //COMPROBAR CONFIRMACION DE MAIL
    if(!usuario.emailverif){
        const error = new Error('Debes comprobar tu email')
        return res.status(403).json({msg:error.message})
    }
    //VERIFICAR PASSWORD
    if (await usuario.comprobarPass(password)){
        res.json({
            
                username: usuario.userName,
                email:usuario.email,
                token:jwtGen(usuario._id)
            
        })
    }else{
        const error = new Error('Password Incorrecto')
        return res.status(400).json({msg:error.message})
    }
}

    const comprobaremail = async (req, res) =>{
        const { token } = req.params
        const buscarUsuario = await  Usuario.findOne({token})
        if (buscarUsuario){
            buscarUsuario.emailverif = true
            buscarUsuario.token = ''
            await buscarUsuario.save()
            res.json({msg: 'Usuario verificado correctamente'})
        }else{
            const error = new Error('token invalido')
            res.status(404).json({msg:error.message})
        }
    }

    


const olvidePassword = async (req, res) =>{
    const { email } = req.body;
    const usuario = await Usuario.findOne({email})
    if (!usuario) {
         const error = new Error('El Usuario no existe')
         return res.status(404).json({msg: error.message})
    }

        try {
            usuario.token = createId();
            await usuario.save();
            res.json({msg: "Hemos enviado un mail con las instrucciones"})
        } catch (error) {
            console.log(error)
        }

}


const comprobarToken = async (req, res) =>{
    const { token } = req.params
    const buscarUsuario = await  Usuario.findOne({token})
    if (buscarUsuario){
        
        res.json({msg: "token valido"})
    }else{
        const error = new Error('Token invalido')
        res.status(404).json({msg:error.message})
    }
}

const nuevoPassword = async(req, res) =>{
    const {token} = req.params
    const {password} = req.body

    const buscarUsuario = await  Usuario.findOne({token})
    if (buscarUsuario){
        buscarUsuario.password = password;
        buscarUsuario.token = ''
        try {buscarUsuario.save()
        res.json({msg: "Password Actualizado correctamente"})
    }catch(error){
        console.log(error)
    }
    }else{
        const error = new Error('Token invalido')
        res.status(404).json({msg:error.message})
    }

}


const perfil = (req, res)=>{
    res.send('perfil')
}

export {getUser, 
    getUsers, 
    createUser, 
    updateUser,
    deleteUser, 
    autenticate, 
    comprobaremail, 
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    perfil
}
