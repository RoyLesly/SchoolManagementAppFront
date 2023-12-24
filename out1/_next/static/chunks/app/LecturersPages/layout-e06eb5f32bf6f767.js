(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2398],{72431:function(){},63524:function(e,r,t){Promise.resolve().then(t.bind(t,74996))},11202:function(e,r,t){"use strict";t.d(r,{Z:function(){return Redux_MyProvider}});var n=t(57437),o=t(50663),a=t(81267),i=t(11850),s=t(2278),c=t(45058);let d={id:0,code:"",status:!1,valid:!1,duration:0,ending_at:"",updated_at:"",created_by:"",created_at:""},u={color:"red"},l={hours:6},p=(0,o.oM)({name:"activation",initialState:d,reducers:{addActivation:(e,r)=>{let t=r.payload;return t},removeActivation:(e,r)=>d},extraReducers:{[c.ju]:(e,r)=>({...e,...r.payload.activation})}}),h=(0,o.oM)({name:"activationColor",initialState:u,reducers:{addActivationColor:(e,r)=>{let t=r.payload;return t},addActivationReminderFrequency:(e,r)=>{let t=r.payload;return t},removeActivationColor:(e,r)=>u},extraReducers:{[c.ju]:(e,r)=>({...e,...r.payload.activation})}}),m=(0,o.oM)({name:"activationFrequency",initialState:l,reducers:{addActivationReminderFrequency:(e,r)=>{let t=r.payload;return t},removeActivationFrequency:(e,r)=>l},extraReducers:{[c.ju]:(e,r)=>({...e,...r.payload.activation})}}),{addActivation:x,removeActivation:f}=p.actions,{addActivationColor:g,removeActivationColor:b}=h.actions,{addActivationReminderFrequency:j}=m.actions;p.reducer;var v=t(21700),_=t(94152);let y=(0,o.oM)({name:"darkMode",initialState:!0,reducers:{addDarkMode:(e,r)=>{let t=r.payload;return t},removeDarkMode:(e,r)=>!0},extraReducers:{[c.ju]:(e,r)=>({state:e,...r.payload.darkMode})}}),{addDarkMode:Z,removeDarkMode:P}=y.actions;y.reducer;var C=t(40424);let k={key:"root",storage:i.Z},S=(0,a.OJ)(k,y.reducer),w=(0,a.OJ)(k,s.dj.reducer),M=(0,a.OJ)(k,s.BQ.reducer),U=(0,a.OJ)(k,v.bk.reducer),R=(0,a.OJ)(k,v.oP.reducer),L=(0,a.OJ)(k,_.Fk.reducer);(0,a.OJ)(k,_.iR.reducer);let O=(0,a.OJ)(k,C.WL.reducer),A=(0,o.xC)({reducer:{darkMode:S,authUser:w,userProfile:M,userCheck:s.xI.reducer,choosenUser:U,choosenUserProfile:R,choosenCourse:L,choosenSpecialty:_.Ap.reducer,choosenDomain:_.iR.reducer,printResults:O,activation:p.reducer,activationColor:h.reducer,activationFrequncy:m.reducer},devTools:!1}),J=(0,a.p5)(A);var N=t(3198),D=t(53837),Redux_MyProvider=e=>{let{children:r}=e;return(0,n.jsx)(N.zt,{store:A,children:(0,n.jsx)(D.r,{loading:null,persistor:J,children:r})})}},21700:function(e,r,t){"use strict";t.d(r,{Gn:function(){return d},Ox:function(){return u},bk:function(){return i},nS:function(){return selectChoosenUserProfile},nY:function(){return l},oP:function(){return s},os:function(){return c},uS:function(){return selectChoosenUser}});var n=t(50663);let o={id:0,username:"",role:"",first_name:"",last_name:"",created_at:"",last_login:"",is_active:!1,dept:null,matricle:"",about:"",sex:"",telephone:0,pob:"",dob:"",email:"",email_confirmed:!1},a={id:0,user:o,first_name:"",last_name:"",about:"",telephone:0,sex:"",pob:"",dob:"",email:"",title:"",updated_at:"",created_at:"",email_confirmed:!1},i=(0,n.oM)({name:"choosedUser",initialState:o,reducers:{addChoosenUser:(e,r)=>{let t=r.payload;return t},removeChoosenUser:()=>o}}),s=(0,n.oM)({name:"choosenUserProfile",initialState:a,reducers:{addChoosenUserProfile:(e,r)=>{let t=r.payload;return t},removeChoosenUserProfile:()=>a}}),{addChoosenUser:c,removeChoosenUser:d}=i.actions,{addChoosenUserProfile:u,removeChoosenUserProfile:l}=s.actions,selectChoosenUser=e=>e.choosenUser,selectChoosenUserProfile=e=>e.choosenUserProfile;i.reducer},94152:function(e,r,t){"use strict";t.d(r,{Ap:function(){return l},Fk:function(){return p},Gt:function(){return m},LH:function(){return d},M9:function(){return h},Nf:function(){return choosenCourse},R1:function(){return choosenSpecialty},TP:function(){return g},e1:function(){return choosenDomain},iR:function(){return u},iq:function(){return f},lb:function(){return b},r9:function(){return x}});var n=t(50663),o=t(45058),a=t(2278);let i={id:0,domain_name:"",created_at:"",updated_at:""},s={id:0,academic_year:"",level:{id:0,level:0,created_at:"",updated_at:""},main_specialty:{specialty_name:"",domain:i,id:0,created_at:"",updated_at:""},updated_at:"",created_at:""},c={course_name:"",id:0,created_at:"",created_by:a.PJ,updated_at:"",updated_by:a.PJ},d={id:0,main_course:c,specialty:s,course_code:"",course_credit:0,semester:1,hours:0,completed:!1,assigned:!1,paid:!1,assigned_to:a.PJ,date_assigned:"",created_at:"",created_by:a.PJ,updated_at:"",updated_by:a.PJ},u=(0,n.oM)({name:"choosenDomain",initialState:i,reducers:{addChoosenDomain:(e,r)=>{let t=r.payload;return t},removeChoosenDomain:()=>i},extraReducers:{[o.ju]:(e,r)=>({...e,...r.payload.choosenDomain})}}),l=(0,n.oM)({name:"choosenSpecialty",initialState:s,reducers:{addChoosenSpecialty:(e,r)=>{let t=r.payload;return t},removeChoosenSpecialty:()=>s},extraReducers:{[o.ju]:(e,r)=>({...e,...r.payload.choosenSpecialty})}}),p=(0,n.oM)({name:"choosenCourse",initialState:d,reducers:{addChoosenCourse:(e,r)=>{let t=r.payload;return t},removeChoosenCourse:()=>d},extraReducers:{[o.ju]:(e,r)=>({...e,...r.payload.choosenCourse})}}),{addChoosenDomain:h,removeChoosenDomain:m}=u.actions,{addChoosenSpecialty:x,removeChoosenSpecialty:f}=l.actions,{addChoosenCourse:g,removeChoosenCourse:b}=p.actions,choosenCourse=e=>e.choosenCourse,choosenSpecialty=e=>e.choosenSpecialty,choosenDomain=e=>e.choosenDomain;p.reducer},40424:function(e,r,t){"use strict";t.d(r,{WL:function(){return c},rh:function(){return d}});var n=t(50663),o=t(2278),a=t(94152);let i={id:0,username:"",matricle:"",first_name:"",last_name:"",role:"",password:"",address:"",about:"",sex:"",telephone:0,pob:"",dob:"",email:"",email_confirmed:!1,hod:!1,title:"",created_at:"",last_login:"",is_active:!1,groups:[],user_permissions:[]},s=[{id:0,student:o.P1,course:a.LH,ca:0,test:0,exam:0,resit:0,validated:!1,closed:!1,paid:!1,created_by:i,updated_by:i,average:0}],c=(0,n.oM)({name:"printResults",initialState:s,reducers:{addPrintResults:(e,r)=>{let t=r.payload;return t},removePrintResults:()=>s}}),{addPrintResults:d,removePrintResults:u}=c.actions;c.reducer},2278:function(e,r,t){"use strict";t.d(r,{BQ:function(){return d},P1:function(){return a},PJ:function(){return o},RW:function(){return p},d:function(){return selectUserProfile},dj:function(){return c},rk:function(){return selectAuthUser},v$:function(){return l},xI:function(){return u},zr:function(){return h}});var n=t(50663);let o={id:0,username:"",matricle:"",first_name:"",last_name:"",role:"",password:"",address:"",about:"",sex:"",telephone:0,pob:"",dob:"",email:"",email_confirmed:!1,hod:!1,title:"",created_at:"",last_login:"",is_active:!1,groups:[],user_permissions:[]},a={id:0,user:o,created_at:"",updated_at:""},i={id:0,username:"",role:"",is_active:!1,token:"",refresh:""},s={user_id:0},c=(0,n.oM)({name:"authUser",initialState:i,reducers:{addAuthUser:(e,r)=>{let t=r.payload;return t},removeAuthUser:()=>i}}),d=(0,n.oM)({name:"userProfile",initialState:a,reducers:{addUserProfile:(e,r)=>{let t=r.payload;return t},removeUserProfile:()=>a}}),u=(0,n.oM)({name:"userCheck",initialState:s,reducers:{addUserCheck:(e,r)=>{let t=r.payload;return t},removeUserCheck:()=>s}}),{addAuthUser:l,removeAuthUser:p}=c.actions,{addUserProfile:h,removeUserProfile:m}=d.actions,{addUserCheck:x,removeUserCheck:f}=u.actions,selectAuthUser=e=>e.authUser,selectUserProfile=e=>e.userProfile;c.reducer},37451:function(e,r,t){"use strict";t.d(r,{$6:function(){return m},B5:function(){return b},E2:function(){return y},FO:function(){return u},G1:function(){return j},Hz:function(){return v},IK:function(){return P},QM:function(){return d},Rd:function(){return l},SC:function(){return f},VN:function(){return i},W5:function(){return s},Xx:function(){return g},ZM:function(){return x},_F:function(){return a},bw:function(){return Z},cU:function(){return _},dH:function(){return p},gv:function(){return c},tW:function(){return h},vw:function(){return o}});let n="https://st-joan.com/back/",o="https://st-joan.com/result/images/logos/stjoan.jpg",a="/images/avatars/user.jpg",i=n+"admin",s=n+"user/groups",c=n+"user/groups",d=n+"user/groups",u=n+"user/permissions",l=n+"user/login",p=n+"user/check-user",h=n+"user/crud-user",m=n+"user/assign-group-to-user",x=n+"user/create-update-reset-password",f=n+"user/password_reset",g=n+"user/user-profiles",b=n+"app/domain",j=n+"app/mainspecialty",v=n+"app/specialty",_=n+"app/maincourse",y=n+"app/course",Z=n+"app/result",P=n+"app/level"},74996:function(e,r,t){"use strict";t.r(r),t.d(r,{default:function(){return RootLayout}});var n=t(57437),o=t(35843),a=t(88938),i=t(96507),s=t(2265),c=t(40851),d=t(6093),u=t(46776),l=t(97292),p=t(98075),h=t(49600),m=t(74275),x=t.n(m),f=t(3198),g=t(61396),b=t.n(g),j=t(210),v=t(28897),_=t(64494),y=t(8864),Z=t(38212),P=t(84562),C=t(7903),k=t(7465),header_Profile=()=>{let[e,r]=(0,s.useState)(null);return(0,n.jsxs)(i.Z,{children:[(0,n.jsx)(u.Z,{size:"large","aria-label":"show 11 new notifications",color:"inherit","aria-controls":"msgs-menu","aria-haspopup":"true",sx:{..."object"==typeof e&&{color:"primary.main"}},onClick:e=>{r(e.currentTarget)},children:(0,n.jsx)(j.Z,{src:"/images/profile/user-1.jpg",alt:"image",sx:{width:35,height:35}})}),(0,n.jsxs)(v.Z,{id:"msgs-menu",anchorEl:e,keepMounted:!0,open:!!e,onClose:()=>{r(null)},anchorOrigin:{horizontal:"right",vertical:"bottom"},transformOrigin:{horizontal:"right",vertical:"top"},sx:{"& .MuiMenu-paper":{width:"200px"}},children:[(0,n.jsxs)(_.Z,{children:[(0,n.jsx)(y.Z,{children:(0,n.jsx)(P.Z,{width:20})}),(0,n.jsx)(Z.Z,{children:"My Profile"})]}),(0,n.jsxs)(_.Z,{children:[(0,n.jsx)(y.Z,{children:(0,n.jsx)(C.Z,{width:20})}),(0,n.jsx)(Z.Z,{children:"My Account"})]}),(0,n.jsxs)(_.Z,{children:[(0,n.jsx)(y.Z,{children:(0,n.jsx)(k.Z,{width:20})}),(0,n.jsx)(Z.Z,{children:"My Tasks"})]}),(0,n.jsx)(i.Z,{mt:1,py:1,px:2,children:(0,n.jsx)(h.Z,{href:"/",variant:"outlined",color:"primary",component:b(),fullWidth:!0,children:"Logout"})})]})]})},S=t(32860),w=t(49936),M=t(2278);let Header=e=>{let{toggleMobileSidebar:r}=e,t=(0,f.v9)(M.rk),a=(0,o.ZP)(c.Z)(e=>{let{theme:r}=e;return{boxShadow:"none",background:r.palette.background.paper,justifyContent:"center",backdropFilter:"blur(4px)",[r.breakpoints.up("lg")]:{minHeight:"70px"}}}),s=(0,o.ZP)(d.Z)(e=>{let{theme:r}=e;return{width:"100%",color:r.palette.text.secondary}});return(0,n.jsx)(a,{position:"sticky",color:"default",children:(0,n.jsxs)(s,{children:[(0,n.jsx)(u.Z,{color:"inherit","aria-label":"menu",onClick:r,sx:{display:{lg:"none",xs:"inline"}},children:(0,n.jsx)(S.Z,{width:"20",height:"20"})}),(0,n.jsx)(u.Z,{size:"large","aria-label":"show 11 new notifications",color:"inherit","aria-controls":"msgs-menu","aria-haspopup":"true",children:(0,n.jsx)(l.Z,{variant:"dot",color:"primary",children:(0,n.jsx)(w.Z,{size:"21",stroke:"1.5"})})}),(0,n.jsx)(i.Z,{flexGrow:1}),(0,n.jsxs)(p.Z,{spacing:1,direction:"row",alignItems:"center",children:[(0,n.jsx)(h.Z,{variant:"contained",disableElevation:!0,color:"primary",target:"_blank",href:"",children:t.id?t.username:"-"}),(0,n.jsx)(header_Profile,{})]})]})})};Header.propTypes={sx:x().object};var U=t(22135),R=t(25152);let L=(0,o.ZP)(b())(()=>({height:"70px",width:"180px",overflow:"hidden",display:"block"}));var logo_Logo=()=>(0,n.jsx)(L,{href:"/"}),O=t(48356),A=t(88590),J=t(65574),N=t.n(J);let D=[{navlabel:!0,subheader:"Home"},{id:N()(),title:"Dashboard",icon:O.Z,href:"/LecturersPages"},{navlabel:!0,subheader:"Courses"},{id:N()(),title:"Courses",icon:A.Z,href:"/LecturersPages/PageLecturersCourses"},{navlabel:!0,subheader:"Profiles"},{id:N()(),title:"Profile",icon:A.Z,href:"/LecturersPages/PageProfileLecturer"}];var z=t(24033),F=t(80565),H=t(41101),I=t(37682),W=t(72502),sidebar_NavItem=e=>{let{item:r,level:t,pathDirect:a,onClick:i}=e,s=r.icon,c=(0,H.Z)(),d=(0,n.jsx)(s,{stroke:1.5,size:"1.3rem"}),u=(0,o.ZP)(I.ZP)(()=>({padding:0,".MuiButtonBase-root":{whiteSpace:"nowrap",marginBottom:"2px",padding:"8px 10px",borderRadius:"8px",backgroundColor:t>1?"transparent !important":"inherit",color:c.palette.text.secondary,paddingLeft:"10px","&:hover":{backgroundColor:c.palette.primary.light,color:c.palette.primary.main},"&.Mui-selected":{color:"white",backgroundColor:c.palette.primary.main,"&:hover":{backgroundColor:c.palette.primary.main,color:"white"}}}}));return(0,n.jsx)(F.Z,{component:"div",disablePadding:!0,children:(0,n.jsx)(u,{children:(0,n.jsxs)(W.Z,{component:b(),href:r.href,disabled:r.disabled,selected:a===r.href,target:r.external?"_blank":"",onClick:i,children:[(0,n.jsx)(y.Z,{sx:{minWidth:"36px",p:"3px 0",color:"inherit"},children:d}),(0,n.jsx)(Z.Z,{children:(0,n.jsx)(n.Fragment,{children:r.title})})]})})},r.id)},B=t(62828);let NavGroup=e=>{let{item:r}=e,t=(0,o.ZP)(e=>(0,n.jsx)(B.Z,{disableSticky:!0,...e}))(e=>{let{theme:r}=e;return{...r.typography.overline,fontWeight:"700",marginTop:r.spacing(3),marginBottom:r.spacing(0),color:r.palette.text.primary,lineHeight:"26px",padding:"3px 12px"}});return(0,n.jsx)(t,{children:r.subheader})};NavGroup.propTypes={item:x().object};var sidebar_SidebarItems=e=>{let{toggleMobileSidebar:r}=e,t=(0,z.usePathname)();return(0,n.jsx)(i.Z,{sx:{px:3},children:(0,n.jsx)(F.Z,{sx:{pt:0},className:"sidebarNav",component:"div",children:D.map(e=>e.subheader?(0,n.jsx)(NavGroup,{item:e},e.subheader):(0,n.jsx)(sidebar_NavItem,{item:e,pathDirect:t,onClick:r},e.id))})})},G=t(37451),T=t(85269),E=t(16691),q=t.n(E);let Upgrade=()=>(0,n.jsx)(i.Z,{display:"flex",alignItems:"center",gap:2,sx:{m:2,p:2,bgcolor:"primary.light",borderRadius:"8px"},pt:"50px",mb:"-20px",bottom:"0",position:"fixed",children:(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(i.Z,{p:0,children:[(0,n.jsx)(T.Z,{variant:"h6",mb:1,children:"Main Site"}),(0,n.jsx)(h.Z,{color:"primary",target:"_blank",disableElevation:!0,component:b(),href:"https://www.st-joan.com",variant:"contained","aria-label":"logout",size:"small",children:"st-joan.com"})]}),(0,n.jsx)(i.Z,{mt:"-6px",children:(0,n.jsx)(q(),{alt:"Remy Sharp",src:G.vw,height:70,width:70})})]})});var sidebar_Sidebar=e=>{let{isMobileSidebarOpen:r,onSidebarClose:t,isSidebarOpen:o}=e,a=(0,U.Z)(e=>e.breakpoints.up("lg")),s="270px";return a?(0,n.jsx)(i.Z,{sx:{width:s,flexShrink:0},children:(0,n.jsx)(R.ZP,{anchor:"left",open:o,variant:"permanent",PaperProps:{sx:{width:s,boxSizing:"border-box"}},children:(0,n.jsxs)(i.Z,{sx:{height:"100%"},children:[(0,n.jsx)(i.Z,{px:3,children:(0,n.jsx)(logo_Logo,{})}),(0,n.jsxs)(i.Z,{children:[(0,n.jsx)(sidebar_SidebarItems,{}),(0,n.jsx)(Upgrade,{})]})]})})}):(0,n.jsxs)(R.ZP,{anchor:"left",open:r,onClose:t,variant:"temporary",PaperProps:{sx:{width:s,boxShadow:e=>e.shadows[8]}},children:[(0,n.jsx)(i.Z,{px:2,children:(0,n.jsx)(logo_Logo,{})}),(0,n.jsx)(sidebar_SidebarItems,{}),(0,n.jsx)(Upgrade,{})]})},Q=t(11202);let $=(0,o.ZP)("div")(()=>({display:"flex",minHeight:"100vh",width:"100%"})),K=(0,o.ZP)("div")(()=>({display:"flex",flexGrow:1,paddingBottom:"60px",flexDirection:"column",zIndex:1,backgroundColor:"transparent"}));function RootLayout(e){let{children:r}=e,[t,o]=(0,s.useState)(!0),[c,d]=(0,s.useState)(!1);return(0,n.jsx)(Q.Z,{children:(0,n.jsxs)($,{className:"mainwrapper",children:[(0,n.jsx)(sidebar_Sidebar,{isSidebarOpen:t,isMobileSidebarOpen:c,onSidebarClose:()=>d(!1)}),(0,n.jsxs)(K,{className:"page-wrapper",children:[(0,n.jsx)(Header,{toggleMobileSidebar:()=>d(!0)}),(0,n.jsx)(a.Z,{sx:{paddingTop:"20px",maxWidth:"1200px"},children:(0,n.jsx)(i.Z,{sx:{minHeight:"calc(100vh - 170px)"},children:r})})]})]})})}}},function(e){e.O(0,[4370,1820,6287,4815,8897,3220,5058,8582,1396,6676,4890,7943,3655,2971,2472,1744],function(){return e(e.s=63524)}),_N_E=e.O()}]);