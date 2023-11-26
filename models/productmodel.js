import mongoose from "mongoose";

const productschema = new mongoose.Schema({
    category:{
        type:mongoose.ObjectId,
        ref:"Category",
        required:true
    },

    userID:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'users',
    },
    title:{
        type:String,
      //   required:true,
        trim:true
    },

    slug:{
      type:String,
      // required:true
    },

    price:{
        type:Number,
      //   required:true,
     },

     quantity:{
        type:Number,
      //   required:true,
     },
     date:{
        type:String,
      //   required:false
     },
     image: {
        data:Buffer ,
        contentType:String

     },

     discription: {
        type:String,
      //   required:true
     },

     address: {
        type:String,
      //   required:true
     },
     state: {
        type:String,
      //   required:true
     },
     district: {
        type:String,
      //   required:true
     }

     

},{timestamps:true})

export default mongoose.model('product',productschema)