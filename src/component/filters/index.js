import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActions from '../../state/commonActions';
import InputTextHRM from '../InputTextHRM';
import * as Util from '../../state/Util';
import './style.css';
import Icons from '../Icons/Icons';
import TabsHRM from '../TabsHRM';

var _tabs = [{pth:'partNumber',name:'Part Number'},{pth:'location',name:'Location'}];


const jsPDF = window.jsPDF;
const QRCode = window.QRCode;

const JsBarcode = window.JsBarcode;










class Filters extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      active :false,
      index:0             
    };
  }
  componentDidMount() {
      window.localStorage.setItem('path',Util.Base64.encode('Filters'));
  }  
  componentWillUnmount(){
   
  }

  UpdateIndex(i){
   this.setState({index:i});
 }
  
  render() {      
      return (
         <div >
            <div className={'content_details'}/>         
            <div className={`hirecGFkZElucHV0`} style={{'--checkBox--button--color':'#f2f2f2','--checkBox--button--Active--color':'#ff7817'}}>
               <div className="tab-label-title"><span>Filters</span></div>
               <TabsHRM data={_tabs} UpdateIndex={this.UpdateIndex.bind(this)} pth={'filters'} initValue={this.state.index}/>
               <div className="flexContainerH"  style={{overflow:'hidden'}}>
                  <div className="flexContainerSldH" style={{transform: `translate3d(-${this.state.index*100}%, 0px, 0px)`}}>                    
                     <PnFilterRdx />
                     <LctFilterRdx />                   
                  </div>
               </div>
            </div>
         </div>
      ) 
  }
}






function mapStateToProps(state, ownProps) {
   return {     
     user:state.common.user,     
     serviceAreas:state.common.serviceAreas, 
   };
 }
 
 export default connect(mapStateToProps)(Filters);




 /********
 * 
 * 
 * 
 *       Part Number Filter Secction 
 * 
 * 
 * 
 */



 

 
class PnFilter extends Component {
   constructor(props) {
     super(props);
     
     this.state = {
       active:false,
       editingpay:false,
       _sn_ :null     
     };
   }
 
   componentWillMount() {      
      
   }

   componentDidMount(){  
      const {form, item} = this.props;
      this.props.actions.UpdateFormbyName(form,item);
   }
   

   OnChangeActive(v){   
      const {forms,form,_active} = this.props;     
      if(_active){
         this.props.actions.UpdateForm(form,'active',v);
         var filter2Upd = forms[form]?forms[form]:null;
         if(filter2Upd){
            this.props.actions.updateFilters(filter2Upd);
         }
      }      
   }

   handlerInput(fld,v){
     
   }

   handlerAdd(fld,v){
      var formName = 'filters';
      const {forms} = this.props;
      var _frm =  forms[formName]; 
      var _pn =  _frm.partNumber;
      if(_pn){
         this.props.actions.getPartbyID({id:_pn});
      }
      this.setState({_pn_:_pn});
   }

   newSearch(){
      var formName = 'filters';
      this.setState({_pn_:null});      
      this.props.actions.UpdateForm(formName,'partNumber','');
   }
    
   render() {
     var _th6_ = this;
     const {partNumbers} = _th6_.props; 
     const {_pn_} = this.state;
      var _partNumbersFiltered = _pn_ && partNumbers[_pn_]?partNumbers[_pn_]:null;
      
     return(
      <div className="filters__Wrapper">
         {_pn_ && _pn_?
         <div className="center--padding--btn-login">
            <div className="center--Container grayStyle" onClick={this.newSearch.bind(this)} style={{"--color-tab--base--hover":'#777'}}>
               <div className="hoverDiv orangeFlex "/>
               <span className="text2D orangeFlex">{`New Search`}</span>              
            </div>   
         </div>                        
         :
         <div className={`email--login`}>            
               <InputTextHRM icon={`more_vert`} form={'filters'} field={`partNumber`} placeholder={'Part Number'} OnChange={this.handlerInput.bind(this,`partNumber`)} _enter={this.handlerAdd.bind(this)} tabindex="2"/>
         </div>
         }  
         {_partNumbersFiltered && _partNumbersFiltered.id?
           <div>
             
              <div className={`_location_header_`}><span>Part Number: </span> <h5>{_partNumbersFiltered.id}</h5></div>
              <div className={`_location_header_`}><span>Description: </span> <h5>{_partNumbersFiltered.description}</h5></div>
              <div className={`_location_header_`}><span>InStock: </span> <h5>{_partNumbersFiltered.inStock}</h5></div>
             
               <div  className={'_sn_wrapper_list__title__'}>{'Serial Numbers ' }</div>  
               {_partNumbersFiltered.serialNumbers?
                  <div  className={'_sn_wrapper_flex__'}>                       
                  <table className={'_location_history_'}> 
                     <thead>
                        <tr  className={'_location_history_header_'}>         
                           <th >
                              Serial Number
                           </th> 
                           <th >
                           Last Location   
                           </th>                
                        </tr> 
                     </thead>
                  <tbody className={'_location_history_body_'}>            
                  {Object.keys(_partNumbersFiltered.serialNumbers).map((bl2,_ind)=>{
                     var  bl = _partNumbersFiltered.serialNumbers[bl2];
                        return (
                           <tr key={bl2}>
                              <td >{bl.id}</td>
                              <td >{bl.lastLocation}</td>
                           </tr>                        
                        )                        
                     })
                  }
                  </tbody>
               </table> 
            </div> :null}
           </div> 
         :null}
      </div>
     )
   }
 }


 
