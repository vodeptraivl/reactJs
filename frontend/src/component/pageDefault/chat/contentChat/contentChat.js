import React, { useEffect, useState } from 'react';
import './contentChat.css';
import store from '../../../../commonJS/store';
import { useSelector } from 'react-redux';
import {useComponentDidMount} from '../../../../commonJS/common';

const ContentChat = () =>{
    const [message , setMessage] = useState('');
    const [messList , setMessList] = useState([]);
    // const skSlice = useSelector(state => state.socketSlice)
    const first = true;
    const sendMessage =()=>{
        if(message != ""){
            store.getState().socketSlice.sk.emit('sendMessage',message);
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
        setMessList([...messList,...[data]]);
    }
    
    const init = () =>{
        if(store.getState().socketSlice.sk){
            store.getState().socketSlice.sk.on('newMessage',data=>{
                setMessageReveice(data);
            })
        }else{
            setTimeout(x=>{init()},200)
        }
    }
    
    useEffect(() => {
        init();
        return () => {
            store.getState().socketSlice.sk.off('newMessage');
        }
    }, [messList]);
    return(
        <div className='gridPad'>
            <div></div>
            <div className='containerChatContent'>
                {
                    messList.map((x,i)=>
                        <div className={x.auth.id == store.getState().socketSlice.id ? 'messageItem right' : 'messageItem left'} key={x.auth.id+i}>
                            <div className={x.auth.id == store.getState().socketSlice.id ? 'right' : 'left'}>
                                {x.auth.id == store.getState().socketSlice.id ? '' : <div className='otherUser'>{x.auth.name}</div>}{x.message}
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
