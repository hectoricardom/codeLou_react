import * as types from '../constants/ActionTypes';
import initialState from './initialState';

export default function (state = initialState.common, action) {
  switch (action.type) {

    case types.APPLOADED_SUCCESS:
      return {
        ...state,
        appLoaded: action.appLoaded
      };

    case types.ISMOBILE_SUCCESS:
      return {
        ...state,isMobile: action.isMobile
      };   

    
    case types.SCREEN_SIZE:
      return {
        ...state,
        screen_size: action.screen_size
      };

    case types.CURRENT_PATH:
      return {
        ...state,
        path: action.path
      };
    case types.FORMS_SUCCESS:
      return {
        ...state,
        forms: action.forms
      };

    case types.FORMS_OBSERVES:
      return {
        ...state,
        formObserve: action.formObserve
      };

    case types.USER_SUCCESS:
      return {
        ...state,
        users: action.users
      };

    case types.AUTHENTICATE_SUCCESS:
        return {
          ...state,
          authenticate: action.authenticate
        };

    case types.UPD_KEY_VALUE:
        return {
          ...state,
          [action.kv.key]: action.kv.value
        };
     
        
      
    default:
      return state;
  }
}


