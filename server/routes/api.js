import express from "express"
import loginRouter from './controllers/login.js'

var router = express.Router()

router.use('/login', loginRouter)

export default router