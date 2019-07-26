import * as types from '../constants/ActionTypes';
import { GRAPHQLURL } from '../constants/Api';
import * as _Util from './Util';



/***********************************************************************************     COMMON   ***************************************************************************************************/

export const _GRAPHQLURL = GRAPHQLURL
 
export function LoadTokenAnnonimus() {
      return function (dispatch, getState) {
        _Util.fetchPostUrl(`${GRAPHQLURL}/verifyTokenAnonimus`) 
        .then(res => {   
          if(res && res.token){
            window.localStorage.setItem('jwt',res.token);
            dispatch(LoadData());       
          }
        }).catch(error => {      
          console.log(error);
        });
      }
    }



export function LoadData() {
  return function (dispatch, getState) {
    var doc = {id:'dgt047j3',limit:1000,page:1,sortBy:'date.desc'};
    const query= ` 
    query($doc: FindbyIdUser!){
      payload:  getUsersbyId(user: $doc) {
        id, 
        email        
      }
    }  
    `;
    let variables={doc};
    _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
    .then(res => {
      if(res && res.data && res.data.payload){        
        dispatch(getLocations());
        dispatch(setAuthenticate(true));  
        dispatch(appLoaded(true));
      }else{
        dispatch(appLoaded(true));
        
      }      
    }).catch(error => {      
      console.log(error); //eslint-disable-line
    });
  }
}



/******************************************************************************************************************************************************************************************
 * 
 * 
 * 
 * ********************************************************************************************************************************************************************************************************************************************
 * **********************************************************************************************************************
 * 
 * 
 * ********************************************************************************************************************************************************************************************************************************************
 * **********************************************************************************************************************
 *                LOCATION C-R-U-D ACTIONS 
 * 
 * ********************************************************************************************************************************************************************************************************************************************
 * **********************************************************************************************************************
 * 
 * **********************************************************************************************************************
 * ********************************************************************************************************************************************************************************************************************************************
 * **********************************************************************************************************************
 * **********************************************************************************************************************
 * 
 * 
 * ***************************************************************************************************************************************************************************************
 */









export function getLocations() {
  return function (dispatch, getState) {
    var doc = {id:'dgt047j3',limit:20,page:1,sortBy:'date.asc'};
    const query= ` 
    query($doc: FindLocation!){
      payload:  getLocationsAll(location: $doc) {
        id,
        description,
        area        
      }
    }  
    `;
    let variables={doc};
    _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
    .then(res => {
      if(res && res.data && res.data.payload){
        var _ll = _Util.convertArray2Obj(res.data.payload,'id');
        dispatch(UpdKeyValue({key:'locations',value:_ll}));
        dispatch(callLocationOberves())         
      }    
    }).catch(error => {      
      console.log(error); //eslint-disable-line
    });
  }
}


export function getLocationbyID(doc) {
  return function (dispatch, getState) {    
    const query= ` 
    query($doc: FindbyIdLocation!){
      payload:  getLocationsbyId(location : $doc) {        
        id, 
        area,
        description,
        serialNumbers{
          id,
          partNumber{
            id,
            description
          }                 
        }
      }
    }  
    `;
    let variables={doc};
    _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
    .then(res => {
      if(res && res.data && res.data.payload){  
        const state = getState().common;
        var _locations = state.locations;
        var _sn2 = res.data.payload;
        _sn2['serialNumbers'] = _Util.convertArray2Obj(_sn2['serialNumbers']);      
        _locations[_sn2.id]=_sn2;            
        dispatch(UpdKeyValue({key:'locations',value:_locations}));       
        dispatch(callLocationOberves()) 
      }else{
        
      }      
    }).catch(error => {      
      console.log(error); //eslint-disable-line
    });
  }
}







export function AddLocation(doc) {
  return function (dispatch, getState) {    
    const query= ` 
    mutation($doc: NewLocation!){
      payload:  addLocation(location: $doc) {
        id, 
        description,area
      }
    }  
    `;
    let variables={doc};
    _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
    .then(res => {
      if(res && res.data && res.data.payload){            
        const state = getState().common;
        var _Location = state.locations;
        _Location[res.data.payload.id] = res.data.payload;        
        dispatch(UpdKeyValue({key:'locations',value:_Location}));  
        dispatch(callLocationOberves())       
      }     
    }).catch(error => {      
      console.log(error); //eslint-disable-line
    });
  }
}



export function UpdLocation(doc) {
  return function (dispatch, getState) {    
    const query= ` 
    mutation($doc: UpdateLocation!){
      payload:  updateLocation(location: $doc) {
        id, 
        description,area
      }
    }  
    `;
    let variables={doc};
    _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
    .then(res => {
      if(res && res.data && res.data.payload){            
        const state = getState().common;
        var _Location = state.locations;
        _Location[res.data.payload.id] = res.data.payload;        
        dispatch(UpdKeyValue({key:'locations',value:_Location}));  
        dispatch(callLocationOberves())       
      }        
    }).catch(error => {      
      console.log(error); //eslint-disable-line
    });
  }
}





export function RmvLocation(doc) {
  return function (dispatch, getState) {    
    const query= ` 
    mutation($doc: UpdateLocation!){
      payload:  removeLocation(location: $doc) 
    }  
    `;
    let variables={doc};
    _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
    .then(res => {  
      if(res && res.data && res.data.payload){     
        const state = getState().common;
        var _Location = state.locations;         
        delete _Location[doc.id];  
        dispatch(UpdKeyValue({key:'locations',value:_Location}));  
        dispatch(callLocationOberves())       
      }        
    }).catch(error => {      
      console.log(error); //eslint-disable-line
    });
  }
}





