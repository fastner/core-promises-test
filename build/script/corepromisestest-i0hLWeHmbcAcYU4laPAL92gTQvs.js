// FILE ID: core.property.Group
"use strict";
(function(slice){var expandShortHand=function(data){switch(data.length){case 1:data[1]=data[2]=data[3]=data[0];
break;
case 2:data[2]=data[0];
case 3:data[3]=data[1]}return data};
core.Module("core.property.Group",{create:function(config){var shorthand=config.shorthand;
var group=config.group;
var length=group.length;
return{set:function(first){var data=arguments.length>1?arguments:first;
if(shorthand){data=expandShortHand(slice.call(data))}var map={};
for(var i=0;
i<length;
i++){map[group[i]]=data[i]}this.set(map)},
get:function(){for(var i=0;
i<length;
i++){this.reset(group[i])}}}}})})(Array.prototype.slice);


// FILE ID: core.property.Core
"use strict";
core.Module("core.property.Core",{ID:1});


// FILE ID: core.util.Experimental
"use strict";
(function(){var cache={};
cache.hasOwnProperty;
var prefixes="O|o|MS|ms|Moz|moz|WebKit|Webkit|webKit|webkit|".split("|");
function find(object,what){var firstChar=what.charAt(0);
var what=what.slice(1);
for(var i=prefixes.length,key;
i--;
){key=prefixes[i];
key+=(key?firstChar.toUpperCase():firstChar)+what;
if(key in object||("on"+key).toLowerCase() in object){return key}}return null}core.Module("core.util.Experimental",{get:function(object,what){var result=cache[what];
if(result!==null){result=cache[what]=find(object,what)}return result}})})();


// FILE ID: core.util.Id
"use strict";
(function(){var count=1;
core.Module("core.util.Id",{get:function(object){if(jasy.Env.isSet("debug")){var type=typeof object;
if(object==null||(type!="object"&&type!="function")||object.constructor==Object){throw new Error("Could not detect ID of "+object)}}var id=object.$$id;
if(id==null){id=object.$$id=count++}return id}})})();


