import fetch from 'isomorphic-fetch';
import CryptoJS from 'crypto-js';
import loadScript from 'load-script';


var _root =null, dark = false;


export function getSDK (url, sdkGlobal, sdkReady = null, isLoaded = () => true) {
    if (window[sdkGlobal] && isLoaded(window[sdkGlobal])) {
      return Promise.resolve(window[sdkGlobal])
    }
    return new Promise((resolve, reject) => {
      if (sdkReady) {
        const previousOnReady = window[sdkReady]
        window[sdkReady] = function () {
          if (previousOnReady) previousOnReady()
          resolve(window[sdkGlobal])
        }
      }
      loadScript(url, err => {
        if (err) reject(err)
        if (!sdkReady) {
          resolve(window[sdkGlobal])
        }
      })
    })
  }
  


const fingerprint_GLOBAL = 'Fingerprint2'
const fingerprint_URL = `https://cdnjs.cloudflare.com/ajax/libs/fingerprintjs2/1.8.0/fingerprint2.min.js`


export function getFingerPrint() {
    return new Promise((resolve, reject) => {        
        getSDK(fingerprint_URL, fingerprint_GLOBAL).then(fp => {
            fp().get(function(result, components) { 
                resolve(result);
            })    
        }) 
    })      
  };
  

  export function copyToClipboard(str) {    
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };



export function isJson(s) {
    var r =false;try{JSON.parse(s);r=true; }catch(e){r =false;}return r
  }
  
  
export function list2Array(a) {
    var r = [];
    for(let x=0;x<a.length;x++){
        r.push(a[x]);
    }
    return r;
}
   



export const Base64 = {
  
  
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  
  
    encode: function(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
  
        input = Base64._utf8_encode(input);
  
        while (i < input.length) {
  
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
  
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
  
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
  
            output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
  
        }
  
        return output;
    },
  
  
    decode: function(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
  
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
  
        while (i < input.length) {
  
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));
  
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
  
            output = output + String.fromCharCode(chr1);
  
            if (enc3 !== 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 !== 64) {
                output = output + String.fromCharCode(chr3);
            }
  
        }
  
        output = Base64._utf8_decode(output);
  
        return output;
  
    },
  
    _utf8_encode: function(string) {        
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
  
        for (var n = 0; n < string.length; n++) {
  
            var c = string.charCodeAt(n);
  
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
  
        }
  
        return utftext;
    },
  
    _utf8_decode: function(utftext) {
        var string = "";
        var i = 0,c1,c2,c3;
        var c = c1 = c2 = 0;
  
        while (i < utftext.length) {
  
            c = utftext.charCodeAt(i);
  
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
  
        }
  
        return string;
    }
  
  }
 








export const getClassCode = id => {
    var cClss = Base64.encode(id).toString()
    var h = new RegExp('=','g')
    cClss=cClss.replace(h,'');
    return cClss;
    
};



export const cleanbase64 = id => {
    var cClss = id;
    var h = new RegExp('=','g')
    cClss=cClss.replace(h,'');
    return cClss;
    
};

export const UniqueArray = (c) => {
    var a = JSON.stringify(c);
    a = JSON.parse(a);
    var t = [],tobj = {};
    for(var i=0;i<a.length;i++){
        if(!tobj[a[i].id]){            
            t.push(a[i]);
            tobj[a[i].id]=true
        }
    }
    return t;
}






export function compareArraybyID(arr1,arr2) {
    var ta1 = arr1.map(d=>d.id);
    var ta2 = arr2.map(d=>d.id);
    return JSON.stringify(ta1)===JSON.stringify(ta2)
}

export function convertArray2Obj(arr1,key) {
    key=key?key:'id';
    var obj ={};
    if(arr1.length>0){
        arr1.map(s=>{
            obj[s[key]]=s;
        })
    }else{
        obj = null
    }
   return obj;
}

export function convertArray2ObjGroupby(arr1,key) {
    key=key?key:'id';
     var obj ={};
    if(arr1.length>0){
        arr1.map(s=>{
            if(!obj[s[key]]){
                obj[s[key]]=[];
            }
            obj[s[key]].push(s);
        })
    }else{
        obj = null
    }
   return obj;
}

