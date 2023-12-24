(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1792],{72431:function(){},38214:function(e,t,r){"use strict";var n=r(57437),a=r(61865),o=r(67248);t.Z=e=>{let{name:t,control:r,label:s,size:i,required:u,type:c,defaultValue:l,multiline:d,rows:p,disabled:f,customInput:h}=e;return(0,n.jsx)(a.Qr,{name:t,control:r,render:e=>{let{field:{onChange:t,value:r},fieldState:{error:a},formState:m}=e;return(0,n.jsx)("div",{children:h?(0,n.jsx)("div",{children:h}):(0,n.jsx)(o.Z,{helperText:a?a.message:null,size:i,error:!!a,required:u,onChange:t,type:c,value:r,fullWidth:!0,label:s,defaultValue:l,variant:"outlined",disabled:f,multiline:d,maxRows:p,sx:{width:"100%"}})})}})}},11202:function(e,t,r){"use strict";r.d(t,{Z:function(){return Redux_MyProvider}});var n=r(57437),a=r(50663),o=r(81267),s=r(11850),i=r(2278),u=r(45058);let c={id:0,code:"",status:!1,valid:!1,duration:0,ending_at:"",updated_at:"",created_by:"",created_at:""},l={color:"red"},d={hours:6},p=(0,a.oM)({name:"activation",initialState:c,reducers:{addActivation:(e,t)=>{let r=t.payload;return r},removeActivation:(e,t)=>c},extraReducers:{[u.ju]:(e,t)=>({...e,...t.payload.activation})}}),f=(0,a.oM)({name:"activationColor",initialState:l,reducers:{addActivationColor:(e,t)=>{let r=t.payload;return r},addActivationReminderFrequency:(e,t)=>{let r=t.payload;return r},removeActivationColor:(e,t)=>l},extraReducers:{[u.ju]:(e,t)=>({...e,...t.payload.activation})}}),h=(0,a.oM)({name:"activationFrequency",initialState:d,reducers:{addActivationReminderFrequency:(e,t)=>{let r=t.payload;return r},removeActivationFrequency:(e,t)=>d},extraReducers:{[u.ju]:(e,t)=>({...e,...t.payload.activation})}}),{addActivation:m,removeActivation:_}=p.actions,{addActivationColor:v,removeActivationColor:y}=f.actions,{addActivationReminderFrequency:g}=h.actions;p.reducer;var x=r(21700),A=r(94152);let C=(0,a.oM)({name:"darkMode",initialState:!0,reducers:{addDarkMode:(e,t)=>{let r=t.payload;return r},removeDarkMode:(e,t)=>!0},extraReducers:{[u.ju]:(e,t)=>({state:e,...t.payload.darkMode})}}),{addDarkMode:R,removeDarkMode:P}=C.actions;C.reducer;var w=r(40424);let S={key:"root",storage:s.Z},U=(0,o.OJ)(S,C.reducer),b=(0,o.OJ)(S,i.dj.reducer),M=(0,o.OJ)(S,i.BQ.reducer),j=(0,o.OJ)(S,x.bk.reducer),k=(0,o.OJ)(S,x.oP.reducer),q=(0,o.OJ)(S,A.Fk.reducer);(0,o.OJ)(S,A.iR.reducer);let E=(0,o.OJ)(S,w.WL.reducer),J=(0,a.xC)({reducer:{darkMode:U,authUser:b,userProfile:M,userCheck:i.xI.reducer,choosenUser:j,choosenUserProfile:k,choosenCourse:q,choosenSpecialty:A.Ap.reducer,choosenDomain:A.iR.reducer,printResults:E,activation:p.reducer,activationColor:f.reducer,activationFrequncy:h.reducer},devTools:!1}),D=(0,o.p5)(J);var O=r(3198),F=r(53837),Redux_MyProvider=e=>{let{children:t}=e;return(0,n.jsx)(O.zt,{store:J,children:(0,n.jsx)(F.r,{loading:null,persistor:D,children:t})})}},21700:function(e,t,r){"use strict";r.d(t,{Gn:function(){return c},Ox:function(){return l},bk:function(){return s},nS:function(){return selectChoosenUserProfile},nY:function(){return d},oP:function(){return i},os:function(){return u},uS:function(){return selectChoosenUser}});var n=r(50663);let a={id:0,username:"",role:"",first_name:"",last_name:"",created_at:"",last_login:"",is_active:!1,dept:null,matricle:"",about:"",sex:"",telephone:0,pob:"",dob:"",email:"",email_confirmed:!1},o={id:0,user:a,first_name:"",last_name:"",about:"",telephone:0,sex:"",pob:"",dob:"",email:"",title:"",updated_at:"",created_at:"",email_confirmed:!1},s=(0,n.oM)({name:"choosedUser",initialState:a,reducers:{addChoosenUser:(e,t)=>{let r=t.payload;return r},removeChoosenUser:()=>a}}),i=(0,n.oM)({name:"choosenUserProfile",initialState:o,reducers:{addChoosenUserProfile:(e,t)=>{let r=t.payload;return r},removeChoosenUserProfile:()=>o}}),{addChoosenUser:u,removeChoosenUser:c}=s.actions,{addChoosenUserProfile:l,removeChoosenUserProfile:d}=i.actions,selectChoosenUser=e=>e.choosenUser,selectChoosenUserProfile=e=>e.choosenUserProfile;s.reducer},94152:function(e,t,r){"use strict";r.d(t,{Ap:function(){return d},Fk:function(){return p},Gt:function(){return h},LH:function(){return c},M9:function(){return f},Nf:function(){return choosenCourse},R1:function(){return choosenSpecialty},TP:function(){return v},e1:function(){return choosenDomain},iR:function(){return l},iq:function(){return _},lb:function(){return y},r9:function(){return m}});var n=r(50663),a=r(45058),o=r(2278);let s={id:0,domain_name:"",created_at:"",updated_at:""},i={id:0,academic_year:"",level:{id:0,level:0,created_at:"",updated_at:""},main_specialty:{specialty_name:"",domain:s,id:0,created_at:"",updated_at:""},updated_at:"",created_at:""},u={course_name:"",id:0,created_at:"",created_by:o.PJ,updated_at:"",updated_by:o.PJ},c={id:0,main_course:u,specialty:i,course_code:"",course_credit:0,semester:1,hours:0,completed:!1,assigned:!1,paid:!1,assigned_to:o.PJ,date_assigned:"",created_at:"",created_by:o.PJ,updated_at:"",updated_by:o.PJ},l=(0,n.oM)({name:"choosenDomain",initialState:s,reducers:{addChoosenDomain:(e,t)=>{let r=t.payload;return r},removeChoosenDomain:()=>s},extraReducers:{[a.ju]:(e,t)=>({...e,...t.payload.choosenDomain})}}),d=(0,n.oM)({name:"choosenSpecialty",initialState:i,reducers:{addChoosenSpecialty:(e,t)=>{let r=t.payload;return r},removeChoosenSpecialty:()=>i},extraReducers:{[a.ju]:(e,t)=>({...e,...t.payload.choosenSpecialty})}}),p=(0,n.oM)({name:"choosenCourse",initialState:c,reducers:{addChoosenCourse:(e,t)=>{let r=t.payload;return r},removeChoosenCourse:()=>c},extraReducers:{[a.ju]:(e,t)=>({...e,...t.payload.choosenCourse})}}),{addChoosenDomain:f,removeChoosenDomain:h}=l.actions,{addChoosenSpecialty:m,removeChoosenSpecialty:_}=d.actions,{addChoosenCourse:v,removeChoosenCourse:y}=p.actions,choosenCourse=e=>e.choosenCourse,choosenSpecialty=e=>e.choosenSpecialty,choosenDomain=e=>e.choosenDomain;p.reducer},40424:function(e,t,r){"use strict";r.d(t,{WL:function(){return u},rh:function(){return c}});var n=r(50663),a=r(2278),o=r(94152);let s={id:0,username:"",matricle:"",first_name:"",last_name:"",role:"",password:"",address:"",about:"",sex:"",telephone:0,pob:"",dob:"",email:"",email_confirmed:!1,hod:!1,title:"",created_at:"",last_login:"",is_active:!1,groups:[],user_permissions:[]},i=[{id:0,student:a.P1,course:o.LH,ca:0,test:0,exam:0,resit:0,validated:!1,closed:!1,paid:!1,created_by:s,updated_by:s,average:0}],u=(0,n.oM)({name:"printResults",initialState:i,reducers:{addPrintResults:(e,t)=>{let r=t.payload;return r},removePrintResults:()=>i}}),{addPrintResults:c,removePrintResults:l}=u.actions;u.reducer},2278:function(e,t,r){"use strict";r.d(t,{BQ:function(){return c},P1:function(){return o},PJ:function(){return a},RW:function(){return p},d:function(){return selectUserProfile},dj:function(){return u},rk:function(){return selectAuthUser},v$:function(){return d},xI:function(){return l},zr:function(){return f}});var n=r(50663);let a={id:0,username:"",matricle:"",first_name:"",last_name:"",role:"",password:"",address:"",about:"",sex:"",telephone:0,pob:"",dob:"",email:"",email_confirmed:!1,hod:!1,title:"",created_at:"",last_login:"",is_active:!1,groups:[],user_permissions:[]},o={id:0,user:a,created_at:"",updated_at:""},s={id:0,username:"",role:"",is_active:!1,token:"",refresh:""},i={user_id:0},u=(0,n.oM)({name:"authUser",initialState:s,reducers:{addAuthUser:(e,t)=>{let r=t.payload;return r},removeAuthUser:()=>s}}),c=(0,n.oM)({name:"userProfile",initialState:o,reducers:{addUserProfile:(e,t)=>{let r=t.payload;return r},removeUserProfile:()=>o}}),l=(0,n.oM)({name:"userCheck",initialState:i,reducers:{addUserCheck:(e,t)=>{let r=t.payload;return r},removeUserCheck:()=>i}}),{addAuthUser:d,removeAuthUser:p}=u.actions,{addUserProfile:f,removeUserProfile:h}=c.actions,{addUserCheck:m,removeUserCheck:_}=l.actions,selectAuthUser=e=>e.authUser,selectUserProfile=e=>e.userProfile;u.reducer},37451:function(e,t,r){"use strict";r.d(t,{$6:function(){return h},B5:function(){return y},E2:function(){return C},FO:function(){return l},G1:function(){return g},Hz:function(){return x},IK:function(){return P},QM:function(){return c},Rd:function(){return d},SC:function(){return _},VN:function(){return s},W5:function(){return i},Xx:function(){return v},ZM:function(){return m},_F:function(){return o},bw:function(){return R},cU:function(){return A},dH:function(){return p},gv:function(){return u},tW:function(){return f},vw:function(){return a}});let n="https://st-joan.com/back/",a="https://st-joan.com/result/images/logos/stjoan.jpg",o="/images/avatars/user.jpg",s=n+"admin",i=n+"user/groups",u=n+"user/groups",c=n+"user/groups",l=n+"user/permissions",d=n+"user/login",p=n+"user/check-user",f=n+"user/crud-user",h=n+"user/assign-group-to-user",m=n+"user/create-update-reset-password",_=n+"user/password_reset",v=n+"user/user-profiles",y=n+"app/domain",g=n+"app/mainspecialty",x=n+"app/specialty",A=n+"app/maincourse",C=n+"app/course",R=n+"app/result",P=n+"app/level"},2879:function(e,t,r){"use strict";r.d(t,{AW:function(){return getAllUsers},CC:function(){return getAllDomains},N9:function(){return getAllMainCourses},TR:function(){return getPermGroups},V3:function(){return getAllCourses},VQ:function(){return getAllMainSpecialties},Zu:function(){return getPermissions},cO:function(){return getAllLevels},h0:function(){return getAllSpecialties},iK:function(){return axiosRequest},l:function(){return getAllUserProfiles},qf:function(){return getAllResults}});var n=r(92173),a=r(37451);let axiosRequest=async e=>{let{method:t="get",url:r,payload:a,hasAuth:o=!1,showError:s=!0,file:i=!1,params:u={},errorObject:c}=e,l={};i&&(l={...l,"content-type":"multipart/form-data"}),a={payload:a};let d=await (0,n.Z)({method:t,url:r,params:u,data:a,headers:{...l}}).catch(e=>{if(s)return e.response});return d||null},getPermGroups=async(e,t)=>{let r=await axiosRequest({url:a.W5,hasAuth:!0,showError:!1});if(r){let n=r.data.results.map(e=>({...e}));e(n),t(!1)}},getPermissions=async(e,t)=>{let r=await axiosRequest({url:a.FO,hasAuth:!0,showError:!1});if(r){let n=r.data.results.map(e=>({...e}));e(n),t(!1)}},getAllUsers=async(e,t,r)=>{console.log(r);let n=await axiosRequest({url:a.tW,hasAuth:!0,showError:!1,params:r});if(n){let r=n.data.results.map(e=>{var t,r,n;return{...e,created_at:null===(t=e.created_at)||void 0===t?void 0:t.toString().slice(0,10),last_login:(null===(r=e.last_login)||void 0===r?void 0:r.toString().slice(0,10))+" "+(null===(n=e.last_login)||void 0===n?void 0:n.toString().slice(11,16))}});e(r),t(!1)}},getAllUserProfiles=async(e,t,r)=>{let n=await axiosRequest({url:a.Xx,hasAuth:!0,showError:!1,params:r});if(n){let r=n.data.results.map(e=>{var t;return{...e,created_at:null===(t=e.created_at)||void 0===t?void 0:t.toString().slice(0,10)}});e(r),t(!1)}},getAllDomains=async(e,t)=>{let r=await axiosRequest({url:a.B5,hasAuth:!0,showError:!1});r&&(e(r.data.results),t(!1))},getAllSpecialties=async(e,t,r)=>{let n=await axiosRequest({url:a.Hz,hasAuth:!0,showError:!1,params:r});n&&(e(n.data.results),t(!1))},getAllMainSpecialties=async(e,t,r)=>{let n=await axiosRequest({url:a.G1,hasAuth:!0,showError:!1,params:r});n&&(e(n.data.results),t(!1))},getAllMainCourses=async(e,t)=>{let r=await axiosRequest({url:a.cU,hasAuth:!0,showError:!1});r&&(e(r.data.results),t(!1))},getAllCourses=async(e,t,r)=>{let n=await axiosRequest({url:a.E2,hasAuth:!0,showError:!1,params:r});n&&(e(n.data.results),t(!1))},getAllResults=async(e,t,r)=>{let n=await axiosRequest({url:a.bw,hasAuth:!0,showError:!1,params:r});n&&(e(n.data.results),t(!1))},getAllLevels=async(e,t)=>{let r=await axiosRequest({url:a.IK,hasAuth:!0,showError:!1});r&&(e(r.data.results),t(!1))}},21373:function(e,t,r){"use strict";var n=r(57437),a=r(18219);t.Z=e=>{let{title:t,description:r,children:o}=e;return(0,n.jsx)(a.B6,{children:(0,n.jsxs)("div",{children:[(0,n.jsxs)(a.ql,{children:[(0,n.jsx)("title",{children:t}),(0,n.jsx)("meta",{name:"description",content:r})]}),o]})})}}}]);