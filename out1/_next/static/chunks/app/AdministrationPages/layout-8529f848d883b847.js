(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3289],{72431:function(){},1399:function(e,r,t){Promise.resolve().then(t.bind(t,84332))},11202:function(e,r,t){"use strict";t.d(r,{Z:function(){return Redux_MyProvider}});var n=t(57437),a=t(50663),o=t(81267),i=t(11850),s=t(2278),d=t(45058);let c={id:0,code:"",status:!1,valid:!1,duration:0,ending_at:"",updated_at:"",created_by:"",created_at:""},l={color:"red"},u={hours:6},p=(0,a.oM)({name:"activation",initialState:c,reducers:{addActivation:(e,r)=>{let t=r.payload;return t},removeActivation:(e,r)=>c},extraReducers:{[d.ju]:(e,r)=>({...e,...r.payload.activation})}}),h=(0,a.oM)({name:"activationColor",initialState:l,reducers:{addActivationColor:(e,r)=>{let t=r.payload;return t},addActivationReminderFrequency:(e,r)=>{let t=r.payload;return t},removeActivationColor:(e,r)=>l},extraReducers:{[d.ju]:(e,r)=>({...e,...r.payload.activation})}}),m=(0,a.oM)({name:"activationFrequency",initialState:u,reducers:{addActivationReminderFrequency:(e,r)=>{let t=r.payload;return t},removeActivationFrequency:(e,r)=>u},extraReducers:{[d.ju]:(e,r)=>({...e,...r.payload.activation})}}),{addActivation:x,removeActivation:f}=p.actions,{addActivationColor:v,removeActivationColor:g}=h.actions,{addActivationReminderFrequency:y}=m.actions;p.reducer;var j=t(21700),b=t(94152);let _=(0,a.oM)({name:"darkMode",initialState:!0,reducers:{addDarkMode:(e,r)=>{let t=r.payload;return t},removeDarkMode:(e,r)=>!0},extraReducers:{[d.ju]:(e,r)=>({state:e,...r.payload.darkMode})}}),{addDarkMode:Z,removeDarkMode:P}=_.actions;_.reducer;var k=t(40424);let C={key:"root",storage:i.Z},M=(0,o.OJ)(C,_.reducer),S=(0,o.OJ)(C,s.dj.reducer),w=(0,o.OJ)(C,s.BQ.reducer),U=(0,o.OJ)(C,j.bk.reducer),R=(0,o.OJ)(C,j.oP.reducer),A=(0,o.OJ)(C,b.Fk.reducer);(0,o.OJ)(C,b.iR.reducer);let F=(0,o.OJ)(C,k.WL.reducer),I=(0,a.xC)({reducer:{darkMode:M,authUser:S,userProfile:w,userCheck:s.xI.reducer,choosenUser:U,choosenUserProfile:R,choosenCourse:A,choosenSpecialty:b.Ap.reducer,choosenDomain:b.iR.reducer,printResults:F,activation:p.reducer,activationColor:h.reducer,activationFrequncy:m.reducer},devTools:!1}),O=(0,o.p5)(I);var J=t(3198),N=t(53837),Redux_MyProvider=e=>{let{children:r}=e;return(0,n.jsx)(J.zt,{store:I,children:(0,n.jsx)(N.r,{loading:null,persistor:O,children:r})})}},21700:function(e,r,t){"use strict";t.d(r,{Gn:function(){return c},Ox:function(){return l},bk:function(){return i},nS:function(){return selectChoosenUserProfile},nY:function(){return u},oP:function(){return s},os:function(){return d},uS:function(){return selectChoosenUser}});var n=t(50663);let a={id:0,username:"",role:"",first_name:"",last_name:"",created_at:"",last_login:"",is_active:!1,dept:null,matricle:"",about:"",sex:"",telephone:0,pob:"",dob:"",email:"",email_confirmed:!1},o={id:0,user:a,first_name:"",last_name:"",about:"",telephone:0,sex:"",pob:"",dob:"",email:"",title:"",updated_at:"",created_at:"",email_confirmed:!1},i=(0,n.oM)({name:"choosedUser",initialState:a,reducers:{addChoosenUser:(e,r)=>{let t=r.payload;return t},removeChoosenUser:()=>a}}),s=(0,n.oM)({name:"choosenUserProfile",initialState:o,reducers:{addChoosenUserProfile:(e,r)=>{let t=r.payload;return t},removeChoosenUserProfile:()=>o}}),{addChoosenUser:d,removeChoosenUser:c}=i.actions,{addChoosenUserProfile:l,removeChoosenUserProfile:u}=s.actions,selectChoosenUser=e=>e.choosenUser,selectChoosenUserProfile=e=>e.choosenUserProfile;i.reducer},94152:function(e,r,t){"use strict";t.d(r,{Ap:function(){return u},Fk:function(){return p},Gt:function(){return m},LH:function(){return c},M9:function(){return h},Nf:function(){return choosenCourse},R1:function(){return choosenSpecialty},TP:function(){return v},e1:function(){return choosenDomain},iR:function(){return l},iq:function(){return f},lb:function(){return g},r9:function(){return x}});var n=t(50663),a=t(45058),o=t(2278);let i={id:0,domain_name:"",created_at:"",updated_at:""},s={id:0,academic_year:"",level:{id:0,level:0,created_at:"",updated_at:""},main_specialty:{specialty_name:"",domain:i,id:0,created_at:"",updated_at:""},updated_at:"",created_at:""},d={course_name:"",id:0,created_at:"",created_by:o.PJ,updated_at:"",updated_by:o.PJ},c={id:0,main_course:d,specialty:s,course_code:"",course_credit:0,semester:1,hours:0,completed:!1,assigned:!1,paid:!1,assigned_to:o.PJ,date_assigned:"",created_at:"",created_by:o.PJ,updated_at:"",updated_by:o.PJ},l=(0,n.oM)({name:"choosenDomain",initialState:i,reducers:{addChoosenDomain:(e,r)=>{let t=r.payload;return t},removeChoosenDomain:()=>i},extraReducers:{[a.ju]:(e,r)=>({...e,...r.payload.choosenDomain})}}),u=(0,n.oM)({name:"choosenSpecialty",initialState:s,reducers:{addChoosenSpecialty:(e,r)=>{let t=r.payload;return t},removeChoosenSpecialty:()=>s},extraReducers:{[a.ju]:(e,r)=>({...e,...r.payload.choosenSpecialty})}}),p=(0,n.oM)({name:"choosenCourse",initialState:c,reducers:{addChoosenCourse:(e,r)=>{let t=r.payload;return t},removeChoosenCourse:()=>c},extraReducers:{[a.ju]:(e,r)=>({...e,...r.payload.choosenCourse})}}),{addChoosenDomain:h,removeChoosenDomain:m}=l.actions,{addChoosenSpecialty:x,removeChoosenSpecialty:f}=u.actions,{addChoosenCourse:v,removeChoosenCourse:g}=p.actions,choosenCourse=e=>e.choosenCourse,choosenSpecialty=e=>e.choosenSpecialty,choosenDomain=e=>e.choosenDomain;p.reducer},40424:function(e,r,t){"use strict";t.d(r,{WL:function(){return d},rh:function(){return c}});var n=t(50663),a=t(2278),o=t(94152);let i={id:0,username:"",matricle:"",first_name:"",last_name:"",role:"",password:"",address:"",about:"",sex:"",telephone:0,pob:"",dob:"",email:"",email_confirmed:!1,hod:!1,title:"",created_at:"",last_login:"",is_active:!1,groups:[],user_permissions:[]},s=[{id:0,student:a.P1,course:o.LH,ca:0,test:0,exam:0,resit:0,validated:!1,closed:!1,paid:!1,created_by:i,updated_by:i,average:0}],d=(0,n.oM)({name:"printResults",initialState:s,reducers:{addPrintResults:(e,r)=>{let t=r.payload;return t},removePrintResults:()=>s}}),{addPrintResults:c,removePrintResults:l}=d.actions;d.reducer},2278:function(e,r,t){"use strict";t.d(r,{BQ:function(){return c},P1:function(){return o},PJ:function(){return a},RW:function(){return p},d:function(){return selectUserProfile},dj:function(){return d},rk:function(){return selectAuthUser},v$:function(){return u},xI:function(){return l},zr:function(){return h}});var n=t(50663);let a={id:0,username:"",matricle:"",first_name:"",last_name:"",role:"",password:"",address:"",about:"",sex:"",telephone:0,pob:"",dob:"",email:"",email_confirmed:!1,hod:!1,title:"",created_at:"",last_login:"",is_active:!1,groups:[],user_permissions:[]},o={id:0,user:a,created_at:"",updated_at:""},i={id:0,username:"",role:"",is_active:!1,token:"",refresh:""},s={user_id:0},d=(0,n.oM)({name:"authUser",initialState:i,reducers:{addAuthUser:(e,r)=>{let t=r.payload;return t},removeAuthUser:()=>i}}),c=(0,n.oM)({name:"userProfile",initialState:o,reducers:{addUserProfile:(e,r)=>{let t=r.payload;return t},removeUserProfile:()=>o}}),l=(0,n.oM)({name:"userCheck",initialState:s,reducers:{addUserCheck:(e,r)=>{let t=r.payload;return t},removeUserCheck:()=>s}}),{addAuthUser:u,removeAuthUser:p}=d.actions,{addUserProfile:h,removeUserProfile:m}=c.actions,{addUserCheck:x,removeUserCheck:f}=l.actions,selectAuthUser=e=>e.authUser,selectUserProfile=e=>e.userProfile;d.reducer},37451:function(e,r,t){"use strict";t.d(r,{$6:function(){return m},B5:function(){return g},E2:function(){return _},FO:function(){return l},G1:function(){return y},Hz:function(){return j},IK:function(){return P},QM:function(){return c},Rd:function(){return u},SC:function(){return f},VN:function(){return i},W5:function(){return s},Xx:function(){return v},ZM:function(){return x},_F:function(){return o},bw:function(){return Z},cU:function(){return b},dH:function(){return p},gv:function(){return d},tW:function(){return h},vw:function(){return a}});let n="https://st-joan.com/back/",a="https://st-joan.com/result/images/logos/stjoan.jpg",o="/images/avatars/user.jpg",i=n+"admin",s=n+"user/groups",d=n+"user/groups",c=n+"user/groups",l=n+"user/permissions",u=n+"user/login",p=n+"user/check-user",h=n+"user/crud-user",m=n+"user/assign-group-to-user",x=n+"user/create-update-reset-password",f=n+"user/password_reset",v=n+"user/user-profiles",g=n+"app/domain",y=n+"app/mainspecialty",j=n+"app/specialty",b=n+"app/maincourse",_=n+"app/course",Z=n+"app/result",P=n+"app/level"},84332:function(e,r,t){"use strict";t.r(r),t.d(r,{default:function(){return layout}});var n=t(57437),a=t(2265),o=t(22135),i=t(96507),s=t(25152),d=t(15354),c=t(37451),l=t(48356),u=t(88590),p=t(91683),h=(0,p.Z)("typography","IconTypography",[["path",{d:"M4 20l3 0",key:"svg-0"}],["path",{d:"M14 20l7 0",key:"svg-1"}],["path",{d:"M6.9 15l6.9 0",key:"svg-2"}],["path",{d:"M10.2 6.3l5.8 13.7",key:"svg-3"}],["path",{d:"M5 20l6 -16l2 0l7 16",key:"svg-4"}]]),m=(0,p.Z)("copy","IconCopy",[["path",{d:"M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z",key:"svg-0"}],["path",{d:"M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2",key:"svg-1"}]]),x=t(65574),f=t.n(x);let v=[{navlabel:!0,subheader:"Home"},{id:f()(),title:"Dashboard",icon:l.Z,href:"/AdministrationPages"},{id:f()(),title:"Results",icon:l.Z,href:"/AdministrationPages/PageResults"},{navlabel:!0,subheader:"Profiles"},{id:f()(),title:"Lecturers",icon:u.Z,href:"/AdministrationPages/PageLecturers"},{id:f()(),title:"Students",icon:u.Z,href:"/AdministrationPages/PageStudents"},{id:f()(),title:"Users",icon:u.Z,href:"/AdministrationPages/PageUsers"},{navlabel:!0,subheader:"settings"},{id:f()(),title:"Settings",icon:h,href:"/AdministrationPages/PageSettings"},{id:f()(),title:"Permissions",icon:m,href:"/AdministrationPages/PagePermissions"},{id:f()(),title:"Admin",icon:m,href:c.VN}];var g=t(24033),y=t(80565),j=t(41101),b=t(35843),_=t(37682),Z=t(72502),P=t(8864),k=t(38212),C=t(61396),M=t.n(C),sidebar_NavItem=e=>{let{item:r,level:t,pathDirect:a,onClick:o}=e,i=r.icon,s=(0,j.Z)(),d=(0,n.jsx)(i,{stroke:1.5,size:"1.3rem"}),c=(0,b.ZP)(_.ZP)(()=>({padding:0,".MuiButtonBase-root":{whiteSpace:"nowrap",marginBottom:"2px",padding:"8px 10px",borderRadius:"8px",backgroundColor:t>1?"transparent !important":"inherit",color:s.palette.text.secondary,paddingLeft:"10px","&:hover":{backgroundColor:s.palette.primary.light,color:s.palette.primary.main},"&.Mui-selected":{color:"white",backgroundColor:s.palette.primary.main,"&:hover":{backgroundColor:s.palette.primary.main,color:"white"}}}}));return(0,n.jsx)(y.Z,{component:"div",disablePadding:!0,children:(0,n.jsx)(c,{children:(0,n.jsxs)(Z.Z,{component:M(),href:r.href,disabled:r.disabled,selected:a===r.href,target:r.external?"_blank":"",onClick:o,children:[(0,n.jsx)(P.Z,{sx:{minWidth:"36px",p:"3px 0",color:"inherit"},children:d}),(0,n.jsx)(k.Z,{children:(0,n.jsx)(n.Fragment,{children:r.title})})]})})},r.id)},S=t(74275),w=t.n(S),U=t(62828);let NavGroup=e=>{let{item:r}=e,t=(0,b.ZP)(e=>(0,n.jsx)(U.Z,{disableSticky:!0,...e}))(e=>{let{theme:r}=e;return{...r.typography.overline,fontWeight:"700",marginTop:r.spacing(3),marginBottom:r.spacing(0),color:r.palette.text.primary,lineHeight:"26px",padding:"3px 12px"}});return(0,n.jsx)(t,{children:r.subheader})};NavGroup.propTypes={item:w().object};var sidebar_SidebarItems=e=>{let{toggleMobileSidebar:r}=e,t=(0,g.usePathname)();return(0,n.jsx)(i.Z,{sx:{px:3},children:(0,n.jsx)(y.Z,{sx:{pt:0},className:"sidebarNav",component:"div",children:v.map(e=>e.subheader?(0,n.jsx)(NavGroup,{item:e},e.subheader):(0,n.jsx)(sidebar_NavItem,{item:e,pathDirect:t,onClick:r},e.id))})})},R=t(85269),A=t(49600),F=t(16691),I=t.n(F);let Upgrade=()=>(0,n.jsx)(i.Z,{display:"flex",alignItems:"center",gap:2,sx:{m:2,p:2,bgcolor:"primary.light",borderRadius:"8px"},pt:"50px",mb:"-20px",bottom:"0",position:"fixed",children:(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(i.Z,{p:0,children:[(0,n.jsx)(R.Z,{variant:"h6",mb:1,children:"Main Site"}),(0,n.jsx)(A.Z,{color:"primary",target:"_blank",disableElevation:!0,component:M(),href:"https://www.st-joan.com",variant:"contained","aria-label":"logout",size:"small",children:"st-joan.com"})]}),(0,n.jsx)(i.Z,{mt:"-6px",children:(0,n.jsx)(I(),{alt:"Remy Sharp",src:c.vw,height:70,width:70})})]})});var sidebar_Sidebar=e=>{let{isMobileSidebarOpen:r,onSidebarClose:t}=e,a=(0,o.Z)(e=>e.breakpoints.up("lg")),c="270px";return a?(0,n.jsx)(i.Z,{sx:{width:c,flexShrink:0},children:(0,n.jsx)(s.ZP,{anchor:"left",open:r,variant:"permanent",PaperProps:{sx:{width:c,boxSizing:"border-box"}},children:(0,n.jsxs)(i.Z,{sx:{height:"100%"},children:[(0,n.jsx)(i.Z,{px:3,children:(0,n.jsx)(d.Z,{})}),(0,n.jsxs)(i.Z,{children:[(0,n.jsx)(sidebar_SidebarItems,{}),(0,n.jsx)(Upgrade,{})]})]})})}):(0,n.jsxs)(s.ZP,{anchor:"left",open:r,onClose:t,variant:"temporary",PaperProps:{sx:{width:c,boxShadow:e=>e.shadows[8]}},children:[(0,n.jsx)(i.Z,{px:2,children:(0,n.jsx)(d.Z,{})}),(0,n.jsx)(sidebar_SidebarItems,{}),(0,n.jsx)(Upgrade,{})]})},O=t(11202),J=t(32860),N=t(49936),D=t(18687),footer_Footer=()=>(0,n.jsx)(D.Z,{sx:{display:"flex",width:"100%",position:"fixed",padding:2,bottom:0,justifyContent:"center"},children:(0,n.jsx)(R.Z,{variant:"h6",color:"#1a237e",sx:{},children:"Result Management Portal v2.0.4"})}),z=t(40851),L=t(6093),q=t(46776),G=t(97292),B=t(98075),T=t(210),W=t(28897),E=t(64494),H=t(84562),Q=t(7903),V=t(7465),$=t(2278),K=t(3198),X=t(38939),Y=t(33071),header_NotLoggedInModal=e=>{let{showModal:r,setShowModal:t}=e,a=(0,g.useRouter)();return(0,n.jsx)(Y.Z,{title:"",open:r,onCancel:()=>{},footer:!1,children:(0,n.jsxs)(X.ZP,{container:!0,spacing:3,sx:{alignItems:"center"},direction:"column",children:[(0,n.jsx)(X.ZP,{item:!0,xs:12,mt:4,mb:2,sx:{display:"flex",alignItems:"center"},children:(0,n.jsx)(R.Z,{variant:"h1",children:"NOT LOGGED IN !!!"})}),(0,n.jsx)(X.ZP,{item:!0,xs:12,mt:2,mb:2,sx:{display:"flex",alignItems:"center"},children:(0,n.jsx)(A.Z,{variant:"outlined",onClick:()=>a.push("/"),children:"Login Again"})})]})})},ee=t(50663),er=t(81267),et=t(11850),en=t(45058);let ea={id:0,code:"",status:!1,valid:!1,duration:0,ending_at:"",updated_at:"",created_by:"",created_at:""},eo={color:"red"},ei={hours:6},es=(0,ee.oM)({name:"activation",initialState:ea,reducers:{addActivation:(e,r)=>{let t=r.payload;return t},removeActivation:(e,r)=>ea},extraReducers:{[en.ju]:(e,r)=>({...e,...r.payload.activation})}}),ed=(0,ee.oM)({name:"activationColor",initialState:eo,reducers:{addActivationColor:(e,r)=>{let t=r.payload;return t},addActivationReminderFrequency:(e,r)=>{let t=r.payload;return t},removeActivationColor:(e,r)=>eo},extraReducers:{[en.ju]:(e,r)=>({...e,...r.payload.activation})}}),ec=(0,ee.oM)({name:"activationFrequency",initialState:ei,reducers:{addActivationReminderFrequency:(e,r)=>{let t=r.payload;return t},removeActivationFrequency:(e,r)=>ei},extraReducers:{[en.ju]:(e,r)=>({...e,...r.payload.activation})}}),{addActivation:el,removeActivation:eu}=es.actions,{addActivationColor:ep,removeActivationColor:eh}=ed.actions,{addActivationReminderFrequency:em}=ec.actions;es.reducer;let ex=$.PJ,ef=$.P1,ev=(0,ee.oM)({name:"choosenUser",initialState:ex,reducers:{addChoosenUser:(e,r)=>{let t=r.payload;return t},removeChoosenUser:()=>ex},extraReducers:{[en.ju]:(e,r)=>({...e,...r.payload.choosenUser})}}),eg=(0,ee.oM)({name:"choosenUserProfile",initialState:ef,reducers:{addChoosenUserProfile:(e,r)=>{let t=r.payload;return t},removeChoosenUserProfile:()=>ef},extraReducers:{[en.ju]:(e,r)=>({...e,...r.payload.choosenUserProfile})}}),{addChoosenUser:ey,removeChoosenUser:ej}=ev.actions,{addChoosenUserProfile:eb,removeChoosenUserProfile:e_}=eg.actions;ev.reducer;let eZ=(0,ee.oM)({name:"darkMode",initialState:!0,reducers:{addDarkMode:(e,r)=>{let t=r.payload;return t},removeDarkMode:(e,r)=>!0},extraReducers:{[en.ju]:(e,r)=>({state:e,...r.payload.darkMode})}}),{addDarkMode:eP,removeDarkMode:ek}=eZ.actions;eZ.reducer;var eC=t(94152);let eM={key:"root",storage:et.Z},eS=(0,er.OJ)(eM,eZ.reducer),ew=(0,er.OJ)(eM,$.xI.reducer),eU=(0,er.OJ)(eM,ev.reducer),eR=(0,er.OJ)(eM,eg.reducer),eA=(0,er.OJ)(eM,eC.Fk.reducer),eF=(0,ee.xC)({reducer:{darkMode:eS,authUser:ew,userCheck:$.xI.reducer,choosenUser:eU,choosenUserProfile:eR,choosenCourse:eA,choosenSpecialty:eC.Ap.reducer,activation:es.reducer,activationColor:ed.reducer,activationFrequncy:ec.reducer},devTools:!1}),eI=(0,er.p5)(eF);var eO=t(53837),Redux_MyProvider=e=>{let{children:r}=e;return(0,n.jsx)(K.zt,{store:eF,children:(0,n.jsx)(eO.r,{loading:null,persistor:eI,children:r})})},header_Profile=()=>{let e=(0,K.I0)(),[r,t]=(0,a.useState)(null),[o,s]=(0,a.useState)(!1),d=(0,K.v9)($.rk);return(0,n.jsxs)(Redux_MyProvider,{children:[(0,n.jsxs)(i.Z,{children:[(0,n.jsx)(q.Z,{size:"large","aria-label":"show 11 new notifications",color:"inherit","aria-controls":"msgs-menu","aria-haspopup":"true",sx:{..."object"==typeof r&&{color:"primary.main"}},onClick:e=>{t(e.currentTarget)},children:(0,n.jsx)(T.Z,{src:c._F,alt:"image",sx:{width:35,height:35}})}),(0,n.jsxs)(W.Z,{id:"msgs-menu",anchorEl:r,keepMounted:!0,open:!!r,onClose:()=>{t(null)},anchorOrigin:{horizontal:"right",vertical:"bottom"},transformOrigin:{horizontal:"right",vertical:"top"},sx:{"& .MuiMenu-paper":{width:"200px"}},children:[(0,n.jsxs)(E.Z,{children:[(0,n.jsx)(P.Z,{children:(0,n.jsx)(H.Z,{width:20})}),(0,n.jsx)(k.Z,{children:"My Profile"})]}),(0,n.jsxs)(E.Z,{children:[(0,n.jsx)(P.Z,{children:(0,n.jsx)(Q.Z,{width:20})}),(0,n.jsx)(k.Z,{children:"My Account"})]}),(0,n.jsxs)(E.Z,{children:[(0,n.jsx)(P.Z,{children:(0,n.jsx)(V.Z,{width:20})}),(0,n.jsx)(k.Z,{children:"My Tasks"})]}),(0,n.jsx)(i.Z,{mt:1,py:1,px:2,children:(0,n.jsx)(A.Z,{onClick:()=>{e((0,$.RW)()),s(!0)},variant:"outlined",color:"primary",fullWidth:!0,children:"Logout"})})]})]}),(0,n.jsx)(header_NotLoggedInModal,{showModal:!d.id,setShowModal:s})]})};let eJ=(0,b.ZP)("div")(()=>({display:"flex",minHeight:"100vh",width:"100%"})),eN=(0,b.ZP)("div")(()=>({display:"flex",flexGrow:1,paddingBottom:"1px",flexDirection:"column",zIndex:1,backgroundColor:"transparent"}));var layout=e=>{let{children:r}=e,[t,o]=(0,a.useState)(!1),s=(0,b.ZP)(z.Z)(e=>{let{theme:r}=e;return{boxShadow:"none",background:r.palette.background.paper,justifyContent:"center",backdropFilter:"blur(4px)",[r.breakpoints.up("lg")]:{minHeight:"70px"}}}),d=(0,b.ZP)(L.Z)(e=>{let{theme:r}=e;return{width:"100%",color:r.palette.text.secondary}});return(0,n.jsx)(O.Z,{children:(0,n.jsxs)(eJ,{className:"mainwrapper",children:[(0,n.jsx)(sidebar_Sidebar,{isMobileSidebarOpen:t,onSidebarClose:()=>o(!1)}),(0,n.jsxs)(eN,{className:"page-wrapper m-2",children:[(0,n.jsx)(s,{position:"sticky",color:"default",children:(0,n.jsxs)(d,{children:[(0,n.jsx)(q.Z,{color:"inherit","aria-label":"menu",onClick:()=>o(!0),sx:{display:{lg:"none",xs:"inline"}},children:(0,n.jsx)(J.Z,{width:"20",height:"20"})}),(0,n.jsx)(q.Z,{size:"large","aria-label":"show 11 new notifications",color:"inherit","aria-controls":"msgs-menu","aria-haspopup":"true",children:(0,n.jsx)(G.Z,{variant:"dot",color:"primary",children:(0,n.jsx)(N.Z,{size:"21",stroke:"1.5"})})}),(0,n.jsx)(i.Z,{flexGrow:1}),(0,n.jsxs)(B.Z,{spacing:1,direction:"row",alignItems:"center",children:[(0,n.jsx)(A.Z,{variant:"contained",disableElevation:!0,color:"primary",target:"_blank",href:""}),(0,n.jsx)(header_Profile,{})]})]})}),(0,n.jsx)(i.Z,{p:1,sx:{backgroundColor:"#DFFCFC",flexGrow:1,marginBottom:6},children:r}),(0,n.jsx)(footer_Footer,{})]})]})})}},15354:function(e,r,t){"use strict";var n=t(57437),a=t(61396),o=t.n(a),i=t(35843);let s=(0,i.ZP)(o())(()=>({height:"70px",width:"180px",overflow:"hidden",display:"block"}));r.Z=()=>(0,n.jsx)(s,{href:"/"})}},function(e){e.O(0,[4370,1820,6287,8939,4815,8897,6688,3220,3071,5058,8582,1396,6676,4890,3655,2971,2472,1744],function(){return e(e.s=1399)}),_N_E=e.O()}]);