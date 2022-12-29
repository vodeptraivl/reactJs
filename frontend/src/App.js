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
import { smallUUID } from './commonJS/common'
import store from './commonJS/store';
import {setSK,setID} from './commonJS/socketSlice';
import axios from 'axios';

export default class App  extends React.Component{
  constructor(){
    super();
    let uuid = smallUUID();
    console.log(uuid);
    this.state = {
      url : "./",
      uuid : uuid,
      socket : null,
      name:''
    }

  }
  async componentDidMount(){
    if(this.state.name == ''){
      await this.getRandomName();
      store.dispatch(
        setID(this.state.uuid)
      )
      store.dispatch(
        setSK(
            io("http://192.168.1.62:8888",{path:'/vola/chat',timeout:9999999,auth:{id: this.state.uuid,name:this.state.name},transports : ['websocket']})
          )
        );
    }
    
    // this.setState({socket : io("http://localhost:2000",{path:'/vola/chat',timeout:9999999,auth:{id: this.state.uuid,name:'củ cải'}})})
    
  }
  render(){
    return (
      <div className="App">
        {/* <Header/> */}
          {/* <div className="bodyContainer"> */}
            <Router>
            {/* <RightMenu/> */}
              <Routes>
                {/* <Route exact path="/system" element={<System/>} /> */}
                <Route exact path="/" element={<Home url={this.state.url}/>} />
                <Route exact path="/tuvung" element={<Tuvung url={this.state.url}/>} />
                <Route exact path="/dangnhap" element={<Login url={this.state.url}/>} />
              </Routes>
            </Router>
      </div>
      // </div>
    );
  }

  getRandomName = async () => {
    try {
      const result = await axios.get(`https://randomuser.me/api/`)
      let names = result.data.results[0];
      this.setState({name: names.name.title+". "+names.name.last})
    } catch (error) {
      console.error(error);
    }
}
}