export function convertObj2Array(obj) {
    var arr = [];
    obj && ObjectKeys(obj).map(o=>{
        arr.push(obj[o]);
    })    
   return arr;
}




export const monthsList_Short =[``,`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`];


export const _dayShortNames = {"en":['S','M','T','W','T','F','S'],"es":['D','L','M','M','J','V','S']}
export const _monthNames = {"en":['','January','February','March','April','May','June','July','August','September','October','November','December'],"es":['','Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']}
export const _dayLargeNames = {"en":["Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday", "Saturday"],"es":["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes", "Sabado"]} ;




export function parseDate(d) {
    var lng = localStorage.getItem('lng');
    d = Number(d);     
    var tp =  new Date(d);
    return `${_monthNames[lng][tp.getMonth()+1]} ${tp.getDate()}, ${tp.getFullYear()}`;
}

export function parseFullDate(d) {
    var lng = localStorage.getItem('lng');
    d = Number(d);     
    var tp =  new Date(d);
    return `${tp.getDate()} de ${_monthNames[lng][tp.getMonth()+1]} del ${tp.getFullYear()}`;
}


export function parseDateShort(d) {
    d = Number(d);     
    var tp =  new Date(d);
    return `${monthsList_Short[tp.getMonth()+1]} ${tp.getDate()}`;
}

export function parseDay(d) {
    d = Number(d);     
    var tp =  new Date(d);
    return `${tp.getDate()}`;
}

export function parseMonthShort(d) {
    d = Number(d);     
    var tp =  new Date(d);
    return `${monthsList_Short[tp.getMonth()+1]}`;
}

export function sumArraybyKey(a,k) {
    var sumK = 0;
    a.map(d=>{
        sumK += d[k];
    })
    return sumK.toFixed(2);
}







export function GroupbyKey(a,key) {
    var gb = {}
    a.map(d=>{            
        if(!gb[d[key]]){
            gb[d[key]] = [];
        }
        gb[d[key]].push(d);
    })
    return gb;
}

export function febMaxDays(year){
    if ( (year%100!==0)){
        if((year%4===0) || (year%400===0)){
            return 29;
        }else{
            return 28;
        }
    }else{
      return 28;
    }
  }

export function NextMonth(month){
    if (month>8){
      return `${month}`;
    }else{
      return `0${month}`;
    }
  }




export function getJson2P(p){
    return JSON.parse(p);
}

export function ObjectKeys(p) {    
    var r =[];
    try{
       r= Object.keys(p);       
    }
    catch(e){
        for (var k in p) {
           r.push(k);
        }
    }
    return r
  }


  

export function MaxDayperMotnh(yyyy,mm){
    if(!yyyy || !mm){
        return null
    }
    var y = parseInt(yyyy.toString()),m= parseInt(mm.toString())
    var _dayPerMonth = [0,31,febMaxDays(y),31,30,31,30,31,31,30,31,30,31]
    return _dayPerMonth[m];
}

  
export function isInteger(f) {
    return typeof(f)==="number" && f%1===0;
}

export function isFloat(f) {
   return typeof(f)==="number" && f%1!==0;
}

export const extList = {
    webp:`image/webp`,
    jpg:`image/jpg`,
    png:`image/png`,
    gif:`image/gif`,
    ts:`video/MP2T`,
    m3u8:`application/x-mpegURL`,
    mp4:`video/MP4`,
    m4s:`text/plain`,
    js:`application/javascript; charset=UTF-8`,
    css:'text/css; charset=utf-8',
    mpd:`application/dash+xml`,
    svg:`image/svg+xml`,
    html:`text/html; charset=UTF-8`
} 

export function isEmail(value){
    const re = /.+@.+/;
    var rs = false;    
    if (re.test(value)) {
        rs = true
    }
    return rs;
}








