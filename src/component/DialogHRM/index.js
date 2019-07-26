import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as dialogActions from '../../state/dialogActions';
import './style.css';


/*
  Dialog Component controlled by redux like a services; 
*/

class DialogHRM extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      visible :false,
      top:0,
      left:0,
      display:false,
      height:0,
      width:null,
      orientation:false
    };
  }

  Close(i){
    var options = {id:i};
    this.props.actions.CloseDialog(options); 
  }


  render() {  
    const { list,dialogObserve } = this.props;    
    var _list = Object.keys(list);

    /*
         Maping dialog list and rendering a component if the parametres matches; 
    */
    return (
            <div>       
            {
              _list.map((dialogId)=>{
                var dialog = list[dialogId];
                if(dialog && dialog.visible){
                  var StyleDialog = {},StyleOverlay={}; 
                  if(dialog.display){
                    StyleDialog = { opacity: 1, visibility: `visible`,zIndex:dialog.zIndex}
                    StyleOverlay={opacity: 1, visibility: `visible`};
                  }                 
                  return (
                    <div key={dialogId} className={dialog.display?'active':''} >
                      <div className="DialogHRM" id={dialogId} style={StyleDialog}>
                        {dialog.content?dialog.content:null}
                      </div>
                      {dialog.display?<div className={`Dialog_Overflow_HRM ${dialog.display?'show':''}`} onClick={this.Close.bind(this,dialogId)}/> :null}        
                    </div>
                  )
                }
                else{return(null)}
              })
            }              
            </div>
         )
        
     
  }
}


function mapStateToPropsDialog(state, ownProps) {
  return {
    list: state.dialog.dialogs,
    dialogObserve: state.dialog.dialogObserve
    
  };
}

function mapDispatchToPropsDialog(dispatch) {
  return {
    actions: bindActionCreators(dialogActions, dispatch)
  };
}

export default connect(mapStateToPropsDialog, mapDispatchToPropsDialog)(DialogHRM);