// FILE ID: core.Array
"use strict";
(function(global,Array,Math){core.Module("core.Array",{at:function(array,position){if(jasy.Env.isSet("debug")){core.Assert.isType(array,"Array");
core.Assert.isType(position,"Integer")}return array[position<0?array.length+position:position]},
clone:function(array){if(jasy.Env.isSet("debug")){core.Assert.isType(array,"Array")}return array.concat()},
compact:function(array){if(jasy.Env.isSet("debug")){core.Assert.isType(array,"Array")}var compacted=[];
for(var i=0,l=array.length;
i<l;
i++){if(i in array){compacted.push(array[i])}}return compacted},
contains:function(array,value){if(jasy.Env.isSet("debug")){core.Assert.isType(array,"Array");
core.Assert.isNotUndefined(value)}return array.indexOf(value)>-1},
every:function(array,callback,context){if(jasy.Env.isSet("debug")){core.Assert.isType(array,"Array");
core.Assert.isType(callback,"Function");
if(context){core.Assert.isType(context,"Object")}}if(!context){context=global}for(var i=0,length=array.length;
i<length;
i++){var value=array[i];
if(!callback.call(context,value,i,array)){return false}}return true},
flatten:function(array){if(jasy.Env.isSet("debug")){core.Assert.isType(array,"Array")}var result=[];
for(var i=0,l=array.length;
i<l;
i++){var value=array[i];
if(value instanceof Array){result.push.apply(result,this.flatten(value))}else{result.push(value)}}return result},
filter:function(array,callback,context){if(jasy.Env.isSet("debug")){core.Assert.isType(array,"Array");
core.Assert.isType(callback,"Function");
if(context){core.Assert.isType(context,"Object")}}if(!context){context=global}var result=[];
for(var i=0,length=array.length;
i<length;
i++){var value=array[i];
if(callback.call(context,value,i,array)){result.push(value)}}return result},
forEach:function(array,callback,context){if(jasy.Env.isSet("debug")){core.Assert.isType(array,"Array");
core.Assert.isType(callback,"Function");
if(context){core.Assert.isType(context,"Object")}}if(!context){context=global}for(var i=0,length=array.length;
i<length;
i++){callback.call(context,array[i],i,array)}},
fromArguments:function(args){return args.length===1?[args[0]]:Array.apply(null,args)},
insertAt:function(array,value,position){if(jasy.Env.isSet("debug")){core.Assert.isType(array,"Array");
core.Assert.isNotUndefined(value);
if(position!=null){core.Assert.isType(position,"Integer")}}if(position==null){array.push(value)}else{if(position<0){position=array.length+position}array.splice(position,0,value)}return value},
last:function(array){if(jasy.Env.isSet("debug")){core.Assert.isType(array,"Array")}return array[array.length-1]},
map:function(array,callback,context){if(jasy.Env.isSet("debug")){core.Assert.isType(array,"Array");
core.Assert.isType(callback,"Function");
if(context){core.Assert.isType(context,"Object")}}var length=array.length;
var result=Array(length);
if(!context){context=global}for(var i=0;
i<length;
i++){result[i]=callback.call(context,array[i],i,array)}return result},
max:function(array){if(jasy.Env.isSet("debug")){core.Assert.isType(array,"Array")}return Math.max.apply(Math,array)},
min:function(array){if(jasy.Env.isSet("debug")){core.Assert.isType(array,"Array")}return Math.min.apply(Math,array)},
randomize:function(array){if(jasy.Env.isSet("debug")){core.Assert.isType(array,"Array")}for(var j,x,self=array,i=self.length;
i;
j=parseInt(Math.random()*i),
x=self[--i],
self[i]=self[j],
self[j]=x);
},
remove:function(array,value){if(jasy.Env.isSet("debug")){core.Assert.isType(array,"Array");
core.Assert.isNotUndefined(value)}var position=array.indexOf(value);
if(position!=-1){array.splice(position,1);
return value}},
removeAt:function(array,position){if(jasy.Env.isSet("debug")){core.Assert.isType(array,"Array");
core.Assert.isType(position,"Integer")}var ret=array.splice(position<0?array.length+position:position,1);
if(ret.length){return ret[0]}},
removeRange:function(array,from,to){if(jasy.Env.isSet("debug")){core.Assert.isType(array,"Array");
core.Assert.isType(from,"Integer");
core.Assert.isType(to,"Integer")}var rest=array.slice((to||from)+1||array.length);
array.length=from<0?array.length+from:from;
array.push.apply(array,rest);
return array},
some:function(array,callback,context){if(jasy.Env.isSet("debug")){core.Assert.isType(array,"Array");
core.Assert.isType(callback,"Function");
if(context){core.Assert.isType(context,"Object")}}if(!context){context=global}for(var i=0,length=array.length;
i<length;
i++){var value=array[i];
if(callback.call(context,value,i,array)){return true}}return false},
sum:function(array){if(jasy.Env.isSet("debug")){core.Assert.isType(array,"Array")}for(var i=0,l=array.length,sum=0;
i<l;
i++){var value=array[i];
if(value!=null){sum+=array[i]}}return sum},
toKeys:function(array,value){var undef;
if(value===undef){value=true}var result={};
for(var i=0,l=array.length;
i<l;
i++){result[array[i]]=value}return result},
unique:function(array){if(jasy.Env.isSet("debug")){core.Assert.isType(array,"Array")}var hasOwnProperty=Object.hasOwnProperty;
var strings={};
var result=[];
for(var i=0,l=array.length;
i<l;
i++){var value=array[i];
var asString=""+value;
if(!hasOwnProperty.call(strings,asString)){strings[asString]=true;
result.push(value)}}return result},
zip:function(keys,values){if(jasy.Env.isSet("debug")){core.Assert.isType(keys,"Array");
core.Assert.isType(values,"Array");
core.Assert.isEqual(keys.length,values.length)}var result={};
for(var i=0,l=keys.length;
i<l;
i++){result[keys[i]]=values[i]}return result}})})(core.Main.getGlobal(),Array,Math);


