import "./sidebar.css";
import {
  RssFeed,
  Chat,
  Bookmark,
} from "@material-ui/icons";
// import { Users } from "../../dummyData";
// import CloseFriend from "../closeFriend/CloseFriend";
import { useEffect, useContext, useState, useRef} from "react";
import { io } from "socket.io-client";
import { AuthContext } from "../../context/AuthContext";
import ChatOnline from "../../components/chatOnline/ChatOnline";
export default function Sidebar() {
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { user } = useContext(AuthContext);
	const socket = useRef();
	useEffect(() => {
		socket.current = io("ws://localhost:8900");
		socket.current.emit("addUser", user._id);
		socket.current.on("getUsers", (users) => {
		  setOnlineUsers(
			user.followings.filter((f) => users.some((u) => u.userId === f))
		  );
		});
	  }, [user]);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
         
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
        </ul>
        <hr className="sidebarHr" />
		<h4 className="rightbarTitle">Online Friends</h4>
		<ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
            //   setCurrentChat={setCurrentChat}:
            />
      </div>
    </div>
  );
}
