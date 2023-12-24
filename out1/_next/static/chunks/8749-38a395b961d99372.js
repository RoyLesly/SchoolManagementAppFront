"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8749],{70988:function(e,t,n){var o=n(36199).default,i=n(26314).default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.TypeIcon=t.PureContent=void 0,t.getCloseIcon=getCloseIcon;var a=i(n(18653)),r=i(n(46053)),l=i(n(70493)),c=i(n(36472)),s=i(n(4048)),u=i(n(94613)),f=i(n(54440)),d=n(14807),p=o(n(2265)),m=n(9273),g=i(n(97176)),v=i(n(64740)),__rest=function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&0>t.indexOf(o)&&(n[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var i=0,o=Object.getOwnPropertySymbols(e);i<o.length;i++)0>t.indexOf(o[i])&&Object.prototype.propertyIsEnumerable.call(e,o[i])&&(n[o[i]]=e[o[i]]);return n};function getCloseIcon(e,t){return null===t||!1===t?null:t||p.createElement("span",{className:`${e}-close-x`},p.createElement(l.default,{className:`${e}-close-icon`}))}t.TypeIcon={info:p.createElement(s.default,null),success:p.createElement(a.default,null),error:p.createElement(r.default,null),warning:p.createElement(c.default,null),loading:p.createElement(u.default,null)};let y={success:a.default,info:s.default,error:r.default,warning:c.default},PureContent=e=>{let{prefixCls:t,icon:n,type:o,message:i,description:a,btn:r,role:l="alert"}=e,c=null;return n?c=p.createElement("span",{className:`${t}-icon`},n):o&&(c=p.createElement(y[o]||null,{className:(0,f.default)(`${t}-icon`,`${t}-icon-${o}`)})),p.createElement("div",{className:(0,f.default)({[`${t}-with-icon`]:c}),role:l},c,p.createElement("div",{className:`${t}-message`},i),p.createElement("div",{className:`${t}-description`},a),r&&p.createElement("div",{className:`${t}-btn`},r))};t.PureContent=PureContent,t.default=e=>{let{prefixCls:t,className:n,icon:o,type:i,message:a,description:r,btn:l,closable:c=!0,closeIcon:s}=e,u=__rest(e,["prefixCls","className","icon","type","message","description","btn","closable","closeIcon"]),{getPrefixCls:y}=p.useContext(m.ConfigContext),h=t||y("notification"),b=`${h}-notice`,[,N]=(0,g.default)(h);return p.createElement("div",{className:(0,f.default)(`${b}-pure-panel`,N,n)},p.createElement(v.default,{prefixCls:h}),p.createElement(d.Notice,Object.assign({},u,{prefixCls:h,eventKey:"pure",duration:null,closable:c,closeIcon:getCloseIcon(h,s),content:p.createElement(PureContent,{prefixCls:b,icon:o,type:i,message:a,description:r,btn:l})})))}},48749:function(e,t,n){var o=n(26314).default,i=n(36199).default;t.ZP=void 0;var a=i(n(2265)),r=n(91539),l=i(n(9273)),c=o(n(70988)),s=i(n(68020));let u=null,act=e=>e(),f=[],d={};function getGlobalContext(){let{prefixCls:e,getContainer:t,rtl:n,maxCount:o,top:i,bottom:a}=d,r=null!=e?e:(0,l.globalConfig)().getPrefixCls("notification"),c=(null==t?void 0:t())||document.body;return{prefixCls:r,getContainer:()=>c,rtl:n,maxCount:o,top:i,bottom:a}}let p=a.forwardRef((e,t)=>{let[n,o]=a.useState(getGlobalContext),[i,r]=(0,s.useInternalNotification)(n),c=(0,l.globalConfig)(),u=c.getRootPrefixCls(),f=c.getIconPrefixCls(),d=c.getTheme(),sync=()=>{o(getGlobalContext)};return a.useEffect(sync,[]),a.useImperativeHandle(t,()=>{let e=Object.assign({},i);return Object.keys(e).forEach(t=>{e[t]=function(){return sync(),i[t].apply(i,arguments)}}),{instance:e,sync}}),a.createElement(l.default,{prefixCls:u,iconPrefixCls:f,theme:d},r)});function flushNotice(){if(!u){let e=document.createDocumentFragment(),t={fragment:e};u=t,act(()=>{(0,r.render)(a.createElement(p,{ref:e=>{let{instance:n,sync:o}=e||{};Promise.resolve().then(()=>{!t.instance&&n&&(t.instance=n,t.sync=o,flushNotice())})}}),e)});return}u.instance&&(f.forEach(e=>{switch(e.type){case"open":act(()=>{u.instance.open(Object.assign(Object.assign({},d),e.config))});break;case"destroy":act(()=>{null==u||u.instance.destroy(e.key)})}}),f=[])}function setNotificationGlobalConfig(e){d=Object.assign(Object.assign({},d),e),act(()=>{var e;null===(e=null==u?void 0:u.sync)||void 0===e||e.call(u)})}function open(e){f.push({type:"open",config:e}),flushNotice()}function destroy(e){f.push({type:"destroy",key:e}),flushNotice()}let m={open,destroy,config:setNotificationGlobalConfig,useNotification:s.default,_InternalPanelDoNotUseOrYouWillBeFired:c.default};["success","info","warning","error"].forEach(e=>{m[e]=t=>open(Object.assign(Object.assign({},t),{type:e}))}),t.ZP=m},69753:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.NotificationPlacements=void 0,t.NotificationPlacements=["top","topLeft","topRight","bottom","bottomLeft","bottomRight"]},97176:function(e,t,n){var o=n(26314).default;Object.defineProperty(t,"__esModule",{value:!0}),t.prepareNotificationToken=t.prepareComponentToken=t.genNoticeStyle=t.default=void 0;var i=n(41394),a=n(5101),r=n(18710),l=o(n(3543)),c=o(n(93223));let genNoticeStyle=e=>{let{iconCls:t,componentCls:n,boxShadow:o,fontSizeLG:i,notificationMarginBottom:a,borderRadiusLG:r,colorSuccess:l,colorInfo:c,colorWarning:s,colorError:u,colorTextHeading:f,notificationBg:d,notificationPadding:p,notificationMarginEdge:m,fontSize:g,lineHeight:v,width:y,notificationIconSize:h,colorText:b}=e,N=`${n}-notice`;return{position:"relative",marginBottom:a,marginInlineStart:"auto",background:d,borderRadius:r,boxShadow:o,[N]:{padding:p,width:y,maxWidth:`calc(100vw - ${2*m}px)`,overflow:"hidden",lineHeight:v,wordWrap:"break-word"},[`${n}-close-icon`]:{fontSize:g,cursor:"pointer"},[`${N}-message`]:{marginBottom:e.marginXS,color:f,fontSize:i,lineHeight:e.lineHeightLG},[`${N}-description`]:{fontSize:g,color:b},[`&${N}-closable ${N}-message`]:{paddingInlineEnd:e.paddingLG},[`${N}-with-icon ${N}-message`]:{marginBottom:e.marginXS,marginInlineStart:e.marginSM+h,fontSize:i},[`${N}-with-icon ${N}-description`]:{marginInlineStart:e.marginSM+h,fontSize:g},[`${N}-icon`]:{position:"absolute",fontSize:h,lineHeight:0,[`&-success${t}`]:{color:l},[`&-info${t}`]:{color:c},[`&-warning${t}`]:{color:s},[`&-error${t}`]:{color:u}},[`${N}-close`]:{position:"absolute",top:e.notificationPaddingVertical,insetInlineEnd:e.notificationPaddingHorizontal,color:e.colorIcon,outline:"none",width:e.notificationCloseButtonSize,height:e.notificationCloseButtonSize,borderRadius:e.borderRadiusSM,transition:`background-color ${e.motionDurationMid}, color ${e.motionDurationMid}`,display:"flex",alignItems:"center",justifyContent:"center","&:hover":{color:e.colorIconHover,backgroundColor:e.wireframe?"transparent":e.colorFillContent}},[`${N}-btn`]:{float:"right",marginTop:e.marginSM}}};t.genNoticeStyle=genNoticeStyle;let genNotificationStyle=e=>{let{componentCls:t,notificationMarginBottom:n,notificationMarginEdge:o,motionDurationMid:r,motionEaseInOut:l}=e,c=`${t}-notice`,s=new i.Keyframes("antNotificationFadeOut",{"0%":{maxHeight:e.animationMaxHeight,marginBottom:n},"100%":{maxHeight:0,marginBottom:0,paddingTop:0,paddingBottom:0,opacity:0}});return[{[t]:Object.assign(Object.assign({},(0,a.resetComponent)(e)),{position:"fixed",zIndex:e.zIndexPopup,marginRight:{value:o,_skip_check_:!0},[`${t}-hook-holder`]:{position:"relative"},[`${t}-fade-appear-prepare`]:{opacity:"0 !important"},[`${t}-fade-enter, ${t}-fade-appear`]:{animationDuration:e.motionDurationMid,animationTimingFunction:l,animationFillMode:"both",opacity:0,animationPlayState:"paused"},[`${t}-fade-leave`]:{animationTimingFunction:l,animationFillMode:"both",animationDuration:r,animationPlayState:"paused"},[`${t}-fade-enter${t}-fade-enter-active, ${t}-fade-appear${t}-fade-appear-active`]:{animationPlayState:"running"},[`${t}-fade-leave${t}-fade-leave-active`]:{animationName:s,animationPlayState:"running"},"&-rtl":{direction:"rtl",[`${c}-btn`]:{float:"left"}}})},{[t]:{[`${c}-wrapper`]:Object.assign({},genNoticeStyle(e))}}]},prepareComponentToken=e=>({zIndexPopup:e.zIndexPopupBase+50,width:384});t.prepareComponentToken=prepareComponentToken;let prepareNotificationToken=e=>{let t=e.paddingMD,n=e.paddingLG,o=(0,r.mergeToken)(e,{notificationBg:e.colorBgElevated,notificationPaddingVertical:t,notificationPaddingHorizontal:n,notificationIconSize:e.fontSizeLG*e.lineHeightLG,notificationCloseButtonSize:.55*e.controlHeightLG,notificationMarginBottom:e.margin,notificationPadding:`${e.paddingMD}px ${e.paddingContentHorizontalLG}px`,notificationMarginEdge:e.marginLG,animationMaxHeight:150,notificationStackLayer:3});return o};t.prepareNotificationToken=prepareNotificationToken,t.default=(0,r.genComponentStyleHook)("Notification",e=>{let t=prepareNotificationToken(e);return[genNotificationStyle(t),(0,l.default)(t),(0,c.default)(t)]},prepareComponentToken)},3543:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n(41394);t.default=e=>{let{componentCls:t,notificationMarginEdge:n,animationMaxHeight:i}=e,a=`${t}-notice`,r=new o.Keyframes("antNotificationFadeIn",{"0%":{transform:"translate3d(100%, 0, 0)",opacity:0},"100%":{transform:"translate3d(0, 0, 0)",opacity:1}}),l=new o.Keyframes("antNotificationTopFadeIn",{"0%":{top:-i,opacity:0},"100%":{top:0,opacity:1}}),c=new o.Keyframes("antNotificationBottomFadeIn",{"0%":{bottom:-i,opacity:0},"100%":{bottom:0,opacity:1}}),s=new o.Keyframes("antNotificationLeftFadeIn",{"0%":{transform:"translate3d(-100%, 0, 0)",opacity:0},"100%":{transform:"translate3d(0, 0, 0)",opacity:1}});return{[t]:{[`&${t}-top, &${t}-bottom`]:{marginInline:0,[a]:{marginInline:"auto auto"}},[`&${t}-top`]:{[`${t}-fade-enter${t}-fade-enter-active, ${t}-fade-appear${t}-fade-appear-active`]:{animationName:l}},[`&${t}-bottom`]:{[`${t}-fade-enter${t}-fade-enter-active, ${t}-fade-appear${t}-fade-appear-active`]:{animationName:c}},[`&${t}-topRight, &${t}-bottomRight`]:{[`${t}-fade-enter${t}-fade-enter-active, ${t}-fade-appear${t}-fade-appear-active`]:{animationName:r}},[`&${t}-topLeft, &${t}-bottomLeft`]:{marginRight:{value:0,_skip_check_:!0},marginLeft:{value:n,_skip_check_:!0},[a]:{marginInlineEnd:"auto",marginInlineStart:0},[`${t}-fade-enter${t}-fade-enter-active, ${t}-fade-appear${t}-fade-appear-active`]:{animationName:s}}}}}},64740:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n(18710),i=n(97176);t.default=(0,o.genSubStyleComponent)(["Notification","PurePanel"],e=>{let t=`${e.componentCls}-notice`,n=(0,i.prepareNotificationToken)(e);return{[`${t}-pure-panel`]:Object.assign(Object.assign({},(0,i.genNoticeStyle)(n)),{width:n.width,maxWidth:`calc(100vw - ${2*n.notificationMarginEdge}px)`,margin:0})}},i.prepareComponentToken)},93223:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n(69753);let i={topLeft:"left",topRight:"right",bottomLeft:"left",bottomRight:"right",top:"left",bottom:"left"},genPlacementStackStyle=(e,t)=>{let{componentCls:n}=e;return{[`${n}-${t}`]:{[`&${n}-stack > ${n}-notice-wrapper`]:{[t.startsWith("top")?"top":"bottom"]:0,[i[t]]:{value:0,_skip_check_:!0}}}}},genStackChildrenStyle=e=>{let t={};for(let n=1;n<e.notificationStackLayer;n++)t[`&:nth-last-child(${n+1})`]={overflow:"hidden",[`& > ${e.componentCls}-notice`]:{opacity:0,transition:`opacity ${e.motionDurationMid}`}};return Object.assign({[`&:not(:nth-last-child(-n+${e.notificationStackLayer}))`]:{opacity:0,overflow:"hidden",color:"transparent",pointerEvents:"none"}},t)},genStackedNoticeStyle=e=>{let t={};for(let n=1;n<e.notificationStackLayer;n++)t[`&:nth-last-child(${n+1})`]={background:e.colorBgBlur,backdropFilter:"blur(10px)","-webkit-backdrop-filter":"blur(10px)"};return Object.assign({},t)};t.default=e=>{let{componentCls:t}=e;return Object.assign({[`${t}-stack`]:{[`& > ${t}-notice-wrapper`]:Object.assign({transition:`all ${e.motionDurationSlow}, backdrop-filter 0s`,position:"absolute"},genStackChildrenStyle(e))},[`${t}-stack:not(${t}-stack-expanded)`]:{[`& > ${t}-notice-wrapper`]:Object.assign({},genStackedNoticeStyle(e))},[`${t}-stack${t}-stack-expanded`]:{[`& > ${t}-notice-wrapper`]:{"&:not(:nth-last-child(-n + 1))":{opacity:1,overflow:"unset",color:"inherit",pointerEvents:"auto",[`& > ${e.componentCls}-notice`]:{opacity:1}},"&:after":{content:'""',position:"absolute",height:e.margin,width:"100%",insetInline:0,bottom:-e.margin,background:"transparent",pointerEvents:"auto"}}}},o.NotificationPlacements.map(t=>genPlacementStackStyle(e,t)).reduce((e,t)=>Object.assign(Object.assign({},e),t),{}))}},68020:function(e,t,n){var o=n(26314).default,i=n(36199).default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=useNotification,t.useInternalNotification=useInternalNotification;var a=i(n(2265)),r=o(n(54440)),l=n(14807),c=n(15218),s=n(9273),u=n(70988),f=o(n(97176)),d=n(44953),p=n(18710),__rest=function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&0>t.indexOf(o)&&(n[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var i=0,o=Object.getOwnPropertySymbols(e);i<o.length;i++)0>t.indexOf(o[i])&&Object.prototype.propertyIsEnumerable.call(e,o[i])&&(n[o[i]]=e[o[i]]);return n};let Wrapper=e=>{let{children:t,prefixCls:n}=e,[,o]=(0,f.default)(n);return a.createElement(l.NotificationProvider,{classNames:{list:o,notice:o}},t)},renderNotifications=(e,t)=>{let{prefixCls:n,key:o}=t;return a.createElement(Wrapper,{prefixCls:n,key:o},e)},m=a.forwardRef((e,t)=>{let{top:n,bottom:o,prefixCls:i,getContainer:c,maxCount:f,rtl:m,onAllRemoved:g,stack:v}=e,{getPrefixCls:y,getPopupContainer:h,notification:b}=a.useContext(s.ConfigContext),[,N]=(0,p.useToken)(),k=i||y("notification"),[C,$]=(0,l.useNotification)({prefixCls:k,style:e=>(0,d.getPlacementStyle)(e,null!=n?n:24,null!=o?o:24),className:()=>(0,r.default)({[`${k}-rtl`]:m}),motion:()=>(0,d.getMotion)(k),closable:!0,closeIcon:(0,u.getCloseIcon)(k),duration:4.5,getContainer:()=>(null==c?void 0:c())||(null==h?void 0:h())||document.body,maxCount:f,onAllRemoved:g,renderNotifications,stack:!1!==v&&{threshold:"object"==typeof v?null==v?void 0:v.threshold:void 0,offset:8,gap:N.margin}});return a.useImperativeHandle(t,()=>Object.assign(Object.assign({},C),{prefixCls:k,notification:b})),$});function useInternalNotification(e){let t=a.useRef(null);(0,c.devUseWarning)("Notification");let n=a.useMemo(()=>{let open=n=>{var o;if(!t.current)return;let{open:i,prefixCls:l,notification:c}=t.current,s=`${l}-notice`,{message:f,description:d,icon:p,type:m,btn:g,className:v,style:y,role:h="alert",closeIcon:b}=n,N=__rest(n,["message","description","icon","type","btn","className","style","role","closeIcon"]),k=(0,u.getCloseIcon)(s,b);return i(Object.assign(Object.assign({placement:null!==(o=null==e?void 0:e.placement)&&void 0!==o?o:"topRight"},N),{content:a.createElement(u.PureContent,{prefixCls:s,icon:p,type:m,message:f,description:d,btn:g,role:h}),className:(0,r.default)(m&&`${s}-${m}`,v,null==c?void 0:c.className),style:Object.assign(Object.assign({},null==c?void 0:c.style),y),closeIcon:k,closable:!!k}))},n={open,destroy:e=>{var n,o;void 0!==e?null===(n=t.current)||void 0===n||n.close(e):null===(o=t.current)||void 0===o||o.destroy()}};return["success","info","warning","error"].forEach(e=>{n[e]=t=>open(Object.assign(Object.assign({},t),{type:e}))}),n},[]);return[n,a.createElement(m,Object.assign({key:"notification-holder"},e,{ref:t}))]}function useNotification(e){return useInternalNotification(e)}},44953:function(e,t){function getPlacementStyle(e,t,n){let o;switch(e){case"top":o={left:"50%",transform:"translateX(-50%)",right:"auto",top:t,bottom:"auto"};break;case"topLeft":o={left:0,top:t,bottom:"auto"};break;case"topRight":o={right:0,top:t,bottom:"auto"};break;case"bottom":o={left:"50%",transform:"translateX(-50%)",right:"auto",top:"auto",bottom:n};break;case"bottomLeft":o={left:0,top:"auto",bottom:n};break;default:o={right:0,top:"auto",bottom:n}}return o}function getMotion(e){return{motionName:`${e}-fade`}}Object.defineProperty(t,"__esModule",{value:!0}),t.getMotion=getMotion,t.getPlacementStyle=getPlacementStyle},14807:function(e,t,n){n.r(t),n.d(t,{Notice:function(){return g},NotificationProvider:function(){return es_NotificationProvider},useNotification:function(){return useNotification}});var o=n(16141),i=n(98961),a=n(12258),r=n(2265),l=n(10870),c=n(54887),s=n(13428),u=n(21076),f=n(54440),d=n.n(f),p=n(52640),m=n(89017),g=r.forwardRef(function(e,t){var n=e.prefixCls,o=e.style,a=e.className,l=e.duration,c=void 0===l?4.5:l,f=e.eventKey,p=e.content,g=e.closable,v=e.closeIcon,y=void 0===v?"x":v,h=e.props,b=e.onClick,N=e.onNoticeClose,k=e.times,C=e.hovering,$=r.useState(!1),S=(0,i.Z)($,2),E=S[0],x=S[1],O=C||E,onInternalClose=function(){N(f)};r.useEffect(function(){if(!O&&c>0){var e=setTimeout(function(){onInternalClose()},1e3*c);return function(){clearTimeout(e)}}},[c,O,k]);var P="".concat(n,"-notice");return r.createElement("div",(0,s.Z)({},h,{ref:t,className:d()(P,a,(0,u.Z)({},"".concat(P,"-closable"),g)),style:o,onMouseEnter:function(e){var t;x(!0),null==h||null===(t=h.onMouseEnter)||void 0===t||t.call(h,e)},onMouseLeave:function(e){var t;x(!1),null==h||null===(t=h.onMouseLeave)||void 0===t||t.call(h,e)},onClick:b}),r.createElement("div",{className:"".concat(P,"-content")},p),g&&r.createElement("a",{tabIndex:0,className:"".concat(P,"-close"),onKeyDown:function(e){("Enter"===e.key||"Enter"===e.code||e.keyCode===m.Z.ENTER)&&onInternalClose()},onClick:function(e){e.preventDefault(),e.stopPropagation(),onInternalClose()}},y))}),v=r.createContext({}),es_NotificationProvider=function(e){var t=e.children,n=e.classNames;return r.createElement(v.Provider,{value:{classNames:n}},t)},y=n(60075),hooks_useStack=function(e){var t,n,o,i={offset:8,threshold:3,gap:16};return e&&"object"===(0,y.Z)(e)&&(i.offset=null!==(t=e.offset)&&void 0!==t?t:8,i.threshold=null!==(n=e.threshold)&&void 0!==n?n:3,i.gap=null!==(o=e.gap)&&void 0!==o?o:16),[!!e,i]},h=["className","style","classNames","styles"],es_NoticeList=function(e){var t,n=e.configList,c=e.placement,f=e.prefixCls,m=e.className,y=e.style,b=e.motion,N=e.onAllNoticeRemoved,k=e.onNoticeClose,C=e.stack,$=(0,r.useContext)(v).classNames,S=(0,r.useRef)({}),E=(0,r.useState)(null),x=(0,i.Z)(E,2),O=x[0],P=x[1],I=(0,r.useState)([]),j=(0,i.Z)(I,2),w=j[0],_=j[1],M=n.map(function(e){return{config:e,key:String(e.key)}}),R=hooks_useStack(C),L=(0,i.Z)(R,2),Z=L[0],T=L[1],H=T.offset,B=T.threshold,G=T.gap,z=Z&&(w.length>0||M.length<=B),F="function"==typeof b?b(c):b;return(0,r.useEffect)(function(){Z&&w.length>1&&_(function(e){return e.filter(function(e){return M.some(function(t){return e===t.key})})})},[w,M,Z]),(0,r.useEffect)(function(){var e,t;Z&&S.current[null===(e=M[M.length-1])||void 0===e?void 0:e.key]&&P(S.current[null===(t=M[M.length-1])||void 0===t?void 0:t.key])},[M,Z]),r.createElement(p.CSSMotionList,(0,s.Z)({key:c,className:d()(f,"".concat(f,"-").concat(c),null==$?void 0:$.list,m,(t={},(0,u.Z)(t,"".concat(f,"-stack"),!!Z),(0,u.Z)(t,"".concat(f,"-stack-expanded"),z),t)),style:y,keys:M,motionAppear:!0},F,{onAllRemoved:function(){N(c)}}),function(e,t){var n=e.config,i=e.className,u=e.style,p=e.index,m=n.key,v=n.times,y=String(m),b=n.className,N=n.style,C=n.classNames,E=n.styles,x=(0,a.Z)(n,h),P=M.findIndex(function(e){return e.key===y}),I={};if(Z){var j=M.length-1-(P>-1?P:p-1),R="top"===c||"bottom"===c?"-50%":"0";if(j>0){I.height=z?null===(L=S.current[y])||void 0===L?void 0:L.offsetHeight:null==O?void 0:O.offsetHeight;for(var L,T,B,F,D=0,W=0;W<j;W++)D+=(null===(F=S.current[M[M.length-1-W].key])||void 0===F?void 0:F.offsetHeight)+G;var A=(z?D:j*H)*(c.startsWith("top")?1:-1),K=!z&&null!=O&&O.offsetWidth&&null!==(T=S.current[y])&&void 0!==T&&T.offsetWidth?((null==O?void 0:O.offsetWidth)-2*H*(j<3?j:3))/(null===(B=S.current[y])||void 0===B?void 0:B.offsetWidth):1;I.transform="translate3d(".concat(R,", ").concat(A,"px, 0) scaleX(").concat(K,")")}else I.transform="translate3d(".concat(R,", 0, 0)")}return r.createElement("div",{ref:t,className:d()("".concat(f,"-notice-wrapper"),i,null==C?void 0:C.wrapper),style:(0,l.Z)((0,l.Z)((0,l.Z)({},u),I),null==E?void 0:E.wrapper),onMouseEnter:function(){return _(function(e){return e.includes(y)?e:[].concat((0,o.Z)(e),[y])})},onMouseLeave:function(){return _(function(e){return e.filter(function(e){return e!==y})})}},r.createElement(g,(0,s.Z)({},x,{ref:function(e){P>-1?S.current[y]=e:delete S.current[y]},prefixCls:f,classNames:C,styles:E,className:d()(b,null==$?void 0:$.notice),style:N,times:v,key:m,eventKey:m,onNoticeClose:k,hovering:Z&&w.length>0})))})},b=r.forwardRef(function(e,t){var n=e.prefixCls,a=void 0===n?"rc-notification":n,s=e.container,u=e.motion,f=e.maxCount,d=e.className,p=e.style,m=e.onAllRemoved,g=e.stack,v=e.renderNotifications,y=r.useState([]),h=(0,i.Z)(y,2),b=h[0],N=h[1],onNoticeClose=function(e){var t,n=b.find(function(t){return t.key===e});null==n||null===(t=n.onClose)||void 0===t||t.call(n),N(function(t){return t.filter(function(t){return t.key!==e})})};r.useImperativeHandle(t,function(){return{open:function(e){N(function(t){var n,i=(0,o.Z)(t),a=i.findIndex(function(t){return t.key===e.key}),r=(0,l.Z)({},e);return a>=0?(r.times=((null===(n=t[a])||void 0===n?void 0:n.times)||0)+1,i[a]=r):(r.times=0,i.push(r)),f>0&&i.length>f&&(i=i.slice(-f)),i})},close:function(e){onNoticeClose(e)},destroy:function(){N([])}}});var k=r.useState({}),C=(0,i.Z)(k,2),$=C[0],S=C[1];r.useEffect(function(){var e={};b.forEach(function(t){var n=t.placement,o=void 0===n?"topRight":n;o&&(e[o]=e[o]||[],e[o].push(t))}),Object.keys($).forEach(function(t){e[t]=e[t]||[]}),S(e)},[b]);var onAllNoticeRemoved=function(e){S(function(t){var n=(0,l.Z)({},t);return(n[e]||[]).length||delete n[e],n})},E=r.useRef(!1);if(r.useEffect(function(){Object.keys($).length>0?E.current=!0:E.current&&(null==m||m(),E.current=!1)},[$]),!s)return null;var x=Object.keys($);return(0,c.createPortal)(r.createElement(r.Fragment,null,x.map(function(e){var t=$[e],n=r.createElement(es_NoticeList,{key:e,configList:t,placement:e,prefixCls:a,className:null==d?void 0:d(e),style:null==p?void 0:p(e),motion:u,onNoticeClose:onNoticeClose,onAllNoticeRemoved:onAllNoticeRemoved,stack:g});return v?v(n,{prefixCls:a,key:e}):n})),s)}),N=["getContainer","motion","prefixCls","maxCount","className","style","onAllRemoved","stack","renderNotifications"],defaultGetContainer=function(){return document.body},k=0;function mergeConfig(){for(var e={},t=arguments.length,n=Array(t),o=0;o<t;o++)n[o]=arguments[o];return n.forEach(function(t){t&&Object.keys(t).forEach(function(n){var o=t[n];void 0!==o&&(e[n]=o)})}),e}function useNotification(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.getContainer,n=void 0===t?defaultGetContainer:t,l=e.motion,c=e.prefixCls,s=e.maxCount,u=e.className,f=e.style,d=e.onAllRemoved,p=e.stack,m=e.renderNotifications,g=(0,a.Z)(e,N),v=r.useState(),y=(0,i.Z)(v,2),h=y[0],C=y[1],$=r.useRef(),S=r.createElement(b,{container:h,ref:$,prefixCls:c,motion:l,maxCount:s,className:u,style:f,onAllRemoved:d,stack:p,renderNotifications:m}),E=r.useState([]),x=(0,i.Z)(E,2),O=x[0],P=x[1],I=r.useMemo(function(){return{open:function(e){var t=mergeConfig(g,e);(null===t.key||void 0===t.key)&&(t.key="rc-notification-".concat(k),k+=1),P(function(e){return[].concat((0,o.Z)(e),[{type:"open",config:t}])})},close:function(e){P(function(t){return[].concat((0,o.Z)(t),[{type:"close",key:e}])})},destroy:function(){P(function(e){return[].concat((0,o.Z)(e),[{type:"destroy"}])})}}},[]);return r.useEffect(function(){C(n())}),r.useEffect(function(){$.current&&O.length&&(O.forEach(function(e){switch(e.type){case"open":$.current.open(e.config);break;case"close":$.current.close(e.key);break;case"destroy":$.current.destroy()}}),P(function(e){return e.filter(function(e){return!O.includes(e)})}))},[O]),[I,S]}}}]);