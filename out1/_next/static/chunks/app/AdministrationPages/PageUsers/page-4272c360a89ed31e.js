(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8670,6654],{72431:function(){},95980:function(e,t,r){"use strict";var s=r(26314);t.Z=void 0;var n=s(r(80984)),a=r(57437),i=(0,n.default)((0,a.jsx)("path",{d:"M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 8c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm-6 4c.22-.72 3.31-2 6-2 2.7 0 5.8 1.29 6 2H9zm-3-3v-3h3v-2H6V7H4v3H1v2h3v3z"}),"PersonAddOutlined");t.Z=i},80984:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return s.createSvgIcon}});var s=r(59897)},78342:function(e,t,r){"use strict";r.d(t,{f:function(){return getListItemIconUtilityClass}});var s=r(26520),n=r(25702);function getListItemIconUtilityClass(e){return(0,n.Z)("MuiListItemIcon",e)}let a=(0,s.Z)("MuiListItemIcon",["root","alignItemsFlexStart"]);t.Z=a},69660:function(e,t,r){"use strict";r.d(t,{L:function(){return getListItemTextUtilityClass}});var s=r(26520),n=r(25702);function getListItemTextUtilityClass(e){return(0,n.Z)("MuiListItemText",e)}let a=(0,s.Z)("MuiListItemText",["root","multiline","dense","inset","primary","secondary"]);t.Z=a},64494:function(e,t,r){"use strict";var s=r(20791),n=r(13428),a=r(2265),i=r(57042),o=r(95600),l=r(89975),u=r(35843),c=r(87927),d=r(77820),h=r(93006),m=r(57613),p=r(37663),f=r(55563),x=r(78342),v=r(69660),g=r(60443),j=r(57437);let b=["autoFocus","component","dense","divider","disableGutters","focusVisibleClassName","role","tabIndex","className"],useUtilityClasses=e=>{let{disabled:t,dense:r,divider:s,disableGutters:a,selected:i,classes:l}=e,u=(0,o.Z)({root:["root",r&&"dense",t&&"disabled",!a&&"gutters",s&&"divider",i&&"selected"]},g.K,l);return(0,n.Z)({},l,u)},Z=(0,u.ZP)(h.Z,{shouldForwardProp:e=>(0,u.FO)(e)||"classes"===e,name:"MuiMenuItem",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.root,r.dense&&t.dense,r.divider&&t.divider,!r.disableGutters&&t.gutters]}})(({theme:e,ownerState:t})=>(0,n.Z)({},e.typography.body1,{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",whiteSpace:"nowrap"},!t.disableGutters&&{paddingLeft:16,paddingRight:16},t.divider&&{borderBottom:`1px solid ${(e.vars||e).palette.divider}`,backgroundClip:"padding-box"},{"&:hover":{textDecoration:"none",backgroundColor:(e.vars||e).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${g.Z.selected}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:(0,l.Fq)(e.palette.primary.main,e.palette.action.selectedOpacity),[`&.${g.Z.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:(0,l.Fq)(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)}},[`&.${g.Z.selected}:hover`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:(0,l.Fq)(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:(0,l.Fq)(e.palette.primary.main,e.palette.action.selectedOpacity)}},[`&.${g.Z.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`&.${g.Z.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity},[`& + .${f.Z.root}`]:{marginTop:e.spacing(1),marginBottom:e.spacing(1)},[`& + .${f.Z.inset}`]:{marginLeft:52},[`& .${v.Z.root}`]:{marginTop:0,marginBottom:0},[`& .${v.Z.inset}`]:{paddingLeft:36},[`& .${x.Z.root}`]:{minWidth:36}},!t.dense&&{[e.breakpoints.up("sm")]:{minHeight:"auto"}},t.dense&&(0,n.Z)({minHeight:32,paddingTop:4,paddingBottom:4},e.typography.body2,{[`& .${x.Z.root} svg`]:{fontSize:"1.25rem"}}))),y=a.forwardRef(function(e,t){let r;let o=(0,c.Z)({props:e,name:"MuiMenuItem"}),{autoFocus:l=!1,component:u="li",dense:h=!1,divider:f=!1,disableGutters:x=!1,focusVisibleClassName:v,role:g="menuitem",tabIndex:y,className:_}=o,C=(0,s.Z)(o,b),S=a.useContext(d.Z),A=a.useMemo(()=>({dense:h||S.dense||!1,disableGutters:x}),[S.dense,h,x]),w=a.useRef(null);(0,m.Z)(()=>{l&&w.current&&w.current.focus()},[l]);let U=(0,n.Z)({},o,{dense:A.dense,divider:f,disableGutters:x}),P=useUtilityClasses(o),M=(0,p.Z)(w,t);return o.disabled||(r=void 0!==y?y:-1),(0,j.jsx)(d.Z.Provider,{value:A,children:(0,j.jsx)(Z,(0,n.Z)({ref:M,role:g,tabIndex:r,component:u,focusVisibleClassName:(0,i.Z)(P.focusVisible,v),className:(0,i.Z)(P.root,_)},C,{ownerState:U,classes:P}))})});t.Z=y},60443:function(e,t,r){"use strict";r.d(t,{K:function(){return getMenuItemUtilityClass}});var s=r(26520),n=r(25702);function getMenuItemUtilityClass(e){return(0,n.Z)("MuiMenuItem",e)}let a=(0,s.Z)("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]);t.Z=a},10798:function(e,t,r){Promise.resolve().then(r.bind(r,5634))},60700:function(e,t,r){"use strict";var s=r(57437),n=r(79404),a=r(33071),i=r(48749),o=r(2265),l=r(3198),u=r(2879),c=r(2278),d=r(98075),h=r(49600);t.Z=e=>{let{showModal:t,setShowModal:r,url:m,record_name:p,reset:f,record:x}=e,v=(0,l.v9)(c.rk).id,[g]=n.Z.useForm(),[j,b]=(0,o.useState)(!1),onSubmit=async()=>{b(!0),console.log(x);let e=await (0,u.iK)({method:"delete",url:m+"/"+x.id,payload:{deleted_by_id:v},hasAuth:!0});b(!1),(null==e?void 0:e.data.success)&&(i.ZP.success({message:"Operation Successful",description:p+" Deleted Successfully"}),f(),g.resetFields(),r(!1)),(null==e?void 0:e.data.errors)&&i.ZP.error({message:"Operation Failed",description:"".concat(JSON.stringify(e.data.errors))})};return(0,s.jsx)(a.Z,{title:"Delete ".concat(null==p?void 0:p.toUpperCase()),open:t,onCancel:()=>r(!1),footer:!1,children:(0,s.jsxs)("div",{className:"flex flex-col flex-wrap text-3xl p-4 bg-teal-600 gap-6 items-center justify-center",children:[(0,s.jsxs)("h1",{children:["DELETE ",null==p?void 0:p.toUpperCase()]}),(0,s.jsx)("div",{className:"px-6 items-center",children:"ARE YOU SURE TO DELETE"}),(0,s.jsx)("div",{className:"px-6 items-center uppercase text-yellow-400 font-bold",children:p}),(0,s.jsxs)(d.Z,{spacing:4,direction:"row",children:[(0,s.jsx)(h.Z,{onClick:()=>{r(!1)},children:"Cancel"}),(0,s.jsx)(h.Z,{onClick:()=>{onSubmit()},children:"Delete"})]})]})})}},91416:function(e,t,r){"use strict";var s=r(57437);r(2265);var n=r(49600),a=r(71460),i=r(95980),o=r(35511);t.Z=e=>{let{setAddItem:t}=e,r={bgcolor:o.Z[500],"&:hover":{bgcolor:o.Z[800]}};return(0,s.jsx)(n.Z,{sx:{m:1,position:"relative"},onClick:()=>{t(!0)},children:(0,s.jsx)(a.Z,{"aria-label":"save",color:"primary",sx:r,children:(0,s.jsx)(i.Z,{})})})}},91678:function(e,t,r){"use strict";var s=r(57437);r(2265);var n=r(88110),a=r.n(n);t.Z=e=>{let{loading:t}=e;return(0,s.jsx)(s.Fragment,{children:(0,s.jsx)(a(),{htmlType:"submit",type:"primary",block:!0,loading:t,className:"flex gap-4 items-center justify-center bg-blue-500 text-lg h-10 font-semibold",children:(0,s.jsx)("span",{children:"Update"})})})}},38214:function(e,t,r){"use strict";var s=r(57437),n=r(61865),a=r(67248);t.Z=e=>{let{name:t,control:r,label:i,size:o,required:l,type:u,defaultValue:c,multiline:d,rows:h,disabled:m,customInput:p}=e;return(0,s.jsx)(n.Qr,{name:t,control:r,render:e=>{let{field:{onChange:t,value:r},fieldState:{error:n},formState:f}=e;return(0,s.jsx)("div",{children:p?(0,s.jsx)("div",{children:p}):(0,s.jsx)(a.Z,{helperText:n?n.message:null,size:o,error:!!n,required:l,onChange:t,type:u,value:r,fullWidth:!0,label:i,defaultValue:c,variant:"outlined",disabled:m,multiline:d,maxRows:h,sx:{width:"100%"}})})}})}},78409:function(e,t,r){"use strict";var s=r(57437),n=r(90250),a=r(76096),i=r(2265);t.Z=e=>{let{message:t,show:r,setShow:o,severity:l}=e,u=(0,i.forwardRef)(function(e,t){return(0,s.jsx)(n.Z,{elevation:6,ref:t,...e})}),handleClose=(e,t)=>{"clickaway"!==t&&o(!1)};return(0,s.jsx)(s.Fragment,{children:(0,s.jsx)(a.Z,{open:r,onClose:handleClose,autoHideDuration:4e3,anchorOrigin:{vertical:"top",horizontal:"right"},children:(0,s.jsx)(u,{onClose:handleClose,severity:l,children:t})})})}},11202:function(e,t,r){"use strict";r.d(t,{Z:function(){return Redux_MyProvider}});var s=r(57437),n=r(50663),a=r(81267),i=r(11850),o=r(2278),l=r(45058);let u={id:0,code:"",status:!1,valid:!1,duration:0,ending_at:"",updated_at:"",created_by:"",created_at:""},c={color:"red"},d={hours:6},h=(0,n.oM)({name:"activation",initialState:u,reducers:{addActivation:(e,t)=>{let r=t.payload;return r},removeActivation:(e,t)=>u},extraReducers:{[l.ju]:(e,t)=>({...e,...t.payload.activation})}}),m=(0,n.oM)({name:"activationColor",initialState:c,reducers:{addActivationColor:(e,t)=>{let r=t.payload;return r},addActivationReminderFrequency:(e,t)=>{let r=t.payload;return r},removeActivationColor:(e,t)=>c},extraReducers:{[l.ju]:(e,t)=>({...e,...t.payload.activation})}}),p=(0,n.oM)({name:"activationFrequency",initialState:d,reducers:{addActivationReminderFrequency:(e,t)=>{let r=t.payload;return r},removeActivationFrequency:(e,t)=>d},extraReducers:{[l.ju]:(e,t)=>({...e,...t.payload.activation})}}),{addActivation:f,removeActivation:x}=h.actions,{addActivationColor:v,removeActivationColor:g}=m.actions,{addActivationReminderFrequency:j}=p.actions;h.reducer;var b=r(21700),Z=r(94152);let y=(0,n.oM)({name:"darkMode",initialState:!0,reducers:{addDarkMode:(e,t)=>{let r=t.payload;return r},removeDarkMode:(e,t)=>!0},extraReducers:{[l.ju]:(e,t)=>({state:e,...t.payload.darkMode})}}),{addDarkMode:_,removeDarkMode:C}=y.actions;y.reducer;var S=r(40424);let A={key:"root",storage:i.Z},w=(0,a.OJ)(A,y.reducer),U=(0,a.OJ)(A,o.dj.reducer),P=(0,a.OJ)(A,o.BQ.reducer),M=(0,a.OJ)(A,b.bk.reducer),R=(0,a.OJ)(A,b.oP.reducer),k=(0,a.OJ)(A,Z.Fk.reducer);(0,a.OJ)(A,Z.iR.reducer);let I=(0,a.OJ)(A,S.WL.reducer),E=(0,n.xC)({reducer:{darkMode:w,authUser:U,userProfile:P,userCheck:o.xI.reducer,choosenUser:M,choosenUserProfile:R,choosenCourse:k,choosenSpecialty:Z.Ap.reducer,choosenDomain:Z.iR.reducer,printResults:I,activation:h.reducer,activationColor:m.reducer,activationFrequncy:p.reducer},devTools:!1}),O=(0,a.p5)(E);var F=r(3198),L=r(53837),Redux_MyProvider=e=>{let{children:t}=e;return(0,s.jsx)(F.zt,{store:E,children:(0,s.jsx)(L.r,{loading:null,persistor:O,children:t})})}},21700:function(e,t,r){"use strict";r.d(t,{Gn:function(){return u},Ox:function(){return c},bk:function(){return i},nS:function(){return selectChoosenUserProfile},nY:function(){return d},oP:function(){return o},os:function(){return l},uS:function(){return selectChoosenUser}});var s=r(50663);let n={id:0,username:"",role:"",first_name:"",last_name:"",created_at:"",last_login:"",is_active:!1,dept:null,matricle:"",about:"",sex:"",telephone:0,pob:"",dob:"",email:"",email_confirmed:!1},a={id:0,user:n,first_name:"",last_name:"",about:"",telephone:0,sex:"",pob:"",dob:"",email:"",title:"",updated_at:"",created_at:"",email_confirmed:!1},i=(0,s.oM)({name:"choosedUser",initialState:n,reducers:{addChoosenUser:(e,t)=>{let r=t.payload;return r},removeChoosenUser:()=>n}}),o=(0,s.oM)({name:"choosenUserProfile",initialState:a,reducers:{addChoosenUserProfile:(e,t)=>{let r=t.payload;return r},removeChoosenUserProfile:()=>a}}),{addChoosenUser:l,removeChoosenUser:u}=i.actions,{addChoosenUserProfile:c,removeChoosenUserProfile:d}=o.actions,selectChoosenUser=e=>e.choosenUser,selectChoosenUserProfile=e=>e.choosenUserProfile;i.reducer},94152:function(e,t,r){"use strict";r.d(t,{Ap:function(){return d},Fk:function(){return h},Gt:function(){return p},LH:function(){return u},M9:function(){return m},Nf:function(){return choosenCourse},R1:function(){return choosenSpecialty},TP:function(){return v},e1:function(){return choosenDomain},iR:function(){return c},iq:function(){return x},lb:function(){return g},r9:function(){return f}});var s=r(50663),n=r(45058),a=r(2278);let i={id:0,domain_name:"",created_at:"",updated_at:""},o={id:0,academic_year:"",level:{id:0,level:0,created_at:"",updated_at:""},main_specialty:{specialty_name:"",domain:i,id:0,created_at:"",updated_at:""},updated_at:"",created_at:""},l={course_name:"",id:0,created_at:"",created_by:a.PJ,updated_at:"",updated_by:a.PJ},u={id:0,main_course:l,specialty:o,course_code:"",course_credit:0,semester:1,hours:0,completed:!1,assigned:!1,paid:!1,assigned_to:a.PJ,date_assigned:"",created_at:"",created_by:a.PJ,updated_at:"",updated_by:a.PJ},c=(0,s.oM)({name:"choosenDomain",initialState:i,reducers:{addChoosenDomain:(e,t)=>{let r=t.payload;return r},removeChoosenDomain:()=>i},extraReducers:{[n.ju]:(e,t)=>({...e,...t.payload.choosenDomain})}}),d=(0,s.oM)({name:"choosenSpecialty",initialState:o,reducers:{addChoosenSpecialty:(e,t)=>{let r=t.payload;return r},removeChoosenSpecialty:()=>o},extraReducers:{[n.ju]:(e,t)=>({...e,...t.payload.choosenSpecialty})}}),h=(0,s.oM)({name:"choosenCourse",initialState:u,reducers:{addChoosenCourse:(e,t)=>{let r=t.payload;return r},removeChoosenCourse:()=>u},extraReducers:{[n.ju]:(e,t)=>({...e,...t.payload.choosenCourse})}}),{addChoosenDomain:m,removeChoosenDomain:p}=c.actions,{addChoosenSpecialty:f,removeChoosenSpecialty:x}=d.actions,{addChoosenCourse:v,removeChoosenCourse:g}=h.actions,choosenCourse=e=>e.choosenCourse,choosenSpecialty=e=>e.choosenSpecialty,choosenDomain=e=>e.choosenDomain;h.reducer},40424:function(e,t,r){"use strict";r.d(t,{WL:function(){return l},rh:function(){return u}});var s=r(50663),n=r(2278),a=r(94152);let i={id:0,username:"",matricle:"",first_name:"",last_name:"",role:"",password:"",address:"",about:"",sex:"",telephone:0,pob:"",dob:"",email:"",email_confirmed:!1,hod:!1,title:"",created_at:"",last_login:"",is_active:!1,groups:[],user_permissions:[]},o=[{id:0,student:n.P1,course:a.LH,ca:0,test:0,exam:0,resit:0,validated:!1,closed:!1,paid:!1,created_by:i,updated_by:i,average:0}],l=(0,s.oM)({name:"printResults",initialState:o,reducers:{addPrintResults:(e,t)=>{let r=t.payload;return r},removePrintResults:()=>o}}),{addPrintResults:u,removePrintResults:c}=l.actions;l.reducer},2278:function(e,t,r){"use strict";r.d(t,{BQ:function(){return u},P1:function(){return a},PJ:function(){return n},RW:function(){return h},d:function(){return selectUserProfile},dj:function(){return l},rk:function(){return selectAuthUser},v$:function(){return d},xI:function(){return c},zr:function(){return m}});var s=r(50663);let n={id:0,username:"",matricle:"",first_name:"",last_name:"",role:"",password:"",address:"",about:"",sex:"",telephone:0,pob:"",dob:"",email:"",email_confirmed:!1,hod:!1,title:"",created_at:"",last_login:"",is_active:!1,groups:[],user_permissions:[]},a={id:0,user:n,created_at:"",updated_at:""},i={id:0,username:"",role:"",is_active:!1,token:"",refresh:""},o={user_id:0},l=(0,s.oM)({name:"authUser",initialState:i,reducers:{addAuthUser:(e,t)=>{let r=t.payload;return r},removeAuthUser:()=>i}}),u=(0,s.oM)({name:"userProfile",initialState:a,reducers:{addUserProfile:(e,t)=>{let r=t.payload;return r},removeUserProfile:()=>a}}),c=(0,s.oM)({name:"userCheck",initialState:o,reducers:{addUserCheck:(e,t)=>{let r=t.payload;return r},removeUserCheck:()=>o}}),{addAuthUser:d,removeAuthUser:h}=l.actions,{addUserProfile:m,removeUserProfile:p}=u.actions,{addUserCheck:f,removeUserCheck:x}=c.actions,selectAuthUser=e=>e.authUser,selectUserProfile=e=>e.userProfile;l.reducer},37451:function(e,t,r){"use strict";r.d(t,{$6:function(){return p},B5:function(){return g},E2:function(){return y},FO:function(){return c},G1:function(){return j},Hz:function(){return b},IK:function(){return C},QM:function(){return u},Rd:function(){return d},SC:function(){return x},VN:function(){return i},W5:function(){return o},Xx:function(){return v},ZM:function(){return f},_F:function(){return a},bw:function(){return _},cU:function(){return Z},dH:function(){return h},gv:function(){return l},tW:function(){return m},vw:function(){return n}});let s="https://st-joan.com/back/",n="https://st-joan.com/result/images/logos/stjoan.jpg",a="/images/avatars/user.jpg",i=s+"admin",o=s+"user/groups",l=s+"user/groups",u=s+"user/groups",c=s+"user/permissions",d=s+"user/login",h=s+"user/check-user",m=s+"user/crud-user",p=s+"user/assign-group-to-user",f=s+"user/create-update-reset-password",x=s+"user/password_reset",v=s+"user/user-profiles",g=s+"app/domain",j=s+"app/mainspecialty",b=s+"app/specialty",Z=s+"app/maincourse",y=s+"app/course",_=s+"app/result",C=s+"app/level"},44767:function(e,t,r){"use strict";r.d(t,{Kq:function(){return useGetAllMainCourses},Lh:function(){return useGetAllLevels},Nz:function(){return useGetAllDomains},Rc:function(){return useGetPermissions},UK:function(){return useGetAllCourses},e6:function(){return useGetPermGroups},lJ:function(){return useGetAllMainSpecialties},lP:function(){return useGetAllResults},mC:function(){return useGetAllSpecialties},mb:function(){return useGetAllUsers},qT:function(){return useGetAllUserProfiles}});var s=r(2265),n=r(2879);let useGetPermGroups=(e,t)=>{(0,s.useEffect)(()=>{(0,n.TR)(e,t)},[e,t])},useGetPermissions=(e,t)=>{(0,s.useEffect)(()=>{(0,n.Zu)(e,t)},[e,t])},useGetAllUsers=(e,t,r)=>{(0,s.useEffect)(()=>{(0,n.AW)(e,t,r)},[e,t,r])},useGetAllUserProfiles=(e,t,r)=>{(0,s.useEffect)(()=>{(0,n.l)(e,t,r)},[e,t,r])},useGetAllDomains=(e,t)=>{(0,s.useEffect)(()=>{(0,n.CC)(e,t)},[e,t])},useGetAllSpecialties=(e,t,r)=>{(0,s.useEffect)(()=>{(0,n.h0)(e,t,r)},[e,t,r])},useGetAllMainSpecialties=(e,t,r)=>{(0,s.useEffect)(()=>{(0,n.VQ)(e,t,r)},[e,t,r])},useGetAllCourses=(e,t,r)=>{(0,s.useEffect)(()=>{(0,n.V3)(e,t,r)},[e,t,r])},useGetAllMainCourses=(e,t)=>{(0,s.useEffect)(()=>{(0,n.N9)(e,t)},[e,t])},useGetAllResults=(e,t,r)=>{(0,s.useEffect)(()=>{(0,n.qf)(e,t,r)},[e,t,r])},useGetAllLevels=(e,t)=>{(0,s.useEffect)(()=>{(0,n.cO)(e,t)},[e,t])}},2879:function(e,t,r){"use strict";r.d(t,{AW:function(){return getAllUsers},CC:function(){return getAllDomains},N9:function(){return getAllMainCourses},TR:function(){return getPermGroups},V3:function(){return getAllCourses},VQ:function(){return getAllMainSpecialties},Zu:function(){return getPermissions},cO:function(){return getAllLevels},h0:function(){return getAllSpecialties},iK:function(){return axiosRequest},l:function(){return getAllUserProfiles},qf:function(){return getAllResults}});var s=r(92173),n=r(37451);let axiosRequest=async e=>{let{method:t="get",url:r,payload:n,hasAuth:a=!1,showError:i=!0,file:o=!1,params:l={},errorObject:u}=e,c={};o&&(c={...c,"content-type":"multipart/form-data"}),n={payload:n};let d=await (0,s.Z)({method:t,url:r,params:l,data:n,headers:{...c}}).catch(e=>{if(i)return e.response});return d||null},getPermGroups=async(e,t)=>{let r=await axiosRequest({url:n.W5,hasAuth:!0,showError:!1});if(r){let s=r.data.results.map(e=>({...e}));e(s),t(!1)}},getPermissions=async(e,t)=>{let r=await axiosRequest({url:n.FO,hasAuth:!0,showError:!1});if(r){let s=r.data.results.map(e=>({...e}));e(s),t(!1)}},getAllUsers=async(e,t,r)=>{console.log(r);let s=await axiosRequest({url:n.tW,hasAuth:!0,showError:!1,params:r});if(s){let r=s.data.results.map(e=>{var t,r,s;return{...e,created_at:null===(t=e.created_at)||void 0===t?void 0:t.toString().slice(0,10),last_login:(null===(r=e.last_login)||void 0===r?void 0:r.toString().slice(0,10))+" "+(null===(s=e.last_login)||void 0===s?void 0:s.toString().slice(11,16))}});e(r),t(!1)}},getAllUserProfiles=async(e,t,r)=>{let s=await axiosRequest({url:n.Xx,hasAuth:!0,showError:!1,params:r});if(s){let r=s.data.results.map(e=>{var t;return{...e,created_at:null===(t=e.created_at)||void 0===t?void 0:t.toString().slice(0,10)}});e(r),t(!1)}},getAllDomains=async(e,t)=>{let r=await axiosRequest({url:n.B5,hasAuth:!0,showError:!1});r&&(e(r.data.results),t(!1))},getAllSpecialties=async(e,t,r)=>{let s=await axiosRequest({url:n.Hz,hasAuth:!0,showError:!1,params:r});s&&(e(s.data.results),t(!1))},getAllMainSpecialties=async(e,t,r)=>{let s=await axiosRequest({url:n.G1,hasAuth:!0,showError:!1,params:r});s&&(e(s.data.results),t(!1))},getAllMainCourses=async(e,t)=>{let r=await axiosRequest({url:n.cU,hasAuth:!0,showError:!1});r&&(e(r.data.results),t(!1))},getAllCourses=async(e,t,r)=>{let s=await axiosRequest({url:n.E2,hasAuth:!0,showError:!1,params:r});s&&(e(s.data.results),t(!1))},getAllResults=async(e,t,r)=>{let s=await axiosRequest({url:n.bw,hasAuth:!0,showError:!1,params:r});s&&(e(s.data.results),t(!1))},getAllLevels=async(e,t)=>{let r=await axiosRequest({url:n.IK,hasAuth:!0,showError:!1});r&&(e(r.data.results),t(!1))}},5634:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return K}});var s,n=r(57437),a=r(2265),i=r(96507),o=r(38939),l=r(98075),u=r(71460),c=r(67248),d=r(75897),h=r(53514),m=r(77370),p=r(80470),f=r(85269),x=r(57842),v=r(49600),g=r(63552),j=r(44767),b=r(2879),Z=r(88220),y=r(61865),_=r(38214),C=r(5096),S=r(35009),A=r(46349),w=r(64494),Designs_MyFormSelect=e=>{let{name:t,control:r,label:s,selectItems:a}=e;return(0,n.jsxs)(C.Z,{size:"medium",fullWidth:!0,children:[(0,n.jsx)(S.Z,{children:s}),(0,n.jsx)(y.Qr,{render:e=>{let{field:{onChange:t,value:r}}=e;return(0,n.jsx)(A.Z,{onChange:t,value:r,children:a.map(e=>(0,n.jsx)(w.Z,{value:e.value,children:e.displayName},e.value))})},control:r,name:t})]})},U=r(37451),P=r(3198),M=r(2278),R=r(78409);let k={position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:400,bgcolor:"background.paper",border:"2px solid #000",boxShadow:24,p:4},I={username:"",role:""};var Modals_AddUserFormModal=e=>{let{showModal:t,setShowModal:r,resetItems:s}=e,o=(0,P.v9)(M.rk),[l,u]=a.useState(!1),[c,d]=a.useState("false"),[h,m]=a.useState("success"),{handleSubmit:p,reset:f,control:x}=(0,y.cI)({defaultValues:I}),onSubmit=async e=>{var t;let n={...e,username:e.username.toLowerCase(),created_by_id:o.id},a=await (0,b.iK)({method:"post",url:U.tW,payload:n,hasAuth:!0});(null==a?void 0:a.data.success)&&(u(!0),r(!1),m("success"),d("Operation Success"),s(),f()),(null==a?void 0:a.data.errors)&&(u(!0),m("warning"),d(JSON.stringify(null==a?void 0:a.data.errors))),(null==a?void 0:null===(t=a.data)||void 0===t?void 0:t.error)&&(u(!0),m("error"),d("".concat(a.data.error)))};return(0,n.jsxs)("div",{children:[(0,n.jsx)(Z.Z,{open:t,onClose:()=>{r(!1)},"aria-labelledby":"modal-modal-title","aria-describedby":"modal-modal-description",children:(0,n.jsxs)(i.Z,{sx:{...k,width:400},children:[(0,n.jsx)(i.Z,{mb:2,children:(0,n.jsx)(_.Z,{name:"username",control:x,label:"Username"})}),(0,n.jsx)(i.Z,{mt:4,mb:4,children:(0,n.jsx)(Designs_MyFormSelect,{name:"role",control:x,label:"Role",selectItems:[{displayName:"Admin",value:"admin"},{displayName:"Lecturer",value:"teacher"},{displayName:"Student",value:"student"}]})}),(0,n.jsx)(i.Z,{mb:2,children:(0,n.jsx)(_.Z,{name:"email",control:x,label:"Email"})}),(0,n.jsx)(i.Z,{m:2,sx:{width:"100"},children:(0,n.jsx)(v.Z,{onClick:p(onSubmit),variant:"contained",fullWidth:!0,children:"Submit"})})]})}),(0,n.jsx)(R.Z,{show:l,setShow:u,message:c,severity:h})]})},E=r(79404),O=r(43574),F=r(33071),L=r(45623),W=r(48749),q=r(91678);let{Option:G}=L.default;var Modals_EditUserFormModal=e=>{let{showModal:t,setShowModal:r,reset:s,record:i}=e,o=(0,P.v9)(M.rk).id,[l]=E.Z.useForm(),[u,c]=(0,a.useState)(!1),onSubmit=async e=>{c(!0),(""==e.username||void 0==e.username||null==e.username)&&(e.username=i.username.toLowerCase()),(""==e.role||void 0==e.role||null==e.role)&&(e.role=i.role),(""==e.email||void 0==e.email||null==e.email)&&(e.email=i.email),(void 0==e.is_active||e.is_active.length<1)&&(e.is_active=i.is_active);let t={...e,username:e.username.toLowerCase(),updated_by_id:o},n=await (0,b.iK)({method:"put",url:U.tW+"/"+i.id,payload:t,hasAuth:!0});c(!1),console.log(n),(null==n?void 0:n.data.success)&&(W.ZP.success({message:"Operation Successful",description:"User Updated Successfully"}),s(),r(!1),l.resetFields()),(null==n?void 0:n.data.error)&&(console.log(n.data.error),W.ZP.error({message:"Operation Failed",description:"".concat(JSON.stringify(n.data.error))}))};return(0,n.jsx)(F.Z,{title:"EDIT - ".concat(null==i?void 0:i.username),open:t,onCancel:()=>{r(!1),s()},footer:!1,children:(0,n.jsxs)(E.Z,{layout:"vertical",onFinish:onSubmit,form:l,className:"bg-teal-700 rounded p-2",children:[(0,n.jsx)(E.Z.Item,{label:"User Name",name:"username",rules:[{required:!1,message:"Please Input User Name"}],children:(0,n.jsx)(O.default,{defaultValue:"".concat(null==i?void 0:i.username),type:"text"})}),(0,n.jsx)(E.Z.Item,{label:"Role",name:"role",rules:[{required:!1,message:"Please Input Role"}],children:(0,n.jsxs)(L.default,{defaultValue:"".concat(null==i?void 0:i.role),children:[(0,n.jsx)(G,{value:"admin",children:"Admin"}),(0,n.jsx)(G,{value:"teacher",children:"Teacher"}),(0,n.jsx)(G,{value:"student",children:"Student"})]})}),(0,n.jsx)(E.Z.Item,{label:"Email",name:"email",rules:[{required:!1,message:"Please Input Email"}],children:(0,n.jsx)(O.default,{defaultValue:"".concat(null==i?void 0:i.email),type:"text"})}),(0,n.jsx)(E.Z.Item,{label:"Status",name:"is_active",rules:[{required:!1,message:"Please Select"}],children:(0,n.jsxs)(L.default,{defaultValue:"Status",children:[(0,n.jsx)(G,{value:!0,children:"Active"}),(0,n.jsx)(G,{value:!1,children:"Inactive"})]})}),(0,n.jsx)(E.Z.Item,{children:(0,n.jsx)(q.Z,{loading:u})})]})})},N=r(60700),D=r(91416),$=r(80432),T=r(34273),V=r(24033),J=r(21700),PageUsers_TableUsers=()=>{let e=(0,V.useRouter)(),t=(0,P.I0)(),[r,s]=(0,a.useState)(!1),[Z,y]=(0,a.useState)(),[_,C]=(0,a.useState)([]),[S,A]=(0,a.useState)([]),[w,M]=(0,a.useState)([]),[R,k]=(0,a.useState)(!1),[I,E]=(0,a.useState)(!1),[O,F]=(0,a.useState)(!1);t((0,J.Gn)()),(0,j.mb)(A,s),(0,j.qT)(C,s),(0,a.useEffect)(()=>{M(S)},[S]);let reset=()=>{s(!0),(0,b.AW)(A,s)},buttonSx=e=>({...e?{bgcolor:$.Z[500],"&:hover":{bgcolor:$.Z[800]}}:{bgcolor:T.Z[500],"&:hover":{bgcolor:T.Z[800]}}}),Search=e=>{let t=S.filter(t=>{var r;return null===(r=t.username)||void 0===r?void 0:r.toLowerCase().includes(e.toLowerCase())}),r=S.filter(t=>{var r;return null===(r=t.first_name)||void 0===r?void 0:r.toLowerCase().includes(e.toLowerCase())});M([...new Set([...t,...r])])};return(0,n.jsx)(g.Z,{title:"Users List",children:(0,n.jsx)(i.Z,{sx:{overflow:"auto",width:{xs:"380px",sm:"auto"}},children:(0,n.jsxs)(o.ZP,{container:!0,spacing:0,children:[(0,n.jsxs)(l.Z,{direction:"row",spacing:2,sx:{alignItems:"center",alignContent:"center"},children:[(0,n.jsx)(D.Z,{setAddItem:k}),(0,n.jsx)(u.Z,{"aria-label":"save",color:"primary",sx:buttonSx(!0),onClick:()=>reset(),children:r?"Loading":(0,n.jsx)(n.Fragment,{children:w.length})}),(0,n.jsx)(i.Z,{children:(0,n.jsx)(c.Z,{label:"Search",onChange:e=>{Search(e.target.value)},placeholder:"Search Users ...",sx:{width:260}})})]}),(0,n.jsx)(o.ZP,{item:!0,xs:12,children:(0,n.jsxs)(d.Z,{"aria-label":"simple table",sx:{whiteSpace:"nowrap",mt:0},children:[(0,n.jsx)(h.Z,{children:(0,n.jsxs)(m.Z,{children:[(0,n.jsx)(p.Z,{children:(0,n.jsx)(f.Z,{variant:"subtitle2",fontWeight:600,children:"Username"})}),(0,n.jsx)(p.Z,{children:(0,n.jsx)(f.Z,{variant:"subtitle2",fontWeight:600,children:"Full Name"})}),(0,n.jsx)(p.Z,{children:(0,n.jsx)(f.Z,{variant:"subtitle2",fontWeight:600,children:"Role"})}),(0,n.jsx)(p.Z,{children:(0,n.jsx)(f.Z,{variant:"subtitle2",fontWeight:600,children:"Password"})}),(0,n.jsx)(p.Z,{children:(0,n.jsx)(f.Z,{variant:"subtitle2",fontWeight:600,children:"Email"})}),(0,n.jsx)(p.Z,{children:(0,n.jsx)(f.Z,{variant:"subtitle2",fontWeight:600,children:"Last Login"})}),(0,n.jsx)(p.Z,{children:(0,n.jsx)(f.Z,{variant:"subtitle2",fontWeight:600,children:"Status"})}),(0,n.jsx)(p.Z,{align:"center",children:(0,n.jsx)(f.Z,{variant:"subtitle2",fontWeight:600,children:"Action"})})]})}),(0,n.jsx)(x.Z,{children:w.map(r=>(0,n.jsxs)(m.Z,{children:[(0,n.jsx)(p.Z,{children:(0,n.jsx)(f.Z,{sx:{fontSize:"15px",fontWeight:"500"},children:r.username})}),(0,n.jsx)(p.Z,{children:(0,n.jsxs)(f.Z,{sx:{fontSize:"15px",fontWeight:"500"},children:[r.first_name," ",r.last_name]})}),(0,n.jsx)(p.Z,{children:(0,n.jsx)(f.Z,{color:"textSecondary",variant:"subtitle2",fontWeight:400,children:r.role})}),(0,n.jsx)(p.Z,{children:(0,n.jsx)(f.Z,{color:"textSecondary",variant:"subtitle2",fontWeight:400,children:(0,n.jsx)(u.Z,{"aria-label":"save",color:"primary",sx:buttonSx(!!r.password),onClick:()=>reset(),children:r.password?"OK":(0,n.jsx)(n.Fragment,{children:"-"})})})}),(0,n.jsx)(p.Z,{children:r.email_confirmed?(0,n.jsx)(f.Z,{sx:{backgroundColor:"lightgreen",border:1,textAlign:"center",alignItems:"center",borderRadius:2},variant:"subtitle2",fontWeight:400,children:r.email}):(0,n.jsx)(f.Z,{sx:{backgroundColor:"lightpink",border:1,textAlign:"center",alignItems:"center",borderRadius:2},variant:"subtitle2",fontWeight:400,children:r.email})}),(0,n.jsx)(p.Z,{children:(0,n.jsx)(f.Z,{color:"textSecondary",variant:"subtitle2",fontWeight:400,children:r.last_login.includes("undefined")?"-":r.last_login})}),(0,n.jsx)(p.Z,{children:(0,n.jsx)(f.Z,{color:"textSecondary",variant:"subtitle2",fontWeight:400,children:(null==r?void 0:r.is_active)?(0,n.jsx)(f.Z,{sx:{backgroundColor:"lightgreen",border:1,textAlign:"center",alignItems:"center",borderRadius:2},variant:"subtitle2",fontWeight:400,children:"Active"}):(0,n.jsx)(f.Z,{sx:{backgroundColor:"lightpink",border:1,textAlign:"center",alignItems:"center",borderRadius:2},variant:"subtitle2",fontWeight:400,children:"Inactive"})})}),(0,n.jsx)(p.Z,{align:"left",children:(0,n.jsxs)(l.Z,{justifyItems:"center",direction:"row",spacing:1,justifyContent:"center",children:[(0,n.jsx)(v.Z,{onClick:()=>{y(r),E(!0)},variant:"contained",disableElevation:!0,color:"primary",children:"Edit"}),(0,n.jsx)(v.Z,{onClick:()=>{console.log(r.id),console.log(_.filter(e=>e.user.id==e.id)[0]),t((0,J.Ox)(_.filter(e=>e.user.id==r.id)[0])),e.push("/AdministrationPages/AccountSettings")},variant:"contained",disableElevation:!0,color:"primary",children:"View"}),(0,n.jsx)(v.Z,{onClick:()=>{y(r),F(!0)},variant:"contained",disableElevation:!0,color:"primary",children:"Delete"})]})})]},r.id))})]})}),(0,n.jsxs)(o.ZP,{item:!0,xs:12,children:[(0,n.jsx)(Modals_AddUserFormModal,{showModal:R,setShowModal:k,resetItems:reset}),(0,n.jsx)(Modals_EditUserFormModal,{showModal:I,setShowModal:E,record:Z,reset:reset}),(0,n.jsx)(N.Z,{showModal:O,setShowModal:F,record:Z,url:U.tW,record_name:(null==Z?void 0:Z.username)?Z.username:"",reset:reset})]})]})})})},z=r(70031),H=r(11202),_AuthenticationPages_NotAuthenticated=()=>{let e=(0,V.useRouter)();return(0,n.jsxs)("div",{className:"flex flex-col gap-10 justify-center items-center text-center font-bold mt-24 pt-10",children:[(0,n.jsx)("div",{className:"pt-10",children:"Not Authenticated"}),(0,n.jsx)("div",{className:"pt-10",children:(0,n.jsx)("button",{onClick:()=>{e.push("/")},children:"Login Again"})})]})},K=(s=()=>(0,n.jsx)(z.Z,{title:"Users",description:"this is Users Page",children:(0,n.jsx)(PageUsers_TableUsers,{})}),e=>{let t=(0,P.v9)(M.rk),r=(0,V.useRouter)(),[i,o]=(0,a.useState)(!1);return(0,a.useEffect)(()=>{t.id>0?o(!0):o(!1)},[t,r]),i?(0,n.jsx)(H.Z,{children:(0,n.jsx)(s,{})}):(0,n.jsx)(_AuthenticationPages_NotAuthenticated,{})})},70031:function(e,t,r){"use strict";var s=r(57437),n=r(18219);t.Z=e=>{let{title:t,description:r,children:a}=e;return(0,s.jsx)(n.B6,{children:(0,s.jsxs)("div",{children:[(0,s.jsxs)(n.ql,{children:[(0,s.jsx)("title",{children:t}),(0,s.jsx)("meta",{name:"description",content:r})]}),a]})})}},63552:function(e,t,r){"use strict";var s=r(57437);r(2265);var n=r(65984),a=r(8323),i=r(85269),o=r(98075),l=r(96507);t.Z=e=>{let{title:t,subtitle:r,children:u,action:c,footer:d,cardheading:h,headtitle:m,headsubtitle:p,middlecontent:f}=e;return(0,s.jsxs)(n.Z,{sx:{padding:0},elevation:9,variant:void 0,children:[h?(0,s.jsxs)(a.Z,{children:[(0,s.jsx)(i.Z,{variant:"h5",children:m}),(0,s.jsx)(i.Z,{variant:"subtitle2",color:"textSecondary",children:p})]}):(0,s.jsxs)(a.Z,{sx:{p:"10px"},children:[t?(0,s.jsxs)(o.Z,{direction:"row",spacing:2,justifyContent:"space-between",alignItems:"center",mb:3,children:[(0,s.jsxs)(l.Z,{children:[t?(0,s.jsx)(i.Z,{variant:"h5",children:t}):"",r?(0,s.jsx)(i.Z,{variant:"subtitle2",color:"textSecondary",children:r}):""]}),c]}):null,u]}),f,d]})}}},function(e){e.O(0,[4370,1820,6287,8939,4815,2173,8897,8219,6688,721,8749,6349,3220,3071,5058,7248,2997,1042,9655,1892,9540,8582,4821,6096,2971,2472,1744],function(){return e(e.s=10798)}),_N_E=e.O()}]);