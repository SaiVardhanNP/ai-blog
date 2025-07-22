import fs from "fs";
import imagekit from "../config/imagekit.js";
import Blog from "../models/blog.js";
import Comment from "../models/comment.js";
import main from "../config/gemini.js";
export const addBlog=async(req,res)=>{
    try{
            const {title,subTitle,authorName,description,category,isPublished}=JSON.parse(req.body.blog);
            const imageFile=req.file;


            if(!title ||!authorName || !description || ! category || !category || !imageFile){
                return res.json({
                    success:false, message:"fields are missing!"
                })
            }

            const fileBuffer=fs.readFileSync(imageFile.path);
            const response=await imagekit.upload({
                file:fileBuffer,
                fileName:imageFile.originalname,
                folder:"/blogs"
            })

            const optimizedImageUrl=imagekit.url({
                path:response.filePath,
                transformation:[
                    {quality:"auto"},
                    {
                        format:"webp",
                        
                    },
                    {width:'1280'}
                ]
            })


            const image=optimizedImageUrl;
            console.log(image);

            await Blog.create({title,subTitle,authorName,description,category,image,isPublished})


            res.json({
                success:true,
                message:"Blog added successfully"
            })

    }
    catch(e){
        res.json({
            success:false,message:e.message
        })
    }
}

export const getAllBlogs=async(req,res)=>{
    try{
        const blogs=await Blog.find({isPublished:true});
        res.json({success:true,blogs});
    }
    catch(error){
        res.json({
            success:false,message:error.message
        })
    }
}

export const getBlogById=async(req,res)=>{
    try{
        const {blogId}=req.params;

        const blog=await Blog.findById({_id:blogId})

        if(!blog){
            return res.json({success:false,message:"Blog not found"})
        }
        res.json({success:true,blog})
    }
    catch(error){
        res.json({
            success:false,message:error.message
        })
    }
}

export const deleteBlogById=async(req,res)=>{
    try{
        const {blogId}=req.body;

        await Blog.findByIdAndDelete({_id:blogId})
        await Comment.deleteMany({blog:blogId})

       
        res.json({success:true,message:"blog deleted successfully!"})
    }
    catch(error){
        res.json({
            success:false,message:error.message
        })
    }
}

export const togglePublish=async(req,res)=>{
    try{
        const {blogId}=req.body;
        const blog=await Blog.findById(blogId);
        console.log(blog);
        blog.isPublished=!blog.isPublished;

        await blog.save();

        res.json({success:true,message:"Blog status updated!"})
    }
    catch(error){
        res.json({success:false,message:error.message});
    }
}


export const addComment=async(req,res)=>{
    try{
            const {blog,name,comment}=req.body;

            await Comment.create({
                blog,name,comment
            })

            res.json({
                success:true,message:"Comment added for review!"
            })
    }
    catch(error){
        res.json({success:false,message:error.message});
    }
}

export const getAllComments=async(req,res)=>{
    try{
            const {blogId}=req.body;

const comments = await Comment.find({ blog: blogId, isApproved: true })
  .populate('blog')
  .sort({ createdAt: -1 });
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


export const generateContent=async(req,res)=>{
    try{
        const {prompt}=req.body;
const content = await main(`${prompt} - Generate a blog content for this topic in simple text format without any introductory sentence or paragraph. Keep it direct and topic-focused.`);        res.json({success:true,content})
    }
    catch(error){
            res.json({
                success:false, message:error.message
            })
    }
}