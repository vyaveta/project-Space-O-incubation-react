const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const clientRoutes = require('./routes/clientRoutes.ts')
const adminRoutes = require('./routes/adminRoute.ts')

const app = express()
require('dotenv').config()

app.use(cors({
    origin:['http://localhost:5000'],
    method:['GET','POST','UPDATE','DELETE'],
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extented: true}))
app.use('/client',clientRoutes)
app.use('/admin',adminRoutes)

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('**********************************************************************')
    console.log('**********************db connection successfull!**********************')
    console.log('**********************************************************************')
}).catch(() => {
    console.log('**********************************************************************')
    console.log('db connection failed due to ')
})

app.listen(process.env.PORT , () => {
    console.log('**********************************************************************')
    console.log(`The back-end is listening on port ${process.env.PORT}`)
    console.log('**********************************************************************')
})