import {createSlice} from '@reduxjs/toolkit';

const commonSlice = createSlice({
    name: 'commonSlice', 
    initialState: {
        searchWar:''
    }, 
    reducers: { 
        setSearchWar(state, action) { 
            return state = action.payload;
        }
    }
})

const { actions, reducer } = commonSlice
export const {setSearchWar} = actions
export default commonSlice 