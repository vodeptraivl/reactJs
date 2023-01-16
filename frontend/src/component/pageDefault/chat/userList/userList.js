import React, { useEffect, useState } from 'react';
import './userList.css';
import store from '../../../../commonJS/store';
import { useDispatch, useSelector } from 'react-redux';
import { addTab, setCurrentTab, setUserChatList, updateIdtab, updateMessNonTab } from '../../../../commonJS/messageControllSlice';

const UserListChat = () =>{
    const usersList = useSelector(state => state.messageControllSlice.userChatList);
    const dispatch = useDispatch();
    const skSlice = useSelector(state => state.socketSlice);
    const msControll = useSelector(state => state.messageControllSlice);
    const tabs = useSelector(state => state.messageControllSlice.tabs);
    const messageNonTab = useSelector(state => state.messageControllSlice.messageNonTab);

    const init = () =>{
        if(store.getState().socketSlice.sk){
            store.getState().socketSlice.sk.emit("getAllUsers",null);
            store.getState().socketSlice.sk.on('users',data=>{
                dispatch(setUserChatList(data));
                updateIdSk(data);
            })
            store.getState().socketSlice.sk.on('allUsers',data=>{
                dispatch(setUserChatList(data));
                updateIdSk(data);
            })
        }else{
            setTimeout(x=>{init()},200)
        }
    }
    
    const updateIdSk = (data) => {
        for(let i = 0; i < data.length ; i++){
            let tab = tabs.find(x=>{return x.id == data[i].id && x.idSk == data[i].idSk && x.name == data[i].name});
            if(tab == null){
                dispatch(updateIdtab(data[i]))
            }
        }
    }
    const FindRead = ({item}) =>{
        let findTabs = tabs.findIndex(x=>{return x.id == item.id});
        if(findTabs == -1){
            let filMes = messageNonTab.filter(x=>{return x.usrFrom == item.id});
            if(filMes && filMes.length > 0){
                return <div className='ctnMess'>{filMes.length}</div>
            }
        }
        
    }

    useEffect(() => {
        init();
       
    }, []);

    const privateChat  = (usr) =>{
        console.log(skSlice,usr)
        if(usr.idSocket == skSlice.sk.id){
            return;
        }
        if(msControll.currentTab.idSk == usr.idSocket){
            return;
        }

        let privateChat = msControll.tabs.find(x=>{return x.idSk == usr.idSocket}) 
        if(privateChat == null){
            let messNonTabs = messageNonTab.filter(x=>{return x.usrFrom == usr.id});
            privateChat = {
                id : usr.id,
                name: usr.name,
                idSk : usr.idSocket,
                data: messNonTabs || [],
                needRead : []
            }
            dispatch(addTab(privateChat))
        }
        dispatch(setCurrentTab(privateChat));
        dispatch(updateMessNonTab(usr.id))
    }

    return (
        <div className='leftContainer'>
            <div className='searchUser'>
                <input className='inputSearchName' type={'text'} placeholder="Search User .... "></input>
            </div>
            <div className='containerUser'>
                {
                    usersList &&
                    usersList.map(x=>
                            <div className='itemChat' key={x.idSocket} onClick={()=> privateChat(x)}>
                                <div className='status online'></div>
                                <span className='userNameChat'>{x.name}</span>
                                <FindRead item={x}/>
                            </div>
                    )
                }
            </div>
            
        </div>
    )
}

export default UserListChat;