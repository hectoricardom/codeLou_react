import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as dialogActions from '../../state/dialogActions';
import * as Util from '../../state/Util';
import './style.css';

/*
  Slide Option Component controlled by redux like a services; 
*/


class SlideOptionHRM extends Component {
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
    this.props.actions.CloseSlideOption(options); 
  }


  render() {  
    const { list,dialogObserve } = this.props;    
    var _list = Object.keys(list);
    
    return (
            <div>       
            {
              _list.map((slideId)=>{
                var slide = list[slideId];
                if(slide && slide.visible){
                  var _Style={}
                  var _class_slide_Id =Util.cleanbase64(slideId);
                  _Style[`--s__${_class_slide_Id}_heigth__`]='750px';
                  _Style[`--s__${_class_slide_Id}_zIndex__`]=250;
                  _Style[`--overlay__${_class_slide_Id}_zIndex__`]=249;    
                  if(slide.display){
                    if(slide.height){
                      _Style[`--s__${_class_slide_Id}_heigth__`]=slide.height+'px';
                    }
                    if(slide.zIndex){
                      _Style[`--s__${_class_slide_Id}_zIndex__`]=slide.zIndex;
                      _Style[`--overlay__${_class_slide_Id}_zIndex__`]=slide.zIndex-1;                      
                    }
                  }
                  var ts = {transform:`translate3d(0, var(--s__${_class_slide_Id}_heigth__), 0)`,opacity: 1,zIndex: `var(--s__${_class_slide_Id}_zIndex__)`};
                  var ovts = {opacity: 1,zIndex: `var(--overlay__${_class_slide_Id}_zIndex__)`};
                  return (
                      <div className={slide.display?'active':''} style={_Style}>
                        <div className="SlideOption" style={ts}>
                          {slide.content?slide.content:null}
                        </div>
                        {slide.display?<div className={`SlideOptionOverlay ${slide.display?'show':''}`}  style={ovts} onClick={this.Close.bind(this,slideId)}/> :null}        
                      </div>
                    ) 
                }
              })
            }                 
          </div>
         )
  }
}


function mapStateToPropsDialog(state, ownProps) {
  return {
    list: state.dialog.options_slide,
    dialogObserve: state.dialog.dialogObserve    
  };
}

function mapDispatchToPropsDialog(dispatch) {
  return {
    actions: bindActionCreators(dialogActions, dispatch)
  };
}

export default connect(mapStateToPropsDialog, mapDispatchToPropsDialog)(SlideOptionHRM);

