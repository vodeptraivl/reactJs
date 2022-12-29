import React, { useState } from 'react';
import './contentChat.css';
import store from '../../../../commonJS/store';
export default class ContentChat extends React.Component{
    constructor(){
        super();
        this.state = {
            message:'',
            mess : [],
            id:''
        }
    }
    render(){
        return(
            <div className='gridPad'>
                <div className='containerChatContent'>
                    {
                        this.state.mess.map((x,i)=>{
                            return <div className={x.auth.id == this.state.id ? 'messageItem right' : 'messageItem left'} key={x.auth.id+i}>
                                <div className={x.auth.id == this.state.id ? 'right' : 'left'}>
                                    {x.auth.id == this.state.id ? '' : <div className='otherUser'>{x.auth.name}</div>}{x.message}
                                </div>
                                    
                            </div>
                        })
                    }
                </div>
                <div className='inputS'>
                    <input type={'text'} value={this.state.message} onKeyDown={($event)=>{this.change($event)}} onChange={($event)=>{this.change($event)}}></input>
                    <button className='send' onClick={this.sendMessage}>send</button>
                </div>
            </div>
        )
    }

    sendMessage =()=>{
        if(this.state.message != ""){
            store.getState().socketSlice.sk.emit('sendMessage',this.state.message);
            this.setState({message:''});
        }
    }

    change = ($e) =>{
        
        this.setState({message : $e.target.value})
        if ($e._reactName == "onKeyDown" && $e.key === 'Enter') {
            this.sendMessage();
        }
    }

    componentDidMount(){
        this.init(store.getState().socketSlice.sk);
    }

    init = (sk) =>{
        if(sk){
            this.setState({id:store.getState().socketSlice.id})
          sk.on('newMessage',data=>{
            let old = this.state.mess;
            old.push(data);
            this.setState({mess:old})
          })
        }else{
            setTimeout(x=>{this.init(store.getState().socketSlice.sk)},200)
        }
    }
}
