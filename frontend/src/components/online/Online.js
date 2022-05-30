import React from "react";
import "./Online.css";
function Online({users}) {
  const P_F = process.env.REACT_APP_PUBLIC_FOLDER
  return (
    <li className="rightbarfriend">
      <div className="rightbarprofileimagecontainer">
        <img
          src={P_F+users.profilePicture}
          alt=""
          className="rightbarprofileimg"
        />
        <span className="rightbaronline"></span>
      </div>
      <span className="rightbarUseraname">{users.username}</span>
    </li>
  );
}

export default Online;
