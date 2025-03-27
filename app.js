import express from "express"
import cookieParser from "cookie-parser"

import "dotenv/config";

const app = express()
const port = process.env.PORT;

app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Xample app listening on port ${port}`)
})