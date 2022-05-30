import React, { useContext } from 'react'
import './Message.css'
import { format } from 'timeago.js'
import { AuthContext } from '../../context/AuthContext';

export default function Message({ messages, own}) {
   const {user} = useContext(AuthContext)
  const P_F = process.env.REACT_APP_PUBLIC_FOLDER;
  

  return (
    <div className={own ? "message own":"message"} >
        <div className='messageTop'>
          {
            own ?  <img src={
              user.profilePicture
                ? P_F + user.profilePicture
                : P_F + "person/noAvatar.png"
            } alt=''className='messageImg'/>:  <img src={
             P_F + "person/noAvatar.png"
            } alt=''className='messageImg'/>
          }
           
            <p className='messageText'>{messages.text}</p>
        </div>
        <div className='messageBootom'>{format(messages.createdAt)}</div>
    </div>
  )
}
