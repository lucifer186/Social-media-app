import { axiosInstance } from "../../config";
import React, { useEffect, useState } from "react";
import "./Conversation.css";
// import axios from "axios";

export default function Conversation({ conversation, currentUser }) {
  const P_F = process.env.REACT_APP_PUBLIC_FOLDER;

  const [user, setUser] = useState([]);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axiosInstance.get("/user?userId=" + friendId);
       
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conersation">
      <img
        className="conversationImg"
        src={
          user.profilePicture
            ? P_F + user.profilePicture
            : P_F + "person/noAvatar.png"
        }
        alt=""
      />
      <span className="converstaionName">{user.username}</span>
    </div>
  );
}
