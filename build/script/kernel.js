// FILE ID: core.Main
"use strict";
(function(toString,undef){var global=(function(){return this||(1,
eval)("this")})();
if(Object.defineProperty&&Object.defineProperties){var add=function(target,name,method){Object.defineProperty(target,name,{value:method,
configurable:true,
enumerable:false,
writeable:true})}}else{var add=function(target,name,method){target[name]=method}};
var cache={global:global};
var declareNamespace=function(name,object){var splits=name.split(".");
var current=global;
var length=splits.length-1;
var segment;
var i=0;
while(i<length){segment=splits[i++];
if(current[segment]==null){current=current[segment]={}}else{current=current[segment]}}return cache[name]=current[splits[i]]=object};
var toStringMap={};
var classes="Array Function RegExp Object Date Number String Boolean";
classes.replace(/\w+/g,function(cls){toStringMap[cls]="[object "+cls+"]"});
declareNamespace("core.Main.declareNamespace",declareNamespace);
var objectRef={};
var isNativeRepExp=RegExp("^"+(objectRef.valueOf+"").replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/valueOf|for [^\]]+/g,".+?")+"$");
core.Main.declareNamespace("core.Main",{declareNamespace:declareNamespace,
TYPES:(classes+" Null Native Map Integer Primitive Plain Node").split(" "),
isHostType:function(object,property){var type=object!=null?typeof object[property]:"number";
return!/^(?:boolean|number|string|undefined)$/.test(type)&&(type=="object"?!!object[property]:true)},
isNative:function(func){return isNativeRepExp.test(func)},
createDict:Object.create?function(){return Object.create(null)}:function(){return{}},
getClassOf:function(value){return value==null?"Null":toString.call(value).slice(8,-1)},
getGlobal:function(){return global},
isTypeOf:function(value,type){var result=false;
if(value==null){result=type=="Null"}else if(type in toStringMap){result=toString.call(value)==toStringMap[type]}else if(type=="Map"){result=toString.call(value)==toStringMap.Object&&value.constructor===Object}else if(type=="Integer"){result=toString.call(value)==toStringMap.Number&&(~~value)==value}else if(type=="Primitive"){var type=typeof value;
result=value==null||type=="boolean"||type=="number"||type=="string"}else if(type=="Plain"){result=this.isTypeOf(value,"Primitive")||this.isTypeOf(value,"Map")||this.isTypeOf(value,"Array")}else if(type=="Node"){result=value&&typeof value.nodeType=="number"}return result},
clearNamespace:function(name){if(name in cache){delete cache[name];
var current=global;
var splitted=name.split(".");
for(var i=0,l=splitted.length-1;
i<l;
i++){current=current[splitted[i]]}try{delete current[splitted[i]]}catch(ex){current[splitted[i]]=undef}return true}return false},
resolveNamespace:function(name){var current=cache[name];
if(!current){current=global;
if(name){var splitted=name.split(".");
for(var i=0,l=splitted.length;
i<l;
i++){current=current[splitted[i]];
if(!current){current=null;
break}}}}return current},
addStatics:function(name,statics,override){var object=global[name]||cache[name];
var prefix=name+".";
for(var staticName in statics){if(override||object[staticName]===undef){var item=statics[staticName];
if(item instanceof Function){item.displayName=prefix+name}add(object,staticName,item)}}},
addMembers:function(name,members,override){var object=global[name]||cache[name];
var proto=object.prototype;
var prefix=name+".prototype.";
for(var memberName in members){if(override||proto[memberName]===undef){var item=members[memberName];
if(item instanceof Function){item.displayName=prefix+name}add(proto,memberName,item)}}}})})(Object.prototype.toString);


// FILE ID: fix.ArrayIndex
"use strict";
(function(){var boxedString=Object("a");
var splitString=boxedString[0]!="a"||!(0 in boxedString);
var toObject=function(o){if(o==null){throw new TypeError("can't convert "+o+" to object")}return Object(o)};
core.Main.addMembers("Array",{indexOf:function(sought){var self=splitString&&core.Main.isTypeOf(this)=="String"?this.split(""):toObject(this);
var length=self.length>>>0;
if(!length){return-1}var i=0;
if(arguments.length>1){i=toInteger(arguments[1])}i=i>=0?i:Math.max(0,length+i);
for(;
i<length;
i++){if(i in self&&self[i]===sought){return i}}return-1},
lastIndexOf:function(sought){var self=splitString&&core.Main.isTypeOf(this)=="String"?this.split(""):toObject(this);
var length=self.length>>>0;
if(!length){return-1}var i=length-1;
if(arguments.length>1){i=Math.min(i,toInteger(arguments[1]))}i=i>=0?i:length-Math.abs(i);
for(;
i>=0;
i--){if(i in self&&sought===self[i]){return i}}return-1}})})();


