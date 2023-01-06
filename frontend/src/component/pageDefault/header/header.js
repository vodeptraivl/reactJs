
import React, { useState } from 'react';
import './header.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import crown from './crown.png';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser } from "@fortawesome/free-solid-svg-icons";
import user from './user.png';
import {  } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import store from '../../../commonJS/store';
import { setSearchWar } from '../../../commonJS/commonSlice';

library.add(faUser)
class Header extends React.Component{
    constructor(){
        super();
        this.state = {
            logout : false,
            login : false,
            search:''
        }
    }
    render(){
        return(
            <div className='headerTemplate'>
                <div className='gridHeader'>
                    <div className='logo'>
                        <img src={crown} style={{width:'30px'}}></img>
                    </div>
                    <div className='headerSearchCtn'>
                        <input type={'text'} className='searchInput' placeholder='search...' value={this.state.search} onChange={($event)=>{this.change($event)}}></input>
                    </div>
                    <div className='infoCtn'>
                        <div className='userLogo'>
                            <div className='imgUser'>
                                {
                                    store.getState().userInfo.isLogin == true ? <img src={user} style={{width:'40px'}} onClick={this.logout}></img> : <FontAwesomeIcon icon={['fas','fa-user']} style={{color:'#4267B2',fontSize:'18px'}} onClick={() => this.setState({login:true})}/>
                                }
                            </div>
                        </div>
                    </div>
                    {
                        this.state.login && <Navigate to={"/dangnhap"}/>
                    }
                </div>
            </div>
        )
    }

    logout = () => {
        localStorage.removeItem("userInfo");
        window.location.href = "/";
    }

    change = ($e) =>{
        this.setState({search : $e.target.value})
        store.dispatch(setSearchWar({searchWar : this.state.search}));
    }
    
}
export default Header;