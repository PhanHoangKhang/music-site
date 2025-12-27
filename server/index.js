import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import songRouter from './src/routes/songRouter.js';
import connect from './src/config/db.js';
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config();

connect()

const app = express()
const port = process.env.PORT || 4000;

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.use('/song', songRouter)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    message: err.message || 'Server error'
  })
})

app.listen(port, () => 
    console.log(`Running on http://localhost:${port}`)
)