// FILE ID: fix.IsArray
"use strict";
core.Main.addStatics("Array",{isArray:function(value){return core.Main.isTypeOf(value,"Array")}});


// FILE ID: fix.Console
"use strict";
(function(global,slice){var methods="log,debug,error,warn,info,timeStamp".split(",");
var console=global.console||(global.console={});
{var log=console.log||new Function;
for(var i=0,l=methods.length;
i<l;
i++){var name=methods[i];
if(!console[name]){console[name]=log}}}if(!console.assert){console.assert=function(expression){if(!expression){throw new Error(slice.call(arguments,1).join(" "))}}}})(core.Main.getGlobal(),Array.prototype.slice);


// FILE ID: fix.ExecScript
"use strict";
(function(global){if((function(){eval("var Object=1");
try{return global.eval("Object")===global.Object}catch(err){}})()){core.Main.addStatics("global",{execScript:function(expression){global.eval(expression);
return null}})}})(core.Main.getGlobal());


// FILE ID: fix.DateIso
"use strict";
(function(){var negativeDate=-62198755200000;
var negativeYearString="-000001";
if(!Date.prototype.toISOString||(new Date(negativeDate).toISOString().indexOf(negativeYearString)===-1)){core.Main.addMembers("Date",{toISOString:function(){var self=this;
var result,length,value,year,month;
if(!isFinite(self)){throw new RangeError("Date.prototype.toISOString called on non-finite value.")}year=self.getUTCFullYear();
month=self.getUTCMonth();
year+=Math.floor(month/12);
month=(month%12+12)%12;
result=[month+1,self.getUTCDate(),self.getUTCHours(),self.getUTCMinutes(),self.getUTCSeconds()];
year=((year<0?"-":(year>9999?"+":""))+("00000"+Math.abs(year)).slice(0<=year&&year<=9999?-4:-6));
length=result.length;
while(length--){value=result[length];
if(value<10){result[length]="0"+value}}return(year+"-"+result.slice(0,2).join("-")+"T"+result.slice(2).join(":")+"."+("000"+self.getUTCMilliseconds()).slice(-3)+"Z")}},true)}})();


// FILE ID: fix.HTML5Markup
"use strict";


// FILE ID: fix.DocumentHead
"use strict";


// FILE ID: fix.DateNow
"use strict";
core.Main.addStatics("Date",{now:function(){return +new Date}});


// FILE ID: fix.FunctionBind
"use strict";
core.Main.addMembers("Function",{bind:function(context,varargs){if(typeof this!=="function"){throw new TypeError}var self=this;
var undef;
if(varargs!==undef){var extraargs=Array.prototype.slice.call(arguments,1);
return function(){return self.apply(context,arguments.length?extraargs.concat(Array.prototype.slice.call(arguments)):extraargs)}}else{return function(){return arguments.length?self.apply(context,arguments):self.call(context)}}}});


// FILE ID: fix.StringTrim
"use strict";
(function(){var ws="[\t\n\u000b\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff]";
var trimBeginRegexp=new RegExp("^"+ws+ws+"*");
var trimEndRegexp=new RegExp(ws+ws+"*$");
core.Main.addMembers("String",{trim:function(){return(""+this).replace(trimBeginRegexp,"").replace(trimEndRegexp,"")},
trimLeft:function(){return(""+this).replace(trimBeginRegexp,"")},
trimRight:function(){return(""+this).replace(trimEndRegexp,"")}})})();