// FILE ID: core.Interface
"use strict";
(function(){var genericToString=function(){return"[interface "+this.interfaceName+"]"};
var removedUnusedArgs=!(function(){}).length;
core.Main.declareNamespace("core.Interface",function(name,config){if(jasy.Env.isSet("debug")){if(!core.Module.isModuleName(name)){throw new Error("Invalid interface name "+name+"!")}core.Assert.isType(config,"Map","Invalid interface configuration in "+name);
core.Assert.doesOnlyHaveKeys(config,"properties,events,members","Unallowed keys in interface: "+name)}var iface={__properties:config.properties,
__events:config.events,
__members:config.members,
__isInterface:true,
interfaceName:name,
toString:genericToString,
valueOf:genericToString,
assert:core.Interface.assert};
core.Main.declareNamespace(name,iface)});
core.Main.addStatics("core.Interface",{getByName:function(interfaceName){if(jasy.Env.isSet("debug")){core.Assert.isType(interfaceName,"String")}var obj=core.Main.resolveNamespace(interfaceName);
return core.Interface.isInterface(obj)?obj:null},
assert:function(objectOrClass,iface){if(!objectOrClass){throw new Error("Invalid class or object to verify interface with: "+objectOrClass)}var cls=typeof objectOrClass=="object"?objectOrClass.constructor:objectOrClass;
if(!core.Class.isClass(cls)){throw new Error("Invalid class or object to verify interface with: "+objectOrClass)}if(!iface&&this.__isInterface){iface=this}if(!core.Interface.isInterface(iface)){throw new Error("Invalid interface "+iface)}var ifaceMembers=iface.__members;
var ifaceProperties=iface.__properties;
var ifaceEvents=iface.__events;
var commonErrMsg="Class "+cls.className+" does not implement interface "+iface.interfaceName+": ";
if(ifaceMembers){var cMembers=cls.prototype;
for(var name in ifaceMembers){if(!(name in cMembers)){throw new Error(commonErrMsg+"Missing member: "+name+"!")}var iMember=ifaceMembers[name];
var cMember=cMembers[name];
if(typeof iMember==typeof cMember){if(iMember==null){continue}if(cMember==null){throw new Error(commonErrMsg+"Missing member: "+name+"!")}if(Object.prototype.toString.call(iMember).slice(8,-1)!=Object.prototype.toString.call(cMember).slice(8,-1)){throw new Error(commonErrMsg+"Invalid member type in :"+name+"! Expecting: "+Object.prototype.toString.call(iMember).slice(8,-1).toLowerCase())}if(iMember instanceof Function){if(!(cMember instanceof Function)){throw new Error(commonErrMsg+"Different member types in: "+name+"! Expecting a function!")}else if(!removedUnusedArgs&&iMember.length!=cMember.length){throw new Error(commonErrMsg+"Different number of arguments in function '"+name+"'. Expecting "+iMember.length+"!")}}}else{throw new Error(commonErrMsg+"Different member types in: "+name+"! Expecting type "+(typeof iMember))}}}if(ifaceProperties){var cProperties=core.Class.getProperties(cls);
for(var name in ifaceProperties){if(!(name in cProperties)){throw new Error(commonErrMsg+"Missing property: "+name+"!")}var iProperty=ifaceProperties[name];
var cProperty=cProperties[name];
if(iProperty.type!==cProperty.type){throw new Error(commonErrMsg+"Invalid property: "+name+"! Different types! Expecting "+iProperty.type+"!")}if("nullable"in iProperty&&!("nullable"in cProperty)){throw new Error(commonErrMsg+"Invalid property: "+name+"! Missing 'nullable' definition!")}if("fire"in iProperty&&!("fire"in cProperty)){throw new Error(commonErrMsg+"Invalid property: "+name+"! Missing 'fire' definition!")}if("group"in iProperty&&!("group"in cProperty)){throw new Error(commonErrMsg+"Invalid property: "+name+"! Missing 'group' definition!")}if("themeable"in iProperty&&!("themeable"in cProperty)){throw new Error(commonErrMsg+"Invalid property: "+name+"! Missing 'themeable' definition!")}if("inheritable"in iProperty&&!("inheritable"in cProperty)){throw new Error(commonErrMsg+"Invalid property: "+name+"! Missing 'inheritable' definition!")}}}if(ifaceEvents){var cEvents=core.Class.getEvents(cls);
for(var name in ifaceEvents){if(!(name in cEvents)){throw new Error(commonErrMsg+"Missing event: "+name+"!")}}}},
isInterface:function(iface){return!!(iface&&typeof iface=="object"&&iface.__isInterface)}})})();


// FILE ID: core.property.IInheritable
"use strict";
core.Interface("core.property.IInheritable",{members:{getInheritedValue:function(){}}});


