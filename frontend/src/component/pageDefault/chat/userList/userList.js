import React, { useState } from 'react';
import './userList.css';
import store from '../../../../commonJS/store';

class UserListChat extends React.Component{
    constructor(){
        super();
        this.state = {
            dataUser : []
        }
    }
    render(){
        return (
            <div className='leftContainer'>
                <div className='searchUser'>
                    <input className='inputSearchName' type={'text'} placeholder="Search User .... "></input>
                </div>
                <div className='containerUser'>
                    {
                        this.state.dataUser.map(x=>{
                            return <div className='itemChat' key={x.idSocket}>
                                        <div className='status online'></div>
                                        <span className='userNameChat'>{x.name}</span>
                                    </div>
                        })
                    }
                </div>
                
            </div>
        )
    }

    componentDidMount(){
        this.init(store.getState().socketSlice.sk);
    }

    init = (sk) =>{
        if(sk){
           sk.emit("getAllUsers",null);
           sk.on('users',data=>{
            this.setState({dataUser : data});
          });
          sk.on('newUsers',data=>{
            this.setState({dataUser : data});
          })
        }else{
            setTimeout(x=>{this.init(store.getState().socketSlice.sk)},200)
        }
    }
}

export default UserListChat;