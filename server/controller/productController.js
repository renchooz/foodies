import { json } from "express"
import { v2 as cloudinary } from "cloudinary"
import ProductModel from "../models/Product.js"

export const addProduct = async (req,res)=>{
    try {
       const productData = JSON.parse(req.body.productData)
        const image = req.file
        const uploadResult = await cloudinary.uploader.upload(image.path,{
            resource_type:"image"
        })
        const newProduct = await ProductModel.create({...productData,image:uploadResult.secure_url})
        res.json({status:true,product:newProduct})
    } catch (error) {
        res.send({message:error.message})
        
    }
}