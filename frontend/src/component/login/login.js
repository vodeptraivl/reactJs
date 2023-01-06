
import React, { useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import './login.css';
import '../cmStyle.css';
import logo from './google.png';
import crown from './crown.png';
import {Link , useNavigate, Navigate } from "react-router-dom";
import axios from 'axios';
import store from '../../commonJS/store';
import {setUserInfo} from '../../commonJS/userInfo';
import {setSK,setID} from '../../commonJS/socketSlice';
import { setCookie ,smallUUID } from '../../commonJS/common'

import io from 'socket.io-client';


library.add(fab)
class Login extends React.Component{
    constructor(){
        super();
        this.state = {
            userName:'',
            password:'',
            navigateHome : false
        }
    }
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
                                <input type="text" id="userName" value={this.state.userName} className='input1' placeholder='username or email' onChange={($event)=>{this.change($event,'userName')}}></input>
                            </div>
                            <div className='flxBox mgB10'>
                                <input type="password" id="password" value={this.state.password} className='input1' placeholder='password' onChange={($event)=>{this.change($event,'password')}}></input>
                            </div>
                            <div className='flxBox'>
                                <div className='flxBox centerVer'>
                                    <button className='custom-btn btn16 mgR5' onClick={this.login}>SIGN IN</button>
                                    <button className='custom-btn btn16' onClick={this.sigup}>SIGN UP</button>

                                </div>
                            </div>
                            
                        </div>
                        <div className='flxBox centerVer' style={{bottom:"20px"}}>
                            <button className='custom-btn btn16 mgR5 flxBox' style={{width:'35px'}}><FontAwesomeIcon icon={['fab', 'facebook']} style={{color:'#4267B2',fontSize:'18px'}}/></button>
                            <button className='custom-btn btn16'  style={{width:'35px'}}><img src={logo} className="googleBtn" alt="logo" /></button>
                        </div>
                        {
                            this.state.navigateHome && <Navigate to={"/"}/>
                        }
                    </div>
                </div>
            </div>
        )
    }
    login = async () => {
        if(this.state.userName == '' || this.state.password == ''){
            return;
        }
        try {
           const result = await axios.post(`${store.getState().socketSlice.urlSocket}/dangnhap`,this.state)
           if(result.data.error == false){
                this.success(result.data.userInfo)

           }else{
             window.alert("userName hoac password khong dung !")
           }
        } catch (error) {
          console.error(error);
        }
    }

    change = ($e,key) =>{
        let x = {};
        x[key] = $e.target.value
        this.setState(x)
    }

    sigup = async () => {
        if(this.state.userName == '' || this.state.password == ''){
            return;
        }
        let usr = this.state;
        usr.uuid = smallUUID();
        try {
           const result = await axios.post(`${store.getState().socketSlice.urlSocket}/dangky`,this.state)
           if(result.data.error == false){
            let usr = result.data.userInfo;
            delete usr.password;
            this.success(usr)
           }else{
            window.alert("userName hoac password ton tai !")
           }
        } catch (error) {
          console.error(error);
        }
    }

    success = (usr) =>{
        usr.isLogin = true;
        store.dispatch(setUserInfo(usr))
        console.log(store.getState().userInfo.uuid) 
        localStorage.setItem('userInfo', JSON.stringify(usr));
        store.getState().socketSlice.sk.disconnect();
        store.dispatch(
            setSK(
                io(store.getState().socketSlice.urlSocket,
                    {
                    path:'/vola/chat',
                    timeout:9999999,
                    auth:{id: usr.uuid,name:usr.userName},
                    transports : ['websocket']
                    }
                )
            )
        );
        this.setState({navigateHome : true})
    }
}

export default Login;