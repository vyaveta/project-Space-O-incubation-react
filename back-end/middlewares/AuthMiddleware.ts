const client : any = require('../model/clientModel')
const authJwt = require('jsonwebtoken')

require('dotenv').config()

module.exports.clientAuthenticationMiddlewareFunction = (req : any , res : any , next : Function) => {
   try{
    console.log('got inside the auth middleware!')
    const clientToken = req.cookies.clientToken
    if(!clientToken)  res.json({status: false})
    else{
        console.log('The middleware detected the presence of the cookie in the request')
        authJwt.verify(clientToken,process.env.USER_TOKEN_SECRET, async (err : any, decodedToken : any) => {
            if(err)  {
                console.log(err,'is the error that occured in the authJwt.verify')
                res.json({status: false})
                next()
            }
            else{
                console.log('no errors until now')
                console.log(decodedToken,'is the decoded token')
                const clientDetails = await client.findById(decodedToken.client._id)
                console.log(clientDetails,'is the client details')
            if(clientDetails?.isBanned===false)  res.json({status: true , client: clientDetails})
            else res.json({status: false})
            console.log('the middleware function completed!')
            next()
            }
        } )
    }
   }catch(err){
    res.json({status: false})
    next()
    console.log(err,'is the error that occured in the clientAuthenticationMiddlewareFunction ')
   }
}