import React,{useState, useEffect, useContext} from "react";
import "./Feed.css";
import Share from "../share/Share";
import { axiosInstance } from "../../config";
import Post from "../posts/Post";
import { AuthContext } from "../../context/AuthContext";
// import axios from 'axios'


export default function Feed({username}) {
  const [posts, setPosts] = useState([])
 const {user} = useContext(AuthContext) 

  useEffect(()=>{
const fecthData = async () => {
  const response = username
        ? await axiosInstance.get("/posts/profile/" + username) :
                       await axiosInstance.get(`posts/timeline/${user._id}`)
  
  setPosts(response.data.sort((p1,p2)=>{
    return new Date(p2.createdAt) - new Date(p1.createdAt)
  }))
}

fecthData()

  },[username, user._id])

  return (
    <div className="feed">
      <div className="feedWrapper">
       { (!username || username === user.username) && <Share />}
        {posts.map((p) => (
            <Post key={p._id}  post={p} />
        ))}
        
      </div>
    </div>
  );
}
