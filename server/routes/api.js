import express from "express"
import loginRouter from './controllers/login.js'
import userRouter from './controllers/users.js'

var router = express.Router()

router.use('/login', loginRouter)
router.use('/user', userRouter)

export default router