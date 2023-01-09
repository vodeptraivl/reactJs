import {createSlice} from '@reduxjs/toolkit';

const userInfo = createSlice({
    name: 'userInfo', 
    initialState: {
        uuid : '',
        userName:'',
        userNameFake : '',
        isLogin : false
    }, 
    reducers: { 
        setUserInfo(state, action) { 
            return state = action.payload;
        },
        setUserName(state, action) { 
            return state = action.payload;
        }
    }
})

const { actions, reducer } = userInfo
export const {setUserInfo,setUserName} = actions
export default userInfo 