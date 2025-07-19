import jwt from "jsonwebtoken";


const auth=(req,res,next)=>{
    const token=req.headers.token;

    try{
            jwt.verify(token,process.env.JWT_SECRET_KEY);
            next();
    }
    catch(e){
        res.json({
            success:false,message:e.message
        })

    }

} 

export default auth;