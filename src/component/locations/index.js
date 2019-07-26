import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../../state/commonActions';
import * as dialogActions from '../../state/dialogActions';

import Icons from '../Icons/Icons';
import InputTextHRM from '../InputTextHRM';


import * as Util from '../../state/Util';
import './style.css';


/*
Location Component with actions : list , add, filter, edit , delete;
*/

var _Type = 'Location'

class Location extends Component {
  constructor(props) {
    super(props);  
    this.state = {      
      active:0,
      asc:false,
      key:0,      
      _list_:[],
      filters:{}             
    };
  }

   componentWillMount(){      
      this.props.actions.getLocations();
   }


  componentDidMount() {      
      window.localStorage.setItem('path',Util.Base64.encode('Location'));
           
  }  

  componentWillUnmount(){
      
  }

  componentWillReceiveProps(nextProps){
    var _th = this;
    var _initvalue = this.props.locationOberves?this.props.locationOberves:null;
    var next_initvalue = nextProps.locationOberves?nextProps.locationOberves:null;
    if(_initvalue!==next_initvalue){
      var _list = _th.filterSearch();
      _th.setState({_list_:_list});
    }
  }

/*
open_actionsOptions  launch a ActionsOptionLocation Components on a Dialog with redux service,
 sending a Id for unique dialog, component to show, height and Index for css style;   
*/


open_actionsOptions(i){ 
   this.setState({id2edit:i});
   var formName = `options_${_Type}`;    
   var _id = Util.Base64.encode(`_${formName}_`); 
   var _cont = <ActionsOptionLocation handle_Delete={this.handleDeleteAction.bind(this)} handle_Edit={this.OpenEditAction.bind(this)} _close={this.close_actionsOptions.bind(this)} />
   var options = {id:_id,zIndex:150,height:450,content:_cont};
   this.props.dialogActions.OpenSlideOption(options);
 }

 close_actionsOptions(){
   var formName = `options_${_Type}`;    
   var _id = Util.Base64.encode(`_${formName}_`); 
   var options = {id:_id};
   this.props.dialogActions.CloseSlideOption(options);
 }



 handleDeleteAction(i){
   var _id = i?i:this.state.id2edit?this.state.id2edit.id:null;
   if(_id && _Type===`Location`){
     this.props.actions.RmvLocation({id:_id});
   }
   this.close_actionsOptions();
 }


 OpenEditAction(i){    
   var formName = `upd_${_Type}`;
   if(i){
    this.props.actions.UpdateFormbyName(formName,i);
   }else{
    this.props.actions.UpdateFormbyName(formName,this.state.id2edit);
   }
   var _id = Util.Base64.encode(`_${formName}_`);
   this.close_actionsOptions();
   var _content = <div className="__form__"><FormsLocationN formName={formName} type={_Type} upd={true} handleSaveEdit={this.handleSaveEdit.bind(this)} closeDialog={this.close_AddSlide.bind(this)}/> </div>;
   
   var options = {id:_id,zIndex:300,content:_content};
   this.props.dialogActions.OpenView(options);    
 }


 CloseEditAction(){
   var formName = `upd_${_Type}`;
   var _id = Util.Base64.encode(`_${formName}_`);
   var options = {id:_id};
   this.props.dialogActions.CloseView(options);
 }


 RmvConfirmDialogAlert(i){
  var _id = i?i:this.state.id2edit?this.state.id2edit.id:null;
  if(_id && _Type===`Location`){
    this.props.actions.RmvLocation({id:_id});
  }
  var formName = `alert_remove_${_Type}`;
  var _id = Util.Base64.encode(`_${formName}_`);
  var options = {id:_id};
  this.props.dialogActions.CloseDialog(options);
}




CloseRmvDialogAlert(i){
  var formName = `alert_remove_${_Type}`;
  var _id = Util.Base64.encode(`_${formName}_`);
  var options = {id:_id};
  this.props.dialogActions.CloseDialog(options);
}


