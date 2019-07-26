

import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './state/store';
import { HashRouter } from 'react-router-dom';
import Home from './component'
import * as Util from './state/Util';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      route_list : [],
      setting:false,
      tabs_Open:false,
      badUser:false
    };
  }

  componentDidMount(){
   Util.changetheme(true);   
   window.localStorage.setItem('fpXb',Util.generateUUID());
   window.localStorage.setItem('barCode','BC');
   var numTabs = window.localStorage.getItem('tabs_Open');
   
   //var numTabs = window.localStorage.getItem('fpXb',Util.generateUUID());
   if(numTabs>0){
    //window.close();
    //this.setState({tabs_Open:true})
   }else{
    this.setState({tabs_Open:false})
    window.localStorage.setItem('tabs_Open',1);
   }
  }



 


  render() {
    if(this.state.tabs_Open){
      //return (<div> tabs open</div>)
    }else{   }   
      return (
        <div>
          <Provider store={store}>
            <HashRouter>
              <Home/>
            </HashRouter>                
          </Provider>
        </div>
      );
    }
  
}

export default App;




/*


Message Description
Provider id from request A2TPQ2CHX3CUUS does not match provider id from offer A2CLFZQH1BPS42 for offer 74d8d8ff-1500-439e-acb6-5e6de1a4e81c
amzn1.flex.st.v1.PuyOplzlR1idvfPkv5138g
EMPTY
EMPTY
1560879000000
120m
A2CLFZQH1BPS42


Provider id from request A2TPQ2CHX3CUUS does not match provider id from offer A2CLFZQH1BPS42 for offer 74d8d8ff-1500-439e-acb6-5e6de1a4e81c
amzn1.flex.st.v1.PuyOplzlR1idvfPkv5138g
EMPTY
EMPTY
1560871800000
120m
A2CLFZQH1BPS42
Order Detail

Provider id from request A2TPQ2CHX3CUUS does not match provider id from offer A2CLFZQH1BPS42 for offer 74d8d8ff-1500-439e-acb6-5e6de1a4e81c
amzn1.flex.st.v1.PuyOplzlR1idvfPkv5138g
EMPTY
EMPTY
1560879000000
120m
A2CLFZQH1BPS42
Order Detail


Provider id from request A2TPQ2CHX3CUUS does not match provider id from offer A2CLFZQH1BPS42 for offer 74d8d8ff-1500-439e-acb6-5e6de1a4e81c
amzn1.flex.st.v1.PuyOplzlR1idvfPkv5138g
EMPTY
EMPTY
1560871800000
120m
A2CLFZQH1BPS42
Order Detail



#311b92

*/