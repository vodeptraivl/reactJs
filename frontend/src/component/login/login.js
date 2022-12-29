
import React, { useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import './login.css';
import '../cmStyle.css';
import logo from './google.png';
import crown from './crown.png';

library.add(fab)
class Login extends React.Component{

    render(){
        return (
            <div className='containerLogin'>
                <div className="area" >
                    <ul className="circles">
                        <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
                    </ul>
                </div >
                <div className='LoginItem'>
                    <div className='login'>
                        <div className='slant-top'></div>
                        <div className='slant-bottom'></div>
                        <div className='centerVer' style={{top:"50px"}}>
                            <img src={crown} style={{width:'70px'}}></img>
                        </div>
                        <div className='centerMid w80per'>
                            <div className='flxBox mgB10 '>
                                <input type="text" id="userName" className='input1' placeholder='username or email'></input>
                            </div>
                            <div className='flxBox mgB10'>
                                <input type="password" id="password" className='input1' placeholder='password'></input>
                            </div>
                            <div className='flxBox'>
                                <div className='flxBox centerVer'>
                                    <button className='custom-btn btn16 mgR5'>SIGN IN</button>
                                    <button className='custom-btn btn16'>SIGN UP</button>

                                </div>
                            </div>
                            
                        </div>
                        <div className='flxBox centerVer' style={{bottom:"20px"}}>
                            <button className='custom-btn btn16 mgR5 flxBox' style={{width:'35px'}}><FontAwesomeIcon icon={['fab', 'facebook']} style={{color:'#4267B2',fontSize:'18px'}}/></button>
                            <button className='custom-btn btn16'  style={{width:'35px'}}><img src={logo} className="googleBtn" alt="logo" /></button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
}

export default Login;