 OpenRmvDialogAlert(i){   
  var formName = `alert_remove_${_Type}`;    
  var _id = Util.Base64.encode(`_${formName}_`); 
  var _cont = <div className="__dialog_delete_">
    <div  className="_remove_label_"> remove location</div> 
    <div className="_remove_alert_">
      <div className="_icon">
        <Icons name={'alert'} color={'#d50000'} size={24}/>
      </div>
      <div className="_left">
        <div className="_msg">
            {`The location ${i} will be deleted.`} 
        </div>
      </div>
    </div>
    <div  className="_remove_body_"> 
    </div>
    <div  className="_action_remove__"> 
      <div  className="_action_left__">
        <div className="center--padding--btn-login">
          <div className="center--Container grayStyle" onClick={this.CloseRmvDialogAlert.bind(this)} style={{"--color-tab--base--hover":'#777'}}>
            <div className="hoverDiv grayStyle "/>
            <span className="text2D grayStyle">{`Cancelar`}</span>              
          </div>   
        </div>

        <div className="center--padding--btn-login">
          <div className="center--Container grayStyle" onClick={this.RmvConfirmDialogAlert.bind(this,i)} style={{"--color-tab--base--hover":'#777'}}>
            <div className="hoverDiv Alert_red "/>
            <span className="text2D Alert_red">{`Delete`}</span>              
          </div>   
        </div>
      </div> 
    </div> 
  </div>
  var options = {id:_id,zIndex:500,height:450,content:_cont};
  this.props.dialogActions.OpenDialog(options);    
}




OpenAddSlide(){   
   var formName = `add_${_Type}`;    
   var _id = Util.Base64.encode(`_${formName}_`); 
   var _cont = <div className="__form__"><FormsLocationN formName={formName} type={_Type} upd={false} handleSaveEdit={this.handleSaveEdit.bind(this)} closeDialog={this.close_AddSlide.bind(this)}/> </div>
   var options = {id:_id,zIndex:500,height:450,content:_cont};
   this.props.dialogActions.OpenView(options);    
 }
    
 close_AddSlide(){
   ['add_','upd_'].map(d=>{
      var formName = `${d}${_Type}`;    
      var _id = Util.Base64.encode(`_${formName}_`);     
      var options = {id:_id};
      this.props.dialogActions.CloseView(options); 
   })
 }

 handleSaveEdit(){
   var formName = `add_${_Type}`;    
   var _id = Util.Base64.encode(`_${formName}_`);     
   var options = {id:_id};
   this.props.dialogActions.CloseView(options); 
 }
 


 handleOptionsFiltersChanges(i){
   this.close_FilterOptions();
   var _filter = this.state.filters;
   Util.ObjectKeys(i).map(fld=>{
      _filter[fld] = i[fld];
   })
   this.setState({filters:_filter})
 }

 copyToClipboard(i){
   Util.copyToClipboard(i);
 }

 sortOptions(){
   this._refSort.Open();
 }

 filterOptions(){
   this._refFilter.Open();
 }

 refSort = r => {
   this._refSort = r
 }

 refFilter = r => {
   this._refFilter = r
 }



newSearch(){
   this.setState({_search:!this.state._search});
 }


 clearSearch(){   
   this.setState({_search:!this.state._search});
   var field= `location`;
   this.props.actions.UpdateForm('search',field,'');
   this.setState({_list_:[]});
 }
 
 
 filterSearch(){
   const {forms,locations} = this.props;
   const {_search} = this.state;
   var field= `location`;
   var _2search =  forms['search']?forms['search'][field]?forms['search'][field]:null:null;
   if(_2search==='*'){
      return Util.convertObj2Array(locations);
   }
   else if( _search && _2search && _2search.toString().length>0){
      var _h = Util.convertObj2Array(locations).filter(d=>d.id.toString().toLowerCase().indexOf(_2search.toString().toLowerCase())>=0 || d.area.toString().toLowerCase().indexOf(_2search.toString().toLowerCase())>=0);  
      return  _h
   }else{
      return  []
      
   } 
 }


