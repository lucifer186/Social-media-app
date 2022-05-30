const router = require('express').Router();
const Post = require('../models/Post')
// const User = require('../models/User')
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { default: mongoose } = require('mongoose');

//create a post
router.post('/', async(req,res)=>{
  const newPost = new Post(req.body)
  try{
      const savedPost = await newPost.save()
      res.status(200).json(savedPost)

  }catch(err){
      return res.status(500).json(err)
  }
})

//update a posts

router.put('/:id', async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        if(post.userId === req.body.userId){
            await post.updateOne({$set:req.body})
            res.status(200).json('post has been updated')
    
        }else{
            res.status(403).json('You can uodate onlu yur posts')
        }
    }catch(err){
        return res.status(500).json(err)
    }
   
})

router.delete('/:id/delete', async (req,res)=>{
  console.log("hi")
  try{
    const post = await Post.findById(req.params.id)
    // if(post.userId === req.body.userId){
      await post.deleteOne({_id : new mongoose.ObjectId(req.params.id)})
      res.status(200).json('post has been delete')
      console.log("hi2")
    
        // }else{
        //     res.status(403).json('Something error')
        // }
    }catch(err){
        return res.status(500).json(err)
    }
   
})


router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
  });

  router.get("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  });


  router.get("/timeline/:userId", async (req, res) => {

    try{
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
          currentUser.followings.map((friendId) => {
            return Post.find({ userId: friendId });
          })
        );
        res.status(200).json(userPosts.concat(...friendPosts))
    }catch(err){
        res.status(500).json(err);
    }

  })


  
  router.get("/profile/:username", async (req, res) => {
    try {
      const user = await User.findOne({ username: req.params.username });
      const posts = await Post.find({ userId: user._id });
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router