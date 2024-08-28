const mongoose=require("mongoose")
const { type } = require("os")

mongoose.connect("mongodb+srv://anuragadmin:KIkBqYjyBQZXxJ33@cluster0.3sk1xst.mongodb.net/Pamanta-Pay")

const UserInfo=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:30
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        
    }
})

const accountSchema=new mongoose.Schema({
     userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
     },
     balance:{
        type:Number,
        required:true
     }
})

const Users=mongoose.model("User",UserInfo)
const Account=mongoose.model("Account",accountSchema)


module.exports={
    Users,
    Account
}