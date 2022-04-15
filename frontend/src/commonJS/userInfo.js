import {createSlice} from '@reduxjs/toolkit';

const userInfo = createSlice({
    name: 'userInfo', 
    initialState: 'vola', 
    reducers: { 
        setName(state, action) { 
            return state = 'value2';
        }
    }
})

const { actions, reducer } = userInfo
export const {setName} = actions
export default userInfo 