import express from 'express'

const app = express()
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static("public"))
// 
import userRouter from './routes/user.routes.js'
import bookRouter from './routes/book.routes.js'
app.use('/api/v1/user', userRouter)
app.use('/api/v1/book', bookRouter)

export{app}