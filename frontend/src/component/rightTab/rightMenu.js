import React from 'react';
import './rightMenu.css';
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";

class RightMenu extends React.Component{
    constructor(){
        super();
        this.state = {}
    }

    render(){
        return(
            <div className='rightMenu'>
                <div className='itemMenu'>
                    <Link to="/system">
                        System
                    </Link>
                </div>
                <div className='itemMenu'>Auth Role</div>
            </div>
        );
    }
}

export default RightMenu;