function mapStateToProps32(state, ownProps) {
   return {
     forms: state.common.forms,
     partNumbers: state.common.partNumbers,
     _active:state.common._active, 
     formObserve: state.common.formObserve
   };
 }
 
 function mapDispatchToProps32(dispatch) {
   return {
     actions: bindActionCreators(commonActions, dispatch)
   };
 }
 
 export const PnFilterRdx = connect(mapStateToProps32, mapDispatchToProps32)(PnFilter);



 
/********
 * 
 * 
 * 
 *       Location Filter Secction 
 * 
 * 
 * 
 */


 
 class LctFilter extends Component {
   constructor(props) {
     super(props);
     
     this.state = {
       active:false,
       editingpay:false,
       _sn_ :null     
     };
   }
 
   componentWillMount() {      
      
   }

   componentDidMount(){  
      const {form, item} = this.props;
      this.props.actions.UpdateFormbyName(form,item);
   }
   
  

   OnChangeActive(v){   
      const {forms,form,_active} = this.props;     
      if(_active){
         this.props.actions.UpdateForm(form,'active',v);
         var filter2Upd = forms[form]?forms[form]:null;
         if(filter2Upd){
            this.props.actions.updateFilters(filter2Upd);
         }
      }      
   }

   handlerInput(fld,v){
     
   }
   
   handlerAdd(fld,v){
      
     var formName = 'filters';
      const {forms} = this.props;
      var _frm =  forms[formName]; 
      var _lct =  _frm.location;
      if(_lct){         
         this.props.actions.getLocationbyID({id:_lct});
      }     
      this.setState({_lct_:_lct});
   }

   newSearch(){
      var formName = 'filters';
      this.setState({_lct_:null});      
      this.props.actions.UpdateForm(formName,'location','');
   }

   Print_Location_Label(i){

      Print_Location_Label(i)
   }

    
   render() {
     var _th6_ = this;
     const {locations} = _th6_.props; 
     const {_lct_} = this.state;     
     var _locationsFiltered = _lct_ && locations[_lct_]?locations[_lct_]:null;
      
      
     return(
      <div className="filters__Wrapper">
         {_lct_ && _lct_?
         <div className="center--padding--btn-login">
            <div className="center--Container grayStyle" onClick={this.newSearch.bind(this)} style={{"--color-tab--base--hover":'#777'}}>
               <div className="hoverDiv orangeFlex "/>
               <span className="text2D orangeFlex">{`New Search`}</span>              
            </div>   
         </div>                        
         :
         <div className={`email--login`}>            
               <InputTextHRM icon={`more_vert`} form={'filters'} field={`location`} placeholder={'Location'} OnChange={this.handlerInput.bind(this,`location`)} _enter={this.handlerAdd.bind(this)} tabindex="2"/>
         </div>
         }  
         {_locationsFiltered && _locationsFiltered.id?
           <div>
             
              <div className={`_location_header_`}><span>Location: </span> <h5>{_locationsFiltered.id}</h5></div>
              <div className={`_location_header_`}><span>Area: </span> <h5>{_locationsFiltered.area}</h5></div>
              <div className={`_location_header_`}><span>InStock: </span> <h5>{_locationsFiltered.serialNumbers?Object.keys(_locationsFiltered.serialNumbers).length:0}</h5></div>
              <div className={'__add_btn_wrapper'}>
                  <div className="flexSpace"/> 
                  <div className={`__add__menu__btn__ `}  onClick={this.Print_Location_Label.bind(this,_locationsFiltered)}>
                     <Icons name={'printer'} color={'#555'} size={18}/>
                     <span>{`Location Label`}</span>
                  </div>
                  <div className="flexSpace"/> 
               </div>

               <div  className={'_sn_wrapper_list__title__'}>{'Serial Numbers ' }</div>  
               {_locationsFiltered.serialNumbers?
                  <div  className={'_sn_wrapper_flex__'}>
                  <table className={'_location_history_'}> 
                     <thead>
                        <tr  className={'_location_history_header_'}>         
                           <th >
                              Serial Number
                           </th> 
                           <th >
                              Part Number   
                           </th>                
                        </tr> 
                     </thead>
                  <tbody className={'_location_history_body_'}>
                  {Object.keys(_locationsFiltered.serialNumbers).map((bl2,_ind)=>{
                     var  bl = _locationsFiltered.serialNumbers[bl2];
                        return (
                           <tr key={bl2}>
                              <td className={'_id_'}>{bl.id}</td>
                              <td className={'_pn_'}>{bl.partNumber && bl.partNumber.id}</td>                              
                           </tr>                        
                        )                        
                     })
                  }
                  </tbody>
               </table> 
            </div> :null}
           </div> 
         :null}
      </div>
     )
   }
 }


 
