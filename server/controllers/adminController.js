import jwt from "jsonwebtoken"
export const adminLogin=async (req,res)=>{
    try{
            const {email,password}=req.body;

            if(email !=process.env.ADMIN_EMAIL || password!=process.env.ADMIN_PASSWORD){
                res.json({
                    success:false,
                    message:"Invaid Credentails"
                })
            }
            console.log(email);
            console.log(password);

            const token= jwt.sign({email},process.env.JWT_SECRET_KEY)
            res.json({
                success:true,token
            })
    }
    catch(e){
            res.json({
                success:false,message:e.message
            })
    }
}