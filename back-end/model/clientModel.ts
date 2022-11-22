const mongoose__client : any = require('mongoose')

const clientSchema : any = new mongoose__client.Schema({
    clientname : {
        type : String , required :  true , min : 3 , max : 26 
    },
    email : {
        type : String , required : true , unique : true , min : 4 , max : 30
    },
    password : {
        type : String, required : true , max : 17 , min : 5
    }
})

module.exports = mongoose__client.model('Clients' , clientSchema)