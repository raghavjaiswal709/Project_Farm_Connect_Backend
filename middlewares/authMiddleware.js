import JWT from "jsonwebtoken";
import usermodel from "../models/usermodel.js";


//protected routes

export const requireSignIn = async(req,res,next)=>{

    try {
        const decode = JWT.verify(
            req.headers.authorization, 
            process.env.JWT_SECRET);

            req.user=decode;
        next()

    } catch (error) {
        console.log(error);
    }
}

//wholeseller acess
 export const isWholeseller =async(req,res,next)=>{
    try {
        const user = await usermodel.findById(req.user._id)
        if(user.role === "1"){
            return res.status(200).send({
                success:true,
                message:"you are wholeseller"
            })
        }else{
            next()
        }
    } catch (error) {
        console.log(error);
        res.send(401).send({
            success:false,
            error,
            message:'error in admin middleware'
        })

    }
    }


  //  farmer acess

 export const isFarmer =async(req,res,next)=>{
    try {
        const user = await usermodel.findById(req.user._id)
        if(user.role === "0"){
            return res.status(200).send({
                success:true,
                message:"you are a farmer"
            })
        }else{
            next()
        }
    } catch (error) {
        console.log(error);
        res.send(401).send({
            success:false,
            error,
            message:'error in admin middleware'
        })

    }
    }
 