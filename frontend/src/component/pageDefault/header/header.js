
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
import { useSelector } from 'react-redux';

library.add(faUser)
const Header = () => {
    const [logout,setLogout] = useState(false);
    const [login,setLogin] = useState(false);
    const commonSlice = useSelector(state => state.commonSlice) ;
    const [search,setSearch] = useState(commonSlice.searchWar);
    const userInfo = useSelector(state => state.userInfo) ;
    const handleLogout = () => {
        let usr = {...userInfo};
        usr.userName = usr.userNameFake;
        usr.isLogin = false;
        localStorage.setItem("userInfo",JSON.stringify(usr));
        window.location.href = "/";
    }
    
    const changeName = ($e) => {
        setSearch($e.target.value)
        store.dispatch(setSearchWar({searchWar : $e.target.value}));
        localStorage.setItem('searchName',$e.target.value)
    }
    return(
        <div className='headerTemplate'>
            <div className='gridHeader'>
                <div className='logo'>
                    <img src={crown} style={{width:'30px'}}></img>
                </div>
                <div className='headerSearchCtn'>
                    <input type={'text'} className='searchInput' placeholder='search system name ...' value={search} onChange={($event)=>{changeName($event)}}></input>
                </div>
                <div className='infoCtn'>
                    <div className='userLogo'>
                        <div className='imgUser'>
                            {
                                userInfo.isLogin == true ? 
                                <span onClick={handleLogout} style={{'fontSize':'13px'}}>{userInfo.userName}</span> : <FontAwesomeIcon icon={['fas','fa-user']} style={{color:'#4267B2',fontSize:'18px'}} onClick={() => setLogin(true)}/>
                            }
                        </div>
                    </div>
                </div>
                {
                    login && <Navigate to={"/dangnhap"}/>
                }
            </div>
        </div>
    )

   
}


export default Header;