export function ValidateForm(fmr,fv){
    var rs = {valid:false,fld:''};
    if(fmr){
        rs = {valid:true,fld:''};        
        ObjectKeys(fmr).map(fl=>{
            var params = fv[fl];
            var isValid = ValidateField(fmr[fl],params);        
            if(!isValid.valid){
                rs = isValid;
                return rs;
            }
        })
    }        
    return rs;
}

function isNumeric(num){
    return !isNaN(num)
}

export function ValidateField(value,params){
    var rs = {valid:true,msg:''};    
    ObjectKeys(params).map(pr=>{   
        if(pr==='required'){
            if(value.length==0){
                rs = {valid:false,msg:params[pr]['msg']}
            }
        } 
        if(pr==='number'){            
            if(isNaN(value)){
                rs = {valid:false,msg:params[pr]['msg']}
            }
        }    
        if(pr==='minLenght'){
            if(value.length<params[pr]['value']){
                rs = {valid:false,msg:params[pr]['msg']}
            }
        }
        if(pr==='minValue'){
            if(value<=params[pr]['value']){
                rs = {valid:false,msg:params[pr]['msg']}
            }
        }
        if(pr==='maxLenght'){
            if(value.length>params[pr]['value']){
                rs = {valid:false,msg:params[pr]['msg']}
            }
        }
        if(pr==='maxValue'){
            if(value>=params[pr]['value']){
                rs = {valid:false,msg:params[pr]['msg']}
            }
        }
        
    })
    return rs;
}



String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

