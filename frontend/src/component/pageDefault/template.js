import React, { useState } from 'react';
import "./template.css";
import Header from './header/header';
import UserListChat from './chat/userList/userList';
import ContentChat from './chat/contentChat/contentChat';
import Tuvung from '../dataJson/tuvung';
import Map from '../mapdemo/map';

class Template extends React.Component{
    render(){
        return (
            <div className='templateBody'>
                <Header></Header>
                <div className='bodyTemplate'>
                    <Tuvung></Tuvung>
                </div>
            </div>
        )
    }
}
export default Template;