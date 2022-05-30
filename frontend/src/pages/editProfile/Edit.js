import { axiosInstance } from "../../config";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../components/navebar/Navbar";
import "./Edit.css";
import { useHistory } from 'react-router-dom'
export default function Edit() {
  const { user: currentuser } = useContext(AuthContext);

  const [city, setCity] = useState('');
  const [desc, setDesc] = useState('');
  const [from, setFrom] = useState('');
  const [relationship, setRelationship] = useState('');
  const [coverPicture, setCprofile] = useState(null);
  const [ profilePicture, setProfile] = useState(null);

  const history = useHistory()

  const submitHandler = async (e) => {
      const updateaprofile={
          userId:currentuser._id,
          city,
          desc,
          from,
          relationship,
         
      }
      if( coverPicture){
        const data = new FormData();
        const fileName = Date.now() + coverPicture.name;
  
        data.append("name", fileName);
        data.append("file", coverPicture);
  
        updateaprofile.coverPicture = fileName;
        try {
          axiosInstance.post("/upload", data);
        } catch (err) {
          console.log(err);
        }
      }
      if( profilePicture){
        const data = new FormData();
        const fileName = Date.now() + profilePicture.name;
  
        data.append("name", fileName);
        data.append("file", profilePicture);
  
        updateaprofile.profilePicture = fileName;
        try {
          axiosInstance.post("/upload", data);
        } catch (err) {
          console.log(err);
        }
      }

    e.preventDefault();
    try {
      await axiosInstance.put(`/user/${currentuser._id}`,updateaprofile);
  
    history.push(`/profile/${currentuser.username}`)
    } catch (err) {
      console.log(err);
    }
  };
 
  return (
    <React.Fragment>
      <Navbar/>
      <div className="edit-profile">
           <div className="editWrapper">
         
      <div className="fromsubmission">
      <h2>Edit Profile:</h2>
          <hr/>
        <form className="formBox1"
          method="POST"
          encType="multipart/form-data"
          onSubmit={submitHandler}
        >
          <label htmlFor="city">City:</label>
          <input
            type="text"
            placeholder={currentuser.city}
            id="city"
            name="city"
            value={city}
            onChange= {(e)=>setCity(e.target.value)}
            className="editInput"
          />
          <label htmlFor="city">About yourself: :</label>
          <input
            type="text"
            placeholder={currentuser.desc}
            id="city"
            name="city"
            value={desc}
            onChange= {(e)=>setDesc(e.target.value)}
            className="editInput"
          />
          <label htmlFor="from">From:</label>
          <input
            type="text"
            placeholder={currentuser.from || "Where are you from (Place name)"}
            id="from"
            name="from"
            value={from}
            onChange= {(e)=>setFrom(e.target.value)}
            className="editInput"
          />
          <label htmlFor="re">Relationship:</label>
          <input
            type="number"
            placeholder="Please select 1 ,2 and 3!!"
            id="re"
            name="re"
            value={relationship}
            onChange= {(e)=>setRelationship(e.target.value)}
            className="editInput"
          />
          <label htmlFor="file">Profile Picture</label>
          <input
            type="file"
            id="file"
            name="file"
            placeholder="profilePicture"
          
            onChange= {(e)=>setProfile(e.target.files[0])}
            className="editInput"
           
          />
          <label htmlFor="coverfile">Cover Picture</label>
          <input
            type="file"
            id="coverfile"
            name="coverfile"
            placeholder="coverPicture"
          
            onChange= {(e)=>setCprofile(e.target.files[0])}
            className="editInput"
          />
          <input type="hidden" name="userId " value={currentuser._id}></input>
         
          <button type="submit" className="editButton"> Update </button>
        </form>
        </div>
        </div>
      </div>
    </React.Fragment>
  );
}
