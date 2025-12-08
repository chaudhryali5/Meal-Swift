import jwt from "jsonwebtoken";

const authMiddleware=(req,res,next)=>{
    const {token}=req.headers;
    req.body = req.body || {};
    if(!token){
return res.send({status:false,message:"Not authorized Login again"})
    }
    try {
        const token_decode=jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId=token_decode.id;
        next(); 
    } catch (error) {
        console.log(error);
        res.send({status:false,message:"Something went wrong!"})
        
    }
}   

export default authMiddleware