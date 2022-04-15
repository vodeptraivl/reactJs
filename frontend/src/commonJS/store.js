import userInfo from './userInfo';

const { configureStore } = require("@reduxjs/toolkit");


const rootReducer = {
    userInfo : userInfo.reducer
}
const rootAction = {
    userInfo : userInfo.actions
}

const store = configureStore({
    reducer: rootReducer,
    action: rootAction
})

export default store