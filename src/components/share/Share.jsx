import "./share.css";
import {ArrowForwardRounded, Cancel, PermMedia} from "@material-ui/icons"
import { AuthContext } from "../../context/AuthContext";
import { useContext, useRef, useState } from "react";
import axios from "axios";
import  { useNavigate } from 'react-router-dom'
export default function Share() {
	const {user} = useContext(AuthContext);
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const desc = useRef();
	const [file, setFile] = useState(null);
	const history = useNavigate();
	const submitHandler = async (e) => {
		e.preventDefault();
		console.log(desc.current.value);
		console.log(file);
		const newPost = {
			userId: user._id,
			desc: desc.current.value,
			
		}
		if (file) {
			const data = new FormData();
			const fileName = Date.now() + file.name;
			data.append("name", fileName);
			data.append("file", file);
			newPost.img = fileName;
			console.log(newPost);
			try {
			  await axios.post("/upload", data);
			} catch (err) {}
		  }
		try {
			const res = await axios.post("/posts", newPost);
			console.log(res);
			history('/profile/'+user.username); 
		} catch (err) {
			console.log(err);

		}
	}

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            } alt="" />
          <div className="inputShare">
          <input
            placeholder={"What's new, "+ user.username+ "?"}
            className="shareInput"
			ref={desc}
          />
		  
		  <form className="shareBtn" onSubmit={submitHandler}>
		  <div className="shareOptions">
		  <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="white" className="shareIcon" />
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
				onChange={(e) => setFile(e.target.files[0])}
              />
            </label>

            <button className="shareButton" type="submit">
              <ArrowForwardRounded className="arrow"/>
            </button>
			</div>
			</form>
          </div>
        </div>
      </div>
        <div className="shareBottom">
		   {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
		</div>
    </div>
  );
}
