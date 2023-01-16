import {createSlice} from '@reduxjs/toolkit';

const socketSlice = createSlice({
    name: 'iov', 
    initialState:{
        sk: null,
        id:'',
        urlSocket : "http://localhost:2000",
        idSocket : ''
    },
    reducers: { 
        setSK : (state, action) =>{
            state.sk = action.payload
            state.idSocket = action.payload.id
        },
        getSK : state=>state.sk,
        setID:(state, action) =>{
            state.id = action.payload
        },
        setIDSocket:(state, action) =>{
            state.idSocket = action.payload
        }
    }
})

const { actions, reducer } = socketSlice
export const {setSK,getSK,setID} = actions
export default socketSlice