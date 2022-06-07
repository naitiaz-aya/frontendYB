import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
// import { Posts } from "../../dummyData";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  // const [text,setText] = useState("");
  const {user} = useContext(AuthContext)
  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get("/posts/profile/"+ username)
        : await axios.get("/posts/timeline/" + user._id);
      setPosts(res.data.sort((a, b) => { return new Date(b.createdAt) - new Date(a.createdAt)}));
	 
    };
    fetchPosts();
  }, [username,user._id]);

  return (
    <div className="feed">
      {/* <input type="text" onChange={e=>setText(e.target.value)}/> */}
      <div className="feedWrapper">
	  {(!username || username === user.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
