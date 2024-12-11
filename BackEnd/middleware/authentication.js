import jwt from "jsonwebtoken";

const isAuthentic=async(req,res,next)=>{
    try {
        const token=req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:"Unauthorized",
                status:false
            })
        }
        const decode=await jwt.verify(token,process.env.SecretKey);
        if(!decode){
            return res.status(401).json({
                message:"Invalid Token",
                status:false 
            })
        }
        req.id=decode.userId;
        next();
    } catch (error) {
        console.log(error);
    }
}

export default isAuthentic;