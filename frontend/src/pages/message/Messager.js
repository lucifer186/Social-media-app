import React, { useContext, useEffect, useRef, useState } from "react";
import "./Messager.css";
import Navbar from "../../components/navebar/Navbar";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { AuthContext } from "../../context/AuthContext";
import { io } from 'socket.io-client'


import { axiosInstance } from "../../config";

export default function Messager() {
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [online, setOnline] = useState([]);
  const [newMessages, setNewMessages] = useState('');

  const { user } = useContext(AuthContext);
   const socket = useRef(io("ws://localhost:8900"))

  const scrollRef = useRef()

 

  useEffect(()=>{
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
       })
    })
  },[])

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);


 useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnline(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

 

const handlerSubmit= async (e)=>{
    e.preventDefault();

    const message = {
        sender: user._id,
        text: newMessages,
        conversationId: currentChat._id,
      };
  
      const receiverId = currentChat.members.find(
        (member) => member !== user._id
      );
  
      socket.current.emit("sendMessage", {
        senderId: user._id,
        receiverId,
        text: newMessages,
      });
    try{
           
        const res = await axiosInstance.post('/messages/', message)
        setMessages([...messages, res.data])
        setNewMessages('')

    }catch(err){console.log(err)}
}


useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior:"smooth"})
},[messages])

  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await axiosInstance.get("/conversations/" + user._id);
        setConversation(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversation();
  }, [user._id]);


  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axiosInstance.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  },[currentChat]);



  return (
    <React.Fragment>
      <Navbar />
      <div className="messanger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="seacrh friends" className="chatMenuInput" />
            {conversation.map((c) => (
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
                      <div ref={scrollRef} >
                    <Message  key={m._id}  messages={m} own={m.sender === user._id}  />
                      </div>
                  ))}
                </div>
                <div className="chatboxBottom">
                  <textarea
                    placeholder="Message..."
                    className="chatMessage"
                    onChange={(e)=> setNewMessages(e.target.value)}
                    value={newMessages}
                  ></textarea>
                  <button className="chatButton"  onClick={handlerSubmit} >Send</button>
                </div>
              </>
            ) : (
              <span className="noConversation">
                Let's start conversation with new friend!!
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline onlineUsers= {online} currentId={user._id} setCurrentChat={setCurrentChat} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
