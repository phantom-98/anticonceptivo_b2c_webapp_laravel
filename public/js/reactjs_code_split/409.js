"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[409],{31161:(e,n,t)=>{t.d(n,{Z:()=>a});var r=t(67294),s=t(73727),l=t(85893);const a=function(e){var n=e.items;return(0,l.jsx)("div",{className:"pb-3 w-breadcrumb",children:n.map((function(e,t){var a=e.url;return a.includes(":category?")&&(a=e.slug?a.replace(":category?",e.slug):a.replace(":category?","pastillas")),(0,l.jsxs)(r.Fragment,{children:[(0,l.jsx)(s.rU,{className:"font-poppins font-12 regular color-6C6B6B",to:a,children:e.name}),(0,l.jsx)("span",{className:"font-poppins font-12 regular color-6C6B6B mx-1",children:t+1<n.length?">":""})]},t)}))})}},84610:(e,n,t)=>{t.d(n,{Z:()=>a});t(67294);var r=t(73935),s=t(85893),l=function(e){var n=e.title,t=e.className,r=void 0===t?"mb-3":t;return(0,s.jsx)("div",{className:"col-md-12 ".concat(r),children:(0,s.jsx)("h3",{className:"font-poppins font-20 bold color-033F5D",children:n})})};const a=l;document.getElementById("H3Panel")&&r.render((0,s.jsx)(l,{}),document.getElementById("H3Panel"))},16409:(e,n,t)=>{t.r(n),t.d(n,{default:()=>u});var r=t(67294),s=t(42778),l=t(17620),a=t(84610),c=t(85893);function i(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var r,s,l,a,c=[],i=!0,o=!1;try{if(l=(t=t.call(e)).next,0===n){if(Object(t)!==t)return;i=!1}else for(;!(i=(r=l.call(t)).done)&&(c.push(r.value),c.length!==n);i=!0);}catch(e){o=!0,s=e}finally{try{if(!i&&null!=t.return&&(a=t.return(),Object(a)!==a))return}finally{if(o)throw s}}return c}}(e,n)||function(e,n){if(!e)return;if("string"==typeof e)return o(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return o(e,n)}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}const u=function(){var e=i((0,r.useState)([]),2),n=e[0],t=(e[1],i((0,r.useState)({}),2)),o=t[0],u=t[1],d=i((0,r.useState)(!1),2),m=d[0],f=d[1],h=i((0,r.useState)([]),2),p=h[0],j=h[1];(0,r.useEffect)((function(){x()}),[]);var x=function(){var e=l.f4.NO_AUTH.TERMS_AND_CONDITIONS.GET_DATA;l.rz(e,{}).then((function(e){l.HM({response:e,success:function(){j(e.data.sections),u(e.data.sections[0]),f(!0)}})})).catch((function(e){l.qN(e)}))};return(0,c.jsx)(s.Z,{breadcrumbs:n,children:(0,c.jsx)("div",{className:"row",children:m?(0,c.jsxs)(r.Fragment,{children:[(0,c.jsx)("div",{className:"col-md-3",children:Object.keys(p).map((function(e,n){return(0,c.jsx)("div",{className:"col-12 mb-2",children:(0,c.jsx)("div",{onClick:function(){return function(e,n){e[n].link&&"Página Externa"===e[n].type?window.open(e[n].link):u(e[n])}(p,e)},style:{textDecoration:"none"},children:(0,c.jsx)("div",{className:"menu-section ".concat(p[e].name===o.name?"active":""),children:(0,c.jsx)("span",{className:"menu-section-item",children:p[e].name})})})},n)}))}),(0,c.jsxs)("div",{className:"col-md-9",children:[(0,c.jsx)(a.Z,{className:"pl-0",title:"TÉRMINOS Y CONDICIONES"}),(0,c.jsx)("div",{dangerouslySetInnerHTML:{__html:o.description}})]})]}):null})})}},42778:(e,n,t)=>{t.d(n,{Z:()=>d});var r=t(67294),s=t(31161),l=t(16550),a=t(73727),c=t(76576),i=t(7476),o=t(62681),u=t(85893);const d=function(e){var n=(0,r.useContext)(i.I).breakpoint,t=(0,r.useContext)(c.V).logout,d=(0,l.TH)();return(0,u.jsx)("div",{style:{background:"#FAFAFA"},children:(0,u.jsxs)("div",{className:"container py-4",children:[(0,u.jsx)(s.Z,{items:e.breadcrumbs}),(0,u.jsx)("div",{className:"panel mb-4",children:(0,u.jsx)("div",{className:"responsive-base-panel",style:e.style,children:(0,u.jsxs)("div",{className:"row",children:[n===o.j$.MEDIUM||n===o.j$.LARGE||n===o.j$.EXTRA_LARGE||n===o.j$.EXTRA_EXTRA_LARGE?(0,u.jsx)("div",{className:"col-md-12",children:e.title?(0,u.jsx)("h1",{className:"base-panel-one-title",children:e.title}):null}):(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)("div",{className:"col",children:e.title?(0,u.jsx)("h1",{className:"base-panel-one-title",style:{marginBottom:0},children:e.title}):null}),d.pathname.includes("/mi-cuenta/")?(0,u.jsx)("div",{className:"col-auto d-flex  px-0",children:(0,u.jsx)(a.rU,{to:"#",onClick:function(){return t()},className:"my-auto font-poppins font-14 lh-12 bold pointer text-danger",children:(0,u.jsx)("div",{className:"text-right",children:"Cerrar"})})}):null]}),(0,u.jsx)("div",{className:"col-md-12",children:e.children})]})})})]})})}}}]);