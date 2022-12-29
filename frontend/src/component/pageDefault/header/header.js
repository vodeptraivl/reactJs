
import React, { useState } from 'react';
import './header.css';
import crown from './crown.png';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser } from "@fortawesome/free-solid-svg-icons";
import user from './user.png';
import {  } from 'react-router-dom';

library.add(faUser)
class Header extends React.Component{
    render(){
        return(
            <div className='headerTemplate'>
                <div className='gridHeader'>
                    <div className='logo'>
                        <img src={crown} style={{width:'30px'}}></img>
                    </div>
                    <div className='headerSearchCtn'>
                        <input type={'text'} className='searchInput' placeholder='search...'></input>
                    </div>
                    <div className='infoCtn'>
                        <div className='userLogo'>
                            <div className='imgUser'>
                                {/* <FontAwesomeIcon icon={['fas','fa-user']} style={{color:'#4267B2',fontSize:'18px'}}/> */}
                                <img src={user} style={{width:'40px'}} onClick={this.login}></img>
                                
                            </div>
                        </div>
                    </div>
                    {/* <div class='toggle-switch'>
                        <label>
                            <input className="nightToggle" type='checkbox' id="nightMode"/>
                            <span className='slider'></span>
                        </label>
                    </div> */}
                </div>
            </div>
        )
    }
    
    login = () =>{
    }
}
export default Header;