// FILE ID: core.property.Simple
"use strict";
(function(undef){var propertyNameToId={};
var store="$$data";
core.Module("core.property.Simple",{create:function(config){var propertyName=config.name;
var propertyNullable=config.nullable;
var propertyInit=config.init;
var propertyType=config.type;
var propertyFire=config.fire;
var propertyApply=config.apply;
var propertyCast=config.cast;
var propertyValidate=config.validate;
if(jasy.Env.isSet("debug")){core.Assert.doesOnlyHaveKeys(config,"name,nullable,init,type,fire,apply,cast,validate","Unallowed keys in property: "+propertyName+"!");
core.Assert.isType(propertyName,"String");
if(propertyNullable!==undef){core.Assert.isType(propertyNullable,"Boolean")}if(propertyType){core.property.Debug.isValidType(propertyType)}if(propertyFire){core.Assert.isType(propertyFire,"String")}if(propertyApply){core.Assert.isType(propertyApply,"Function")}if(propertyCast!=null){core.Assert.isType(propertyCast,"Boolean");
if(propertyCast&&!core.Class.isClass(propertyType)){throw new Error("Property declaration of "+propertyName+" contains invalid configuration: Casting support requires a core.Class for the type of the property!")}}if(propertyValidate){core.Assert.isType(propertyValidate,"Function")}}var propertyId=propertyNameToId[propertyName];
if(!propertyId){propertyId=propertyNameToId[propertyName]=(core.property.Core.ID++)}var members={};
members.get=function(){var data,value;
var context=this;
if(jasy.Env.isSet("debug")){core.property.Debug.checkGetter(context,config,arguments)}data=context[store];
if(data){value=data[propertyId]}if(value===undef){if(propertyInit!==undef){return propertyInit}if(jasy.Env.isSet("debug")){if(!propertyNullable){context.error("Missing value for: "+propertyName+" (during get())")}}value=null}return value};
if(propertyInit!==undef){members.init=function(){var context=this;
var data=context[store];
if(!data||data[propertyId]===undef){if(propertyApply){propertyApply.call(context,propertyInit,undef)}if(propertyFire){var eventObject=core.property.Event.obtain(propertyFire,propertyInit,undef,propertyName);
context.dispatchEvent(eventObject);
eventObject.release()}}}}members.set=function(value){var context=this,data,old;
if(config.cast&&core.Main.isTypeOf(value,"Plain")){value=new config.type(value);
if(jasy.Env.isSet("debug")){if(arguments[0]!==value){arguments[0]=value}}}if(jasy.Env.isSet("debug")){core.property.Debug.checkSetter(context,config,arguments)}data=context[store];
if(!data){data=context[store]={}}else{old=data[propertyId]}if(value!==old){if(old===undef&&propertyInit!==undef){old=propertyInit}data[propertyId]=value;
if(propertyApply){propertyApply.call(context,value,old)}if(propertyFire){var eventObject=core.property.Event.obtain(propertyFire,value,old,propertyName);
context.dispatchEvent(eventObject);
eventObject.release()}}return value};
members.reset=function(){var context,data,old,value;
context=this;
if(jasy.Env.isSet("debug")){core.property.Debug.checkResetter(context,config,arguments)}data=context[store];
if(!data){return}old=data[propertyId];
value=undef;
if(old!==value){data[propertyId]=value;
if(propertyInit!==undef){value=propertyInit}else if(jasy.Env.isSet("debug")){if(!propertyNullable){context.error("Missing value for: "+propertyName+" (during reset())")}}if(propertyApply){propertyApply.call(context,value,old)}if(propertyFire){var eventObject=core.property.Event.obtain(propertyFire,value,old,propertyName);
context.dispatchEvent(eventObject);
eventObject.release()}}};
if(propertyValidate){members.isValid=function(){var data,value;
var context=this;
if(jasy.Env.isSet("debug")){core.property.Debug.checkIsValid(context,config,arguments)}data=context[store];
if(data){value=data[propertyId]}if(value===undef){if(propertyInit!==undef){value=propertyInit}else if(!propertyNullable){context.error("Missing value for: "+propertyName+" (during isValid())");
return false}}return propertyValidate.call(context,value)}}return members}})})();


// FILE ID: core.property.IEvent
"use strict";
core.Interface("core.property.IEvent",{members:{dispatchEvent:function(){}}});


// FILE ID: core.property.IThemeable
"use strict";
core.Interface("core.property.IThemeable",{members:{getThemedValue:function(){}}});


