const express = require('express')
const mongoose = require('mongoose')
const app = express()
const dotenv = require ('dotenv')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRoutes = require('./src/routes/user.routes')
// const taskRoutes = require('./src/routes/task.routes')


dotenv.config()
console.log('MONGODB_URL exists:', !!process.env.MONGODB_URL)
console.log('PORT:', process.env.PORT)
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))
app.use(cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true
}
 ))



app.use('/users', userRoutes)
// app.use('/tasks', taskRoutes)


app.get('/', (req, res) => {
    res.json({
        message:'Server is ready',
        now: new Date()
    })
})



const PORT = process.env.PORT
mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
    app.listen(PORT, ()=>{
        console.log(`i am Godzilla on ${PORT}`)
         })
    }).catch(()=>{
        console.log('I can not connect, sire')
    })