Date.prototype.getWeek = function() {
    var date = new Date(this.getTime());
     date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                          - 3 + (week1.getDay() + 6) % 7) / 7);
  }
  
  // Returns the four-digit year corresponding to the ISO week of the date.
  Date.prototype.getWeekYear = function() {
    var date = new Date(this.getTime());
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    return date.getFullYear();
  }


  Date.prototype.dayOfYear= function(){
    var j1= new Date(this);
    j1.setMonth(0, 0);
    return Math.round((this-j1)/8.64e7);
}


  export function getBrowser(usera) {
    var useragent = usera || navigator.userAgent;
    var os = false;
    var browser = false;
    var icon = '';
    var name = '';
    var verTag = '';
    var nameTrans = '';
    var current = false;
    var brand = false;
    var details = {};

    if (Object(useragent).details !== undefined) {
        return useragent.details;
    }
    useragent = (' ' + useragent).toLowerCase();

    
    if (useragent.indexOf('windows phone') > 0) {
        icon = 'wp.png';
        os = 'Windows Phone';
    }
    else if (useragent.indexOf('android') > 0) {
        os = 'Android';
    }
    else if (useragent.indexOf('windows') > 0) {
        os = 'Windows';
    }
    else if (useragent.indexOf('iphone') > 0) {
        os = 'iPhone';
    }
    else if (useragent.indexOf('imega') > 0) {
        os = 'iPhone';
    }
    else if (useragent.indexOf('ipad') > 0) {
        os = 'iPad';
    }
    else if (useragent.indexOf('mac') > 0
        || useragent.indexOf('darwin') > 0) {
        os = 'Apple';
    }
    else if (useragent.indexOf('linux') > 0) {
        os = 'Linux';
    }
    else if (useragent.indexOf('blackberry') > 0) {
        os = 'Blackberry';
    }

    if (useragent.indexOf(' edge/') > 0) {
        browser = 'Edge';
    }
    else if (useragent.indexOf('iemobile/') > 0) {
        icon = 'ie.png';
        brand = 'IEMobile';
        browser = 'Internet Explorer';
    }
    else if (useragent.indexOf('opera') > 0 || useragent.indexOf(' opr/') > 0) {
        browser = 'Opera';
    }
    else if (useragent.indexOf(' dragon/') > 0) {
        icon = 'dragon.png';
        browser = 'Comodo Dragon';
    }
    else if (useragent.indexOf('vivaldi') > 0) {
        browser = 'Vivaldi';
    }
    else if (useragent.indexOf('maxthon') > 0) {
        browser = 'Maxthon';
    }
    else if (useragent.indexOf('electron') > 0) {
        browser = 'Electron';
    }
    else if (useragent.indexOf('palemoon') > 0) {
        browser = 'Palemoon';
    }
    else if (useragent.indexOf('cyberfox') > 0) {
        browser = 'Cyberfox';
    }
    else if (useragent.indexOf('waterfox') > 0) {
        browser = 'Waterfox';
    }
    else if (useragent.indexOf('iceweasel') > 0) {
        browser = 'Iceweasel';
    }
    else if (useragent.indexOf('seamonkey') > 0) {
        browser = 'SeaMonkey';
    }
    else if (useragent.indexOf('lunascape') > 0) {
        browser = 'Lunascape';
    }
    else if (useragent.indexOf(' iron/') > 0) {
        browser = 'Iron';
    }
    else if (useragent.indexOf('avant browser') > 0) {
        browser = 'Avant';
    }
    else if (useragent.indexOf('polarity') > 0) {
        browser = 'Polarity';
    }
    else if (useragent.indexOf('k-meleon') > 0) {
        browser = 'K-Meleon';
    }
    else if (useragent.indexOf(' crios') > 0) {
        browser = 'Chrome';
        details.brand = verTag = 'CriOS';
    }
    else if (useragent.indexOf('chrome') > 0) {
        browser = 'Chrome';
    }
    else if (useragent.indexOf('safari') > 0) {
        verTag = 'Version';
        browser = 'Safari';
    }
    else if (useragent.indexOf('firefox') > 0) {
        browser = 'Firefox';
    }
    else if (useragent.indexOf(' otter/') > 0) {
        browser = 'Otter';
    }
    else if (useragent.indexOf('thunderbird') > 0) {
        browser = 'Thunderbird';
    }
    else if (useragent.indexOf('es plugin ') === 1) {
        icon = 'esplugin.png';
        browser = 'ES File Explorer';
    }
    else if (useragent.indexOf('megasync') > 0) {
        browser = 'MEGAsync';
    }
    else if (useragent.indexOf('msie') > 0
        || useragent.indexOf('trident') > 0) {
        browser = 'Internet Explorer';
    }

    // Translate "%1 on %2" to "Chrome on Windows"
    if ((os) && (browser)) {
        name = (brand || browser) + ' on ' + os;
        //nameTrans = String(l && l[7684]).replace('%1', brand || browser).replace('%2', os);
    }
    else if (os) {
        name = os;
        icon = icon || (os.toLowerCase() + '.png');
    }
    else if (browser) {
        name = browser;
    }
    else {
        name = 'Unknown';
        icon = 'unknown.png';
    }
    if (!icon && browser) {
        if (browser === 'Internet Explorer' || browser === 'Edge') {
            icon = 'ie.png';
        }
        else {
            icon = browser.toLowerCase() + '.png';
        }
    }

    details.name = name;
    details.nameTrans = nameTrans || name;
    details.icon = icon;
    details.os = os || '';
    details.browser = browser;
    details.version =
        (useragent.match(RegExp("\\s+" + (verTag || brand || browser) + "/([\\d.]+)", 'i')) || [])[1] || 0;

    // Determine if the OS is 64bit
    details.is64bit = /\b(WOW64|x86_64|Win64|intel mac os x 10.(9|\d{2,}))/i.test(useragent);

    // Determine if using a browser extension
    details.isExtension = (current  || useragent.indexOf('megext') > -1);

    if (useragent.indexOf(' MEGAext/') !== -1) {
        var ver = useragent.match(/ MEGAext\/([\d.]+)/);

        details.isExtension = ver && ver[1] || true;
    }

    if (brand) {
        details.brand = brand;
    }

    // Determine core engine.
    if (useragent.indexOf('webkit') > 0) {
        details.engine = 'Webkit';
    }
    else if (useragent.indexOf('trident') > 0) {
        details.engine = 'Trident';
    }
    else if (useragent.indexOf('gecko') > 0) {
        details.engine = 'Gecko';
    }
    else {
        details.engine = 'Unknown';
    }

    // Product info to quickly access relevant info.
    details.prod = details.name + ' [' + details.engine + ']'
        + (details.brand ? '[' + details.brand + ']' : '')
        + '[' + details.version + ']'
        + (details.isExtension ? '[E:' + details.isExtension + ']' : '')
        + '[' + (details.is64bit ? 'x64' : 'x32') + ']';
        
    return details;
}



  var month= 6,
  _dayPerMonth = [0,31,febMaxDays((new Date()).getFullYear()),31,30,31,30,31,31,30,31,30,31],
  _counter = 1;
  //_MonthDataToRender = [];

  var montsDaysSum = 0;
 export function printYear(y){
    var _allYear2Render={};
    montsDaysSum = 0;
    [1,2,3,4,5,6,7,8,9,10,11,12].map(m=>{
      var mnt = printMonth(m,y);
      _allYear2Render[m]=mnt;
    })
    return _allYear2Render;
  }


  export function printMonth(m,year){
    const month_ =   m || month;
    const dateNow = new Date();
    const _day = dateNow.getDate();
    const _month = dateNow.getMonth();
    const _year = dateNow.getFullYear();    
    const _nextDateString = `${NextMonth(month_)}/01/${year}`; 
    const _nextDate = new Date(_nextDateString);
    const _numOfDays = _dayPerMonth[month_];
    _counter=1;
    var _week= 0;
    var _weekdays= _nextDate.getDay();
    var _weekdays2 = _weekdays;
    var _MonthDataToRender=[];
    _MonthDataToRender.push([]);    
    while (_weekdays>0){      
      _weekdays--;
      _MonthDataToRender[_week].push({d:null,cls:"monthPre"})
   } 
   while (_counter <= _numOfDays){   
      if (_weekdays2 > 6){
        _weekdays2 = 0;
        _week++;
        _MonthDataToRender.push([]);         
      } 
      var dayOfyear = _counter+montsDaysSum;
      if (_counter === _day && _month+1 === month_  && year === _year){
        _MonthDataToRender[_week].push({d:_counter,cls:"monthDays dayNow",dy:dayOfyear})
      }

      else if(_weekdays2 ===0){
        _MonthDataToRender[_week].push({d:_counter,cls:"monthDays isWeekEnd",dy:dayOfyear})
      } 
      else if(_weekdays2 ===6){
        _MonthDataToRender[_week].push({d:_counter,cls:"monthDays isWeekEnd",dy:dayOfyear})
      } 
      else{    
        _MonthDataToRender[_week].push({d:_counter,cls:"monthDays",dy:dayOfyear})
      }   
      if(_counter===_numOfDays){        
        montsDaysSum += _numOfDays;       
      }   
      _weekdays2+=1;
      _counter+=1;  

   }  
   return _MonthDataToRender;
  }





  export function printYearWeekly(year){
    var month =   1;   
    var  _nextDateString = `${NextMonth(month)}/01/${year}`; 
    var _nextDate = new Date(_nextDateString);    
    var _numOfDays = _dayPerMonth[month];
    const _numOfYear = 337+  febMaxDays(year);    
        _counter=1;
        var _counterDay = 1;
        var _week= 0;
        var _weekdays= _nextDate.getDay();
        var _weekdays2 = _weekdays;
        var _MonthDataToRender={};        
        while (_counter <= _numOfYear){ 
                    
            if (_weekdays2 > 6){
                _weekdays2 = 0;
                _week++;
                if(!_MonthDataToRender[_week]){
                    _MonthDataToRender[_week] = {}                    
                }
            }            
            if(_weekdays2 ===0){
                if(!_MonthDataToRender[_week]){
                    _MonthDataToRender[_week] = {}                    
                }
                _MonthDataToRender[_week]['start'] = {}
                _MonthDataToRender[_week]['start']['day'] =_counterDay;
                _MonthDataToRender[_week]['start']['class'] ="monthDays isWeekEnd";
                _MonthDataToRender[_week]['start']['month'] = month;
            } 
            else if(_weekdays2 ===6){
                if(!_MonthDataToRender[_week]){
                    _MonthDataToRender[_week] = {}                    
                }
                _MonthDataToRender[_week]['end'] = {}
                _MonthDataToRender[_week]['end']['day'] =_counterDay;
                _MonthDataToRender[_week]['end']['class'] ="monthDays isWeekEnd";
                _MonthDataToRender[_week]['end']['month'] = month;
            }                 
            
            _weekdays2+=1;
            _counter+=1;
            if(_counterDay>=_numOfDays){
                _counterDay =1;
                month += 1;  
                _numOfDays = _dayPerMonth[month];
            }else{
                _counterDay +=1; 
            } 
            
        }
   return _MonthDataToRender;
  }


  export function getDayofyear(d){
    var now = new Date();
    if(d){
        now = new Date(d);
    }
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    return day;
  }


  function SumDays(days) {
    var day0 = -2209143600000 || '12/30/1899';
    var result = new Date(day0);
    result.setDate(result.getDate() + days);
    return result;
  }



  export function hiddeEmail(d){
    var email = '';
      if(d && d.indexOf('@')>3){
        var h = d.split('@')[0];
        var domain = d.split('@')[1];
        var ast2Hdd = h.length;    
        email = h.substring(0, 3);
        for(var i = 1;i< ast2Hdd-3;i++){
            email += `•`;
        }
        email += h.substring(ast2Hdd-1, ast2Hdd);    
        email += '@'+domain;
      }
    
    return email;
  }







