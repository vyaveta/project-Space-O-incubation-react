const bcrypt = require('bcrypt')
const Client = require('../model/clientModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports.clientRegister = async (req : any ,res : any,next :any)  => {
    try{
        if(req.body.pwd){
            const { user , pwd  , email  } : { user : string, pwd : string , email : string } = req.body 
        console.log(user , pwd , email)
        const emailCheck = await Client.findOne({email})
        if (emailCheck) return res.json({msg: 'Account already exists' , staus : false } )
        const hashedPassword : string = await bcrypt.hash( pwd , 10 )
        const client = await Client.create({clientname: user , email, password: hashedPassword })
        delete client.password
        const clientToken = jwt.sign({client},process.env.USER_TOKEN_SECRET,{expiresIn:'365d'})
        res.cookie('clientToken',clientToken,{
          withCredentials: true,
          httpOnly:false,
          maxAge:1200209
        })
        return res.json({status : true , client , msg: 'Accont Created!'})
        }else{
            const {user , isGoogleAccount , email} : {user: string , isGoogleAccount: string , email: string} = req.body
            console.log(req.body,'is the req body')
            const emailCheck = await Client.findOne({email})
            if(!emailCheck) {
                const client = await Client.create({clientname: user , email , googleAccount : isGoogleAccount })
                const clientToken = jwt.sign({client},process.env.USER_TOKEN_SECRET,{expiresIn:'365d'})
                res.cookie('clientToken',clientToken,{
                  withCredentials: true,
                  httpOnly:false,
                  maxAge:1200209
                })
                return res.json({status: true , client , msg: 'Logging in with your google account!'})
            }
                const client = { clientname : user, email, googleAccount : isGoogleAccount }
                const clientToken = jwt.sign({client},process.env.USER_TOKEN_SECRET,{expiresIn:'365d'})
                res.cookie('clientToken',clientToken,{
                  withCredentials: true,
                  httpOnly:false,
                  maxAge:1200209
                })
               return res.json({status: true , client , msg: 'Logging in with your google account!'})
        }
    }catch(err){
        console.log(err,'is the error that occured in the clientRegister function in the clientControllers')
        return res.json({status: false, msg: 'Something went wrong'})
    }
}

module.exports.clientAuthentication = async (req :any , res : any , next : any) => {
    try{
        if(req.body.isGoogleAccount){
            console.log('this is a google account')
            const { email , isGoogleAccount , user } : {email: String , isGoogleAccount: any , user : String} = req.body
            const client = await Client.findOne({email})
            if(!client) {
                const client = await Client.create({clientname: user , email , googleAccount : isGoogleAccount })
                const clientTokenForGoogleAvvount = jwt.sign({client},process.env.USER_TOKEN_SECRET,{expiresIn:'365d'})
                res.cookie('clientToken',clientTokenForGoogleAvvount,{
                    withCredentials: true,
                    httpOnly:false,
                    maxAge:1200209
                  })
                return res.json({status: true , client , msg: 'Logging in with your google account!'})
            }
            const clientToken = jwt.sign({client},process.env.USER_TOKEN_SECRET,{expiresIn:'365d'})
            res.cookie('clientToken',clientToken,{
              withCredentials: true,
              httpOnly:false,
              maxAge:1200209
            })
             return res.json({ status: true , msg: 'Logging in with your google account!' , client })
        }else{
            console.log('The user is trying to login with a hardcoded account')
            const { email , password } : {email : string, password : string} = req.body
            let client = await Client.findOne({email})
            if(!client) return res.json({status: false , msg: 'No account with entered email, Try sign in with google.'})
            const isPasswordValid = await bcrypt.compare(password,client.password)
            delete client.password
            if (!isPasswordValid) return res.json({status: false , msg:'Password Authenticatin failed!'})
            // client.password = null // Im setting the password to null because the below code that was supposed to delete the client password is not working and I dont want the front end to get the client password!
            delete client.password 
            const clientToken = jwt.sign({client},process.env.USER_TOKEN_SECRET,{expiresIn:'365d'})
            res.cookie('clientToken',clientToken,{
              withCredentials: true,
              httpOnly:false,
              maxAge:1200209
            })
            return res.json({status: true, msg: 'Login Success!' , client , clientToken})
        }
    }catch(ex){
        console.log(ex,'is the error that occured in the clientAuthentication function in the clientControllers.ts')
        return res.json({status: false, msg: 'Something went wrong in the backend!'})
    }
}