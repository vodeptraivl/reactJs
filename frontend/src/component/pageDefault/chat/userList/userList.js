import React, { useState } from 'react';
import './userList.css';

class UserListChat extends React.Component{
    render(){
        return (
            <div className='leftContainer'>
                <div className='searchUser'>
                    <input className='inputSearchName' type={'text'} placeholder="Search User .... "></input>
                </div>
                <div className='containerUser'>
                    <div className='itemChat'>
                        <div className='status online'></div>
                        <span className='userNameChat'>name</span>
                    </div>
                    <div className='itemChat'>
                        <div className='status online'></div>
                        <span className='userNameChat'>name</span>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default UserListChat;