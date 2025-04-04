import mongoose from "mongoose"

const userSchema=new mongoose.Schema({

  name:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    // required:true
  },
  phoneNumber:{
    type:Number,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  address:{
    type:String,
    required:true
  },
  gender:{
    type:String,
    required:true,
    // enum:["male","female","others"]
  }
})

const User=mongoose.model("user",userSchema)
export default User