import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as dialogActions from '../../state/dialogActions';
import './style.css';



/*
  View_Secction Component controlled by redux like a services; 
*/

class ViewHRM extends Component {
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
  componentDidMount() {  
    
  }  
  
  render() {  
    const { list,dialogObserve } = this.props;    
    var _listOfViews = Object.keys(list);
    return (
            <div>       
            {
              _listOfViews.map((_viewId)=>{
                var _view = list[_viewId];
                if(_view && _view.visible){
                  var StyleView = {},StyleOverlay={}; 
                  if(_view.display){
                    StyleView = { opacity: 1, visibility: `visible`,zIndex:_view.zIndex}
                    StyleOverlay={opacity: 1, visibility: `visible`};
                  }                 
                  return (
                    <div key={_viewId} className="ViewHRM" id={_viewId} style={StyleView}>
                    {_view.content?_view.content:null}
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
    list: state.dialog.views,
    dialogObserve: state.dialog.dialogObserve
    
  };
}

function mapDispatchToPropsDialog(dispatch) {
  return {
    actions: bindActionCreators(dialogActions, dispatch)
  };
}

export default connect(mapStateToPropsDialog, mapDispatchToPropsDialog)(ViewHRM);
