import React, { useContext, useEffect, useState } from "react";
import "./Rightbar.css";
import { Users } from "../../Dummy";
import Online from "../online/Online";
import { axiosInstance } from "../../config";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";




export default function Rightbar({ user }) {
  const P_F = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser, dispatch } = useContext(AuthContext);

  const [friend, setFriend] = useState([]);
  const [chating, setChating] = useState([]);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?.id)
  );
  
  const chatsHandler = async()=>{
    
      try {
        const frinedList = await axiosInstance.get("/user/friends/" + user._id);
        setChating(frinedList.data);
      } catch (err) {}
    
      chating.map(c=>(
        
       axiosInstance.post('/conversations', {senderId:currentUser._id, receiverId: c._id})
      ))
  

  }



  const followHandler = async()=>{
   try{
    if (followed) {
      await axiosInstance.put(`/user/${user._id}/unfollow`, {
        userId: currentUser._id,
      });
      dispatch({ type: "UNFOLLOW", payload: user._id });
    } else {
      await axiosInstance.put(`/user/${user._id}/follow`, {
        userId: currentUser._id,
      });
      dispatch({ type: "FOLLOW", payload: user._id });
    }
    setFollowed(!followed);

   
   }catch(err){
  console.log(err);
   }

  setFollowed(!followed)

  }

  useEffect(() => {
    const getFrineds = async () => {
      try {
        const frinedList = await axiosInstance.get("/user/friends/" + user._id);
        setFriend(frinedList.data);
      } catch (err) {}
    };
    getFrineds();
  }, [user]);



  const HomeRightbar = () => {
    return (
      <div className="mediaHome">
        <div className="birthdayConatiner">
          <img src="asserts/gift.png" alt="" className="brthdayImgae" />
          <span className="birthdaytext">
            <b>Pola Foster</b> and <b> 3 others friends</b> have a birthday
            today.
          </span>
        </div>
        <div className="fakefriends">

        <img src="asserts/ad.png" alt="" className="rightbarAd" />
        <h4 className="onlinefriends">Online Friends</h4>
        <ul className="rightbarfriendlist">
          {Users.map((u) => (
            <Online key={u.id} users={u} />
            ))}
        </ul>
            </div>
      </div>
    );
  };

  const ProfilePicture = () => {
    return (
      <div className="mediaPicture">
        <div className="userinformation" >
        {user.username !== currentUser.username && (
          <button className="followButton" onClick={followHandler} >
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        { user.username === currentUser.username && (
          <button className="chating" onClick={chatsHandler} >Add friend if you don't</button>
        ) }
        <h4 className="rightbartitle">User Infromation</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        </div>
          
        <div className="userfrineds">
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friend.map((friend) => (
            <Link
              to={`/profile/${friend.username}`}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? P_F + friend.profilePicture
                      : P_F + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span
                  className="rightbarFollowingName"
                  style={{
                    marginLeft: "32px",
                    color: "black",
                    marginTop: "4px",
                    fontWeight: "500",
                  }}
                >
                  {friend.username}
                </span>
              </div>
            </Link>
          ))}
        </div>
        </div>
      </div>
    );
  };
  return (
    <div className="rightbar">
      <div className="wrapper">
        {user ? <ProfilePicture /> : <HomeRightbar />}
      </div>
    </div>
  );
}
