import React from "react";
import "./NavSlidebar.css";



import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@material-ui/icons";

import Friends from "../components/Friends/Friends";
import Navbar from "../components/navebar/Navbar";

export default function Navsidebar() {
  return (
    <>
    <Navbar/>
    <div class="backdrop"></div>
    <div className="navslidebar">
      <div className="slideWrapper">
        <ul className="navslidebarlist">
          <li className="navsidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="slidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button  className="sidebarbutton">Show More</button>
        <hr className="sidebarHr" />
      <ul className="navsidebarfriendlist">
            <Friends />    
      </ul>
      </div>
    </div>
    </>
  );
}
