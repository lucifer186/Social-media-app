const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    conversationId:{
        type:String
    },
    sender:{
   type:String,
    },
    text:{
        type: String
    }

  }
);

MessageSchema.set('timestamps', true)
module.exports = mongoose.model("Meesage", MessageSchema );