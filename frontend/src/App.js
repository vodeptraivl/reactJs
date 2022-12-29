import './App.css';
import React, { useState } from 'react';
import Header from './component/pageDefault/header/header';
import System from './component/list/System';
import RightMenu from './component/rightTab/rightMenu';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/home/home';
import Tuvung from './component/dataJson/tuvung';
import Login from './component/login/login';

export default class App  extends React.Component{
  constructor(){
    super();
    this.state = {
      url : "./"
    }
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
}
