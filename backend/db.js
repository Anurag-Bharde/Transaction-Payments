const mongoose=require("mongoose")
const { type } = require("os")

mongoose.connect("mongodb+srv://anuragadmin:KIkBqYjyBQZXxJ33@cluster0.3sk1xst.mongodb.net/Pamanta-Pay")

const UserInfo=new mongoose.Schema({
    Username:{
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
        required:false
    }
})

const Users=mongoose.model("User",UserInfo)


module.exports={
    Users
}