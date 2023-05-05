import React, { useState, useEffect, useContext } from "react";
import "./Profile.css";
import { axiosInstance } from "../../config";
import Navbar from "../../components/navebar/Navbar";
import Slidebar from "../../components/slidebar/Slidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import  IconButton  from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import {Link} from 'react-router-dom'
import Tooltip from '@material-ui/core/Tooltip'
// import axios from "axios";



export default function Profile() {
  const P_F = process.env.REACT_APP_PUBLIC_FOLDER;

  const [user, setUser] = useState({});
  const {user:currentUser} = useContext(AuthContext) 

  const username = useParams().username;




  useEffect(() => {
    const fecthUser = async () => {
      const response = await axiosInstance.get(`/user?username=${username}`);
   
      setUser(response.data);
    };

    fecthUser();
   
  }, [username,user]);

  return (
    <React.Fragment>
      <Navbar />
      <div className="profile">
        <Slidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? P_F+user.coverPicture
                    : P_F + "person/noCover.png"
                }
                alt=""
              />
              <div className="image-wrapper" >

              <img
                className="profileUserImg"
                src={ user.profilePicture
                  ? P_F + user.profilePicture : P_F + "person/noAvatar.png"}
                alt=""
                />
                
                 {(!user.username || user.username === currentUser.username) &&
               <Tooltip title="Edit profile" placement="top-start"  style={{marginLeft: "15vh",
                display: "flex",
                justifyContent: "center"}} className="editprofile" >
                   <Link to='/edit-profile'>
                <IconButton  className="iconButton" >
                  <EditIcon/>
                </IconButton>
                 </Link>
               </Tooltip>
                }
        
            
                </div>
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
