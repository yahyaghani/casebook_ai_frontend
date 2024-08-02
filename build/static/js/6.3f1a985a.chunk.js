(this["webpackJsonpreact-pdf-markdown-highlighter"]=this["webpackJsonpreact-pdf-markdown-highlighter"]||[]).push([[6],{532:function(e,t){function n(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}n.keys=function(){return[]},n.resolve=n,e.exports=n,n.id=532},534:function(e,t,n){"use strict";var i=n(1),o=n.n(i),l=n(85);n(540);t.a=function(e){const[t,n]=Object(i.useState)({compact:!0,text:"",emoji:""}),{onConfirm:a,onOpen:r}=e,{compact:c,text:s,emoji:u}=t;return o.a.createElement("div",{className:"Tip"},c?o.a.createElement("div",{className:"Tip__compact",onClick:()=>{r(),n({compact:!1})}},"Add highlight"):o.a.createElement("form",{className:"Tip__card",onSubmit:e=>{e.preventDefault(),a({text:s,emoji:u})}},o.a.createElement("div",null,o.a.createElement("textarea",{width:"100%",placeholder:"Your comments",autoFocus:!0,value:s,onChange:e=>n({text:e.target.value}),ref:e=>{e&&e.focus()}})),o.a.createElement("div",{id:"preview",width:"100%"},Object(l.a)(t.text)),o.a.createElement("div",null,o.a.createElement("input",{type:"submit",value:"Save"}))))}},540:function(e,t,n){},551:function(e,t){},553:function(e,t){},554:function(e,t){},555:function(e,t){},556:function(e,t){},557:function(e,t){},574:function(e,t,n){"use strict";n.r(t);var i=n(559),o=n(1),l=n.n(o),a=n(535);var r=function(e){let{isScrolledTo:t,position:n,comment:i}=e;const o=document.querySelector(".pdf-viewer"),a=o?.004*o.clientWidth:0,r={position:"absolute",left:"".concat(a,"px"),top:"".concat(n.boundingRect.top,"px"),background:"yellow",padding:"10px",borderRadius:"5px",boxShadow:"10 2px 5px rgba(0,0,0,0.3)",zIndex:1e3};return l.a.createElement("div",{style:r},i&&i.text)},c=n(646),s=n(560),u=n(152),h=n(534),d=n(85),m=n(84),g=n(32);var f,p=e=>{let{pdfHighlighter:t}=e;const n=Object(g.b)();return Object(o.useEffect)(()=>{const e=e=>{let{bbox:n,page:i}=e;if(t.current){const e={position:{boundingRect:n,pageNumber:i}};t.current.scrollTo(e)}};return n.on("auto-scroller-bbox-pass",e),()=>{n.off("auto-scroller-bbox-pass",e)}},[t,n]),null},E=n(97);const b=()=>{document.location.hash=""},v=e=>{let{comment:t}=e;return t.text?l.a.createElement("div",{className:"Highlight__popup"},t.emoji," ",Object(d.a)(t.text)):null},x=s.a.div(f||(f=Object(i.a)(["\n  .Highlight__part {\n    background: ",";\n  }\n  .AreaHighlight {\n    border: 3px solid ",";\n  }\n  .Highlight__part.OTHER {\n    background: rgb(93, 115, 240);\n  }\n  .Highlight__part.LEGALTEST {\n    background: ",";\n  }\n  .Highlight__part.ISSUE {\n    background: ",";\n  }\n  .Highlight__part.CONCLUSION {\n    background: ",";\n  }\n"])),e=>e.highlightColors.default||"#000000",e=>e.highlightColors.default||"#000000",e=>e.highlightColors.legalTest,e=>e.highlightColors.issue,e=>e.highlightColors.conclusion);t.default=function(){var e,t;const{state:n,dispatch:i}=Object(o.useContext)(m.a),[s,d]=Object(o.useState)(null),[g,f]=Object(o.useState)([]);Object(o.useEffect)(()=>{var e;g.length>0&&i({type:"SET_FILE_HIGHLIGHTS",payload:{highlights:g,name:null===(e=n.currentFile)||void 0===e?void 0:e.name}})},[g]),Object(o.useEffect)(()=>{if(n.currentFile)if(n.currentFile.url)d(n.currentFile.url);else if(n.currentFile instanceof Blob){const e=new FileReader;e.onload=()=>{d(e.result)},e.readAsDataURL(n.currentFile)}else console.error("Current file is not a Blob");else d(null)},[n.currentFile]),Object(o.useEffect)(()=>{if(n.currentFile){const e=n.fileHighlights.find(e=>e.name===n.currentFile.name);f(e?e.highlights:[])}else f([])},[n.currentFile,n.fileHighlights]);const O=Object(o.useRef)(null),w=()=>{const e=(t=document.location.hash.slice("#pdf-highlight-".length),g.find(e=>e.id===t));var t;e&&O.current.scrollTo(e)};return Object(o.useEffect)(()=>(window.addEventListener("hashchange",w,!1),()=>window.removeEventListener("hashchange",w)),[g]),l.a.createElement(x,{highlightColors:n.highlightColors},n.showPdfViewer?l.a.createElement("div",{className:"d-flex"},l.a.createElement("div",{style:{minHeight:"calc(100vh - 70px)",color:"#000000",width:"80%"},className:"pdf-viewer"},s?l.a.createElement(l.a.Fragment,null,l.a.createElement(a.d,{className:"my-pdf-viewer",url:s,beforeLoad:l.a.createElement(u.a,null)},e=>l.a.createElement(a.c,{ref:O,pdfDocument:e,enableAreaSelection:e=>e.altKey,onScrollChange:b,scrollRef:e=>{},onSelectionFinished:(e,t,n,i)=>l.a.createElement(h.a,{onOpen:i,onConfirm:i=>{var o;o={content:t,position:e,comment:i},f([{...o,id:String(Math.random()).slice(2)},...g]),n()}}),highlightTransform:(e,t,n,i,o,c,s)=>l.a.createElement(a.e,{popupContent:l.a.createElement(v,e),onMouseOver:t=>n(e,e=>t),onMouseOut:i,key:t},l.a.createElement(r,{isScrolledTo:s,position:e.position,comment:e.comment}),l.a.createElement(a.a,{highlight:e,onChange:t=>{var n,i,l;n=e.id,i={boundingRect:o(t)},l={image:c(t)},f(g.map(e=>e.id===n?{...e,position:{...e.position,...i},content:{...e.content,...l}}:e))}})),highlights:g}))):n.files&&0===n.files.length?l.a.createElement(c.a,null,l.a.createElement("div",{className:"h3 text-center mt-5"},"No File Selected!!")):l.a.createElement(u.a,null)),l.a.createElement(p,{pdfHighlighter:O})):l.a.createElement(E.a,{id:null===(e=n.auth)||void 0===e?void 0:e.userPublicId,fileName:null===(t=n.currentFile)||void 0===t?void 0:t.name,showTextEditor:!0,setShowTextEditor:e=>i({type:e?"SHOW_TEXT_EDITOR":"SHOW_PDF_VIEWER"})}))}}}]);
//# sourceMappingURL=6.3f1a985a.chunk.js.map