import React , {useEffect} from "react";
import './tuvung.css';
import TuvungJSON from './toiec900.js';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight,faArrowLeft,faSave,faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Header from '../../component/pageDefault/header/header';
import RightMenu from '../../component/rightTab/rightMenu';

library.add([faArrowRight,faArrowLeft,faSave,faTrashCan])
export default class Tuvung extends React.Component{
    constructor(){
        super();
        this.state = {
            currentIndex : 0,
            itemRender : TuvungJSON[0]
        }
        window.removeEventListener('keydown', ($event)=>{
            console.log($event);
        });
    } 
    render(){
        return(
            <div className="App">
             <Header/>
                <div className="bodyContainer">
                    <RightMenu/>
                    <div className="containerFlashCard">
                        {this.renderChild()}
                        
                        {
                            this.state.itemRender.isSave == false ?
                                <div className="isave"
                                onClick={($event)=>{
                                    $event.stopPropagation();
                                    let itemRender = this.state.itemRender; 
                                    itemRender.isSave = true;
                                    this.setState({itemRender:itemRender})
                                }}
                            >
                                    <FontAwesomeIcon 
                                        icon={['fas','fa-save']} 
                                        style={{'color':'#ff3737','fontSize':'30px'}}
                                    />
                            </div>
                            : 
                            <div className="isave"
                                onClick={($event)=>{
                                    $event.stopPropagation();
                                    let itemRender = this.state.itemRender; 
                                    itemRender.isSave = false;
                                    this.setState({itemRender:itemRender})
                                }}
                            >
                                    <FontAwesomeIcon 
                                        icon={['fas','fa-trash-can']} 
                                        style={{'color':'#ff3737','fontSize':'30px'}}
                                    />
                            </div>
                        }
                        
                    </div>
                </div>
            </div>
            
        )
    }
    
    renderChild = () =>{
        return <div 
                    className="flashCard" 
                    key={this.state.itemRender.en} 
                    onClick={(x)=>{
                        let itemRender = this.state.itemRender; 
                        itemRender.isShow = !itemRender.isShow;
                        this.setState({itemRender:itemRender})
                        
                    }}>
                    {this.state.itemRender.isShow ? <div><strong>{this.state.itemRender.vi}</strong></div> : <div><strong>{this.state.itemRender.en}</strong></div>}
                    <div className="nextArrow"
                        onClick={($event)=>{
                            $event.stopPropagation();
                            let index = this.state.currentIndex +1;
                            if(index > TuvungJSON.length){
                                return;
                            }
                            this.setState({currentIndex:index})
                            let nextItem = TuvungJSON[index];
                            nextItem.isShow = false;
                            this.setState({itemRender:nextItem});
                            
                        }}
                        ><FontAwesomeIcon icon={['fas','fa-arrow-right']} />
                    </div>
                    <div className="prevArrow"
                    
                        onClick={($event)=>{
                            $event.stopPropagation();
                            let index = this.state.currentIndex -1;
                            if(index == -1){
                                return;
                            }
                            this.setState({currentIndex:index})
                            let preItem = TuvungJSON[index];
                            preItem.isShow = false;
                            this.setState({itemRender:preItem});
                            
                        }}
                        >
                            <FontAwesomeIcon icon={['fas','fa-arrow-left']} />
                    </div>
                </div>
        
    }

    shuffle = (obj) => {
        let ci = obj.length,  ri;
        while (ci != 0) {
          ri = Math.floor(Math.random() * ci);
          ci--;
          [obj[ci], obj[ri]] = [obj[ri], obj[ci]];
        }
        return obj;
    }

}