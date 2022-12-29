import userInfo from './userInfo';
import socketSlice from './socketSlice';
const { configureStore , getDefaultMiddleware} = require("@reduxjs/toolkit");

const rootReducer = {
    userInfo : userInfo.reducer,
    socketSlice : socketSlice.reducer
}
const rootAction = {
    userInfo : userInfo.actions,
    socketSlice : socketSlice.actions
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