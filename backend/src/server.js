import express from 'express';

import notesRoutes from './routes/notesRoutes.js'
import { connectDB } from './config/db.js';

import rateLimiter from './middleware/rateLimited.js';
import cors from 'cors'

import dotenv from 'dotenv'

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5001

app.use(cors({
    origin: 'http://localhost:5173'
}))
app.use(rateLimiter)
app.use(express.json())
app.use('/api/notes', notesRoutes)


connectDB().then(()=> {
    app.listen(PORT, ()=> {
    console.log('Server started in PORT:', PORT)
    })
})