import express from 'express'
const comicRouter = express.Router()


comicRouter.get('/', (req,res) =>{
    res.send('desde Comics')
})

export default comicRouter