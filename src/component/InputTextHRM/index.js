
import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../../state/commonActions';
import * as Util from '../../state/Util';


import './style.css';


class InputTextHRM extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      drowndropInputText : ``,
      text:'',
      valid:true,
      msg:'',
      removeOption:false
    };
  }
  componentWillMount() { 
    const {forms,form,field} = this.props;    
    this.updateState = this.updateState.bind(this);
    this.clear = this.clear.bind(this);    
    const { initvalue} = this.props;
    if(initvalue){
      this.setState({text:initvalue});
    } 
  }

  componentWillReceiveProps(nextProps){
    var _initvalue = this.props.initvalue?this.props.initvalue:null;
    var next_initvalue = nextProps.initvalue?nextProps.initvalue:null;
    if(_initvalue!==next_initvalue){
      this.setState({text:next_initvalue});
    }
  }


  componentDidMount() {  
     
  }
  updateState(e){    
    this.setState({[e.key]:e.value});
  }

 
  handleKeyUp = e => {    
    if(e.keyCode){
      if(e.keyCode===13 || e.keyCode===27){    
        //
      } 
    }    
  };
  

OnChange(e){  
  var _th6 = this;
  const {props} = _th6;  
  const {form,field,email,address} = this.props;    
  if (typeof props.OnChange === 'function') { 
    props.OnChange(e);
  } 
}


updState(e){    
  this.setState({[e.key]:e.value});
}



handleClickFocus = e => {
  var inF  = this.Elm.getElementsByTagName('input');   
  for(var i in inF){
    var ia = inF[i];            
    if(ia.childNodes){              
      if(this.Elm.contains(ia)){
        ia.focus();break;                
      }
    }
  } 
}

handleFocus = e => {    
  this.setState({focus:true}); 
}

handleBlur = e => { 
  this.setState({focus:false}); 
}

clear = e => { 
  const { form } = this.props;  
  this.setState({error:false,text:''});
  this.props.actions.UpdateFormbyName(form,{});
}

handleChange = e => {
  const { form , email, ssn, minLength, minValue, number, date, phone, field } = this.props;  

  if(date){
    if (typeof this.props.dateChange === 'function') { 
      this.props.dateChange();       
    }
  }else{
    if (e.keyCode === 13) {
      if (typeof this.props._enter === 'function') { 
        this.props._enter();       
      }    
    }else{
      var v = e.target.value;  
      var valid = {v:true,m:''};
      if(email){
        Util.emailValidate(v)?valid={v:true,m:''}:valid={v:false,m:'email not valid'};
      }
      if(ssn){
        Util.ssnValidate(v)?valid={v:true,m:''}:valid={v:false,m:'ssn not valid'};
      }
      if(phone){
        Util.phoneValidate(v)?valid={v:true,m:''}:valid={v:false,m:'phone not valid'};
      }
      if(number){  
        isNaN(v)?valid={v:false,m:'number not valid'}:valid={v:true,m:''};    
      }    
      if(minValue){
        v<minValue?valid={v:false,m:'number not valid'}:valid={v:true,m:''};          
      }
      if(minValue){
        v<minValue?valid={v:false,m:'value is less than the required'}:valid={v:true,m:''};
      }
      if(minLength){
        v.toString().length<minLength?valid={v:false,m:'value lenght is not enough'}:valid={v:true,m:''};
      }
      this.setState({text:v,valid:valid.v,msg:valid.m});   
      this.props.actions.UpdateForm(form,field,v);
      if (typeof this.props.OnChange === 'function') { 
        this.props.OnChange(v);       
      }        
    }
     
  }
    
}
  


ref = r => {
  this.Elm = r
}

render() {  
  var _th6 = this;
  const {number,email,placeholder,formObserve,dark,forms,form,field} = this.props;

  var labelFl = {position: 'absolute', transform: `translate3d(0px, 2px, 0)`}
  var BoxB = {}
  var inpSty = {}
  var ftext = forms[form]?forms[form][field]:'';    
  var labelField = ftext || '';
  var isText = ftext?ftext.toString().length:0;
  if(isText>0){
    labelFl = {position: 'absolute',transform: `translate3d(-5px, -25px, 0)`,transformOrigin: '93.5px center 0px',fontSize:'12px',color:`var(--color-base--hover)`}    
  } 
  if(this.state.focus){
    labelFl = {position: 'absolute',color:`var(--color-base--hover)`, transform: `translate3d(-5px, -25px, 0)`,transformOrigin: '93.5px center 0px',fontSize:'12px'}
    BoxB = { border: `1px solid var(--color-base--hover)`
   }
  }
  if(!this.state.valid){
    labelFl = {position: 'absolute',color:`#b71c1c`, transform: `translate3d(-5px, -25px, 0)`,transformOrigin: '93.5px center 0px',fontSize:'12px'}
    BoxB = { border: `1px solid #b71c1c`
   }
  }
  var placeholderText = this.state.msg || placeholder;
  var inpuType = 'text';
  if(number){
      inpuType = 'number';
  }
  if(email){
      inpuType = 'email';
  }  
  return(   
    <div className="Wxwduf" style={BoxB} onClick={this.handleClickFocus} ref={this.ref}>      
      <input type={inpuType} value={labelField} onChange={this.handleChange} onFocus={this.handleFocus} onKeyUp={this.handleChange}  onBlur={this.handleBlur} style={inpSty}/> 
      <div className="_label" style={labelFl} >{placeholderText}</div>      
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

export default connect(mapStateToProps, mapDispatchToProps)(InputTextHRM);



