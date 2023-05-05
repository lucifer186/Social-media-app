import React, { useContext, useRef, useState } from "react";
import "./Share.css";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions
} from "@material-ui/icons";
import { AuthContext } from "../../context/AuthContext";
import { axiosInstance } from "../../config";
// import axios from "axios";

export default function Share() {
  const P_F = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;

      data.append("name", fileName);
      data.append("file", file);

      newPost.img = fileName;
      try {
        axiosInstance.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      await axiosInstance.post("/posts", newPost);
       window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={
              user.profilePicture
                ? P_F + user.profilePicture
                : P_F + "person/noAvatar.png"
            }
            alt=""
            className="shareprofileImg"
          />
          <input
            className="shareInput"
            placeholder={
              "Hey!! " + user.username + " write about something interseting.."
            }
            ref={desc}
          />
        </div>
        <hr className="shareHr" />

        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareoptionsText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png, .jpeg, .jpg, .mp4"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
