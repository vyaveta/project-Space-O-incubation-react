const Admin = require('../model/adminModel')
const admin_jwt : any = require('jsonwebtoken')
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