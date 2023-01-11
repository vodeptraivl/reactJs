import {createSlice} from '@reduxjs/toolkit';

const tabSlice = createSlice({
    name: 'iov', 
    initialState:{
        tabs : []
    },
    reducers: { 
        setTabs : (state, action) =>{
            state.tabs = action.payload
        }
    }
})

const { actions, reducer } = tabSlice
export const {setTabs} = actions
export default tabSlice