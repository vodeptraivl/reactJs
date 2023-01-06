import React, { useState } from 'react';
import axios from 'axios';
import './home.css';
import { delAllCookie, GetStateName } from '../../commonJS/common'
import Header from '../../component/pageDefault/header/header';
import RightMenu from '../../component/rightTab/rightMenu';
import UserListChat from '../../component/pageDefault/chat/userList/userList';
import store from '../../commonJS/store';
import ContentChat from '../pageDefault/chat/contentChat/contentChat';
import { useSelector } from 'react-redux'

export default class Home extends React.Component{
    constructor(){
        super();
        this.state = {
            rowData : [
                {
                    ssystemNm:'BCC'
                },
                {
                    ssystemNm:'AAA'
                }
            ]
        }
    }
    render(){
        return (
            <div className="App">
             <Header/>
                <div className="bodyContainer">
                    <RightMenu/>
                    <div className='containerSystem'>
                        <div className='systems'>
                            {
                                this.state.rowData.map(x=>{
                                    if(x.ssystemNm.indexOf('.war') == -1){
                                        let n1 = x.ssystemNm.toLowerCase();
                                        let n2 = store.getState().commonSlice.searchWar.toLowerCase();
                                        if(n2 != ""){
                                            if(n1.indexOf(n2) > -1){
                                                return <div className='system' key={x.ssystemNm} onClick={()=>{this.handleClick(x.ssystemNm)}}>{x.ssystemNm}</div>
                                            }
                                        }else{
                                            return <div className='system' key={x.ssystemNm} onClick={()=>{this.handleClick(x.ssystemNm)}}>{x.ssystemNm}</div>
                                        }
                                        
                                    }
                                })
                            }
                        </div>
                        <div className='chats'>
                            <UserListChat />
                            <ContentChat />
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }

    componentDidMount(){
        // this.getSystem()
        const commonSlice = useSelector(state => state.commonSlice)
        console.log(commonSlice)
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
        window.location.href = '/'+system;
    }
}