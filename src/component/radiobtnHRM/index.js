import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../../state/commonActions';
// import {Util} from '..'
import './style.css';



class RadioBtnHRM extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      data :{},
      _active:0        
    };
  }
  componentDidMount() {   
  const { initvalue} = this.props;
  if(initvalue){
    var inD = 0;
    this.props.list.map((l,i)=>{
      if(l===initvalue){
        inD = i;
      }
    });
    this.setState({_active:inD});
  } 
}

componentWillReceiveProps(nextProps){
  var _initvalue = this.props.initvalue?this.props.initvalue:null;
  var next_initvalue = nextProps.initvalue?nextProps.initvalue:null; 
  if(_initvalue!==next_initvalue){
    if(this.props.list[this.state._active]!==next_initvalue){
      var inD = 0;      
      this.props.list.map((l,i)=>{
        if(l===next_initvalue){
          inD = i;
        }
      });      
      this.setState({_active:inD});
    }    
  }
}
  

componentWillMount(){

}




  handleSetItem(k,i){   
    const {form,field} = this.props;
    this.setState({_active:i}); 
    if (typeof this.props.OnChange === 'function') { 
      this.props.OnChange(k);      
      this.props.actions.UpdateForm(form,field,k); 
    }   
  }

  render() {
    const {list} = this.props;
     const {_active} = this.state;
      return (    
          <div className={'hrmRadioButtonGroup'}>             
            {list.map((dw,i)=>{
                return( <div key={i} className={`hrmRadioButton ${_active===i?'_active':''}`} onClick={this.handleSetItem.bind(this,dw,i)}>{dw}</div>)
              })
            }               
          </div>
      ) 
  }
}




function mapStateToProps(state, ownProps) {
  return {
    forms: state.common.forms,
    formObserve: state.common.formObserve
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(commonActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(RadioBtnHRM);

