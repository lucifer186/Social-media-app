import React from "react";
import "./Home.css";

import Navbar from "../../components/navebar/Navbar";
import Slidebar from "../../components/slidebar/Slidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";

function Home() {
  return (
    <React.Fragment>
      <Navbar />
      <div className="homecontainer">
        <Slidebar />
        <Feed />
        <Rightbar />
      </div>
    </React.Fragment>
  );
}

export default Home;
