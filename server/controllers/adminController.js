import jwt from "jsonwebtoken";
import Blog from "../models/blog.js";
import Comment from "../models/comment.js";
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email != process.env.ADMIN_EMAIL ||
      password != process.env.ADMIN_PASSWORD
    ) {
      res.json({
        success: false,
        message: "Invaid Credentails",
      });
    }
    console.log(email);
    console.log(password);

    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY);
    res.json({
      success: true,
      token,
    });
  } catch (e) {
    res.json({
      success: false,
      message: e.message,
    });
  }
};

export const getAllBlogsAdmin=async(req,res)=>{

    try{
        const blogs=await Blog.find({}).sort({createdAt:-1});


        res.json({
            success:true,blogs
        })
    }

    catch(error){
        res.json({
            success:false,message:error.message
        })
    }
}

export const getAllComments=async(req,res)=>{

    try{
        const comments=await Comment.find({}).populate("blog").sort({createdAt:-1});


        res.json({
            success:true,comments
        })
    }

    catch(error){
        res.json({
            success:false,message:error.message
        })
    }
}

export const getDashboard=async(req,res)=>{
    try{
        const recentBlogs=await Blog.find({}).sort({createdAt:-1}).limit(5);
        const blogs=await Blog.countDocuments();
        const comments=await Comment.countDocuments();
        const drafts=await Blog.countDocuments({isPublished:false});

        const dashboardData={
            blogs,comments,drafts,recentBlogs
        }

        res.json({success:true,dashboardData})
    }
    catch(error){
        res.json({
            success:false,message:error.message
        })
    }
}


export const deleteCommentById=async(req,res)=>{
    try{
        const {id}=req.body;

        await Comment.findByIdAndDelete(id);
        res.json({success:true,message:"comment deleted!"})
    }
    catch(error){
        res.json({
            success:false,message:error.message
        })
    }
}

export const approveCommentById=async(req,res)=>{
    try{
        const {id}=req.body;

        await Comment.findByIdAndUpdate(id,{isApproved:true});
        res.json({success:true,message:"comment approved successfully!"})
    }
    catch(error){
        res.json({
            success:false,message:error.message
        })
    }
}

