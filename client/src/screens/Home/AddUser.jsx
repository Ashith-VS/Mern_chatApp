import React from 'react'
import avatarIcon from "../../assets/icons/avatar.png"


const AddUser = () => {
  return (
    <div className="addUser">
        <form>
            <input type="text" placeholder="Enter username" name='username' />
            <button>Search</button>
        </form>
        <div className="user">
            <div className="detail">
                <img src={avatarIcon} alt="" />
                <span>User name</span>
            </div>
            <button>Add User</button>
        </div>
    </div>
  )
}

export default AddUser