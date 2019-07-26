

import React, { Component } from 'react';
import { NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as commonActions from '../../state/commonActions';
import * as Util from '../../state/Util';
import Icons from '../Icons/Icons';
import SlideMenu from '../SlideMenu';
import WithScroll from '../scroll-decorator';

import './style.css';

var sections = [
  {name:"filters",path:'/filters',icon:'filter'},  
  {name:"location",path:'/location',icon:'position'}
];


class Header extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      visible:false,
      show_title:false,
      widthList:[],
      screen_size:0,
      totalHeight:0,
      path:'',
      index:0,
      indexUpd:0
    };
  }



  componentWillMount(){  
    this.OpenSlideMenu = this.OpenSlideMenu.bind(this);
    this.CloseSLideMenu = this.CloseSLideMenu.bind(this);   
    this.scrollhandler = this.scrollhandler.bind(this);
  }

  componentWillUnmount(){  
    var _th = this;
    if(_th.intTimer){
      clearInterval(_th.intTimer)
    }
  }

  componentDidMount(){
    var _th = this;    
    var rt= window.location.hash.split('/')[1]?window.location.hash.split('/')[1].split('/')[0]:'';   
    sections.map((d,i)=>{      
      if(d.path==='/'+rt){
        _th.setState({index:i})
      }
    })    
  }

  OpenSlideMenu(){
    if(this.SM && this.SM.state.visible){
      this.SM.Close();      
    }else{
      this.SM.Open();      
    } 
    this.setState({indexUpd:this.state.indexUpd+1});
  }

  CloseSLideMenu(){
    if(this.SM){
      this.SM.Close();
    }    
  }

  changetheme(){
    Util.changetheme();
  }

  UpdateIndex(i){    
    this.setState({index:i});
    if(this.SM){
      this.SM.Close();
    }    
  }


  scrollhandler(i){
    if(i>55){
      this.setState({show_title:true});
    }else{
      this.setState({show_title:false});
    }    
  }

   ref = r => {
    this.SM = r
  }

  ref_akm = r => {
    this.akm = r
  }

  render() {
      const {scrollhandler} = this;
      const {user} = this.props;
      const {index} = this.state;
      var indcatorSize = this.state.widthList?this.state.widthList[this.state.index]:null;
      var tabIndicator = {width: `0px`, left: `0px`};
      if(indcatorSize){
        tabIndicator = {width: `${indcatorSize.w}px`, left: `${indcatorSize.l}px`}
      }

    

     
         
      var _pth = window.localStorage.getItem('path')?Util.Base64.decode(window.localStorage.getItem('path')):'';
      return ( 
        <div>
          <SlideMenu ref={this.ref}>
            <div className="headerMobileLogo">
              <div className="email_content">{user.email}</div>
              
            </div>
            <nav className="navSlideBox" id="navigation" role="navigation" aria-hidden="false">
              <ul role='menubar'>
                {sections.map((tb,i)=>{
                  var active_ = false;                  
                  //var _i = parseInt(window.localStorage.getItem('c_id'));
                  if(index===i){
                    active_ = true;
                  }
                  return(
                    <li onClick={()=>this.UpdateIndex(i)} className={`${active_?'_activeNav':''}`}  tab-slide-index={i} key={i}>
                      <NavLink  to={{pathname: tb.path}} className="logo" role="slide_item">
                        <div className="icon" >
                          <Icons name={tb.icon} size={24}/>
                        </div>
                        <div className="text">
                          {tb.name}  
                        </div>
                                        
                      </NavLink>                      
                    </li>
                  )
                })                
                }                                          
              </ul>                
            </nav>
          </SlideMenu>
          <header className="left_Header is-fixed in-transition" role="banner">               
            <button className="c-toggle"  onClick={this.OpenSlideMenu}>
              <svg className="" fill="#888" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"></path><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>
            </button>
            <WithScroll scrollhandler={scrollhandler}/>            
            <NavLink  to={{pathname: "/"}} className="logo">
                           
            </NavLink>
            <div className="flexSpace"> </div>
            <nav className="navBox" role="navigation" aria-hidden="false">
              <ul role="menubar" ref={this.ref_tab}>
                {sections.map((tb,i)=>{                    
                    return(
                      <li onClick={()=>this.UpdateIndex(i)}  className={`${index===i?'_activeNav':''}`} tab-nav-index={i} key={i}>   
                        <NavLink  to={{pathname: tb.path}} className="menuitem" role="slide_item">
                          {tb.name}
                        </NavLink>
                      </li>
                    )
                  })
                }                             
              </ul>
              <span id="header-tabs-nav__indicator" className="c-tabs-nav__indicator" style={tabIndicator}></span>
            </nav>
          </header>
          </div>
        );
     
  }  
}


function mapStateToProps(state, ownProps) {
  return {       
    user:state.common.user,
    users:state.common.users,
    isValidToken: state.common.isValidToken,
    screen_size: state.common.screen_size,
    path: state.common.path,
  };
}
function mapDispatchToProps(dispatch) {
  return {     
    commonActions: bindActionCreators(commonActions, dispatch)
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);





