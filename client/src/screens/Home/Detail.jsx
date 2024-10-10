import React from 'react'
import avatarIcon from '../../assets/icons/avatar.png'
import arrowUpIcon from '../../assets/icons/arrowUp.png'
import arrowDownIcon from '../../assets/icons/arrowDown.png'
import downloadIcon from '../../assets/icons/download.png'


const Detail = () => {
  return (
    <div className='detail'>
      <div className="user">
        <img src={avatarIcon} alt="" />
        <h2>User Name</h2>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing.</p>
      </div>

      <div className="info">

        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src={arrowUpIcon} alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & help</span>
            <img src={arrowUpIcon} alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared photos</span>
            <img src={arrowDownIcon} alt="" />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                <span>photo_24.png</span>
              </div>
              <img src={downloadIcon} alt="" className='icon'/>
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                <span>photo_24.png</span>
              </div>
              <img src={downloadIcon} alt="" className='icon'/>
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                <span>photo_24.png</span>
              </div>
              <img src={downloadIcon} alt="" className='icon'/>
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src={arrowDownIcon} alt="" />
          </div>
        </div>
        <button>Block User</button>
        <button className='logout'>LogOut</button>
      </div>
    </div>
  )
}

export default Detail