/******************************************************************************************************************************************************************************************
 * 
 * 
 * 
 * ********************************************************************************************************************************************************************************************************************************************
 * **********************************************************************************************************************
 * 
 * 
 * ********************************************************************************************************************************************************************************************************************************************
 * **********************************************************************************************************************
 *                PARTS NUMBERS C-R-U-D ACTIONS 
 * 
 * ********************************************************************************************************************************************************************************************************************************************
 * **********************************************************************************************************************
 * 
 * **********************************************************************************************************************
 * ********************************************************************************************************************************************************************************************************************************************
 * **********************************************************************************************************************
 * **********************************************************************************************************************
 * 
 * 
 * ***************************************************************************************************************************************************************************************
 */










export function getParts() {
  return function (dispatch, getState) {
    var doc = {id:'dgt047j3',limit:50,page:1,sortBy:'date.desc'};
    const query= ` 
    query($doc: FindPart!){
      payload:  getPartsAll(part: $doc) {
        id, 
        description,
        inStock
      }
    }  
    `;
    let variables={doc};
    _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
    .then(res => {
      if(res && res.data && res.data.payload){  
        var _partNumbers = _Util.convertArray2Obj(res.data.payload,'id');
        dispatch(UpdKeyValue({key:'partNumbers',value:_partNumbers}));
        dispatch(callformOberves()) 
      }else{
        
      }      
    }).catch(error => {      
      console.log(error); //eslint-disable-line
    });
  }
}


export function getPartbyID(doc) {
  return function (dispatch, getState) {    
    const query= ` 
    query($doc: FindbyIdPart!){
      payload:  getPartsbyId(part: $doc) {
        id, 
        inStock,
        description,
        serialNumbers{
          id,
          lastLocation,
          partNumber{
            id            
          }        
        }
      }
    }  
    `;
    let variables={doc};
    _Util.fetchGraphQL(GRAPHQLURL,{query,variables}) 
    .then(res => {   
      if(res && res.data && res.data.payload){  
        const state = getState().common;
        var _partNumbers = state.partNumbers;
        var _sn2 = res.data.payload;
        //var loc = _sn2['serialNumbers']?_Util.Base64.decode(_sn2['serialNumbers']):null;
        _sn2['serialNumbers'] = _Util.convertArray2Obj(_sn2['serialNumbers'],'id');
        _partNumbers[_sn2.id]=_sn2;
        dispatch(UpdKeyValue({key:'partNumbers',value:_partNumbers}));       
        dispatch(callformOberves()) 
      }else{
        
      }      
    }).catch(error => {      
      console.log(error); //eslint-disable-line
    });
  }
}





/******************************************************************************************************************************************************************************************
 * 
 * 
 * 
 * ********************************************************************************************************************************************************************************************************************************************
 * **********************************************************************************************************************
 * 
 * 
 * ********************************************************************************************************************************************************************************************************************************************
 * **********************************************************************************************************************
 *                REDUX ACTIONS 
 * 
 * ********************************************************************************************************************************************************************************************************************************************
 * **********************************************************************************************************************
 * 
 * **********************************************************************************************************************
 * ********************************************************************************************************************************************************************************************************************************************
 * **********************************************************************************************************************
 * **********************************************************************************************************************
 * 
 * 
 * ***************************************************************************************************************************************************************************************
 */







export function setAuthenticate(res) {
  return {
    type: types.AUTHENTICATE_SUCCESS,
    authenticate : res
  };
}




export function UpdKeyValue(res) {
  return {
    type: types.UPD_KEY_VALUE,
    kv : res
  };
}



export function UpdIsMobile(res) {
  return {
    type: types.ISMOBILE_SUCCESS,
    isMobile : res
  };
}


export function appLoaded(res) {
  return {
    type: types.APPLOADED_SUCCESS,
    appLoaded: res
  };
}
 

 

  export function ScreenSize(res) {
    return {
      type: types.SCREEN_SIZE,
      screen_size : res
    };
  }

  export function setPath(res) {
    return {
      type: types.CURRENT_PATH,
      path: res
    };
  }


  export function UpdateFormbyName(form,v){
    return function (dispatch, getState) { 
      const state = getState().common;
      UpdForm(state,dispatch,form,v);
    }
  }
  
   
  
  export function UpdateForm(form,fld,v){
    return function (dispatch, getState) {   
      const state = getState().common;
      var _forms = state.forms;
      if(!_forms[form]){
        _forms[form] = {}
      }
      _forms[form][fld] =v;    
      UpdForm(state,dispatch,form,_forms[form]);
    }
  }


  function UpdForm(state,dispatch, form,v){
    var __forms = state.forms; 
    var foBs =  state.formObserve + 1;
    if(!__forms[form]){
      __forms[form] = {}
    }
    __forms[form] =v;
    dispatch(retrieveFormSuccess(__forms)); 
    dispatch(retrieveFormOberves(foBs)); 
  }
  

  export function callformOberves(){
    return function (dispatch, getState) {  
      const state = getState().common;      
      var foBs =  state.formObserve + 1;   
      dispatch(retrieveFormOberves(foBs)); 
    }
  }


  export function callLocationOberves(){
    return function (dispatch, getState) {  
      const state = getState().common;      
      var foBs =  state.locationOberves + 1; 
      dispatch(UpdKeyValue({key:'locationOberves',value:foBs}));
    }
  }


  export function retrieveFormSuccess(res) {
    return {
      type: types.FORMS_SUCCESS,
      forms : res
    };
  }
  
  export function retrieveFormOberves(res) {
    return {
      type: types.FORMS_OBSERVES,
      formObserve : res
    };
  }
  

