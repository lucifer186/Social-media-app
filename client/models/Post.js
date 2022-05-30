const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String
    },
    img: {
      type: String
    },

    likes: {
      type: Array,
      default: [],
    }

  }
);

PostSchema.set('timestamps', true)
module.exports = mongoose.model("Post", PostSchema);
