const {JWT_SECRET}= require("../config");
const jwt=require("jsonwebtoken")

function authMiddleware(req,res,next){
    const authheader=req.headers.authorization;

    if(!authheader || authheader.startsWith('Bearer ')){
        return res.status(300).json({msg:"Not proper Auth"});
    }
    const token=authheader.split(" ")[1];

    try{
        const decoded=jwt.verify(token,JWT_SECRET);

        if(decoded.userId){
        req.userId=decoded.userId;
        next();
        }
        else{
           return res.status(404).json({})
        }
    }catch(err){
        return res.status(403).json({msg:"Auth middleware error"})
    }
}

module.exports={
    authMiddleware
}