// FILE ID: fix.ArrayBugs
"use strict";
(function(undef){var ArrayProto=Array.prototype;
if([1,2].splice(0).length!=2){var array_splice=ArrayProto.splice;
ArrayProto.splice=function(start,deleteCount){if(!arguments.length){return[]}else{return array_splice.apply(this,[start===undef?0:start,deleteCount===undef?(this.length-start):deleteCount].concat(slice.call(arguments,2)))}}}if([].unshift(0)!=1){var array_unshift=ArrayProto.unshift;
ArrayProto.unshift=function(){array_unshift.apply(this,arguments);
return this.length}}})();


// FILE ID: fix.JSON
"use strict";
(function(global,undef){var json=global.JSON;
if(!json){return}try{json.stringify()}catch(ex){var stringifyOrig=json.stringify;
json.stringify=function(value){return value===undef?value:stringifyOrig.apply(json,arguments)}}})(core.Main.getGlobal());


// FILE ID: core.Module
"use strict";
(function(){var genericToString=function(){return"[module "+this.moduleName+"]"};
core.Main.declareNamespace("core.Module",function(name,members){if(!core.Module.isModuleName(name)){throw new Error("Invalid module name "+name+"!")}if(!core.Main.isTypeOf(members,"Map")){throw new Error("Invalid map as module configuration in "+name+"!")}var prefix=name+".";
var value;
for(var key in members){value=members[key];
if(value instanceof Function){value.displayName=prefix+key}}if(members.moduleName==null){members.moduleName=name}if(!members.hasOwnProperty("toString")){members.toString=genericToString}if(!members.hasOwnProperty("valueOf")){members.valueOf=genericToString}members.__isModule=true;
core.Main.declareNamespace(name,members)});
var getByName=function(name){var obj=core.Main.resolveNamespace(name);
return isModule(obj)?obj:null};
var isModuleName=function(name){return/^(([a-z][a-z0-9]*\.)*)([A-Z][a-zA-Z0-9]*)$/.test(name)};
var isModule=function(module){return!!(module&&typeof module=="object"&&module.__isModule)};
core.Main.addStatics("core.Module",{getByName:getByName,
isModuleName:isModuleName,
isModule:isModule})})();


// FILE ID: core.String
"use strict";
(function(){var hexTable="0123456789abcdef".split("");
core.Module("core.String",{toHex:function(str){var output="";
var code;
for(var i=0,l=str.length;
i<l;
i++){code=str.charCodeAt(i);
output+=hexTable[(code>>>4)&0x0F]+hexTable[code&0x0F]}return output},
encodeUtf8:function(str){return unescape(encodeURIComponent(str))},
decodeUtf8:function(str){return decodeURIComponent(escape(str))},
contains:function(str,substring){return str.indexOf(substring)!=-1},
isBlank:function(str){return str.trim().length==0},
reverse:function(str){return str.split("").reverse().join("")},
compact:function(str){return str.replace(/[\r\n]/g," ").trim().replace(/([\s　])+/g,"$1")},
hyphenate:function(str){return str.replace(/[A-Z]/g,"-$&").toLowerCase()},
camelize:function(str){return str.replace(/\-+(\S)?/g,function(match,chr){return chr?chr.toUpperCase():""})},
repeat:function(str,nr){if(nr<1){return""}var pattern=str;
var result="";
while(nr>0){if(nr&1){result+=pattern}nr>>=1;
pattern+=pattern}return result},
startsWith:function(str,begin){return begin==str.slice(0,begin.length)},
endsWith:function(str,end){return end==str.slice(-end.length)}})})();


// FILE ID: core.crypt.Util
"use strict";
(function(String){core.Module("core.crypt.Util",{rawStringToByteArray:function(input){var length=input.length;
var result=new Array(length);
for(var i=0;
i<length;
i++){result[i]=input.charCodeAt(i)}return result},
byteArrayToRawString:function(input){return String.fromCharCode.apply(String,input)},
rawStringToLittleEndian:function(input){var output=Array(input.length>>2);
for(var i=0;
i<output.length;
i++){output[i]=0}for(var i=0;
i<input.length*8;
i+=8){output[i>>5]|=(input.charCodeAt(i/8)&0xFF)<<(i%32)}return output},
littleEndianToRawString:function(input){return this.byteArrayToRawString(this.littleEndianToByteArray(input))},
littleEndianToByteArray:function(input){var length=input.length*32;
var output=new Array(length/8);
for(var i=0;
i<length;
i+=8){output[i/8]=(input[i>>5]>>>(i%32))&0xFF}return output},
rawStringToBigEndian:function(input){var output=Array(input.length>>2);
for(var i=0;
i<output.length;
i++){output[i]=0}for(var i=0;
i<input.length*8;
i+=8){output[i>>5]|=(input.charCodeAt(i/8)&0xFF)<<(24-i%32)}return output},
bigEndianToRawString:function(input){return this.byteArrayToRawString(this.bigEndianToByteArray(input))},
bigEndianToByteArray:function(input){var length=input.length*32;
var output=new Array(length/8);
for(var i=0;
i<length;
i+=8){output[i/8]=(input[i>>5]>>>(24-i%32))&0xFF}return output}})})(String);


