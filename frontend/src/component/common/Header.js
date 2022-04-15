import './Header.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { delAllCookie, GetStateName } from '../../commonJS/common'
import logo from '../../logo.svg';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import store from '../../commonJS/store';
import {setName} from '../../commonJS/userInfo';

class Header extends React.Component {

    constructor() {
        super();
        this.state = {
            open : false,
            path:'',
            error:'',
            name:''
        }

    };
    componentDidMount() {
        this.setState({name : store.getState().userInfo});
        store.dispatch(setName());
        store.subscribe(()=>{
            this.setState({name : store.getState().userInfo});
        })
    }
    
    handleClickOpen = () => {
        this.setState({open : true});
    };
    
    handleClose = () => {
        this.setState({open : false});
    };

    handleChange = (event) => {
        this.setState({error: ''}); 
        if(event.target.value != ""){
            this.setState({path: event.target.value});
        }else{
            this.setState({error: 'nhập Path ~ !'}); 
        }
    }

    handleDeleteCookie = () =>{
        if(this.state.path == ""){
            this.setState({error: 'nhập Path ~ !'}); 
        }else{
            this.setState({error: ''}); 
            delAllCookie();
            this.handleClose();
            window.location.href = './'+this.state.path.replace('/','').toLocaleUpperCase();
            this.setState({path: ''}); 
        }
    }

    render() {
        return (
            <div className="Header">
                <div className='logo'>
                    <img src={logo} className="Applogo"/>
                </div>
                <div className='Creater'>{this.state.name}</div>
                <div className="ClearCookie" onClick={this.handleClickOpen}>
                    <FontAwesomeIcon icon={faTrash} />Cookie</div>
                    {this.Dialog()}
            </div>
        );
    }

    Dialog = () =>{
        return (
            <div>
              <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
                maxWidth={'sm'}
              >
                <DialogTitle id="alert-dialog-title">
                    Clean Cookie
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                      xóa Cookie and go To
                    <input type="text" value={this.state.value} onChange={this.handleChange} className="inputTest" placeholder='Path ? vd : CAR'/>
                    {this.state.error != '' ? <p style={{color:'red'}}>{this.state.error}</p> : ''}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose}>không xóa</Button>
                  <Button onClick={this.handleDeleteCookie} autoFocus>
                    xóa
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          );
    }
}

export default Header;