export function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    const windowWidth = (window.innerWidth || document.documentElement.clientWidth);

    const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
    const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

    return (vertInView && horInView);
}


export const generateUUID = () => {
    let d = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c)=> {
        let r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
  };
  
   
  export function genId() {
    var ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var ID_LENGTH = 16;
    var rtn = '';
    for (var i = 0; i < ID_LENGTH; i++) {
        rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
    }
    return rtn;
  }
  
  export function gen6CodeId() {
    var ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var ID_LENGTH = 6;
    var rtn = '';
    for (var i = 0; i < ID_LENGTH; i++) {
        rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
    }
    return rtn;
  }



var themes = {
    light :{
        "--dropDown--background--color":"#f9f9f9",
        "--footer--text-color--":" #c4c4c4 ",
        "--background--color--cards":"#fafafa",
        "--slide__card--p-color--":"#6e6e6e",
        "--slide__card--title-color--":"#5e5e5e",
        "--tip__card--p-color--":"#777",
        "--color-logo_":"#333",
        "--color-base--hover":"#039be5",
        "--color-sn--item--success--":"rgb(0, 137, 123)",
        "--backcolor-sn--item--success--":"rgba(0, 137, 123,0.15)",
        "--color-sn--item--error--":"rgb(127, 0, 0)",
        "--backcolor-sn--item--error--":"rgba(127, 0, 0,0.15)",
        "--color-tab--base--hover":"#039be5",
        "--background--color":"#f5f5f5",        
        "--background--header--color":" #f5f5f5",
        "--svg--header--color":" #f5f5f5",        
        "--colorText_":" #263238",
        "--icon--color_":" #b0bec5",
        "--tip__card--backgropund-Color--":"#fff",
        "--screen--width--px--":window.outerWidth+'px',
        "--screen--width--":window.outerWidth,
        "--calendar--back--color--":"rgba(3,155,229,0.075)",
        "--tab--nav-Color--":"#5f6368",    
        "--tab--nav-icon-color--":"#c7c7c7",
        "--fill--theme--color":"#666",

    },dark:{
        "--dropDown--background--color":" #263238",
        "--footer--text-color--":"#3a3a3a ",
        "--screen--width--px--":window.outerWidth+'px',
        "--background--color--cards":" #263238",
        "--slide__card--p-color--":"#aaaaaa",
        "--slide__card--title-color--":"#e5e5e5",
        "--tip__card--p-color--":"#aaaaaa",
        "--color-logo_":"#fff",
        "--color-base--hover":"##ff7817",
        "--color-tab--base--hover":"#039be5",
        "--background--color":" #263238",
        "--background--header--color":" #263238",
        "--colorText_":" #e5e5e5",
        "--icon--color_":" #b0bec5",
        "--tip__card--backgropund-Color--":"#444",
        "--tab--nav-Color--":"#aaaaaa",
        "--tab--nav-icon-color--":"#aaaaaa",
        "--svg--header--color":" #f5f5f5",  
        "--fill--theme--color":"#f5f5f5"
    }
}


  
  export function changetheme(s){
      if(!_root){
          _root = document.getElementById('root');
      }    
      if(s){
          _root.style = convertJson2Style(themes.light);       
        }
      else{
          dark = !dark;
          dark?_root.style = convertJson2Style(themes.dark):_root.style = convertJson2Style(themes.light);          
      }          
  }

  export function changethemeKey(th,k,v){
    themes[th][k] = v;
    dark?_root.style = convertJson2Style(themes.dark):_root.style = convertJson2Style(themes.light);
  }

  
    const convertJson2Style =(j) =>{
        var sty = '';
        Object.keys(j).map(k=>{
            sty += `${k}:${j[k]};`; 
        })
        return sty;
    }

  
  


    
    export const parseQuery =(url) =>{
      var urlParams = new URLSearchParams(url);
      var  obj = {};
      var entries = urlParams.entries();
      for(var pair of entries) { 
          obj[pair[0]]= pair[1]; 
      }    
      return obj
    } 
  
  
 

    
  export const getClientError = errors => {
      if (!errors) {
        return;
      }
      const error = errors[0].message;
      if (!error || error.indexOf('{"_error"') === -1) {
        return {_error: 'Server query error'};
      }
      return JSON.parse(error);
  };
  
  export const prepareGraphQLParams = graphParams => {    
      graphParams.query = graphParams.query.replace(/\s/g, '');
      return JSON.stringify(graphParams);
      
  };
  
  
  export const prepareBodyParams = q => {
      return JSON.stringify(q);
  };
  
  
  
  
  
  
  
  export const  fetchGraphQL = async (url,graphParams) => {
      const serializedParams = prepareGraphQLParams(graphParams);
      //console.log(serializedParams)
      var Skey = window.localStorage.getItem('hash');
      var fp = window.localStorage.getItem('fpXb');
      var tempK = genId();
  
  
      
      var encRypt = CryptoJS.AES.encrypt(serializedParams, tempK).toString()
      var encRyptK = CryptoJS.AES.encrypt(tempK, fp).toString()
  
      var bsParams = JSON.stringify({q:Base64.encode(encRypt),k:Base64.encode(encRyptK)});
      //var bsParams = JSON.stringify({q:Base64.encode(serializedParams)});    
      var authToken = window.localStorage.getItem('jwt');
      var fbtkClnt = window.localStorage.getItem('fbtkClnt');
      const graphQLUrl = `${url}/streamInventoryData`;
      const res = await fetch(graphQLUrl, {
        method: 'post',
        headers: {
          //'Content-Type': 'text/plain',
          'Content-Type': 'application/json',
          'Authorization': `${authToken}:${fp}`,
          'x-fb-tk': `${fbtkClnt}`,        
        },
        body: bsParams
      });
      const resJSON = await res.text();    
      var _Data = {};
      var basD = Base64.decode(resJSON);  
      if(isJson(basD)){        
          var basdJson = JSON.parse(basD)
          if(basdJson.status===200){            
              var kb = CryptoJS.AES.decrypt(basdJson.k, fp).toString(CryptoJS.enc.Utf8);
              var decdData = CryptoJS.AES.decrypt(basdJson.r, kb).toString(CryptoJS.enc.Utf8);
              if(isJson(decdData)){
                  _Data = JSON.parse(decdData);
              }
          }if(basdJson.status===500){
              
          }
      }     
      const {data, errors} = _Data;
      //console.log(data)
      return {data, error: getClientError(errors)};
  };
  
    

    export const fetchGetUrl = async v => {
      var authToken = window.localStorage.getItem('jwt');
      var fp = window.localStorage.getItem('fpXb'); 
      const res = await fetch(v, {
        method: 'get',     
        headers: {
          //'Content-Type': 'text/plain',
          'mode': 'no-cors',
          'Content-Type': 'application/json',
          'Authorization': `${authToken}:${fp}`,
        },     
      });
      const resJSON = await res.json();    
      return resJSON;
    };
    
  
    export const fetchPostUrl = async v => {
      var authToken = window.localStorage.getItem('jwt');
      var fp = window.localStorage.getItem('fpXb'); 
      const res = await fetch(v, {
        method: 'post',
        headers: {
          //'Content-Type': 'text/plain',
          'Content-Type': 'application/json',
          'Authorization': `${authToken}:${fp}`,
        },
        body:``     
      });
      const resJSON = await res.json();    
      return resJSON;
    };
    
  

  

  export function ssnValidate(v){
      return /^[\dX]{3}-?[\dX]{2}-?[\dX]{4}$/.test(v)
  }
  
  export function phoneValidate(v){
      return /^[\dX]{3}-?[\dX]{3}-?[\dX]{4}$/.test(v)
  }
  
  export function dobValidate(v){
      return /^(\d{2})(\/)(\d{2})(\/)(\d{4})$/.test(v)
  }
  
  export function isNumber(v){
      return /\[0-9]/.test(v)
  }
  
  
  
  

