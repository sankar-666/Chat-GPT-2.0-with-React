import React from 'react'
import '../normalise.css'
import { useState } from 'react'
import ChatMessage from './ChatMessage';

const Banner = () => {

    const[input, setinput] = useState("");
    const[chatlog, setChatlog] = useState([
        {
            user:"gpt",
            message:"How can I help you today?"
        },
        {
            user:"me",
            message:"I want some Help"
        }
    ]);


    const handleSubmit = async (e) => {
            e.preventDefault();
            setChatlog([...chatlog,{ user:"me",message: `${input}` }])
            setinput("");

            const response = await fetch("http://localhost:3080",{
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify({
                    message:chatlog.map((message) => message.message).join("")
                })
            });

            const data = await response.json();
            setChatlog([...chatlog,{ user:"gpt",message: `${data.message}` }])
            console.log(data.message);
            
    }


  return (
    <div className='main'>
        <aside className='sidemenu'>
            <div className="new-menu-button">
                <span>+</span>New Chat
            </div>
        </aside>
        <section className='chatbox'>
            <div className="chat-log">
                {chatlog.map((message,index)=>(
                    <ChatMessage key={index} message={message} />
                ))}
          
            </div>
            <div className="chat-input-holder">
                <form action="" onSubmit={handleSubmit}>
                <input value={input} onChange={(e)=>{setinput(e.target.value) }} name="" className='chat-input-textarea' id="" rows="1" ></input>
                </form>
            </div>
        </section>
      
    </div>
  )
}

export default Banner
