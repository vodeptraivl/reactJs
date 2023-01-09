import userInfo from './userInfo';
import socketSlice from './socketSlice';
import commonSlice from './commonSlice';
const { configureStore, getDefaultMiddleware,} = require("@reduxjs/toolkit");

const rootReducer = {
    userInfo : userInfo.reducer,
    socketSlice : socketSlice.reducer,
    commonSlice : commonSlice.reducer
}
const rootAction = {
    userInfo : userInfo.actions,
    socketSlice : socketSlice.actions,
    commonSlice : commonSlice.actions
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