import React, { useState } from 'react'
import Avatar from "../../assets/icons/avatar.png"
import moreIcon from "../../assets/icons/more.png"
import videoIcon from "../../assets/icons/video.png"
import editIcon from "../../assets/icons/edit.png"
import searchIcon from '../../assets/icons/search.png'
import plusIcon from '../../assets/icons/plus.png'
import minusIcon from '../../assets/icons/minus.png'
import avatarIcon from '../../assets/icons/avatar.png'
import AddUser from './AddUser'


const List = () => {
    const [addMode, setAddMode] = useState(false);
  return (
    <div className='list'>
       <div className='userInfo'>
      <div className="user">
        <img src={Avatar} alt="" />
        <h2>{'username'}</h2>
      </div>
      <div className="icons">
        <img src={moreIcon} alt="" />
        <img src={videoIcon} alt="" />
        <img src={editIcon} alt="" />
      </div>
    </div>
      {/* ChatList */}
      <div className='chatList'>
            <div className="search">
                <div className="searchBar">
                    <img src={searchIcon} alt='' />
                    <input type="text" placeholder="Search" />
                </div>
                <img src={addMode? minusIcon :plusIcon} alt="" className='add' onClick={()=>setAddMode(!addMode)} />
            </div>
            <div className="item">
                <img src={avatarIcon} alt=""  />
                <div className="texts">
                    <span>User</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className="item">
                <img src={avatarIcon} alt=""  />
                <div className="texts">
                    <span>User</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className="item">
                <img src={avatarIcon} alt=""  />
                <div className="texts">
                    <span>User</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className="item">
                <img src={avatarIcon} alt=""  />
                <div className="texts">
                    <span>User</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className="item">
                <img src={avatarIcon} alt=""  />
                <div className="texts">
                    <span>User</span>
                    <p>Hello</p>
                </div>
            </div>
        </div>
       {addMode && <AddUser/>}
    </div>
  )
}

export default List