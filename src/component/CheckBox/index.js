

import React, { Component } from 'react';

import './style.css';

export default class InputCheckBox extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      active : false,
      removeOption:false
    };
  }
  componentWillMount() {    
    this.updateState = this.updateState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    const { initvalue} = this.props;
    if(initvalue){
      this.setState({active:initvalue});
    }      
  }

  componentWillReceiveProps(nextProps){
    var _initvalue = this.props.initvalue?this.props.initvalue:null;
    var next_initvalue = nextProps.initvalue?nextProps.initvalue:null;
    if(_initvalue!==next_initvalue){      
      this.setState({active:next_initvalue});
    }
  }

  componentDidMount() {  
     
  }

  updateState(e){
    this.setState({[e.key]:e.value});
  }


  handleChange(e){   
    var _th6 = this;
    //const {form,field} = _th6.props;
    //this.props.actions.UpdateForm(form,field,!this.state.active);
    if(!this.props.disabled){
      if(typeof this.props.updChange === 'function') {      
        this.props.updChange(!this.state.active)
      }    
      this.setState({active:!this.state.active});  
    }
  
  }

  render() {
    return (    
        <div className={`toggle-container ptoggle-button ${this.state[`active`]?'_active':''}`} onClick={this.handleChange} >
          <div  className="toggle-bar ptoggle-button"></div>
          <div className="toggle-button ptoggle-button" >
            <div  className="pripple" style={{opacity: 0.00448}}></div>
            <div className="pripple"></div>
          </div>
          <div className="toggle-label ptoggle-button"></div>
        </div> 
    )       
    
  }
}