// FILE ID: core.Class
"use strict";
(function(undef){var supportsSeal=!!Object.seal;
var genericToString=function(){return"[class "+this.className+"]"};
if(jasy.Env.isSet("debug")){var checkMixinMemberConflicts=function(include,members,name){if(!members){members={}}var allIncludeMembers={};
for(var i=0,l=include.length;
i<l;
i++){var includedClass=include[i];
var includedMembers=core.Object.getKeys(includedClass.prototype);
for(var j=0,jl=includedMembers.length;
j<jl;
j++){var key=includedMembers[j];
if(members.hasOwnProperty(key)){if(key.substring(0,2)=="__"){throw new Error("Included class "+includedClass.className+" overwrites private member of class "+name)}}if(allIncludeMembers.hasOwnProperty(key)){if(key.substring(0,2)=="__"){throw new Error("Included class "+includedClass.className+" overwrites private member "+key+" of other included class "+allIncludeMembers[key].className+" in class "+name)}if(key in members&&members[key] instanceof Function&&includedClass.prototype[key] instanceof Function&&allIncludeMembers[key] instanceof Function){}else{throw new Error("Included class "+includedClass.className+" overwrites member "+key+" of other included class "+allIncludeMembers[key].className+" in class "+name)}}allIncludeMembers[key]=includedClass}}};
var checkMixinEventConflicts=function(include,events,name){var allIncludeEvents={};
for(var i=0,l=include.length;
i<l;
i++){var includedClass=include[i];
var includedEvents=includedClass.__events;
for(var eventName in includedEvents){if(eventName in allIncludeEvents){throw new Error("Included class "+includedClass.className+" overwrites event of other included class "+allIncludeEvents[eventName].className+" in class "+name)}allIncludeEvents[eventName]=includedClass}}};
var checkMixinPropertyConflicts=function(include,properties,name){var allIncludeProperties={};
for(var i=0,l=include.length;
i<l;
i++){var includedClass=include[i];
var includedProperties=includedClass.__properties;
for(var propertyName in includedProperties){if(propertyName in allIncludeProperties){throw new Error("Included class "+includedClass.className+" overwrites event of other included class "+allIncludeProperties[propertyName].className+" in class "+name)}allIncludeProperties[propertyName]=includedClass}}}}var propertyJoinableNames={};
core.Main.declareNamespace("core.Class",function(name,config){if(jasy.Env.isSet("debug")){if(!core.Module.isModuleName(name)){throw new Error("Invalid class name "+name+"!")}core.Assert.isType(config,"Map","Invalid class configuration in "+name);
core.Assert.doesOnlyHaveKeys(config,"construct,pooling,events,members,properties,include,implement","Unallowed keys in class: "+name);
if("construct"in config){core.Assert.isType(config.construct,"Function","Invalid constructor in class "+name+"!")}if("events"in config){core.Assert.isType(config.events,"Map","Invalid event data in class "+name+"!")}if("members"in config){core.Assert.isType(config.members,"Map","Invalid member section in class "+name)}if("properties"in config){core.Assert.isType(config.properties,"Map","Invalid properties section in class "+name)}if("include"in config){core.Assert.isType(config.include,"Array","Invalid include list in class "+name)}if("implement"in config){core.Assert.isType(config.implement,"Array","Invalid implement list in class "+name)}}var construct=config.construct||function(){};
construct.className=name;
construct.displayName=name;
construct.__isClass=true;
construct.toString=genericToString;
construct.valueOf=genericToString;
var events=construct.__events=config.events||{};
var properties=construct.__properties=config.properties||{};
var proto=construct.prototype;
proto.toString=function(){return"["+this.constructor.className+"-"+core.util.Id.get(this)+"]"};
if(config.pooling){(function(poolConfig){var max=poolConfig.max||25;
var pool=new Array(max);
var length=0;
var fakeConstruct=new Function;
fakeConstruct.prototype=proto;
fakeConstruct.className=fakeConstruct.displayName=name;
fakeConstruct.__isClass=true;
fakeConstruct.__events=events;
fakeConstruct.__properties=properties;
construct.release=function(obj){if(length<max){pool[length++]=obj}};
construct.obtain=function(){if(length>0){var obj=pool[--length];
pool[length]=null}else{var obj=new fakeConstruct}arguments.length?construct.apply(obj,arguments):construct.call(obj);
return obj};
construct.getPoolSize=function(){return length};
proto.release=function(){if(length<max){pool[length++]=this}}})(config.pooling)}var include=config.include;
if(include){if(jasy.Env.isSet("debug")){for(var i=0,l=include.length;
i<l;
i++){core.Class.assertIsClass(include[i],"Class "+name+" includes invalid class "+include[i]+" at position: "+i+"!")}checkMixinMemberConflicts(include,config.members,name);
checkMixinEventConflicts(include,config.events,name);
checkMixinPropertyConflicts(include,config.properties,name)}construct.__includes=include;
for(var i=0,l=include.length;
i<l;
i++){var includedClass=include[i];
var includeMembers=includedClass.prototype;
for(var key in includeMembers){proto[key]=includeMembers[key]}var includeProperties=includedClass.__properties;
for(var key in includeProperties){var property={};
var includeProperty=includeProperties[key];
for(var key2 in includeProperty){property[key2]=includeProperty[key2]}var ownProperty=properties&&properties[key];
if(ownProperty){for(var key2 in ownProperty){property[key2]=ownProperty[key2]}}properties[key]=property}var includeEvents=includedClass.__events;
for(var key in includeEvents){events[key]=includeEvents[key]}}}for(var propertyName in properties){var propertyConfig=properties[propertyName];
propertyConfig.name=propertyName;
if(propertyConfig.group){var propertyMembers=core.property.Group.create(propertyConfig)}else if(propertyConfig.themeable||propertyConfig.inheritable){var propertyMembers=core.property.Multi.create(propertyConfig)}else{var propertyMembers=core.property.Simple.create(propertyConfig)}var propertyMethodPostfix=propertyJoinableNames[propertyName];
if(propertyMethodPostfix===undef){propertyMethodPostfix=propertyName.charAt(0).toUpperCase()+propertyName.slice(1);
propertyJoinableNames[propertyName]=propertyMethodPostfix}for(var propertyMemberKey in propertyMembers){var propertyMemberName=propertyMemberKey+propertyMethodPostfix;
var propertyMember=propertyMembers[propertyMemberKey];
proto[propertyMemberName]=propertyMember;
propertyMember.displayName=name+"."+propertyMemberName}}var members=config.members;
if(members){for(var key in members){var entry=proto[key]=members[key];
if(entry instanceof Function){entry.displayName=name+"."+key}}}if(jasy.Env.isSet("debug")){var implement=config.implement;
if(implement){var iface;
for(var i=0,l=implement.length;
i<l;
i++){iface=implement[i];
if(!iface){throw new Error("Class "+name+" implements invalid interface "+iface+" at position: "+i)}try{core.Interface.assert(construct,iface)}catch(ex){throw new Error("Class "+name+" fails to implement given interface: "+iface+": "+ex)}}}var propertyFeatures=Class.getPropertyFeatures(construct);
if(propertyFeatures){if(propertyFeatures.fire){core.Interface.assert(construct,core.property.IEvent)}if(propertyFeatures.themeable){core.Interface.assert(construct,core.property.IThemeable)}if(propertyFeatures.inheritable){core.Interface.assert(construct,core.property.IInheritable)}}}core.Main.declareNamespace(name,construct);
if(jasy.Env.isSet("debug")&&supportsSeal){Object.seal(construct.prototype)}});
var Class=core.Class;
var isClass=function(object){return!!(object&&typeof object=="function"&&object.__isClass)};
var assertIsClass=function(object,message){if(!isClass(object)){throw new Error(message||"Invalid class: "+object)}};
core.Main.addStatics("core.Class",{isClass:isClass,
assertIsClass:assertIsClass,
getByName:function(className){if(jasy.Env.isSet("debug")){core.Assert.isType(className,"String")}var obj=core.Main.resolveNamespace(className);
return isClass(obj)?obj:null},
getEvents:function(cls){if(jasy.Env.isSet("debug")){core.Class.assertIsClass(cls)}return cls.__events},
getProperties:function(cls){if(jasy.Env.isSet("debug")){core.Class.assertIsClass(cls)}return cls.__properties},
getPropertyFeatures:function(cls){var all={};
var properties=cls.__properties;
for(var name in properties){var config=properties[name];
for(var key in config){all[key]||(all[key]=true)}}return all},
includesClass:function(cls,inc){if(jasy.Env.isSet("debug")){core.Class.assertIsClass(cls,"Class to check for wether it includes class "+inc+" is itself not a class ("+cls+")!");
core.Class.assertIsClass(inc,"Class to check for being included is not a class: "+inc+"!")}var includes=cls.__includes;
return includes&&includes.indexOf(inc)!=-1}})})();


