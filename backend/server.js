// imports
import express, { Router } from 'express'
import chalk from 'chalk'
import 'dotenv/config'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import userRoute from './routes/userRoute.js'
import doctorRoute from'./routes/doctorRoute.js'
import bcrypt from 'bcrypt'
import { authMiddle } from './middlewares/authMiddleware.js'
import authRoute from './routes/authRoutes.js'
import bookRoute from './routes/appointmentRoute.js'
import { connectDB } from './utils/db.js'
// import chalk from 'chalk'

const app = express()


//middlewares
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(bodyParser.json());
app.use(express.json())

//dotenv
const port = process.env.PORT || 5001


//mongoose
connectDB()

//cors
app.use(cors())

//routes
app.get('/', (req, res) => {
    res.send('hoye geche')
    console.log(process.env.NAME)
})
app.use("/api/v1/user", userRoute);
app.use("/api/v1/doctor", doctorRoute);
app.use("/api/v1/book", bookRoute);

// Auth : 
app.use("/api/v1/getUser",authMiddle,authRoute)


app.listen(port, () => {
    const url = chalk.magenta.underline(`http://localhost:${port}`)
    console.log(`Backend is running at : `, url)
})
