const Admin = require('../model/adminModel')
const Clients = require('../model/clientModel')
const Rockets = require('../model/rocketModel')
// const {Request, Response} = require('express')
const admin_jwt : any = require('jsonwebtoken')
const Applications = require('../model/applicationModel')
const Rocket = require('../model/rocketModel')
require('dotenv').config()

module.exports.adminRegister = async (req: any , res: any , next: Function) => {
    try{
        const {adminName, adminAuthCode , adminAccessCode}: {adminName: string, adminAuthCode: string , adminAccessCode: string} = req.body
        const doesAccountExists = await Admin.findOne({adminName})
        if(doesAccountExists) return res.json({status: false,msg: 'Account already exists'})
        const admin = await Admin.create({adminName,adminAuthCode, adminAccessCode})
        const adminToken = admin_jwt.sign({admin},process.env.ADMIN_TOKEN_TOP_SECRET,{expiresIn: '365d'})
        res.cookie('adminToken',adminToken,{
            withCredentials: true,
            httpOnly: false,
            maxAge:1200209
        })
        return res.json({status: true, msg: 'Successfully created admin account'})
    }catch(er){
        console.log(er,'is the error that occured in the admin controllers')
        return res.json({status: false, msg: 'Something went wrong'})
    }
}

module.exports.adminAuthentication = async (req: any , res: any ) => {
    try{
        const {adminName, adminAuthCode} : {adminName: string , adminAuthCode: string} = req.body
        const admin = await Admin.findOne({adminName})
        if(!admin) return res.json({status: false,msg: 'No account with that adminName'})
        if(admin.incorrectAuthCount>3) return res.json({status: false, msg:'This account is in Quarantine list'})
        if(admin.adminAuthCode!== adminAuthCode) {
            admin.incorrectAuthCount++
            await admin.save()
            return res.json({status: false, msg: `you have entered incorrect authCode ${admin.incorrectAuthCount} times. Only 4 chanse is available!`})
        }
        admin.incorrectAuthCount=0
        admin.save()
        const adminToken = await admin_jwt.sign({admin},process.env.ADMIN_TOKEN_TOP_SECRET,{expiresIn: '365d'})
        res.cookie('adminToken',adminToken,{
            withCredentials: true,
            httpOnly: false,
            maxAge:1200209
        })
        return res.json({status: true, msg: 'Logging in to your admin Account!'})
    }catch(err){
        console.log(err,'is the error that occured in the adminAuthentication function in the adminControllers')
        return res.json({status: false,msg:'Something went wrong!'})
    }
}

module.exports.getAllUsers = async (req:any , res: any) => {
    try{
        const clients = await Clients.find({})
       return res.json({status: true, clients})
    }catch(err){
        console.log(err,'is the error that occured in the getAllUsers function in the adminControllers')
       return res.json({status: false,msg:'Something went wrong'})
    }
}

module.exports.blockClient = async (req: any , res: any ) => {
    try{
        const {_id} : {_id: string} = req.body
        const client = await Clients.findById({_id})
        if(client) {
            client.isBanned = !client.isBanned
            client.save()
            let msg; if(client.isBanned === true) msg =  `Blocked ${client.clientname}`
            else msg = `unblocked ${client.clientname}`
            return res.json({status: true, msg})
        }
        return res.json({status: false,msg: 'No users find'})  
    }catch(err){
        console.log(err,'is the error that occured in the blockClient function in the adminControllers')
        return res.json({status: false,msg:'Something went wrong!'})
    }
}

module.exports.getApplications = async (req: any ,res: any) => {
    try{
       const applications = await Applications.find({})
       return res.json({status:true,applications})
    }catch(err){
        console.log(err,'is the error that occure in the getApplications function in the admin controllers')
        return res.josn({status: false,msg:'something went wrong!'})
    }
}

module.exports.changeApplicationStatus = async (req: any , res: any) => {
    try{
        const {_id,status} : {_id: string,status: string} = req.body
        const application = await Applications.findById({_id})
        if(!application) return res.json({status: false,msg:'No application found'})
        if(status==='approve') application.isApproved=true
        else application.isDeclined=true
        application.save()
        return res.json({status: true,msg:'Done'})
    }catch(err){
        console.log(err,'is the error that occured in the changeApplicationStatus function in the adminControllers')
        return res.json({status: false,msg:'Something went wrong'})
    }
}

module.exports.getRocketDetails = async (req: any ,res: any ) => {
    try{
        const rocketDetails = await Rockets.find({})
        if(!rocketDetails) return res.json({status: false,msg: 'Oops the rocket got stolen!'})
        return res.json({status: true,msg: 'We got it',rocketDetails: rocketDetails[0]})
    }catch(e){
        console.log(e,'is the error that occured in the getRocketDetails function in the admin controllers')
        return res.json({status: false, msg:'Something went wrong'})
    }
}

module.exports.getApprovedAndNonAllocatedApplications = async (req: any , res: any) => {
    try{
        const application = await Applications.find({isApproved:true,isDeclined:false,isAllocated:false})
        if(application[0]==null|| !application[0]) return res.json({status: true , msg:'No applications to allocate'})
        return res.json({status: true, msg: 'Success' , application})
    }catch(err){
        res.json({status: false,msg:'Something went wrong'})
        console.log(err,'is the error that occured in the getApprovedAndNonAllocatedApplications function in the admin controller')
    }
}

module.exports.allocateSeatForClient = async (req: any , res: any) => {
    try{
        console.log(req.body,'is the req body')
        const {clientEmail, seatName , seatIndex} : {clientEmail: string , seatName: string , seatIndex: string} = req.body
       
          const client = await Clients.findOne({email:clientEmail})
          client.isSeatAllocated = true
          const rocket = await  Rocket.findOne()
          console.log(rocket,'is the rocket')
          if(seatName==='windowL'){
            rocket.windowL[seatIndex].isBooked = true
            console.log('window L ',rocket)
          }
          else  rocket.windowR[seatIndex].isBooked = true
          console.log(rocket.windowL[seatIndex],'is the seat index')
          const application = await Applications.findOne({clientEmail})
          application.isAllocated = true

          client.save()
          const rt = new Rocket (rocket)

        await rt.markModified('rocket')
         await rt.save((err:Error) => {
            if(err) console.log(err,'is error that blocks rocket.save()')
            else console.log('no error')
         })
          application.save()
          return res.json({status: true, msg: `Successfully allocated WindowL seat to ${client.clientname}`})
    }catch(err){
        console.log(err,'is the error that occured in the allocateSeatForClient function in the admin controller')
        return res.json({status: false,msg: 'Something went wrong!'})
    }
}