import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './home.css';
import { delAllCookie, GetStateName } from '../../commonJS/common'
import Header from '../../component/pageDefault/header/header';
import RightMenu from '../../component/rightTab/rightMenu';
import UserListChat from '../../component/pageDefault/chat/userList/userList';
import store from '../../commonJS/store';
import ContentChat from '../pageDefault/chat/contentChat/contentChat';
import { useSelector } from 'react-redux';

const Home = ({url}) =>{
    const [rowData,setRowData] = useState([]);
    const commonSlice = useSelector(state => state.commonSlice) ;
    const getSystem = async () => {
        try {
          const result = await axios.get(`${url}tomcatsystem`)
          setRowData(result.data.dataList)
        } catch (error) {
          console.error(error);
        }
    }
    const handleClick = (system) =>{
        delAllCookie();
        window.location.href = '/'+system;
    }

    useEffect(() => {
        const loadData = async () => {
            getSystem()
        };
    
        loadData();
      }, []);

    return (
        <div className="App">
            <Header/>
            <div className="bodyContainer">
                <RightMenu/>
                <div className='containerSystem'>
                    <div className='systems'>
                        {
                            rowData.map(x=>{
                                if(x.ssystemNm.indexOf('.war') == -1){
                                    let n1 = x.ssystemNm.toLowerCase();
                                    let n2 = commonSlice.searchWar.toLowerCase();
                                    if(n2 != ""){
                                        if(n1.indexOf(n2) > -1){
                                            return <div className='system' key={x.ssystemNm} onClick={()=>{handleClick(x.ssystemNm)}}>{x.ssystemNm}</div>
                                        }
                                    }else{
                                        return <div className='system' key={x.ssystemNm} onClick={()=>{handleClick(x.ssystemNm)}}>{x.ssystemNm}</div>
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

export default Home;