export  var validations = function(validate,data){
    var rs = {valid:true,msg:''};
    ObjectKeys(data).map(fld=>{
      var _value =data[fld];
      ObjectKeys(validate[fld]).map(vld=>{
        if(vld==='minLength'){
          if(_value.toString().length<validate[fld][vld]){
            rs = {valid:false,msg:'value lenght is not enough'};
          }        
        }
        if(vld==='number' && validate[fld][vld]){
          let _v = !isNaN(_value)?true:false;  
          rs = {valid:_v,msg:'number invalid'};      
        }
        if(vld==='minValue'){
          if(_value<validate[fld][vld]){
            rs = {valid:false,msg:'value is less than the required'};
          }        
        }
        if(vld==='date' && validate[fld][vld]){
          let _v = !isNaN(_value)?(new Date(parseInt(_value.toString()))).getTime()?true:false:false;    
          rs = {valid:_v,msg:'date invalid'};     
        }
        if(vld==='phone' && validate[fld][vld]){
            let _v = /^[\dX]{3}-?[\dX]{2}-?[\dX]{4}$/.test(_value)   
            rs = {valid:_v,msg:'phone invalid'};     
        } 
        if(vld==='ssn' && validate[fld][vld]){
            let _v = /^[\dX]{3}-?[\dX]{2}-?[\dX]{4}$/.test(_value)   
            rs = {valid:_v,msg:'ssn invalid'};     
        }
        if(vld==='email' && validate[fld][vld]){
            let _v = emailValidate(_value)   
            rs = {valid:_v,msg:'email invalid'};     
        }               
      })
    })
    return rs;
  }



  export function date2pretyfy(dt) {
    var date = dt?!isNaN(dt)?new Date(parseInt(dt.toString())):new Date():new Date();   
    return `${monthsList_Short[date.getMonth()+1]} ${date.getDate()}, ${date.getFullYear()}`;  
  }


  export function dateWday2pretyfy(dt) {
    var y = new Date(dt);
    var date = dt?isNaN(y.getTime())?new Date():y:y;
    return `${_dayLargeNames['es'][date.getDay()].slice(0,3)}, ${date.getDate()} ${monthsList_Short[date.getMonth()+1]}`;  
  }
  
  export function weekdate2pretyfy(dt) {
    var date = !isNaN(dt)?new Date(parseInt(dt.toString())):new Date(); 
    var ws = new Date(date.setDate(date.getDate() + (0-date.getDay())));
    var we = new Date(date.setDate(date.getDate() + (6-date.getDay())));   
    return `${monthsList_Short[ws.getMonth()+1]} ${ws.getDate()} - ${monthsList_Short[we.getMonth()+1]} ${we.getDate()}`;  
  }



export function emailValidate(v){
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v)
}