// FILE ID: core.util.Base62
"use strict";
(function(){var base62Table=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
var base62InvertedTable={};
for(var i=0;
i<62;
i++){base62InvertedTable[base62Table[i]]=i}var bitMask=[252,252,252,248,240,224,192,128];
var encodeArrayOfBytes=function(arr){var result=[];
var charLength=arr.length;
var bitLength=charLength*8;
var bitPos=0;
while(bitPos<bitLength){var charOffset=bitPos/8|0;
var bitOffset=bitPos%8;
var extractedBits;
if(charOffset+1>=charLength){var remainingBits=bitLength-bitPos;
var moveRight;
if(remainingBits>=6){moveRight=2}else{moveRight=8-remainingBits}extractedBits=((arr[charOffset]<<bitOffset)&252)>>moveRight}else{var leftoverBits=bitOffset-2;
extractedBits=(((arr[charOffset]<<bitOffset)&bitMask[bitOffset])+((arr[charOffset+1]&bitMask[8-leftoverBits])>>(6-leftoverBits)))>>2}if((extractedBits&62)==60){extractedBits=60;
bitPos-=1}else if((extractedBits&62)==62){extractedBits=61;
bitPos-=1}result.push(extractedBits);
bitPos+=6}return result};
var decodeToArrayOfBytes=function(arr){var result=[];
var current=0;
var bitOffset=0;
var charOffset=0;
var charLength=arr.length;
for(var charOffset=0;
charOffset<charLength;
charOffset++){var char=arr[charOffset];
var bitsNeeded=8-bitOffset;
if(char==60||char==61){var correctBits=(char==60)?30:31;
if(bitsNeeded<=5){current=((current<<bitsNeeded)+(correctBits>>(5-bitsNeeded)))&255;
result.push(current);
current=(((correctBits<<bitsNeeded)&255)>>bitsNeeded)&63;
bitOffset=5-bitsNeeded}else{current=(current<<5)+correctBits;
bitOffset+=5;
if(bitOffset==8){result.push(current);
current=0}}}else{if(bitsNeeded<=6){var last=charOffset==charLength-1;
var charShift=char;
if(!last){charShift=char>>(6-bitsNeeded)}current=((current<<bitsNeeded)+charShift)&255;
result.push(current);
if(!last){current=(((char<<bitsNeeded)&255)>>bitsNeeded)&63}bitOffset=6-bitsNeeded}else{current=(current<<6)+char;
bitOffset+=6;
if(bitOffset==8){result.push(current);
current=0}}}}return result};
var encodeArrayToString=function(arr){var result=encodeArrayOfBytes(arr);
for(var i=0,ii=result.length;
i<ii;
i++){result[i]=base62Table[result[i]]}return result.join("")};
var decodeStringToArray=function(str){var len=str.length;
var byteArray=new Array(len);
for(var i=0;
i<len;
i++){byteArray[i]=base62InvertedTable[str[i]]}return decodeToArrayOfBytes(byteArray)};
core.Module("core.util.Base62",{encode:function(str){str=core.String.encodeUtf8(str);
var len=str.length;
var byteArray=new Array(len);
for(var i=0;
i<len;
i++){byteArray[i]=str.charCodeAt(i)}return encodeArrayToString(byteArray)},
encodeArray:encodeArrayOfBytes,
encodeArrayToString:encodeArrayToString,
decode:function(str){var result=decodeStringToArray(str);
for(var i=0,ii=result.length;
i<ii;
i++){result[i]=String.fromCharCode(result[i])}return core.String.decodeUtf8(result.join(""))},
decodeArray:decodeToArrayOfBytes,
decodeStringToArray:decodeStringToArray})})();