function mapStateToProps42(state, ownProps) {
   return {
     forms: state.common.forms,
     locations: state.common.locations,
     _active:state.common._active, 
     formObserve: state.common.formObserve
   };
 }
 
 function mapDispatchToProps42(dispatch) {
   return {
     actions: bindActionCreators(commonActions, dispatch)
   };
 }
 
 export const LctFilterRdx = connect(mapStateToProps42, mapDispatchToProps42)(LctFilter);






 function download(content, fileName, contentType) {
   var a = document.createElement("a");
   var file = new Blob([content], {type: contentType});
   a.href = URL.createObjectURL(file);
   a.download = fileName;
   a.click();
 }

 function date2pretyfy(dt) {
   var date = !isNaN(dt)?new Date(parseInt(dt.toString())):new Date();   
   return `${Util.monthsList_Short[date.getMonth()+1]} ${date.getDate()}, ${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()} `;  
 }


 function pretifyDate(dt) {
   var date = !isNaN(dt)?new Date(parseInt(dt.toString())):new Date();   
   return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;  
 }

 function sumPn(arr1,key) {
   key=key?key:'partNumber';
   var obj ={};
   if(Object.keys(arr1).length>0){
      Object.keys(arr1).map(s2=>{        
         var s = arr1[s2] && arr1[s2][key]?arr1[s2][key]['id']:null;
         if(s){
            if(!obj[s]){
               obj[s]=1;
            }else if(obj[s]){               
               obj[s]+=1;
            }            
         }        
      })
   }else{
      obj = {}
   }
   return obj;
}
 



 
 function Print_Location_Label(location){

   

   
   var _id = location.id;
   var pn_l = sumPn(location.serialNumbers,'partNumber');
 
   
   var b_code = getBase64FromBarCode(_id);   
   var qr_code = getBase64FromQRCode(_id);

   var doc = new jsPDF('p', 'in', [4,6])    
   var hguide = 0.93;
   var yguide = 2.2;
   
   qr_code && doc.addImage(qr_code, 'PNG', 3.05,0.95, 0.65, 0.65);
   b_code && doc.addImage(b_code, 'PNG', .25,0.1, 3.4, .75);
   doc.setFont("times");
   doc.setFontType("bold");
   doc.setTextColor(10,10,10);
   doc.setFontSize(42);   
   doc.text(0.21, hguide+0.5, _id);
   doc.setFontSize(22);
   doc.setFontType("normal");
   doc.text(1.81, hguide+1, pretifyDate('dater'));
   Object.keys(pn_l).map(s=>{

      var _bc = getBase64FromBarCode(s)
      var _qc = getBase64FromQRCode(s);
      doc.setFontSize(22);
      doc.setFontType("normal");
      var _pn = `${s}`;
      var _qty  = `QUANTITY: ${pn_l[s]}`;       
      doc.text(0.9, yguide+0.41, _pn);
      doc.setFontSize(26);
      doc.setFontType("bold");
      doc.text(0.41, yguide+0.90, _qty);
      doc.setFontType("normal");
      
      _bc && doc.addImage(_bc, 'PNG', 0.3, yguide+.98, 3.4,0.75);
      _qc && doc.addImage(_qc, 'PNG', 0.21, yguide+.05, 0.45,0.45);    
      yguide+=1.75  
   })  
         
   doc.save(`${_id}_location_${(new Date()).getTime()}.pdf`);  

 }



 function getBase64FromBarCode(text){
   var canvas = document.createElement("canvas");
   JsBarcode(canvas, text, {
      format: "CODE39",    
      lineColor: "#222",
      background: "transparent",
      width:1,
      height:20,
      displayValue: false
      }
   );
   return canvas.toDataURL("image/png");
 }








 function getBase64FromQRCode(t) {   
   var _ImgD = document.createElement('div');
   var Id = Util.genId()+'_Qr';    
   _ImgD.id = Id;
   document.getElementsByTagName('body')[0].appendChild(_ImgD);   
   var qrcode = new QRCode(Id, {
      text: "",
      width: 64,
      height: 64,
      colorDark : "#000000",
      colorLight : "#ffffff"
   });
   qrcode.makeCode(t);
   var gQR = document.getElementById(Id);
   var canvas = gQR.children[0];
   var qr_code = canvas.toDataURL();
   _ImgD.parentNode.removeChild(_ImgD);
   return qr_code; 
 }
 
 