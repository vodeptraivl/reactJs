import { useDispatch, useSelector } from 'react-redux';
import { backupTab, markRead, removeTab, setCurrentTab } from '../../../../../commonJS/messageControllSlice';
import './tab.css';

const Tab = () => {
    const tabs = useSelector(state => state.messageControllSlice.tabs);
    const currentTab = useSelector(state => state.messageControllSlice.currentTab);
    const dispatch = useDispatch();

    const changeTab = (x) =>{
        if(x.id == currentTab.id){
            return;
        }
        let tab = JSON.parse(JSON.stringify(x));
        dispatch(backupTab(JSON.parse(JSON.stringify(currentTab))))
        if(tab.needRead.length > 0){
            if(tab.data && tab.data.length > 0){
                tab.data = [...tab.data,...tab.needRead];
            }else{
                tab.data = tab.needRead;
            }
            tab.needRead = [];
        }
        dispatch(setCurrentTab(tab));
        dispatch(markRead(tab));
    }

    const removeT = (tab) =>{
        dispatch(removeTab(tab.id));
    }
    return(
        <div className="tabContainer">
            {
                tabs.map(x=>
                    <div className={`tab${x.id == currentTab.id ? ' active' : ''} privateTab`} key={x.id} onClick={()=>{changeTab(x)}}>
                        {x.name}
                        {x.needRead && x.needRead.length > 0 && <div className='ctnMess'>{x.needRead.length}</div>}
                        {x.id != 'market' && <div className='close' onClick={()=>{removeT(x)}}>x</div>}
                    </div>
                )
            }
        </div>
    )
}

export default Tab;