// FILE ID: core.crypt.SHA1
"use strict";
(function(Util,StringUtil){core.Module("core.crypt.SHA1",{checksum:function(str){return Util.byteArrayToRawString(this.checksumAsByteArray(str))},
checksumAsByteArray:function(str){str=StringUtil.encodeUtf8(str);
return Util.bigEndianToByteArray(binb_sha1(Util.rawStringToBigEndian(str),str.length*8))},
hmac:function(key,str){key=StringUtil.encodeUtf8(key);
str=StringUtil.encodeUtf8(str);
var bkey=Util.rawStringToBigEndian(key);
if(bkey.length>16){bkey=binb_sha1(bkey,key.length*8)}var ipad=Array(16);
var opad=Array(16);
for(var i=0;
i<16;
i++){ipad[i]=bkey[i]^0x36363636;
opad[i]=bkey[i]^0x5C5C5C5C}var hash=binb_sha1(ipad.concat(Util.rawStringToBigEndian(str)),512+str.length*8);
return Util.bigEndianToRawString(binb_sha1(opad.concat(hash),512+160))}});
function binb_sha1(x,len){x[len>>5]|=0x80<<(24-len%32);
x[((len+64>>9)<<4)+15]=len;
var w=Array(80);
var a=1732584193;
var b=-271733879;
var c=-1732584194;
var d=271733878;
var e=-1009589776;
for(var i=0;
i<x.length;
i+=16){var olda=a;
var oldb=b;
var oldc=c;
var oldd=d;
var olde=e;
for(var j=0;
j<80;
j++){if(j<16){w[j]=x[i+j]}else{w[j]=bit_rol(w[j-3]^w[j-8]^w[j-14]^w[j-16],1)}var t=safe_add(safe_add(bit_rol(a,5),sha1_ft(j,b,c,d)),safe_add(safe_add(e,w[j]),sha1_kt(j)));
e=d;
d=c;
c=bit_rol(b,30);
b=a;
a=t}a=safe_add(a,olda);
b=safe_add(b,oldb);
c=safe_add(c,oldc);
d=safe_add(d,oldd);
e=safe_add(e,olde)}return Array(a,b,c,d,e)}function sha1_ft(t,b,c,d){if(t<20){return(b&c)|((~b)&d)}else if(t<40){return b^c^d}else if(t<60){return(b&c)|(b&d)|(c&d)}else{return b^c^d}}function sha1_kt(t){return(t<20)?1518500249:(t<40)?1859775393:(t<60)?-1894007588:-899497514}function safe_add(x,y){var lsw=(x&0xFFFF)+(y&0xFFFF);
var msw=(x>>16)+(y>>16)+(lsw>>16);
return(msw<<16)|(lsw&0xFFFF)}function bit_rol(num,cnt){return(num<<cnt)|(num>>>(32-cnt))}})(core.crypt.Util,core.String);


// FILE ID: jasy.Env
(function(undef){var permutated={};
var selected={};
var checksum=null;
var contains=function(array,value){for(var i=0,l=array.length;
i<l;
i++){if(array[i]==value){return true}}};
var getValue=function(name){if(!(name in selected)){throw new Error("[jasy.Env]: Field "+name+" is not available (yet)!")}return selected[name]};
core.Module("jasy.Env",{SELECTED:selected,
PERMUTATED:permutated,
define:function(name,value){selected[name]=value},
addField:function(field){var name=field[0];
var type=field[1];
if(type==1||type==3){var test=field[2];
if(!test){throw new Error("[jasy.Env]: Detection class for field "+name+" is not available!")}var value="VALUE"in test?test.VALUE:test.get(name);
var third=field[3];
if(type==1&&!contains(third,value)){value=third[0]}else if(type==3&&value==null){value=third}}else{value=field[2]}selected[name]=value;
if(type==1||type==2){permutated[name]=value;
checksum=null}},
getId:function(){if(checksum!=null){return checksum}var names=[];
for(var name in permutated){names.push(name)}names.sort();
var list=[];
for(var i=0,l=names.length;
i<l;
i++){var name=names[i];
list.push(name+":"+permutated[name])}var key=list.join(";");
var rev=selected["jasy.build.rev"];
if(rev){key+="@"+rev}return core.util.Base62.encodeArrayToString(core.crypt.SHA1.checksumAsByteArray(key))},
setFields:function(fields){for(var i=0,l=fields.length;
i<l;
i++){this.addField(fields[i])}},
getValue:getValue,
isSet:function(name,value){if(value===undef){value=true}return getValue(name)==value},
select:function(name,map){return map[getValue(name)]}})})();


