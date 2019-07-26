

import React, { Component } from 'react';
import { withRouter,Switch,Route} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../state/commonActions';


import LoadingColorSpinner from './Icons/LoadingColorSpinner';

import Filters from './filters';
import Locations from './locations';
import DialogHRM from './DialogHRM';
import ViewHRM from './ViewHRM';
import SlideOptionHRM from './SlideOptionHRM';

import Header from './Header';



class Home extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      route_list : [],
      setting:false,
      badUser:false
    };
  }



  componentWillMount(){  
    this.resize = this.resize.bind(this);
    window.addEventListener('resize',this.resize);
    this.resize();
  }

  componentWillUnmount(){
    window.removeEventListener('resize',this.resize);    
  }

  componentDidMount(){
    this.props.commonActions.LoadTokenAnnonimus();
  }

  resize(e){
    if(this.props.commonActions){
      this.props.commonActions.ScreenSize(window.outerWidth);
    }   
  }

 

  render() {
    const {appLoaded,authenticate,_active} = this.props;
    if(appLoaded){
      if(authenticate){
        return (
          <div className={`App ${_active?'':'not_active'}`}>     
            <Header/>     
            <div id="content_body">    
              <Switch>
                <Route exact path="/"  component={Filters} />
                <Route path="/location" component={Locations} />
                <Route path="/filters" component={Filters} />
              </Switch>
            </div>
            <DialogHRM/>
            <ViewHRM/>
            <SlideOptionHRM/> 
          </div>
        );
      }else{
        return (<div></div>)
      }      
    }else{
      return (
        <div className="loadingScreen">
          <LoadingColorSpinner stroke={'#fff'}/>
        </div>
      )
    }
  }  
}


function mapStateToProps(state, ownProps) {
  return {       
    appLoaded: state.common.appLoaded,
    _active:state.common._active, 
    authenticate: state.common.authenticate
  };
}

function mapDispatchToProps(dispatch) {
  return {     
    commonActions: bindActionCreators(commonActions, dispatch)
  };
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));