 handlerInputSearch(){ 
   var _list = this.filterSearch();
   this.setState({_list_:_list});
}



  render() {
      const { screen_size, formObserve} = this.props;      
      const { _search,_list_} = this.state;     
     
      return (
         <div >           
            <div className={'content_details'}/>                 
            <div className={`hirecGFkZElucHV0`} style={{'--checkBox--button--color':'#f2f2f2','--checkBox--button--Active--color':'#ff7817'}}>
               <div className="tab-label-title"><span>Locations</span></div>
               <div className={'__add_btn_wrapper'}>
                  <div className="flexSpace"/> 
                  <div className={`__add__menu__btn__ `}  onClick={this.OpenAddSlide.bind(this)}>
                     <Icons name={'add'} color={'#555'} size={18}/>
                     <span>Add Location</span>
                  </div>
                  <div className="flexSpace"/> 
               </div> 
               {_search? 
                  <div className={`_btn_group_search`}>
                     <div className={`email--login`}>            
                        <InputTextHRM icon={`more_vert`} form={'search'} field={`location`} placeholder={'Location'} OnChange={this.handlerInputSearch.bind(this,`Location`)} tabindex="2"/>
                     </div>
                     <div className="center--padding--btn-login">
                        <div className="center--Container grayStyle" onClick={this.clearSearch.bind(this)} style={{"--color-tab--base--hover":'#777'}}>
                           <div className="hoverDiv orangeFlex "/>
                           <span className="text2D orangeFlex">{`Clear Search`}</span>              
                        </div>   
                     </div>
                  </div>:                 
                     <div className="center--padding--btn-login">
                        <div className="center--Container grayStyle" onClick={this.newSearch.bind(this)} style={{"--color-tab--base--hover":'#777'}}>
                           <div className="hoverDiv orangeFlex "/>
                           <span className="text2D orangeFlex">{`New Search`}</span>              
                        </div>   
                     </div>                 
                  }                 
               <div className="filter--cards--wrapers">
                  {_list_?_list_.map((bl,_ind)=>{ 
                        return (
                           <div className="filter--cards  location_item" key={bl.id}>
                              <div className={`top--secction `}>
                                 <div className="service--areas">
                                    <div className="label partNumber" onClick={this.copyToClipboard.bind(this,bl.id)}>    
                                       {bl.id}          
                                    </div>
                                    <div className="description">
                                       {bl.area}
                                    </div>                          
                                 </div>    
                                 <div className="flexSpace"/> 
                                 <div className={'_actions_wrapper_'}>
                                    {screen_size>719?<div className="actions_pn" onClick={this.OpenEditAction.bind(this,bl)}>                                 
                                       <Icons name={'note'} color={'var(--color-base--hover)'} size={24}/>                                                               
                                    </div>:null}
                                    {screen_size>719?<div className="actions_pn" onClick={this.OpenRmvDialogAlert.bind(this,bl.id)}>                                 
                                       <Icons name={'delete'} color={'#555'} size={24}/>                                                               
                                    </div>:null}
                                 </div> 
                                 {screen_size<720?
                                 <div className="actions_pn" onClick={this.open_actionsOptions.bind(this,bl)}>                                 
                                    <Icons name={'more_vert'} color={'#555'} size={18}/>                                                               
                                    </div> 
                                    :null}
                              </div>                                              
                           </div>                                         
                        )
                     }):null
                  }         
               </div>
            </div>           
         </div>
      ) 
  }
}