// FILE ID: jasy.generated.FieldData-3654687483
jasy.Env.addField(["jasy.build.env",4,"host:bs5-UX32VD|id:216075646718722|user:bs5"]);


// FILE ID: jasy.generated.FieldData-1131417062
jasy.Env.addField(["engine",2,"webkit"]);


// FILE ID: core.detect.ES5
"use strict";
core.Module("core.detect.ES5",{VALUE:!!(Array.prototype.map&&Date.prototype.toISOString)});


// FILE ID: jasy.generated.FieldData-3923775830
jasy.Env.addField(["es5",3,core.detect.ES5,false]);


// FILE ID: core.detect.Locale
"use strict";
core.Module("core.detect.Locale",{VALUE:(function(global){var nav=global.navigator||{};
var input=(nav.userLanguage||nav.language||"en").toLowerCase();
var split=input.indexOf("-");
return split>0?input.substring(0,split):input})(core.Main.getGlobal())});


// FILE ID: jasy.generated.FieldData-1514410824
jasy.Env.addField(["locale",3,core.detect.Locale,"en"]);


// FILE ID: core.detect.Param
"use strict";
core.Module("core.detect.Param",{get:(function(){{var items=""}var map={};
var translate={"true":true,
"false":false,
"null":null};
for(var i=0,l=items.length;
i<l;
i++){var item=items[i];
var pos=item.indexOf("=");
var name=pos==-1?item:item.substring(0,pos);
var value=pos==-1?true:item.substring(pos+1);
if(value in translate){value=translate[value]}else if(""+parseFloat(value,10)==value){value=parseFloat(value,10)}map[name]=value}items=translate=null;
return function(name){return name in map?map[name]:null}})()});


// FILE ID: jasy.generated.FieldData-1174344564
jasy.Env.addField(["debug",3,core.detect.Param,false]);


// FILE ID: core.detect.Platform
"use strict";
core.Module("core.detect.Platform",{VALUE:"server"});


// FILE ID: jasy.generated.FieldData-1107301327
jasy.Env.addField(["platform",3,core.detect.Platform]);


// FILE ID: core.detect.JSON
"use strict";
(function(global){var JSON=global.JSON;
var serialized="{\"A\":[1,true,false,null,\"\\u0000\\b\\n\\f\\r\\t\"]}";
var parseSupported=JSON&&typeof JSON.parse=="function";
var stringifySupported=JSON&&typeof JSON.stringify=="function";
var PARSE="parse";
var STRINGIFY="stringify";
if(parseSupported){(function(){try{if(JSON[PARSE]("0")===0&&!JSON[PARSE](false)){var value=JSON[PARSE](serialized);
if((parseSupported=value.A.length==5&&value.A[0]==1)){try{parseSupported=!JSON[PARSE]("\"\t\"")}catch(exception){}if(parseSupported){try{parseSupported=JSON[PARSE]("01")!=1}catch(exception){}}}}}catch(exception){parseSupported=false}})()}if(stringifySupported){(function(){var value,undef;
var getClass=Object.prototype.toString;
(value=function(){return 1}).toJSON=value;
try{stringifySupported=JSON[STRINGIFY](0)==="0"&&JSON[STRINGIFY](new Number)==="0"&&JSON[STRINGIFY](new String)=="\"\""&&JSON[STRINGIFY](getClass)===undef&&JSON[STRINGIFY](undef)===undef&&JSON[STRINGIFY]()===undef&&JSON[STRINGIFY](value)==="1"&&JSON[STRINGIFY]([value])=="[1]"&&JSON[STRINGIFY]([undef,getClass,null])=="[null,null,null]"&&JSON[STRINGIFY]({A:[value,true,false,null,"\u0000\b\n\f\r\t"]})==serialized&&JSON[STRINGIFY](null,value)==="1"&&JSON[STRINGIFY]([1,2],null,1)=="[\n 1,\n 2\n]"}catch(exception){stringifySupported=false}})()}core.Module("core.detect.JSON",{VALID_PARSE:parseSupported,
VALID_STRINGIFY:stringifySupported,
VALUE:parseSupported&&stringifySupported})})(core.Main.getGlobal(),Date);


