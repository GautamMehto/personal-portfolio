import{r as d}from"./index-CEvm9YDz.js";class j{constructor(t=0,r="Network Error"){this.status=t,this.text=r}}const re=()=>{if(!(typeof localStorage>"u"))return{get:e=>Promise.resolve(localStorage.getItem(e)),set:(e,t)=>Promise.resolve(localStorage.setItem(e,t)),remove:e=>Promise.resolve(localStorage.removeItem(e))}},g={origin:"https://api.emailjs.com",blockHeadless:!1,storageProvider:re()},F=e=>e?typeof e=="string"?{publicKey:e}:e.toString()==="[object Object]"?e:{}:{},ae=(e,t="https://api.emailjs.com")=>{if(!e)return;const r=F(e);g.publicKey=r.publicKey,g.blockHeadless=r.blockHeadless,g.storageProvider=r.storageProvider,g.blockList=r.blockList,g.limitRate=r.limitRate,g.origin=r.origin||t},I=async(e,t,r={})=>{const s=await fetch(g.origin+e,{method:"POST",headers:r,body:t}),i=await s.text(),o=new j(s.status,i);if(s.ok)return o;throw o},M=(e,t,r)=>{if(!e||typeof e!="string")throw"The public key is required. Visit https://dashboard.emailjs.com/admin/account";if(!t||typeof t!="string")throw"The service ID is required. Visit https://dashboard.emailjs.com/admin";if(!r||typeof r!="string")throw"The template ID is required. Visit https://dashboard.emailjs.com/admin/templates"},se=e=>{if(e&&e.toString()!=="[object Object]")throw"The template params have to be the object. Visit https://www.emailjs.com/docs/sdk/send/"},V=e=>e.webdriver||!e.languages||e.languages.length===0,K=()=>new j(451,"Unavailable For Headless Browser"),ie=(e,t)=>{if(!Array.isArray(e))throw"The BlockList list has to be an array";if(typeof t!="string")throw"The BlockList watchVariable has to be a string"},oe=e=>!e.list?.length||!e.watchVariable,ne=(e,t)=>e instanceof FormData?e.get(t):e[t],B=(e,t)=>{if(oe(e))return!1;ie(e.list,e.watchVariable);const r=ne(t,e.watchVariable);return typeof r!="string"?!1:e.list.includes(r)},q=()=>new j(403,"Forbidden"),le=(e,t)=>{if(typeof e!="number"||e<0)throw"The LimitRate throttle has to be a positive number";if(t&&typeof t!="string")throw"The LimitRate ID has to be a non-empty string"},ce=async(e,t,r)=>{const s=Number(await r.get(e)||0);return t-Date.now()+s},U=async(e,t,r)=>{if(!t.throttle||!r)return!1;le(t.throttle,t.id);const s=t.id||e;return await ce(s,t.throttle,r)>0?!0:(await r.set(s,Date.now().toString()),!1)},J=()=>new j(429,"Too Many Requests"),de=async(e,t,r,s)=>{const i=F(s),o=i.publicKey||g.publicKey,a=i.blockHeadless||g.blockHeadless,n=i.storageProvider||g.storageProvider,l={...g.blockList,...i.blockList},u={...g.limitRate,...i.limitRate};return a&&V(navigator)?Promise.reject(K()):(M(o,e,t),se(r),r&&B(l,r)?Promise.reject(q()):await U(location.pathname,u,n)?Promise.reject(J()):I("/api/v1.0/email/send",JSON.stringify({lib_version:"4.4.1",user_id:o,service_id:e,template_id:t,template_params:r}),{"Content-type":"application/json"}))},ue=e=>{if(!e||e.nodeName!=="FORM")throw"The 3rd parameter is expected to be the HTML form element or the style selector of the form"},me=e=>typeof e=="string"?document.querySelector(e):e,pe=async(e,t,r,s)=>{const i=F(s),o=i.publicKey||g.publicKey,a=i.blockHeadless||g.blockHeadless,n=g.storageProvider||i.storageProvider,l={...g.blockList,...i.blockList},u={...g.limitRate,...i.limitRate};if(a&&V(navigator))return Promise.reject(K());const m=me(r);M(o,e,t),ue(m);const c=new FormData(m);return B(l,c)?Promise.reject(q()):await U(location.pathname,u,n)?Promise.reject(J()):(c.append("lib_version","4.4.1"),c.append("service_id",e),c.append("template_id",t),c.append("user_id",o),I("/api/v1.0/email/send-form",c))},rt={init:ae,send:de,sendForm:pe,EmailJSResponseStatus:j};let fe={data:""},ge=e=>{if(typeof window=="object"){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||fe},be=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,he=/\/\*[^]*?\*\/|  +/g,z=/\n+/g,x=(e,t)=>{let r="",s="",i="";for(let o in e){let a=e[o];o[0]=="@"?o[1]=="i"?r=o+" "+a+";":s+=o[1]=="f"?x(a,o):o+"{"+x(a,o[1]=="k"?"":t)+"}":typeof a=="object"?s+=x(a,t?t.replace(/([^,])+/g,n=>o.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,l=>/&/.test(l)?l.replace(/&/g,n):n?n+" "+l:l)):o):a!=null&&(o=/^--/.test(o)?o:o.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=x.p?x.p(o,a):o+":"+a+";")}return r+(t&&i?t+"{"+i+"}":i)+s},v={},W=e=>{if(typeof e=="object"){let t="";for(let r in e)t+=r+W(e[r]);return t}return e},ye=(e,t,r,s,i)=>{let o=W(e),a=v[o]||(v[o]=(l=>{let u=0,m=11;for(;u<l.length;)m=101*m+l.charCodeAt(u++)>>>0;return"go"+m})(o));if(!v[a]){let l=o!==e?e:(u=>{let m,c,p=[{}];for(;m=be.exec(u.replace(he,""));)m[4]?p.shift():m[3]?(c=m[3].replace(z," ").trim(),p.unshift(p[0][c]=p[0][c]||{})):p[0][m[1]]=m[2].replace(z," ").trim();return p[0]})(e);v[a]=x(i?{["@keyframes "+a]:l}:l,r?"":"."+a)}let n=r&&v.g?v.g:null;return r&&(v.g=v[a]),((l,u,m,c)=>{c?u.data=u.data.replace(c,l):u.data.indexOf(l)===-1&&(u.data=m?l+u.data:u.data+l)})(v[a],t,s,n),a},ve=(e,t,r)=>e.reduce((s,i,o)=>{let a=t[o];if(a&&a.call){let n=a(r),l=n&&n.props&&n.props.className||/^go/.test(n)&&n;a=l?"."+l:n&&typeof n=="object"?n.props?"":x(n,""):n===!1?"":n}return s+i+(a??"")},"");function O(e){let t=this||{},r=e.call?e(t.p):e;return ye(r.unshift?r.raw?ve(r,[].slice.call(arguments,1),t.p):r.reduce((s,i)=>Object.assign(s,i&&i.call?i(t.p):i),{}):r,ge(t.target),t.g,t.o,t.k)}let Y,D,C;O.bind({g:1});let w=O.bind({k:1});function we(e,t,r,s){x.p=t,Y=e,D=r,C=s}function k(e,t){let r=this||{};return function(){let s=arguments;function i(o,a){let n=Object.assign({},o),l=n.className||i.className;r.p=Object.assign({theme:D&&D()},n),r.o=/ *go\d+/.test(l),n.className=O.apply(r,s)+(l?" "+l:"");let u=e;return e[0]&&(u=n.as||e,delete n.as),C&&u[0]&&C(n),Y(u,n)}return t?t(i):i}}var xe=e=>typeof e=="function",$=(e,t)=>xe(e)?e(t):e,ke=(()=>{let e=0;return()=>(++e).toString()})(),Z=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),je=20,N="default",Q=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(a=>a.id===t.toast.id?{...a,...t.toast}:a)};case 2:let{toast:s}=t;return Q(e,{type:e.toasts.find(a=>a.id===s.id)?1:0,toast:s});case 3:let{toastId:i}=t;return{...e,toasts:e.toasts.map(a=>a.id===i||i===void 0?{...a,dismissed:!0,visible:!1}:a)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(a=>a.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let o=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(a=>({...a,pauseDuration:a.pauseDuration+o}))}}},L=[],G={toasts:[],pausedAt:void 0,settings:{toastLimit:je}},y={},X=(e,t=N)=>{y[t]=Q(y[t]||G,e),L.forEach(([r,s])=>{r===t&&s(y[t])})},ee=e=>Object.keys(y).forEach(t=>X(e,t)),Ee=e=>Object.keys(y).find(t=>y[t].toasts.some(r=>r.id===e)),R=(e=N)=>t=>{X(t,e)},Pe={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},Te=(e={},t=N)=>{let[r,s]=d.useState(y[t]||G),i=d.useRef(y[t]);d.useEffect(()=>(i.current!==y[t]&&s(y[t]),L.push([t,s]),()=>{let a=L.findIndex(([n])=>n===t);a>-1&&L.splice(a,1)}),[t]);let o=r.toasts.map(a=>{var n,l,u;return{...e,...e[a.type],...a,removeDelay:a.removeDelay||((n=e[a.type])==null?void 0:n.removeDelay)||e?.removeDelay,duration:a.duration||((l=e[a.type])==null?void 0:l.duration)||e?.duration||Pe[a.type],style:{...e.style,...(u=e[a.type])==null?void 0:u.style,...a.style}}});return{...r,toasts:o}},Le=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:r?.id||ke()}),E=e=>(t,r)=>{let s=Le(t,e,r);return R(s.toasterId||Ee(s.id))({type:2,toast:s}),s.id},f=(e,t)=>E("blank")(e,t);f.error=E("error");f.success=E("success");f.loading=E("loading");f.custom=E("custom");f.dismiss=(e,t)=>{let r={type:3,toastId:e};t?R(t)(r):ee(r)};f.dismissAll=e=>f.dismiss(void 0,e);f.remove=(e,t)=>{let r={type:4,toastId:e};t?R(t)(r):ee(r)};f.removeAll=e=>f.remove(void 0,e);f.promise=(e,t,r)=>{let s=f.loading(t.loading,{...r,...r?.loading});return typeof e=="function"&&(e=e()),e.then(i=>{let o=t.success?$(t.success,i):void 0;return o?f.success(o,{id:s,...r,...r?.success}):f.dismiss(s),i}).catch(i=>{let o=t.error?$(t.error,i):void 0;o?f.error(o,{id:s,...r,...r?.error}):f.dismiss(s)}),e};var $e=1e3,Oe=(e,t="default")=>{let{toasts:r,pausedAt:s}=Te(e,t),i=d.useRef(new Map).current,o=d.useCallback((c,p=$e)=>{if(i.has(c))return;let b=setTimeout(()=>{i.delete(c),a({type:4,toastId:c})},p);i.set(c,b)},[]);d.useEffect(()=>{if(s)return;let c=Date.now(),p=r.map(b=>{if(b.duration===1/0)return;let P=(b.duration||0)+b.pauseDuration-(c-b.createdAt);if(P<0){b.visible&&f.dismiss(b.id);return}return setTimeout(()=>f.dismiss(b.id,t),P)});return()=>{p.forEach(b=>b&&clearTimeout(b))}},[r,s,t]);let a=d.useCallback(R(t),[t]),n=d.useCallback(()=>{a({type:5,time:Date.now()})},[a]),l=d.useCallback((c,p)=>{a({type:1,toast:{id:c,height:p}})},[a]),u=d.useCallback(()=>{s&&a({type:6,time:Date.now()})},[s,a]),m=d.useCallback((c,p)=>{let{reverseOrder:b=!1,gutter:P=8,defaultPosition:_}=p||{},S=r.filter(h=>(h.position||_)===(c.position||_)&&h.height),te=S.findIndex(h=>h.id===c.id),A=S.filter((h,H)=>H<te&&h.visible).length;return S.filter(h=>h.visible).slice(...b?[A+1]:[0,A]).reduce((h,H)=>h+(H.height||0)+P,0)},[r]);return d.useEffect(()=>{r.forEach(c=>{if(c.dismissed)o(c.id,c.removeDelay);else{let p=i.get(c.id);p&&(clearTimeout(p),i.delete(c.id))}})},[r,o]),{toasts:r,handlers:{updateHeight:l,startPause:n,endPause:u,calculateOffset:m}}},Re=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Se=w`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,He=w`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,De=k("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Re} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${Se} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${He} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Ce=w`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,Fe=k("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Ce} 1s linear infinite;
`,Ne=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,_e=w`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,Ae=k("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Ne} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${_e} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,ze=k("div")`
  position: absolute;
`,Ie=k("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Me=w`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Ve=k("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Me} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Ke=({toast:e})=>{let{icon:t,type:r,iconTheme:s}=e;return t!==void 0?typeof t=="string"?d.createElement(Ve,null,t):t:r==="blank"?null:d.createElement(Ie,null,d.createElement(Fe,{...s}),r!=="loading"&&d.createElement(ze,null,r==="error"?d.createElement(De,{...s}):d.createElement(Ae,{...s})))},Be=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,qe=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,Ue="0%{opacity:0;} 100%{opacity:1;}",Je="0%{opacity:1;} 100%{opacity:0;}",We=k("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,Ye=k("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Ze=(e,t)=>{let r=e.includes("top")?1:-1,[s,i]=Z()?[Ue,Je]:[Be(r),qe(r)];return{animation:t?`${w(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${w(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},Qe=d.memo(({toast:e,position:t,style:r,children:s})=>{let i=e.height?Ze(e.position||t||"top-center",e.visible):{opacity:0},o=d.createElement(Ke,{toast:e}),a=d.createElement(Ye,{...e.ariaProps},$(e.message,e));return d.createElement(We,{className:e.className,style:{...i,...r,...e.style}},typeof s=="function"?s({icon:o,message:a}):d.createElement(d.Fragment,null,o,a))});we(d.createElement);var Ge=({id:e,className:t,style:r,onHeightUpdate:s,children:i})=>{let o=d.useCallback(a=>{if(a){let n=()=>{let l=a.getBoundingClientRect().height;s(e,l)};n(),new MutationObserver(n).observe(a,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return d.createElement("div",{ref:o,className:t,style:r},i)},Xe=(e,t)=>{let r=e.includes("top"),s=r?{top:0}:{bottom:0},i=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:Z()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...s,...i}},et=O`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,T=16,at=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:s,children:i,toasterId:o,containerStyle:a,containerClassName:n})=>{let{toasts:l,handlers:u}=Oe(r,o);return d.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:T,left:T,right:T,bottom:T,pointerEvents:"none",...a},className:n,onMouseEnter:u.startPause,onMouseLeave:u.endPause},l.map(m=>{let c=m.position||t,p=u.calculateOffset(m,{reverseOrder:e,gutter:s,defaultPosition:t}),b=Xe(c,p);return d.createElement(Ge,{id:m.id,key:m.id,onHeightUpdate:u.updateHeight,className:m.visible?et:"",style:b},m.type==="custom"?$(m.message,m):i?i(m):d.createElement(Qe,{toast:m,position:c}))}))},st=f;export{at as F,rt as e,f as n,st as z};
