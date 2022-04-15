import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './System.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd , faSave} from '@fortawesome/free-solid-svg-icons'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

class System extends React.Component{
    gridApi;
    constructor(){
        super();
        this.state = {
            rowData:[],
            open : false,
            message : '',
            header:'',
            columnDefs : [
                { field: "ssystemId", headerName:"System Id" , width: 100 , editable : true },
                { field: "ssystemNm", headerName:"System Name" , width: 200 , editable : true , cellStyle:{'textAlign':'left'} },
                { field: "authId" , headerName:"Authenticated Id" , width: 300 , editable : true , cellStyle:{'textAlign':'left'} }
            ]
        }
    } 
    componentDidMount(){
        this.getSystem()
    }
    
    render(){
        return (
            <div className='containerSystem'>
                <div className='btnContainer'>
                    <button className='AddSystem button button1' onClick={this.adNewRow}>
                        <FontAwesomeIcon icon={faAdd} style={{marginRight:'5px'}}/>
                        System</button>
                    <button className='AddSystem button button2' onClick={this.onSave}>
                        <FontAwesomeIcon icon={faSave} style={{marginRight:'5px'}}/>
                        Save</button>
                </div>
                <div className="ag-theme-alpine aggrid gridSystem">
                    <AgGridReact
                        onGridReady={params => (this.gridApi = params.api)}
                        enableRangeSelection={false}
                        suppressCellFocus={true}
                        rowSelection={'single'}
                        stopEditingWhenCellsLoseFocus={true}
                        onCellValueChanged={this.onStoped}
                        rowData={this.state.rowData}
                        columnDefs={this.state.columnDefs}>
                    </AgGridReact>
                </div>
                {this.showMessage()}
            </div>
        );
    }


    getSystem = async () => {
        try {
          const result = await axios.get("http://localhost:8080/system")
          this.setState({rowData:result.data.dataList})
        } catch (error) {
          console.error(error);
        }
    }

    onStoped = ($event) =>{
        console.log($event)
    }

    adNewRow = () =>{
        this.setState({rowData:[{authId:'',ssystemNm:'',ssystemId:''},...this.state.rowData]})
        this.gridApi.ensureIndexVisible(0,'middle');
    }

    onSave = () => {
        let dataSave = [...this.state.rowData];
        if(dataSave != null && dataSave.length > 0){
            for(let i = 0; i < dataSave.length ; i++){
                if(dataSave[i].ssystemId == "" || dataSave[i].ssystemNm == "" || dataSave[i].authId == ""){
                    this.setState({open:true,message:'required item',header:'error'});
                    return;
                }
            }

            this.onUpdateSystem();
        }else{
            this.setState({open:true,message:'empty item',header:'error'});
        }
    }

    onUpdateSystem = async () => {
        try {
            const result = await axios.post("http://localhost:8080/system",this.state.rowData)
            
          } catch (error) {
            console.error(error);
          }
    }

    showMessage = () =>{
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
                    {this.state.header}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div style={{color:'red'}}>{this.state.message}</div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} autoFocus>OKE</Button>
                </DialogActions>
                </Dialog>
            </div>
        );
    }

    
    handleClickOpen = () => {
        this.setState({open : true});
    };
    
    handleClose = () => {
        this.setState({open : false});
    };
}


export default System;