import React, { useState } from 'react';
import axios from 'axios';
import './home.css';
import { delAllCookie, GetStateName } from '../../commonJS/common'
import Header from '../../component/pageDefault/header/header';
import RightMenu from '../../component/rightTab/rightMenu';

export default class Home extends React.Component{
    constructor(){
        super();
        this.state = {
            rowData : []
        }
    }
    render(){
        return (
            <div className="App">
             <Header/>
                <div className="bodyContainer">
                    <RightMenu/>
                    <div className='containerSystem'>
                        {
                            this.state.rowData.map(x=>{
                                if(x.ssystemNm.indexOf('.war') == -1){
                                    return <div className='system' key={x.ssystemNm} onClick={()=>{this.handleClick(x.ssystemNm)}}>{x.ssystemNm}</div>
                                }
                            })
                        }
                    </div>
                </div>
            </div>
            
        );
    }

    componentDidMount(){
        this.getSystem()
    }

    getSystem = async () => {
        try {
          const result = await axios.get(`${this.props.url}tomcatsystem`)
          this.setState({rowData:result.data.dataList})
        } catch (error) {
          console.error(error);
        }
    }

    handleClick = (system) =>{
        delAllCookie();
        window.location.href = '/'+system
    }
}