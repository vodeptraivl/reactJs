import './App.css';
import React, { useState } from 'react';
import Header from './component/pageDefault/header/header';
import System from './component/list/System';
import RightMenu from './component/rightTab/rightMenu';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/home/home';
import Tuvung from './component/dataJson/tuvung';
import Login from './component/login/login';
import io from 'socket.io-client';
import { smallUUID } from './commonJS/common';
import store from './commonJS/store';
import {setSK,setID} from './commonJS/socketSlice';
import {setUserInfo} from './commonJS/userInfo';
import axios from 'axios';
import { setSearchWar } from './commonJS/commonSlice';

export default class App  extends React.Component{
  constructor(){
    super();
    let uuid = smallUUID();
    console.log(uuid);
    this.state = {
      url : "./",
      uuid : uuid,
      socket : null,
      userName:''
    }

  }
  async componentDidMount(){
    let userInfoStr = localStorage.getItem('userInfo');
    let userInfo;
    if(userInfoStr){
      userInfo = JSON.parse(userInfoStr);
      this.setState(userInfo);
    }else{
      await this.getRandomName()
      userInfo = {
        uuid : this.state.uuid,
        userNameFake : this.state.userName,
        userName : this.state.userName,
        isLogin : false
      }
      localStorage.setItem("userInfo",JSON.stringify(userInfo));
    }
    store.dispatch(setUserInfo(userInfo));
    if(store.getState().socketSlice.sk == null){
      store.dispatch(setID(userInfo.uuid))
      store.dispatch(
        setSK(
            io(store.getState().socketSlice.urlSocket,
              {
                path:'/vola/chat',
                timeout:9999999,
                auth:{id: store.getState().userInfo.uuid ,name:store.getState().userInfo.userName},
                transports : ['websocket']
              }
            )
          )
      );
    }
    

    let searchName = localStorage.getItem('seachName') || '';
    store.dispatch(setSearchWar({searchWar : searchName}));
    this.init(store.getState().socketSlice.sk)
  }

  init = (sk) =>{
    if(sk){
       sk.on('ping',data=>{
        sk.emit("pong",)
      });
      
    }else{
        setTimeout(x=>{this.init(store.getState().socketSlice.sk)},200)
    }
}

  render(){
    return (
      <div className="App">
            <Router>
              <Routes>
                <Route exact path="/" element={<Home url={this.state.url}/>} />
                <Route exact path="/tuvung" element={<Tuvung url={this.state.url}/>} />
                <Route exact path="/dangnhap" element={<Login url={this.state.url}/>} />
              </Routes>
            </Router>
      </div>
    );
  }

  getRandomName = async () => {
    try {
      const result = await axios.get(`https://randomuser.me/api/`)
      let names = result.data.results[0];
      this.setState({userName: names.name.title+". "+names.name.last})
    } catch (error) {
      console.error(error);
    }
}
}
