import React, { useContext } from "react";
import "./Navbar.css";
import { Search, Chat  } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { Link} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Tooltip from "@material-ui/core/Tooltip";
import { Redirect } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";


function Navbar() {
 
 const history = useHistory()

  const { user} = useContext(AuthContext);
  const P_F = process.env.REACT_APP_PUBLIC_FOLDER;


  const logoutButton = () => {
    history.push("/")
    window.localStorage.clear();
    
    window.localStorage.removeItem("user");
    window.location.reload()
    if(user === null)
    {
      <Redirect to ='/login'/>

     
    }
     
  };

  return (
    <div className="navbarr-container">
      <div className="navbar-left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Social Enjoy</span>
        </Link>
      </div>
      <div className="navbar-center">
        <div className="searchbar">
          <Search className="seacrhIcon" />
          <input
            placeholder="Search friends and posts..."
            className="searchInput"
          />
        </div>
      </div>
      <div className="navbar-right">
        <div className="navbarlinks">
              <span onClickCapture={logoutButton} className="navbarlink" >Logout</span>
        </div>
      
        <div className="navbarIcons">
       
          <div className="navbarIcon">
            <Link
              to="/messanger"
              style={{ textDecoration: "none", color: "white" }}
            >
                <Tooltip title="Chats" placement="top-start">
              <Chat className="chatss" />

                </Tooltip>
            </Link>
            <span className="topbarIconBadge">1</span>
          </div>
        
        </div>

        <div className="naveprofile">
          <Link to={`/profile/${user.username}`}>
            <img
              src={
                user.profilePicture
                  ? P_F + user.profilePicture
                  : P_F + "person/noAvatar.png"
              }
              alt=""
              className="navImg"
            />
          </Link>
        </div>

            <div className="menuIcon"  >
              <Link to= "/navsidebar" >
         <MenuIcon style={{    fontSize: "37px",marginLeft: "22px", cursor:"pointer", color: "white"}} className="menu"  />
              </Link>
          </div>
      </div>
    </div>
  );
}

export default Navbar;
