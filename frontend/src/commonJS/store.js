import userInfo from './userInfo';
import socketSlice from './socketSlice';
import commonSlice from './commonSlice';
import messageControllSlice from './messageControllSlice';

const { configureStore, getDefaultMiddleware,} = require("@reduxjs/toolkit");

const rootReducer = {
    userInfo : userInfo.reducer,
    socketSlice : socketSlice.reducer,
    commonSlice : commonSlice.reducer,
    messageControllSlice : messageControllSlice.reducer
}
const rootAction = {
    userInfo : userInfo.actions,
    socketSlice : socketSlice.actions,
    commonSlice : commonSlice.actions,
    messageControllSlice : messageControllSlice.actions
}

const store = configureStore({
    reducer: rootReducer,
    action: rootAction,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }
    ),
})

export default store