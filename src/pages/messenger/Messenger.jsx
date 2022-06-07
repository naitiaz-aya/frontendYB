import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import SendIcon from "@material-ui/icons/Send";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const { user } = useContext(AuthContext);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const scrollRef = useRef();
  const socket = useRef();
  
  useEffect(()=> {
	  scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  },[messages])

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(()=>{
	const getMessages = async () => {
		try {
			const res = await axios.get("/messages/" + currentChat?._id);
			setMessages(res.data);
		}catch(err){
			console.log(err);
		}
	}
	getMessages();
  },[currentChat]);
//   console.log(messages);

  const handleSubmit = async (e) => {

	e.preventDefault();
	const message ={
		text: newMessage,
		createdAt: new Date(),
		sender: user._id,
		conversationId: currentChat?._id,
	}
	const receiverId = currentChat.members.find(
		(member) => member !== user._id
	  );
  
	  socket.current.emit("sendMessage", {
		senderId: user._id,
		receiverId,
		text: newMessage,
	  });
	try{
		const res = await axios.post("/messages", message);
		setMessages([...messages, res.data]);
		setNewMessage("");
	}catch(err){
		console.log(err);
	}
  }


	// console.log(socket)
	useEffect(() => {
		socket.current = io("ws://localhost:8900");
		socket.current.on("getMessage", (data) => {
		  setArrivalMessage({
			sender: data.senderId,
			text: data.text,
			createdAt: Date.now(),
		  });
		});
	  }, []);
	
	  useEffect(() => {
		arrivalMessage &&
		  currentChat?.members.includes(arrivalMessage.sender) &&
		  setMessages((prev) => [...prev, arrivalMessage]);
	  }, [arrivalMessage, currentChat]);
	
	  useEffect(() => {
		socket.current.emit("addUser", user._id);
		socket.current.on("getUsers", (users) => {
		  setOnlineUsers(
			user.followings.filter((f) => users.some((u) => u.userId === f))
		  );
		});
	  }, [user]);


  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((c) => (
				<div onClick={() => setCurrentChat(c)}>
              <Conversation conversation={c} currentUser={user} />
			  </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
		  {currentChat ? (
			  <>
            <div className="chatBoxTop">
				{messages.map((m) => (
					<div ref= {scrollRef}>
						<Message message={m} own={m.sender === user._id}  />
					</div>
			))}
            </div>
		
            <div className="chatBoxBottom">
              <textarea
                placeholder="Type a message"
                className="chatMessageInput"
				onChange={(e) => setNewMessage(e.target.value)}
				value={newMessage}
              />
              <button className="chatSubmitButton" onClick={handleSubmit}>
                <SendIcon />
              </button>
            </div>
			  </>
		  ) : (
			<span className="noConversationText">
			Open a conversation to start a chat.
		  </span>
		  )}
          </div>
        </div>

        <div className="chatOnline">
          <div className="chatOnlineWrapper">
		  <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
}
