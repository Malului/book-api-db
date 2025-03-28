import express from "express"
import cookieParser from "cookie-parser"

import "dotenv/config";

import bookRouter from "./routes/book.routes.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.routes.js";

import errorMiddleware from "./middleware/error.middleware.js";


const app = express()
const port = process.env.PORT;

app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(cookieParser())

// Auth middleware


//All Routes --> Starting with auth, user, books, others
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/books', bookRouter)


//Error Middleware
app.use(errorMiddleware)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`\nXample app listening on port ${port}`)
})