import express from 'express'
import {getUser,
     getUsers,
     updateUser,
     createUser,
     deleteUser,
     autenticate,
     comprobaremail,
     olvidePassword,
     comprobarToken,
     nuevoPassword,
     perfil
    } from '../controllers/userController.js'
import checkAuth from '../middleware/checkAuth.js'


const userRouter = express.Router()


userRouter.get('/', getUsers)
userRouter.get('/user', getUser)
userRouter.get('/confirmar/:token', comprobaremail)
userRouter.get("/olvide-password/:token", comprobarToken  )

userRouter.post('/', createUser)
userRouter.post('/login', autenticate)
userRouter.post('/olvide-password', olvidePassword)
userRouter.post("/olvide-password/:token", nuevoPassword  )

userRouter.get('/user/perfil', checkAuth, perfil)
userRouter.put('/user', updateUser)

userRouter.delete('/', deleteUser)



export default userRouter