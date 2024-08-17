const express=require("express")
const app=express()
const zod=require("zod");
const { Users } = require("../db");

const UserValidSchema=zod.object({
    username:zod.string(),
    password:zod.string(),
    firstName:zod.string(),
    lastName:zod.string()
})

const userRouter=express.Router()

app.post("/Signup",(req,res)=>{
   const UserIndo=req.body;
   const validUserInfo=UserValidSchema.safeParse(UserIndo);

   if(!validUserInfo.success){
    return res.status(404).json({msg:"NOT VALID INFORMATION"})
   }

   const USeRFINDER=Users.findOne({Username:req.body.username})

   if(USeRFINDER){
    return res.status(404).json({msg:"User Already Exists"})
   }

   
})

module.exports =userRouter;