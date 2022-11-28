const admin_router = require('express').Router()
const {adminRegister , adminAuthentication , getAllUsers} = require("../controllers/adminControllers")
module.exports = admin_router

admin_router.post('/register',adminRegister)

admin_router.post('/login',adminAuthentication)

admin_router.get('/getAllUsers',getAllUsers)