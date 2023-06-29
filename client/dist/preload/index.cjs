"use strict";const a=require("fs"),r=require("electron"),d=(e=["complete","interactive"])=>new Promise(o=>{e.includes(document.readyState)?o(!0):document.addEventListener("readystatechange",()=>{e.includes(document.readyState)&&o(!0)})});function s(){const e="loaders-css__square-spin",o=`
@keyframes square-spin {
  25% { transform: perspective(100px) rotateX(180deg) rotateY(0); }
  50% { transform: perspective(100px) rotateX(180deg) rotateY(180deg); }
  75% { transform: perspective(100px) rotateX(0) rotateY(180deg); }
  100% { transform: perspective(100px) rotateX(0) rotateY(0); }
}
.${e} > div {
  animation-fill-mode: both;
  width: 50px;
  height: 50px;
  background: #fff;
  animation: square-spin 3s 0s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
}
.app-loading-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #282c34;
  z-index: 9;
}
    `,t=document.createElement("style"),n=document.createElement("div");return t.id="app-loading-style",t.innerHTML=o,n.className="app-loading-wrap",n.innerHTML=`<div class="${e}"><div></div></div>`,{appendLoading(){document.head.appendChild(t),document.body.appendChild(n)},removeLoading(){document.head.removeChild(t),document.body.removeChild(n)}}}const{appendLoading:c,removeLoading:p}=s();(async()=>(await d(),c()))();r.contextBridge.exposeInMainWorld("fs",a);r.contextBridge.exposeInMainWorld("removeLoading",p);r.contextBridge.exposeInMainWorld("ipcRenderer",l(r.ipcRenderer));function l(e){const o=Object.getPrototypeOf(e);for(const[t,n]of Object.entries(o))Object.prototype.hasOwnProperty.call(e,t)||(typeof n=="function"?e[t]=function(...i){return n.call(e,...i)}:e[t]=n);return e}
