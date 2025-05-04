import jwt from "jsonwebtoken";
 export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.SELLER_EMAIL &&
      password === process.env.SELLER_PASSWORD
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.cookie("sellerToken",token,{  httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,})
        
        return res.json({status:true,message:"logged in"})
    }else
        return res.json({status:false,message:"invalid crediantials"})
    }
    
   catch (error) {
    return res.json({message: error.message})
  }

};