// FILE ID: core.event.MDispatchable
"use strict";
core.Class("core.event.MDispatchable",{members:{__target:null,
__currentTarget:null,
__propagationStopped:false,
__eventPhase:0,
setTarget:function(target){this.__target=target},
getTarget:function(){return this.__target},
setCurrentTarget:function(currentTarget){this.__currentTarget=currentTarget},
getCurrentTarget:function(){return this.__currentTarget},
stopPropagation:function(){this.__propagationStopped=true},
isPropagationStopped:function(){return this.__propagationStopped},
setEventPhase:function(eventPhase){if(jasy.Env.isSet("debug")){core.Assert.isType(eventPhase,"Integer","Invalid event phase: %value!")}this.__eventPhase=eventPhase},
getEventPhase:function(){return this.__eventPhase},
resetDispatch:function(){this.__target=null;
this.__currentTarget=null;
this.__propagationStopped=false;
this.__eventPhase=0}}});


// FILE ID: core.property.Event
"use strict";
core.Class("core.property.Event",{pooling:true,
include:[core.event.MDispatchable],
construct:function(type,value,old,name){this.__type=type;
this.__value=value;
this.__old=old;
this.__name=name},
members:{__type:null,
__value:null,
__old:null,
__name:null,
getType:function(){return this.__type},
getValue:function(){return this.__value},
getOldValue:function(){return this.__old},
getName:function(){return this.__name}}});