// FILE ID: jasy.generated.FieldData-463213168
jasy.Env.addField(["json",3,core.detect.JSON,false]);


// FILE ID: core.detect.Device
(function(){var value="other";
core.Module("core.detect.Device",{VALUE:value})})();


// FILE ID: jasy.generated.FieldData-2571965591
jasy.Env.addField(["device",3,core.detect.Device,"other"]);


// FILE ID: jasy.generated.FieldData-1067455180
jasy.Env.addField(["jasy.build.rev",4,"master-7b855db"]);


// FILE ID: core.detect.Touch
"use strict";
(function(){var value=false;
core.Module("core.detect.Touch",{VALUE:value})})(core.Main.getGlobal());


// FILE ID: jasy.generated.FieldData-1261507490
jasy.Env.addField(["touch",3,core.detect.Touch,false]);


// FILE ID: core.detect.HighRes
(function(){var value=false;
core.Module("core.detect.HighRes",{VALUE:value})})();


// FILE ID: jasy.generated.FieldData-2704282896
jasy.Env.addField(["highres",3,core.detect.HighRes,false]);


// FILE ID: jasy.generated.FieldData-1468599925
jasy.Env.addField(["runtime",2,"native"]);


// FILE ID: jasy.generated.FieldData-192221400
jasy.Env.addField(["jasy.build.time",4,1369299124613]);


// FILE ID: core.Object
(function(global){var hasOwnProperty=Object.hasOwnProperty;
var nativeKeys=Object.keys;
if(!core.Main.isNative(nativeKeys)){nativeKeys=null}var createIterator=function(config){var code="";
code+=config.init||"";
if(config.has&&nativeKeys&&!config.nokeys){if(config.iter){code+="for(var i=0,keys=Object.keys(object),l=keys.length,key;i<l;i++)";
code+="{";
code+="key=keys[i];";
code+=config.iter;
code+="}"}else{code+="var keys=Object.keys(object);"}}else{if(config.stable){code+="var keys=[];"}code+="for(var key in object){";
if(config.has){code+="if(hasOwnProperty.call(object,key)){"}if(config.stable){code+="keys.push(key);"}else if(config.iter){code+=config.iter}if(config.has){code+="}"}code+="}";
if(config.stable){code+="for(var i=0,l=keys.length;i<l;i++){";
code+="key=keys[i];";
code+=config.iter||"";
code+="}"}}code+=config.exit||"";
var wrapperCode="return function(object"+(config.args?","+config.args:"")+"){"+code+"};";
{var compiledWrapper=Function("global","hasOwnProperty",wrapperCode);
return compiledWrapper(global,hasOwnProperty)}};
var callbackArgs="callback,context";
var contextFix="if(!context)context=global;";
var executeCallback="callback.call(context,object[key],key,object);";
core.Module("core.Object",{clone:createIterator({has:true,
stable:false,
init:"var clone={};",
iter:"clone[key]=object[key];",
exit:"return clone;"}),
forAll:createIterator({stable:true,
args:callbackArgs,
init:contextFix,
iter:executeCallback}),
forEach:createIterator({has:true,
stable:true,
args:callbackArgs,
init:contextFix,
iter:executeCallback}),
getKeys:createIterator({has:true,
stable:true,
exit:"return keys;"}),
getLength:createIterator({has:true,
stable:false,
init:"var length=0;",
iter:"length++;",
exit:"return length;",
nokeys:true}),
getValues:createIterator({has:true,
stable:false,
init:"var values=[];",
iter:"values.push(object[key]);",
exit:"return values;"}),
isEmpty:createIterator({has:true,
stable:false,
iter:"return false;",
exit:"return true;",
nokeys:true}),
pick:function(object){var result={};
var args=arguments;
for(var i=1,l=args.length;
i<l;
i++){var key=args[i];
result[key]=object[key]}return result},
translate:createIterator({has:true,
stable:false,
args:"table",
init:"var result={};",
iter:"result[table[key]||key]=object[key];",
exit:"return result;"})})})(core.Main.getGlobal());


