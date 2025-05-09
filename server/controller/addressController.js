import addressModel from "../models/address.js"


export const addAddress = async(req,res)=>{
    try {
        const address = new addressModel(req.body)
        const savedAddress = await address.save()
        res.json({status:true, message: savedAddress})
    } catch (error) {
        console.log(error.message)
        res.json({status:false,message:error.message})    
    }
}

export const getAddress = async(req,res)=>{
    try {
        const {userId} = req.body
        const addresses =await addressModel.find({userId})
        res.json({status:true, message:addresses})
    } catch (error) {
        console.log(error.message)
        res.json({status:false,message:error.message}) 
    }
}