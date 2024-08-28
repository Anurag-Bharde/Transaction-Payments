const express=require("express")
const app=express()
const zod=require("zod");
const jwt=require("jsonwebtoken")
const { Users } = require("../db");
const JWT_SECRET=require("../config");
const { authMiddleware } = require("./Middleware");


const UserValidSchema=zod.object({
    username:zod.string(),
    password:zod.string(),
    firstName:zod.string(),
    lastName:zod.string()
})

const userRouter=express.Router()

app.use(express.json())
app.post("/Signup",async (req,res)=>{
   const UserIndo=req.body;
   const validUserInfo=UserValidSchema.safeParse(UserIndo);
 
   if(!validUserInfo.success){
    return res.status(404).json({msg:"NOT VALID INFORMATION"})
   }

   const USeRFINDER=await Users.findOne({username:req.body.username})
   if(USeRFINDER){
       return res.status(411).json({msg:"User Already Exists"})
    }
    
    try{ 
        const dbUser=await Users.create({
            username:req.body.username,
            password:req.body.password,
            firstName:req.body.firstName,
            lastName:req.body.lastName
        })
        const userId=Users._id;

   const token=jwt.sign({
    userId:dbUser
   },JWT_SECRET)
}
catch(error){
    if (error.name === 'ValidationError') {
        // Extract the first validation error message
        const field = Object.keys(error.errors)[0]; // The field with validation error
        const message = error.errors[field].message; // The error message
        return res.status(402).json({message})
    }  
    
    return res.status(500).json({msg:"error occured"})
}
   res.status(200).json({msg:"The user data is saved"})

})


const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})
app.post("/SignIn",async (req,res)=> {
    const {success} = signinBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            msg:"Email already taken"
        })
    }
    try{
        const valid=await Users.findOne({username:req.body.username});
    if(!valid){
        return res.status(404).json({msg:"The username is not valid"})
    }
    if(valid.password!==req.body.password){
       return res.status(403).json({msg:"The password is not valid"})
    }
    
    const token=jwt.sign({
        userId:valid._id
    },JWT_SECRET)
    res.status(200).json({token:token})
} catch(error){
    console.log(error);
    return res.status(500).json({msg:"Some error while signin"})
}
})

const updateValid=zod.object({
    password:zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional()
})

app.put("/",authMiddleware,async(req,res)=>{
    const {success}=updateValid.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            msg:"error while updating the information"
        })
    }

    await Users.updateOne(req.body,{
        id:req.userId
    })

    res.json({msg:"Update successful"})
})

app.get("/bulk",async(req,res)=>{
    const filter=req.query.filter || "";

    const users=await Users.find({
        $or:[{
            firstName:{
                "$regex":filter
            }
        },{
            lastName:{
                "$regex":filter
            }
        }]
    })

    res.json({
        user:Users.map(user=>({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }))
    })
})



app.listen(3001);

module.exports =userRouter;