import fs from "fs";
import imagekit from "../config/imagekit.js";
import Blog from "../models/blog.js";
export const addBlog=async(req,res)=>{
    try{
            const {title,subTitle,description,category,isPublished}=JSON.parse(req.body.blog);
            const imageFile=req.file;


            if(!title || !description || ! category || !category || !imageFile){
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

            await Blog.create({title,subTitle,description,category,image,isPublished})


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