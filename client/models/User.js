const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    desc:{
      type:String,
      
  },
  city:{
      type:String,
    
  },
  from:{
      type:String,
    
  },
  relationship:{
      type:Number,
      enum:[1,2,3]
  },
    followers: { type: Array, default: [] },
    followings: { type: Array, default: [] },
    isAdmin: { type: Boolean, default: false },
  

  }
);

UserSchema.set('timestamps', true)
module.exports = mongoose.model("Myuser", UserSchema);
