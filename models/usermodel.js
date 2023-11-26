import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    fname:{
        type:String,
        required:true,
        trim:true
    },
    lname:{
        type:String,
        required:true,
        trim:true
    },

    email:{
        type:String,
        required:true,
        unique:true   
     },

     phone:{
        type:String,
        required:true,
     },
     password:{
        type:String,
        required:true
     },
     role: {
        type: String,
        required:true
        
       
     },
     products:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'product',
     }

     

},{timestamps:true})

export default mongoose.model('users',userschema)