// FILE ID: core.Assert
"use strict";
(function(undef){function raise(message){throw new Error(message)}core.Module("core.Assert",{isEqual:function(a,b,message){if(a!=b){raise(message||"Values must be equal: "+a+" and "+b+"!")}},
isNotEqual:function(a,b,message){if(a==b){raise(message||"Values must not be equal: "+a+" and "+b+"!")}},
isIdentical:function(a,b,message){if(a!==b){raise(message||"Values must be identical: "+a+" and "+b+"!")}},
isNotIdentical:function(a,b,message){if(a===b){raise(message||"Values must not be identical: "+a+" and "+b+"!")}},
isTrue:function(a,message){if(a!=true){raise(message||"Value must be true: "+a+"!")}},
isFalse:function(a,message){if(a!=false){raise(message||"Value must be false: "+a+"!")}},
isNotUndefined:function(a,message){if(a===undef){raise(message||"Value "+a+" must not be undefined!")}},
isNull:function(a,message){if(a!=null){raise(message||"Value "+a+" must be null!")}},
isNotNull:function(a,message){if(a==null){raise(message||"Value "+a+" must not be null!")}},
isIn:function(a,object,message){if(!(a in object||object.indexOf&&object.indexOf(a)!=-1)){raise(message||"Value "+a+" is not in given object!")}},
isNotIn:function(a,object,message){if(a in object||object.indexOf&&object.indexOf(a)!=-1){raise(message||"Value "+a+" must not be in given object!")}},
matches:function(a,regexp,message){if(!regexp.match(a)){raise(message||"Value "+a+" must match "+regexp)}},
notMatches:function(a,regexp,message){if(regexp.match(a)){raise(message||"Value "+a+" must not match "+regexp)}},
isInstance:function(a,clazz,message){if(!(a instanceof clazz)){raise(message||"Value "+a+" must be instance of: "+clazz)}},
isType:function(a,type,message){if(!core.Main.isTypeOf(a,type)){raise(message||"Value "+a+" must match type: "+type)}},
isNotType:function(a,type,message){if(core.Main.isTypeOf(a,type)){raise(message||"Value "+a+" must not match type: "+type)}},
doesOnlyHaveKeys:function(object,allowed,message){if(typeof allowed=="string"){allowed=allowed.split(/,| /)}core.Object.forEach(object,function(value,key){if(allowed.indexOf(key)==-1){raise(message||"Unallowed key found: "+key)}})},
isNotEmpty:function(a,message){if(Object.prototype.hasOwnProperty(a,"length")){if(a.length===0){raise(message||"Value "+a+" must not be empty: "+type)}}else if(core.Main.isTypeOf(a,"Map")){if(!core.Object.isEmpty(a)){raise(message||"Value "+a+" must not be empty: "+type)}}}})})();


// FILE ID: core.io.Script
"use strict";
(function(global){var doc=global.document;
var supportsScriptAsync=doc&&doc.createElement("script").async===true;
"?r="+Date.now();
{var importScripts=global.importScripts?global.importScripts:(function(){var Fs=require("fs");
return function(){for(var i=0,ii=arguments.length;
i<ii;
i++){var uri=arguments[i];
eval("//@ sourceURL="+uri+"\n"+Fs.readFileSync(uri,"utf-8"))}}})()}core.Module("core.io.Script",{SUPPORTS_PARALLEL:supportsScriptAsync||false||false,
URL_PREFIX:null,
load:function(uri,callback,context,nocache){if(jasy.Env.isSet("debug")){core.Assert.isType(uri,"String");
if(callback!=null){core.Assert.isType(callback,"Function","Invalid callback method!")}if(context!=null){core.Assert.isType(context,"Object","Invalid callback context!")}if(nocache!=null){core.Assert.isType(nocache,"Boolean")}}if(jasy.Env.isSet("debug")&&nocache==null){nocache=true}{importScripts(uri);
if(callback){callback.call(context||global,uri,false)}return}}})})(core.Main.getGlobal());


// FILE ID: corepromisestest.Kernel
core.Module("corepromisestest.Kernel",{init:function(){core.io.Script.load("script/corepromisestest-"+jasy.Env.getId()+".js")}});


// FILE ID: jasy.generated.BootCode-2978746666
(function(){corepromisestest.Kernel.init()})();


