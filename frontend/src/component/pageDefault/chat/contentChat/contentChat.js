import React, { useEffect, useState } from 'react';
import './contentChat.css';
import store from '../../../../commonJS/store';
import Tab from './privateTab/tab'
import { useDispatch, useSelector } from 'react-redux';
import { newNeedRed, setCurrentTabData } from '../../../../commonJS/messageControllSlice';

const ContentChat = () =>{
    const [message , setMessage] = useState('');
    const currentTabMess = useSelector(state => state.messageControllSlice.currentTab.data);
    const currentTab = useSelector(state => state.messageControllSlice.currentTab);
    const skSlice = useSelector(state => state.socketSlice)
    const dispatch = useDispatch();
    const sendMessage =()=>{
        if(message != ""){
            let send = {

                idSk : currentTab.idSk,
                message : message,
                from : skSlice.sk.id,
                usrFrom : skSlice.id
            }
            store.getState().socketSlice.sk.emit('sendMessage',send);
            setMessage('');
        }
    }

    const change = ($e) =>{
        setMessage($e.target.value);
        if ($e._reactName == "onKeyDown" && $e.key === 'Enter') {
            sendMessage();
        }
    }
    const setMessageReveice = (data) => {
        dispatch(setCurrentTabData([...currentTabMess,...[data]]));
        console.log(data);
    }
    
    const init = () =>{
        if(store.getState().socketSlice.sk){
            store.getState().socketSlice.sk.on('newMessage',data=>{
                if(currentTab.id == data.usrFrom){
                    setMessageReveice(data);
                }else{
                    dispatch(newNeedRed(data));
                }
            })
            store.getState().socketSlice.sk.on('newMessageForMe',data=>{
                setMessageReveice(data);
            })
            store.getState().socketSlice.sk.on('newPrivateMessage',data=>{
                if(currentTab.id == data.usrFrom){
                    setMessageReveice(data);
                }else{
                    dispatch(newNeedRed(data));
                }
            })
        }else{
            setTimeout(x=>{init()},200)
        }
    }
    
    useEffect(() => {
        init();
        return () => {
            store.getState().socketSlice.sk.off('newMessage');
            store.getState().socketSlice.sk.off('newPrivateMessage');
        }
    }, [currentTabMess]);

    return(
        <div className='gridPad'>
            <Tab/>
            <div className='containerChatContent'>
                {
                    currentTabMess.map((x,i)=>
                        <div className={x.auth.id == store.getState().socketSlice.id ? 'messageItem right' : 'messageItem left'} key={x.auth.id+i}>
                            <div className={x.auth.id == store.getState().socketSlice.id ? 'right' : 'left'}>
                                {currentTab.id != 'market' && ''}
                                {currentTab.id == 'market' && ((x.auth.id == store.getState().socketSlice.id) ? '' : <div className='otherUser'>{x.auth.name}</div>)}{x.message}
                            </div>
                                
                        </div>
                    )
                }
            </div>
            <div className='inputS'>
                <input type={'text'} value={message} onKeyDown={($event)=>{change($event)}} onChange={($event)=>{change($event)}}></input>
                <button className='send' onClick={sendMessage}>send</button>
            </div>
        </div>
    )
}

export default ContentChat;