// FILE ID: core.property.Debug
"use strict";
core.Module("core.property.Debug",{isValidType:function(){},
checkSetter:function(obj,config,args){var name=config.name;
if(args.length==0){throw new Error("Called set() method of property "+name+" on object "+obj+" with no arguments!")}if(args.length>1){throw new Error("Called set() method of property "+name+" on object "+obj+" with too many arguments!")}var value=args[0];
if(value==null){if(value!==null){throw new Error("Property "+name+" in object "+obj+" got invalid undefined value during set!")}else if(!config.nullable){throw new Error("Property "+name+" in object "+obj+" is not nullable!")}}else{var type=config.type;
if(type){try{if(type instanceof Array){if(type.indexOf(value)==-1){throw new Error("Value of property must be one of "+type+". Invalid value: "+value)}}else if(core.Class.isClass(type)){if(!(value instanceof type||core.Class.includesClass(value,type))){throw new Error("Value of property "+name+" must be instance of or include "+type+". Invalid value: "+value)}}else if(core.Interface.isInterface(type)){core.Interface.assert(value,type)}else if(core.Main.TYPES.indexOf(type)!=-1){core.Assert.isType(value,type)}else{console.warn("Unsupported property type: "+type+" in "+name+"! Property types are equal to documentation types. See also: core.Main#isTypeOf().")}}catch(ex){throw new Error("Could not set() property "+name+" of object "+obj+": "+ex)}}}},
checkResetter:function(obj,config,args){if(args.length!=0){throw new Error("Called reset method of property "+config.name+" on "+obj+" with too many arguments!")}},
checkGetter:function(obj,config,args){if(args.length!=0){throw new Error("Called get method of property "+config.name+" on "+obj+" with too many arguments!")}},
checkIsValid:function(obj,config,args){if(args.length!=0){throw new Error("Called isValid method of property "+config.name+" on "+obj+" with too many arguments!")}}});


// FILE ID: core.Function
"use strict";
(function(global,slice){var bind=function(func,context){if(jasy.Env.isSet("debug")){core.Assert.isType(func,"Function");
core.Assert.isType(context,"Object")}var boundName="bound:"+core.util.Id.get(func);
return context[boundName]||(context[boundName]=func.bind(context))};
var createDelayed=function(nativeMethod){return function(callback,context,delay){if(jasy.Env.isSet("debug")){core.Assert.isType(callback,"Function");
core.Assert.isType(context,"Object");
core.Assert.isType(delay,"Integer")}if(arguments.length>3){if(!context){context=global}var callbackArgs=slice.call(arguments,3);
return nativeMethod(function(){callback.apply(context,callbackArgs)},delay)}else{if(context){callback=bind(callback,context)}return nativeMethod(callback,delay)}}};
var immediate;
if(global.process&&process.nextTick){immediate=process.nextTick}else{immediate=core.util.Experimental.get(global,"setImmediate");
if(immediate){immediate=global[immediate]}else{immediate=function(func){return setTimeout(func,0)}}}core.Module("core.Function",{bind:bind,
timeout:createDelayed(setTimeout),
interval:createDelayed(setInterval),
debounce:function(func,threshold,execAsap){if(jasy.Env.isSet("debug")){core.Assert.isType(func,"Function");
if(threshold!=null){core.Assert.isType(threshold,"Integer")}if(execAsap!=null){core.Assert.isType(execAsap,"Boolean")}}var timeout;
return function(){var obj=this,args=arguments;
function delayed(){if(!execAsap){func.apply(obj,args)}timeout=null};
if(timeout){clearTimeout(timeout)}else if(execAsap){func.apply(obj,args)}timeout=setTimeout(delayed,threshold||100)}},
throttle:function(func,time){if(jasy.Env.isSet("debug")){core.Assert.isType(func,"Function");
core.Assert.isType(time,"Integer")}var lastEventTimestamp=null;
var limit=time;
return function(){var self=this;
var args=arguments;
var now=Date.now();
if(!lastEventTimestamp||now-lastEventTimestamp>=limit){lastEventTimestamp=now;
func.apply(self,args)}}},
immediate:function(func,context){if(jasy.Env.isSet("debug")){core.Assert.isType(func,"Function");
if(context!=null){core.Assert.isType(context,"Object")}}if(context){func=bind(func,context)}immediate(func)},
curry:function(func){if(jasy.Env.isSet("debug")){core.Assert.isType(func,"Function")}var args=core.Array.fromArguments(arguments);
args.splice(0,1);
return function(){return func.apply(this,args.concat(core.Array.fromArguments(arguments)))}}})})(core.Main.getGlobal(),Array.prototype.slice);


