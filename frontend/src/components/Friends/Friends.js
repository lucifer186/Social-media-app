import React,{useState, useEffect} from "react";
import "./Friends.css"
import { axiosInstance } from "../../config";
import {Link} from 'react-router-dom'
// import axios from "axios";


function Friends() {
  const P_F = process.env.REACT_APP_PUBLIC_FOLDER
 
  const [user, setUser] = useState([]);

  useEffect(() => {
        const getUser = async () => {
      try {
        const res = await axiosInstance.get("/user/allUsers");
     
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);
  return (
    <li className="sidebarfriend">
      {user.map((u)=>(
       
        <div className="userFriends" >
          <Link to ={`/profile/${u.username}`} style={{ textDecoration: "none" , color:"black" }}>
          
        <img className="sidebarfriendimage" src={u?.profilePicture ? P_F+u.profilePicture : P_F+"person/noAvatar.png"} alt="" />
      <span className="friendName"> {u.username}</span>
          </Link>
        </div>
       ))}
    </li>
  );
}

export default Friends;