function mapStateToProps(state, ownProps) {
   return {     
     locations:state.common.locations,  
     users:state.common.users,     
     forms:state.common.forms,
     formObserve:state.common.formObserve,
     locationOberves:state.common.locationOberves,
     serviceAreas:state.common.serviceAreas,
     screen_size: state.common.screen_size,      
   };
 }
 

 function mapDispatchToProps(dispatch) {
   return {
     actions: bindActionCreators(commonActions, dispatch),     
     dialogActions: bindActionCreators(dialogActions, dispatch)

   };
 }
 
 export default connect(mapStateToProps, mapDispatchToProps)(Location);






 class FormsLocation extends Component {
   constructor(props) {
     super(props);  
     this.state = {
       visible :false,
       active:0,
       validForm:true,
       asc:true      
     };
   }
   componentDidMount() {  
     
   }  
   componentWillUnmount(){
     
   }
 
   
 
   handlerSaveForm(){ 
     const {forms, formName, upd } = this.props; 
     var _2s = forms[formName]?forms[formName]:null;
     delete _2s['owners'];
     var _2validate = {
       id:{minLength:6},
       description:{required:true},
       area:{minLength:6},
     }
     var _Valid = Util.validations(_2validate,_2s); 
     if(_Valid.valid){
       if(upd && _2s.id){
         delete _2s['owners'];
         this.props.actions.UpdLocation(_2s);        
         this.props.actions.UpdateFormbyName(formName,{});
       }else{
         delete _2s['owners'];
         this.props.actions.AddLocation(_2s);       
         this.props.actions.UpdateFormbyName(formName,{});
       }
       this.dialogClose();      
     }
   }
 
   handlerInputValue(field,value){ 
     
   }
 
   handleSaveEdit(i){    
     if(typeof this.props.handleSaveEdit === "function"){      
       this.props.handleSaveEdit(i)
     }
   }
 
 
   dialogClose(){
     if(typeof this.props.closeDialog === "function"){      
       this.props.closeDialog();
     }      
     
   }
 
   ref = r => {
     this.MS_Elem = r
   }
   render() {  
     const { formName, forms  } = this.props;
     const { validForm } = this.state;
     var typeList = {'gastos':{name:'gastos'},'ingresos':{name:'ingresos'},'attendance':{name:'asistencia'}};
     return (
       <div className="__form_group__">
         <div  className={`_form_group_cancel_`}>
           <div className={'__save__btn '}>
             <div className="center--Container grayStyle" onClick={this.dialogClose.bind(this)} style={{"--color-tab--base--hover":'#777'}}>
               <div className="hoverDiv grayStyle "/>
               <span className="text2D grayStyle">{`Cancel`}</span>              
             </div> 
           </div>
           <div className="flexSpace"/>
           {validForm?
           <div className={'__save__btn '} >
             <div className="center--Container grayStyle" onClick={this.handlerSaveForm.bind(this)} style={{"--color-tab--base--hover":'#777'}}>
               <div className="hoverDiv orangeFlex "/>
               <span className="text2D orangeFlex">{`Save`}</span>              
             </div> 
           </div> :null}         
         </div>
         <div className={`_form_group_field_`}>            
           <InputTextHRM icon={`textFormat`} form={formName} field={`id`} minLength={6} placeholder={'Name'} OnChange={this.handlerInputValue.bind(this,`id`)}  initvalue={forms[formName]?forms[formName][`id`]:null}/>
         </div>        
         <div className={`_form_group_field_`}>                 
           <InputTextHRM icon={`bubbles`} form={formName} field={`description`} placeholder={'Description'} OnChange={this.handlerInputValue.bind(this,`description`)}  initvalue={forms[formName]?forms[formName][`description`]:null}/>
         </div>
         <div className={`_form_group_field_`}>                 
           <InputTextHRM icon={`bubbles`} form={formName} field={`area`} placeholder={'Area'} OnChange={this.handlerInputValue.bind(this,`area`)}  initvalue={forms[formName]?forms[formName][`area`]:null}/>
         </div>
       </div>
       ) 
   }
 }

 
 function mapStateToProps6(state, ownProps) {
   return {
     forms: state.common.forms,
     formObserve: state.common.formObserve,       
   };
 }
 
 function mapDispatchToProps6(dispatch) {
   return {
     actions: bindActionCreators(commonActions, dispatch)
   };
 }
 
 var FormsLocationN =  connect(mapStateToProps6, mapDispatchToProps6)(FormsLocation);
 
 
 



 


