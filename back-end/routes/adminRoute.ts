const admin_router = require('express').Router()
const {adminRegister , adminAuthentication , getAllUsers , blockClient , getApplications , changeApplicationStatus , getRocketDetails} = require("../controllers/adminControllers")
module.exports = admin_router

admin_router.post('/register',adminRegister)

admin_router.post('/login',adminAuthentication)

admin_router.get('/getAllUsers',getAllUsers)

admin_router.post('/blockClient',blockClient)

admin_router.get('/getApplications',getApplications)

admin_router.post('/changeApplicationStatus',changeApplicationStatus)

admin_router.get('/getRocketDetails',getRocketDetails)