// FILE ID: core.event.Promise
"use strict";
core.Class("core.event.Promise",{pooling:true,
construct:function(){if(this.__onFulfilledQueue==null){this.__onFulfilledQueue=[];
this.__onRejectedQueue=[]}},
members:{__state:"pending",
__locked:false,
__valueOrReason:null,
getValue:function(){return this.__valueOrReason},
getState:function(){return this.__state},
fulfill:function(value){if(!this.__locked){this.__locked=true;
this.__state="fulfilled";
this.__valueOrReason=value;
core.Function.immediate(this.__execute,this)}},
reject:function(reason){if(!this.__locked){this.__locked=true;
this.__state="rejected";
this.__valueOrReason=reason;
core.Function.immediate(this.__execute,this)}},
__executeEntry:function(entry,valueOrReason,state){var child=entry[0];
var callback=entry[1];
if(callback==null){if(state=="rejected"){child.reject(valueOrReason)}else{child.fulfill(valueOrReason)}}else{try{var context=entry[2];
var retval=context?callback.call(context,valueOrReason):callback(valueOrReason);
if(retval&&retval.then&&typeof retval.then=="function"){var retstate=retval.getState?retval.getState():"pending";
if(retstate=="pending"){retval.then(function(value){child.fulfill(value)},function(reason){child.reject(reason)})}else if(retstate=="fulfilled"){child.fulfill(retval.getValue())}else if(retstate=="rejected"){child.reject(retval.getValue())}}else{child.fulfill(retval)}}catch(ex){child.reject(ex)}}},
__execute:function(){var state=this.__state;
var queue=state=="rejected"?this.__onRejectedQueue:this.__onFulfilledQueue;
var valueOrReason=this.__valueOrReason;
for(var i=0;
i<queue.length;
i++){this.__executeEntry(queue[i],valueOrReason,state)}core.Function.immediate(this.release,this)},
release:function(){this.__onRejectedQueue.length=this.__onFulfilledQueue.length=0;
this.__state="pending";
this.__locked=false;
core.event.Promise.release(this)},
then:function(onFulfilled,onRejected,context){var child=core.event.Promise.obtain();
var fullfilledQueue=this.__onFulfilledQueue;
var rejectedQueue=this.__onRejectedQueue;
if(onFulfilled&&typeof onFulfilled=="function"){fullfilledQueue.push([child,onFulfilled,context])}else{fullfilledQueue.push([child])}if(onRejected&&typeof onRejected=="function"){rejectedQueue.push([child,onRejected,context])}else{rejectedQueue.push([child])}return child}}});


// FILE ID: corepromisestest.Main
core.Class("corepromisestest.Main",{construct:function(){var adapter={pending:function(){var promise=core.event.Promise.obtain();
return{promise:promise,
fulfill:promise.fulfill.bind(promise),
reject:promise.reject.bind(promise)}}};
var pt=require("promises-aplus-tests");
pt(adapter,function(err){console.log((err?err:0)+" errors");
console.log("Pool size of promises pool "+core.event.Promise.getPoolSize())})}});


// FILE ID: jasy.generated.BootCode-1731006400
(function(){new corepromisestest.Main})();


