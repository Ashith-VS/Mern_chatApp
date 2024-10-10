import React, { useEffect, useRef, useState } from 'react'
import avatarIcon from '../../assets/icons/avatar.png'
import phoneIcon from '../../assets/icons/phone.png'
import videoIcon from '../../assets/icons/video.png'
import infoIcon from '../../assets/icons/info.png'
import imgIcon from '../../assets/icons/img.png'
import cameraIcon from '../../assets/icons/camera.png'
import micIcon from '../../assets/icons/mic.png'
import emojiIcon from '../../assets/icons/emoji.png'
import EmojiPicker from 'emoji-picker-react';

const Chat = () => {
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [message, setMessage] = useState('');

  const endref = useRef(null)

  useEffect(() => {
    endref.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const handleEmojiClick = (e) => {
    setMessage((prev) => prev + e.emoji)
    setEmojiOpen(false);
  }

  return (
    <div className='chat'>

      <div className="top">
        <div className="user">
          <img src={avatarIcon} alt="" />
          <div className="texts">
            <span>Username</span>
            <p>Lorem ipsum dolor sit amet consectetur.</p>
          </div>
        </div>
        <div className="icons">
          <img src={phoneIcon} alt="" />
          <img src={videoIcon} alt="" />
          <img src={infoIcon} alt="" />
        </div>
      </div>

      <div className="center">
        <div className="message">
          <img src={avatarIcon} alt="" />
          <div className="texts">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio in labore quibusdam aliquam accusamus consequuntur corporis necessitatibus recusandae aspernatur sequi!</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio in labore quibusdam aliquam accusamus consequuntur corporis necessitatibus recusandae aspernatur sequi!</p>
            <span>12:00 PM</span>
          </div>
        </div>
        <div className="message">
          <img src={avatarIcon} alt="" />
          <div className="texts">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio in labore quibusdam aliquam accusamus consequuntur corporis necessitatibus recusandae aspernatur sequi!</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <img src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio in labore quibusdam aliquam accusamus consequuntur corporis necessitatibus recusandae aspernatur sequi!</p>
            <span>1 min ago</span>
          </div>
        </div>

        <div ref={endref}></div>

      </div>

      <div className="bottom">
        <div className="icons">
          <img src={imgIcon} alt="" />
          <img src={cameraIcon} alt="" />
          <img src={micIcon} alt="" />
        </div>
        <input type="text" placeholder='Type a Message...' value={message} onChange={(e) => setMessage(e.target.value)} />
        <div className="emoji">
          <img src={emojiIcon} alt="" onClick={() => setEmojiOpen(!emojiOpen)} />
          <div className="picker">
            <EmojiPicker open={emojiOpen} onEmojiClick={handleEmojiClick} />
          </div>
        </div>
        <button className='sendButton'>Send</button>
      </div>

    </div>
  )
}

export default Chat