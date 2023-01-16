import {createSlice} from '@reduxjs/toolkit';

const messageControllSlice = createSlice({
    name: 'tabs', 
    initialState:{
        tabs : [
            {
                id : "market",
                name: "Chợ",
                idSk : null,
                data:[],
                needRead : []
            }
        ],
        currentTab : {
            id : "market",
            name: "Chợ",
            idSk : null,
            data:[],
            needRead : []
        },
        userChatList : [],
        messageNonTab: []
    },
    reducers: { 
        setTabs : (state, action) =>{
            state.tabs = action.payload
        },
        addTab : (state, action) =>{
            state.tabs = [...state.tabs,action.payload]
        },
        setCurrentTab: (state, action) =>{
            state.currentTab = action.payload
        },
        setCurrentTabData: (state, action) =>{
            state.currentTab.data = action.payload
        },
        setUserChatList :(state, action) => { 
            state.userChatList = [];
            state.userChatList.push(...action.payload);
        },
        backupTab: (state,action)=>{
            let index = state.tabs.findIndex(x=>{
                return (x.id == action.payload.id)
            })
            if(index > -1){
                state.tabs[index] = action.payload;
            }
        },
        newNeedRed: (state,action)=>{
            let index = state.tabs.findIndex(x=>{
                return (x.id == action.payload.usrFrom)
            })
            if(index > -1){
                state.tabs[index].needRead = [...state.tabs[index].needRead,...[action.payload]];
            }else{
                state.messageNonTab = [...state.messageNonTab,...[action.payload]]
            }
            
        },
        markRead : (state,action) =>{
            let index = state.tabs.findIndex(x=>{
                return (x.id == action.payload.id)
            })
            if(index > -1){
                state.tabs[index].needRead = [];
            }
        },
        updateIdtab: (state,action)=>{
            let index = state.tabs.findIndex(x=>{
                return (x.id == action.payload.id)
            })
            if(index > -1){
                state.tabs[index].idSk = action.payload.idSocket;
            }
        },
        updateMessNonTab: (state,action)=>{
            let fil = state.messageNonTab.filter(x=>{return x.usrFrom != action.payload})
            state.messageNonTab = fil
        },
        removeTab: (state,action)=>{
            let fil = state.tabs.filter(x=>{return x.id != action.payload});
            let market = state.tabs.find(x=>{return x.id =='market'});
            state.tabs = fil;
            state.currentTab = market;
        }
    }

})

const { actions, reducer } = messageControllSlice
export const {
        setTabs,
        setCurrentTab,
        setCurrentTabData,
        setUserChatList,
        addTab,
        backupTab,
        newNeedRed,
        updateIdtab,
        markRead,
        updateMessNonTab,
        removeTab
    } = actions
export default messageControllSlice