class ActionsOptionLocation extends Component {
   constructor(props) {
     super(props);  
     this.state = {
       visible :false,
       active:0,
       confirmDelete:false,
       editSecction:false,
       asc:true      
     };
   }
   componentDidMount() {  
     
   }  
   componentWillUnmount(){
     
   }
   handleConfirmDelete(i){
     this.setState({confirmDelete:false});
     if(typeof this.props.handle_Delete === "function"){
       this.props.handle_Delete(i)
     }
   }
 
   handleDelete(i){
     this.setState({confirmDelete:!this.state.confirmDelete});  
   }
 
 
 
   handleEdit(i){
     if(typeof this.props.handle_Edit === "function"){      
       this.props.handle_Edit(2)
     }
   }
 
   handlerEmailInput(e){
 
   }
 
   goback(e){
     this.setState({editSecction:false}); 
     if(typeof this.props.handle_Edit === "function"){
       this.props.handle_Edit(325)
     }
   }
 
   handleSaveEdit(e){    
     if(typeof this.props._close === "function"){ 
       this.setState({editSecction:false})     
       this.props._close()
       this.props.handle_Edit(325)
     }
   }

   

   render() {          
     const { editSecction } = this.state; 
     return (
         <div className={`option--wrapper ${editSecction?'is_forms_active':''}`}>
           <div className={'__header--'}>
             {this.state.editSecction?<div onClick={this.goback.bind(this)} className={'__back__icon'}><Icons name={'arrowBack'} color={'#1967d2'} size={18}/></div>:<h5>Filters</h5>}             
             <div className="flexSpace"/>
             <div className={'__save__btn '}>
               <div className="center--Container grayStyle" onClick={this.handleSaveEdit.bind(this)} style={{"--color-tab--base--hover":'#777'}}>
                 <div className="hoverDiv orangeFlex "/>
                 <span className="text2D orangeFlex">{`Save`}</span>              
               </div> 
             </div>                        
           </div>
           <div className="__body__">
             <div className="__menu__">
               <div className={`__action_options--  `} onClick={this.handleEdit.bind(this)}>
                 <div  className={'__icons--'}>
                   <Icons name={'note'} color={'#1967d2'} size={18}/>
                 </div>
                 <div  className={'__descr__'}>
                   {'edit'}
                 </div>                
               </div>            
               <div className="flexContainerH delete" >
                 <div className="flexContainerSldH" style={{transform: `translate3d(${this.state.confirmDelete?'-100%':'0'}, 0px, 0px)`}}>  
                   <div className={`__action_options--`} onClick={this.handleDelete.bind(this)}>            
                     <div className={'__icons--'}>
                       <Icons name={'delete'} color={'#1967d2'} size={18}/>
                     </div>
                     <div  className={'__descr__'}>
                         {'remove'}
                     </div>
                   </div>
                   <div className={`__action_options-- confirmDelete`} >            
                     <div className={'__icons--'} onClick={this.handleDelete.bind(this)}>
                       <Icons name={'cancel'} color={'#1967d2'} size={18}/>
                     </div>
                     <div  className={'__descr__'}>
                         {'Are you sure you want to remove it?'}
                     </div>
                     <div className={'__icons--'} onClick={this.handleConfirmDelete.bind(this,)}>
                       <Icons name={'success'} color={'#1967d2'} size={18}/>
                     </div>
                   </div>
                 </div>        
               </div>
             </div>
           </div>
         </div>
       ) 
   }
 }
 
 
 
 
 

