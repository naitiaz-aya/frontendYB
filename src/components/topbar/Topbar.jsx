import "./topbar.css";
import {
  SearchRounded,
  HomeOutlined,
  ChatBubbleOutlineRounded,
  NotificationsNoneOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
//   const logout = () => {
//     localStorage.clear();
//     // window.location.href = "/";
//   };
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">YB</span>
        </Link>
        <div className="searchbar">
          <SearchRounded className="searchIcon" />
          <input placeholder="Search in YouBook" className="searchInput" />
        </div>
      </div>

      <div className="topbarCenter">
        <div className="topbarLinks">
          <Link to="/" style={{ textDecoration: "none" }}>
            <HomeOutlined />
          </Link>
          <div className="topbarIconItem">
            <Link to="/messenger" style={{ textDecoration: "none" }}>
              <ChatBubbleOutlineRounded />
            </Link>
          </div>
          <div className="topbarIconItem">
            <NotificationsNoneOutlined />
          </div>
          <div className="topbarIconItem"></div>
        </div>
      </div>
      <div className="topbarRight">
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
	  {/* <Link to="/" style={{ textDecoration: "none" }}>
          
		  <div  onClick={logout()}>
          LOGOUT
		  </div>
        </Link> */}
      
		</div>
    </div>
  );
}
