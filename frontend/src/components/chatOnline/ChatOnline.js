
import { axiosInstance } from "../../config";
import React, { useEffect, useState } from "react";
import "./ChatOnline.css";
// import axios from "axios";

export default function ChatOnline({onlineUsers, currentId, setCurrentChat}) {
   const [friends, setFriends] = useState([]) 
   const [onlineFriends, setOnlineFriends] = useState([]) 

   const P_F = process.env.REACT_APP_PUBLIC_FOLDER;
   
   useEffect(()=>{
     const getFriends = async() =>{
      const res = await axiosInstance.get('/user/friends/'+ currentId);
      setFriends(res.data)
     }

     getFriends()
    },[currentId])
   
     
    useEffect(()=>{
      setOnlineFriends(friends.filter((f)=>  onlineUsers.includes(f._id) ))
    },[friends, onlineUsers])

    const handleClick = async(user)=>{
      try{
         const res = await axiosInstance.get(`/conversations/find/${currentId}/${user._id}`)
         setCurrentChat(res.data)


      }catch(err){console.log(err);}
    }

  return (
    <div className="chatOnline">
      {onlineFriends.map((o)=> (
        <div className="chatOnlineFriend" onClick={()=> handleClick(o)} >
        <div className="chatImageContainer">
          <img className="chatOnlineImg" src={o?.profilePicture ? P_F+o.profilePicture : P_F+"person/noAvatar.png"}alt="" />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">{o.username}</span>
      </div>
          ))}
    </div>
  );
}
