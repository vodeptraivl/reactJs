import userInfo from './userInfo';
import socketSlice from './socketSlice';
import commonSlice from './commonSlice';
import tabSlice from './tabSlice';

const { configureStore, getDefaultMiddleware,} = require("@reduxjs/toolkit");

const rootReducer = {
    userInfo : userInfo.reducer,
    socketSlice : socketSlice.reducer,
    commonSlice : commonSlice.reducer,
    tabSlice : tabSlice.reducer
}
const rootAction = {
    userInfo : userInfo.actions,
    socketSlice : socketSlice.actions,
    commonSlice : commonSlice.actions,
    tabSlice : tabSlice.actions
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