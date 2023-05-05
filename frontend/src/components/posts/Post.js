import React, { useState, useEffect, useContext } from "react";
import { MoreVert } from "@material-ui/icons";
import { axiosInstance } from "../../config";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
// import axios from "axios";


import "./Post.css";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isliked, setIsLikeed] = useState(false);
  
  const [user, setUser] = useState({});
  const P_F = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user: currentUser } = useContext(AuthContext);

  

  useEffect(() => {
    setIsLikeed(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);


  useEffect(() => {
    const fecthUser = async () => {
      const response = await axiosInstance.get(`/user?userId=${post.userId}`);
      // console.log(response)
      setUser(response.data);
    };

    fecthUser();
  
  }, [post.userId]);

  
  const deletePostHandler = async()=>{
    console.log(post._id, currentUser._id);
    try{
        await axiosInstance.delete('/posts/' + post._id +'/delete');
     
        window.location.reload()
        console.log("hello");
      
    
    }catch(err){
      console.log(err);
    }
 }


  const likeHandler = () => {
   
    try {
      axiosInstance.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}
    setLike(isliked ? like - 1 : like + 1);
    setIsLikeed(!isliked);
  
  };
  return (
    <div className="post">
      <div className="wrapper">
        <div className="top">
          <div className="posttopleft">
            <Link to={`/profile/${user.username}`}>
              <img
                src={
                  user.profilePicture
                    ? P_F + user.profilePicture
                    : P_F + "person/noAvatar.png"
                }
                alt=""
                className="postprofileimg"
              />
            </Link>
            <span className="postUserName">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="posttopright">
            {(!user.username || user.username === currentUser.username) && 
            <Tooltip title="Delete post" placement="top-start">
            
                <MoreVert onClick={deletePostHandler}  style={{cursor:"pointer"}} className ="morevert"/>
            
            </Tooltip>
            }
          </div>
        </div>
        <div className="center">
          <span className="postText" style={{ marginLeft: "12px" }}>
            {post?.desc}
          </span>
          <img src={P_F + post.img} alt="" className="postImage" />
        </div>
        <div className="bottom">
          <div className="postbottopleft">
            <img
              className="likeIcon"
              src={`${P_F}like.png`}
              alt=""
              onClick={likeHandler}
              
            />
           
            <img
            className="likeIcon"
            src={`${P_F}heart.png`}
            alt=""
            onClick={likeHandler}
            />
          
            <span className="postlikeCounter">{like} people like</span>
          </div>
          <div className="postbottopright">
            <span className="postcommentsTex">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
