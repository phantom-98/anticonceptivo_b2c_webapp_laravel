"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[280],{47234:(e,o,a)=>{a.d(o,{Z:()=>i});var s=a(67294),n=a(73727),r=a(85893);const i=function(e){var o=e.items;return(0,r.jsx)("div",{className:"pb-3 w-breadcrumb",children:o.map((function(e,a){var i=e.url;return i.includes(":category?")&&(i=e.slug?i.replace(":category?",e.slug):i.replace(":category?","pastillas")),(0,r.jsxs)(s.Fragment,{children:[(0,r.jsx)(n.rU,{className:"font-poppins font-12 regular color-6C6B6B",to:i,children:e.name}),(0,r.jsx)("span",{className:"font-poppins font-12 regular color-6C6B6B mx-1",children:a+1<o.length?">":""})]},a)}))})}},76270:(e,o,a)=>{a.d(o,{Z:()=>i});a(67294);var s=a(73935),n=a(85893),r=function(e){var o=e.title,a=e.className,s=void 0===a?"mb-3":a;return(0,n.jsx)("div",{className:"col-md-12 ".concat(s),children:(0,n.jsx)("h3",{className:"font-poppins font-20 bold color-033F5D",children:o})})};const i=r;document.getElementById("H3Panel")&&s.render((0,n.jsx)(r,{}),document.getElementById("H3Panel"))},15023:(e,o,a)=>{a.d(o,{Z:()=>l});var s=a(67294),n=a(57603),r=a(25934),i=a(85893);const c=function(e){var o=e.children,a=e.path,s=e.setPath,n=e.list,c=e.parent;return(0,i.jsxs)("div",{className:"form-group",children:[(0,i.jsx)("label",{htmlFor:c.group_title,children:c.group_title}),(0,i.jsxs)("select",{className:"form-control form-control-custom pl-2",name:"select_id_".concat(c.id),id:c.group_title,onChange:function(e){var o=n.find((function(o){return o.id==e.target.value})),r=[],i=-1,c=!0;a.every((function(e,s){return i=e.children.findIndex((function(e){return e.id==o.id})),o.question=a.find((function(e){return e.id==o.parent_id})).group_title,o.answer=o.name,r.push(e),s+1!=a.length&&-1!=i?(r.push(o),c=!1):c})),c&&r.push(o),s(r)},children:[(0,i.jsx)("option",{value:"",disabled:!0,selected:!0,children:"Seleccione"}),o.map((function(e,o){var s=(0,r.Z)();return(0,i.jsx)("option",{selected:a.find((function(o){return o.id==e.id})),value:e.id,children:e.name},s)}))]})]})};var t=a(41680);const l=function(e){var o=e.loading,a=e.model,l=e.handleParent,d=e.nestedFields,p=e.path,u=e.setPath,m=e.list,f=e.handleInputs;return(0,i.jsxs)(s.Fragment,{children:[o?null:(0,i.jsx)("div",{className:"col-md-12",children:(0,i.jsxs)("div",{className:"form-group",children:[(0,i.jsx)("label",{htmlFor:"contact_subject_parent",children:"Asunto"}),(0,i.jsxs)("select",{className:"form-control form-control-custom pl-2",name:"contact_subject_parent",id:"contact_subject_parent",onChange:l,value:a.contact_subject_parent,onFocus:n.R3,children:[(0,i.jsx)("option",{value:"",disabled:!0,selected:!0,children:"Seleccione"}),d.map((function(e){var o=(0,r.Z)();return(0,i.jsx)("option",{selected:p.find((function(o){return o.id==e.id})),value:e.id,children:e.name},o)}))]}),(0,i.jsx)("div",{className:"invalid-feedback"})]})}),o?(0,i.jsx)(t.Z,{}):p.length?(0,i.jsx)("div",{className:"col-md-12",children:p.map((function(e,o){var a=(0,r.Z)();return(0,i.jsxs)(s.Fragment,{children:[e.nested_field_questions.map((function(o,a){var s=(0,r.Z)();return(0,i.jsxs)("div",{className:"form-group",children:[(0,i.jsx)("label",{htmlFor:"",children:o.name}),(0,i.jsx)("input",{type:"text",className:"form-control form-control-custom",id:"",name:"",placeholder:"",value:o.answer,onChange:function(a){return f(a,e.id,o.id)}})]},s)})),e.children.length?(0,i.jsx)(c,{children:e.children,path:p,setPath:u,list:m,parent:e}):null]},a)}))}):null]})}},70280:(e,o,a)=>{a.r(o),a.d(o,{default:()=>w});var s=a(67294),n=a(17889),r=a(30032),i=a(99499),c=a(34465),t=a(51728),l=a(8901),d=a.n(l),p=a(42574),u=a(35777),m=a(326),f=a(57603),h=a(15023),v=a(85893);function j(e,o){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);o&&(s=s.filter((function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable}))),a.push.apply(a,s)}return a}function x(e){for(var o=1;o<arguments.length;o++){var a=null!=arguments[o]?arguments[o]:{};o%2?j(Object(a),!0).forEach((function(o){b(e,o,a[o])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):j(Object(a)).forEach((function(o){Object.defineProperty(e,o,Object.getOwnPropertyDescriptor(a,o))}))}return e}function b(e,o,a){return o in e?Object.defineProperty(e,o,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[o]=a,e}function N(e,o){return function(e){if(Array.isArray(e))return e}(e)||function(e,o){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var s,n,r=[],i=!0,c=!1;try{for(a=a.call(e);!(i=(s=a.next()).done)&&(r.push(s.value),!o||r.length!==o);i=!0);}catch(e){c=!0,n=e}finally{try{i||null==a.return||a.return()}finally{if(c)throw n}}return r}(e,o)||function(e,o){if(!e)return;if("string"==typeof e)return g(e,o);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return g(e,o)}(e,o)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function g(e,o){(null==o||o>e.length)&&(o=e.length);for(var a=0,s=new Array(o);a<o;a++)s[a]=e[a];return s}const y=function(){var e={contact_first_name:"",contact_last_name:"",contact_order_id:"",contact_email:"",contact_phone_code:"+56",contact_phone:"",contact_message:"",contact_subject_parent:"",contact_accept_terms:"0"},o=N((0,s.useState)(!0),2),a=o[0],n=o[1],r=N((0,s.useState)(e),2),l=r[0],j=r[1],g=N((0,s.useState)([]),2),y=g[0],w=g[1],C=N((0,s.useState)([]),2),_=C[0],E=C[1],A=N((0,s.useState)([]),2),S=A[0],O=A[1],I=N((0,s.useState)({}),2),q=I[0],P=I[1],T=N((0,s.useState)(!1),2),D=T[0],R=T[1],L=N((0,s.useState)(!1),2),k=L[0],F=L[1],Z=function(){return R(!1)},z=function(){return F(!1)};(0,s.useEffect)((function(){U()}),[]);var U=function(){t.AU(t.f4.PUBLIC_AREA.CONTACT.GET_RESOURCES,{}).then((function(e){t.HM({response:e,success:function(){w(e.data.nested_fields),E(e.data.list),P(e.data.privacy_policy),n(!1)}})})).catch((function(e){t.qN(e)}))},M=function(e){var o=arguments.length>1&&void 0!==arguments[1]&&arguments[1];j(x(x({},l),{},o?b({},"contact_accept_terms","0"==e.target.value?"1":"0"):b({},e.target.name,e.target.value)))};return(0,v.jsxs)("div",{className:"row",children:[(0,v.jsx)("div",{className:"col-md-6",children:(0,v.jsxs)("div",{className:"form-group",children:[(0,v.jsx)("label",{htmlFor:"contact_first_name",children:"Nombres"}),(0,v.jsx)("input",{type:"text",className:"form-control form-control-custom",id:"contact_first_name",name:"contact_first_name",placeholder:"Nombres",onChange:M,value:l.contact_first_name,onFocus:f.R3}),(0,v.jsx)("div",{className:"invalid-feedback"})]})}),(0,v.jsx)("div",{className:"col-md-6",children:(0,v.jsxs)("div",{className:"form-group",children:[(0,v.jsx)("label",{htmlFor:"contact_last_name",children:"Apellidos"}),(0,v.jsx)("input",{type:"text",className:"form-control form-control-custom",id:"contact_last_name",name:"contact_last_name",placeholder:"Apellidos",onChange:M,value:l.contact_last_name,onFocus:f.R3}),(0,v.jsx)("div",{className:"invalid-feedback"})]})}),(0,v.jsx)("div",{className:"col-md-6",children:(0,v.jsxs)("div",{className:"form-group",children:[(0,v.jsx)("label",{htmlFor:"contact_email",children:"E-Mail"}),(0,v.jsx)("input",{type:"email",className:"form-control form-control-custom",id:"contact_email",name:"contact_email",placeholder:"E-Mail",onChange:M,value:l.contact_email,onFocus:f.R3}),(0,v.jsx)("div",{className:"invalid-feedback"})]})}),(0,v.jsx)("div",{className:"col-md-6",children:(0,v.jsxs)("div",{className:"row",children:[(0,v.jsx)("div",{className:"col-md-3",children:(0,v.jsxs)("div",{className:"form-group",children:[(0,v.jsx)("label",{htmlFor:"contact_phone_code",children:"Código"}),(0,v.jsx)("select",{className:"form-control form-control-custom pl-2",id:"contact_phone_code",name:"contact_phone_code",onChange:M,value:l.contact_phone_code,onFocus:f.R3,children:(0,v.jsx)("option",{value:"+56",children:"+56"})}),(0,v.jsx)("div",{className:"invalid-feedback"})]})}),(0,v.jsx)("div",{className:"col-md-9",children:(0,v.jsxs)("div",{className:"form-group",children:[(0,v.jsx)("label",{htmlFor:"contact_phone",children:"Teléfono"}),(0,v.jsx)("input",{type:"text",className:"form-control form-control-custom",id:"contact_phone",name:"contact_phone",placeholder:"9 8765 4321",maxLength:"15",onChange:M,value:l.contact_phone,onFocus:f.R3}),(0,v.jsx)("div",{className:"invalid-feedback"})]})})]})}),(0,v.jsx)("div",{className:"col-md-6",children:(0,v.jsxs)("div",{className:"form-group",children:[(0,v.jsx)("label",{htmlFor:"contact_order_id",children:"¿Cuál es el número de tu orden? (Si es que aplica)"}),(0,v.jsx)("input",{type:"text",className:"form-control form-control-custom",id:"contact_order_id",name:"contact_order_id",placeholder:"Nº de orden Ej: 293",onChange:M,value:l.contact_order_id,onFocus:f.R3}),(0,v.jsx)("div",{className:"invalid-feedback"})]})}),(0,v.jsx)(h.Z,{loading:a,model:l,handleParent:function(e,o){var a=_.find((function(o){return o.id==e.target.value}));a.question="Asunto",a.answer=a.name,j(x(x({},l),{},b({},e.target.name,e.target.value))),O([a])},handleInputs:function(e,o,a){var s=S,n=S.findIndex((function(e){return e.id==o})),r=S[n],i=r.nested_field_questions,c=i.findIndex((function(e){return e.id==a}));i[c].question=i[c].name,i[c].answer=e.target.value,r.nested_field_questions=i,s[n]=r,O(s)},nestedFields:y,path:S,setPath:O,list:_}),(0,v.jsx)("div",{className:"col-md-12",children:(0,v.jsxs)("div",{className:"form-group",children:[(0,v.jsx)("label",{htmlFor:"contact_message",children:"Mensaje"}),(0,v.jsx)("textarea",{rows:"7",className:"form-control form-control-custom",id:"contact_message",name:"contact_message",placeholder:"Mensaje",onChange:M,value:l.contact_message,onFocus:f.R3}),(0,v.jsx)("div",{className:"invalid-feedback"})]})}),(0,v.jsx)("div",{className:"col-md-12 mt-3",children:(0,v.jsxs)("div",{className:"row",children:[(0,v.jsxs)("div",{className:"col-md-12",children:[(0,v.jsx)(i.Z.Check,{custom:!0,type:"checkbox",id:"contact_accept_terms",value:l.contact_accept_terms,onFocus:f.R3,onChange:function(e){return M(e,!0)},label:(0,v.jsxs)("span",{className:"font-inter font-12 regular color-707070",children:["Aceptar ",(0,v.jsx)("span",{className:"link pointer",onClick:function(){return R(!0)},children:"Términos y condiciones"})," y ",(0,v.jsx)("span",{className:"link pointer",onClick:function(){return F(!0)},children:"Políticas de privacidad"})]})}),(0,v.jsx)("div",{className:"invalid-feedback"})]}),(0,v.jsx)("div",{className:"col-md-12 mt-4 text-center",children:(0,v.jsx)("button",{type:"button",className:"btn btn-bicolor px-5",onClick:function(){return function(){var o=t.f4.PUBLIC_AREA.CONTACT.SEND,a=[];S.map((function(e){a.push({question:e.question,answer:e.answer}),e.nested_field_questions&&e.nested_field_questions.map((function(e){"question"in e&&"answer"in e&&a.push({question:e.question,answer:e.answer})}))}));var s=x(x({},l),{},{dynamic_fields:a});t.AU(o,s).then((function(o){t.HM({response:o,success:function(){d().success(o.message),j(e),O([])},error:function(){d().error(o.message)},warning:function(){d().warning(o.message)}})})).catch((function(e){t.qN(e)}))}()},children:(0,v.jsx)("span",{className:"px-5",children:"ENVIAR"})})})]})}),(0,v.jsxs)(c.Z,{show:D,centered:!0,backdrop:"static",keyboard:!1,onHide:Z,dialogClassName:"modal-new-claim",children:[(0,v.jsx)(c.Z.Header,{children:(0,v.jsx)(m.Z,{hideModal:Z})}),(0,v.jsx)(c.Z.Body,{className:"px-5",children:(0,v.jsx)("div",{className:"row",children:(0,v.jsx)("div",{className:"col-12",children:(0,v.jsx)(p.Z,{})})})})]}),(0,v.jsxs)(c.Z,{show:k,centered:!0,backdrop:"static",keyboard:!1,onHide:z,dialogClassName:"modal-new-claim",children:[(0,v.jsx)(c.Z.Header,{children:(0,v.jsx)(m.Z,{hideModal:z})}),(0,v.jsx)(c.Z.Body,{className:"px-5",children:(0,v.jsx)("div",{className:"row",children:(0,v.jsx)("div",{className:"col-12",children:(0,v.jsx)(u.Z,{privacyPolicy:q})})})})]})]})};const w=function(){var e=[{url:r.Z.HOME.path,name:"Inicio"},{url:r.Z.CONTACT_US.path,name:r.Z.CONTACT_US.title}];return(0,v.jsx)(n.Z,{breadcrumbs:e,title:r.Z.CONTACT_US.title,children:(0,v.jsx)("div",{className:"row",children:(0,v.jsx)("div",{className:"col",children:(0,v.jsx)(y,{})})})})}},35777:(e,o,a)=>{a.d(o,{Z:()=>r});a(67294);var s=a(76270),n=a(85893);const r=function(e){var o=e.privacyPolicy;return(0,n.jsxs)("div",{className:"row",children:[(0,n.jsx)(s.Z,{title:"POLÍTICAS DE PRIVACIDAD"}),(0,n.jsx)("div",{className:"col-md-12",children:(0,n.jsx)("div",{dangerouslySetInnerHTML:{__html:o.description}})})]})}},42574:(e,o,a)=>{a.d(o,{Z:()=>r});a(67294);var s=a(76270),n=a(85893);const r=function(){return(0,n.jsxs)("div",{className:"row",children:[(0,n.jsx)(s.Z,{title:"TÉRMINOS Y CONDICIONES"}),(0,n.jsxs)("div",{className:"col-md-12 mb-3",children:[(0,n.jsx)("h4",{className:"font-poppins font-14 bold color-484848",children:"1. ASPECTOS GENERALES SOBRE TÉRMINOS Y CONDICIONES"}),(0,n.jsx)("p",{className:"font-poppins font-14 regular color-484848",children:"Los presentes Términos y Condiciones se entenderán aplicables a todas las compras que sean realizadas por medio del sitio web www.anticonceptivo.cl. El acceso al sitio web, su uso y todas las transacciones realizadas por medio de él, implican la aceptación estos Términos y Condiciones."}),(0,n.jsx)("p",{className:"font-poppins font-14 regular color-484848",children:"El uso y la realización de transacciones a través del sitio web atribuye la condición de usuario del tal y e implica la aceptación de todas y cada una de las disposiciones de estos Términos y Condiciones. Sin embargo, algunos servicios ofrecidos a los usuarios pueden sujetarse a condiciones particulares, las que se informarán debidamente a través de las correspondientes Condiciones Particulares."})]}),(0,n.jsxs)("div",{className:"col-md-12 mb-3",children:[(0,n.jsx)("h4",{className:"font-poppins font-14 bold color-484848",children:"2. CONDICIONES DE ACCESO Y UTILIZACIÓN DEL SITIO WWW.ANTICONCEPTIVO.CL"}),(0,n.jsx)("h4",{className:"font-poppins font-14 bold color-484848",children:"2.1 Carácter gratuito del acceso y utilización del sitio web"}),(0,n.jsx)("p",{className:"font-poppins font-14 regular color-484848",children:"El acceso y uso del sitio web www.anticonceptivo.cl, tiene carácter gratuito para los usuarios. No obstante lo anterior, algunos de los servicios suministrados por el sitio o por terceros a través de él, pueden estar sujetos al pago de un precio o tarifa en la forma que se determine y publicite en las correspondientes Condiciones Particulares."}),(0,n.jsx)("h4",{className:"font-poppins font-14 bold color-484848",children:"2.2 Usuario del sitio web"}),(0,n.jsx)("p",{className:"font-poppins font-14 regular color-484848",children:"El servicio brindado a través del sitio web www.anticonceptivo.cl, puede ser utilizado por mayores de 18 años, que hayan aceptado los presentes Términos y Condiciones."}),(0,n.jsx)("p",{className:"font-poppins font-14 regular color-484848",children:"El Usuario se obliga a proporcionar información veraz e íntegra para la compra de productos a través del sitio, siendo el usuario el único responsable de la inexactitud y falsedad de la información y datos que proporcione."}),(0,n.jsx)("p",{className:"font-poppins font-14 regular color-484848",children:"Las compras que realicen los usuarios a través del sitio web, pueden realizarse como usuarios registrados o como invitados:"}),(0,n.jsx)("p",{className:"font-poppins font-14 regular color-484848",children:"• Usuario registrado: los usuarios del sitio web podrán crear una cuenta en el sitio web www.anticonceptivo.cl, registrando los datos que sean solicitados y creando un usuario y clave de uso personal para ello. La clave creada es de uso personal e intransferible, y su entrega o utilización por terceras personas, no implicará responsabilidad alguna para K&G SPA y/o ASOCIACIÓN DE FARMACÉUTICOS SPA. Los datos personales que sean proporcionados por el usuario serán protegidos y tratados de conformidad a la Ley Nº19.628 y la normativa asociada aplicable."}),(0,n.jsx)("p",{className:"font-poppins font-14 regular color-484848",children:"Es obligación del usuario el resguardo adecuado de su usuario y clave secreta. En caso de extravío, robo, hurto, mal uso o cuaquier otra eventualidad respecto a tales datos, el usuario deberá contactar a atención al cliente de www.anticonceptivo.cl, tan pronto tome conocimiento de la circunstancia que aplique en su caso."}),(0,n.jsx)("p",{className:"font-poppins font-14 regular color-484848",children:"• Usuario invitado: los usuarios del sitio web podrán realizar transacciones también sin registrarse. Esto, a través de la opción habilitada en el sitio de comprar “como invitado”. Para ello, se solicitarán al usuario invitado ciertos datos personales al momento de la compra, los que serán protegidos y tratados de conformidad a la Ley Nº19.628 y normativa asociada aplicable."})]}),(0,n.jsxs)("div",{className:"col-md-12 mb-3",children:[(0,n.jsx)("h4",{className:"font-poppins font-14 bold color-484848",children:"3. FUNCIONAMIENTO Y DISPONIBILIDAD DEL SITIO WEB WWW.ANTICONCEPTIVO.CL"}),(0,n.jsx)("p",{className:"font-poppins font-14 regular color-484848",children:"K&G SPA no garantiza la disponibilidad y continuidad permanente del funcionamiento del portal web www.anticonceptivo.cl ni los servicios prestados a través de él. En los casos que corresponda, se informará de posibles interrupciones en dicha continuidad de funcionamiento y prestación de servicios."}),(0,n.jsx)("p",{className:"font-poppins font-14 regular color-484848",children:"K&G SPA. establece asimismo, que podrá limitar los horarios de funcionamiento del portal o de los servicios asociados a él, como también respecto de las transacciones realizadas por su intermedio, o restringir o limitar compras de productos que se asocien a distintas promociones publicitadas en el sitio web, lo que será informado en las correspondientes Condiciones Particulares."})]}),(0,n.jsxs)("div",{className:"col-md-12 mb-3",children:[(0,n.jsx)("h4",{className:"font-poppins font-14 bold color-484848",children:"4. MEDIOS DE PAGO"}),(0,n.jsx)("p",{className:"font-poppins font-14 regular color-484848",children:"Los productos adquiridos a través del sitio web, deberán ser pagados a través de la plataforma habilitada de Transbank Webpay, utilizando para ello los siguientes medios de pago:"}),(0,n.jsx)("p",{className:"font-poppins font-14 regular color-484848",children:"• Tarjetas de Débito y de Crédito VISA, MasterCard, Magna, American Express y Diners emitidas en Chile o en el extranjero."}),(0,n.jsx)("p",{className:"font-poppins font-14 regular color-484848",children:"Toda transacción efectuada en el sitio web y la aceptación de compra que derive de una transacción estará sujeta a la aprobación previa o validación de la transacción, lo que será requisito para la formación del consentimiento necesarios para la compraventa y a las condiciones informadas para una promoción en específico."}),(0,n.jsx)("p",{className:"font-poppins font-14 regular color-484848",children:"Para validar la transacción, se deberá verificar que se dispone de los productos en stock, el medio de pago ofrecido por el usuario y que los datos proporcionados por el usuario en el sitio web coinciden con los de la orden de compra respectiva."}),(0,n.jsx)("p",{className:"font-poppins font-14 regular color-484848",children:"Una vez validada la transacción, se enviará al usuario la confirmación de la compra y la boleta electrónica correspondiente a la dirección de correo electrónico proporcionada en el sitio web. Desde el envío al correo electrónico proporcionado por el usuario se entiende perfeccionado el consentimiento."})]}),(0,n.jsxs)("div",{className:"col-md-12 mb-3",children:[(0,n.jsx)("h4",{className:"font-poppins font-14 bold color-484848",children:"5. DESPACHO Y ENTREGA DE PRODUCTOS COMPRADOS A TRAVÉS DE WWW.ANTICONCEPTIVO.CL"}),(0,n.jsx)("p",{className:"font-poppins font-14 regular color-484848",children:"Las compras realizadas a través del sitio web www.anticonceptivo.cl, serán entregados al usuario, según su elección al momento de la compra en el sitio, a través de la modalidad de despacho de domicilio o retiro en farmacia."}),(0,n.jsx)("p",{className:"font-poppins font-14 regular color-484848",children:"Para el caso de elegir la opción de despacho a domicilio, es responsabilidad del usuario el ingreso y declaración de la dirección correcta y completa para que los productos puedan ser entregados sin inconvenientes dentro de los plazos pactados."}),(0,n.jsx)("p",{className:"font-poppins font-14 regular color-484848",children:"La cobertura de despacho realizada es la siguiente: agregar."}),(0,n.jsx)("p",{className:"font-poppins font-14 regular color-484848",children:"El transporte de los productos farmacéuticos se realizará dando cumplimiento a la normativa sanitaria vigente, con el fin de mantener la calidad y seguridad de ellos."}),(0,n.jsx)("p",{className:"font-poppins font-14 regular color-484848",children:"Para el caso de elegir la opción de retiro en farmacia, una vez que el pedido se encuentre listo para ser retirado, el usuario recibirá un correo electrónico denominado “tu compra está lista”. Para realizar el retiro del o los productos, el cliente debe presentarse en el establecimiento farmacéutico indicado en el portal web con su respectivo “Número de retiro”. Si el pedido incluye la compra de productos farmacéuticos, de acuerdo con la condición de venta de cada cual según la normativa sanitaria, se solicitará la presentación de la receta médica original con el fin de verificar e inutilizarla. Si no se presenta la receta médica en caso de ser requerida por la normativa sanitaria, se procederá a anular la compra."})]}),(0,n.jsxs)("div",{className:"col-md-12 mb-3",children:[(0,n.jsx)("h4",{className:"font-poppins font-14 bold color-484848",children:"6. CAMBIOS Y DEVOLUCIONES"}),(0,n.jsx)("p",{className:"font-poppins font-14 regular color-484848",children:"Para realizar cambios o devoluciones de productos adquiridos a través del sitio web www.anticonceptivo.cl, los productos deben encontrarse en su caja o empaque original, en el mismo estado en que fueron enviados o retirados por el usuario, conservando la integridad del empaque o caja y sus sellos originales intactos."}),(0,n.jsx)("p",{className:"font-poppins font-14 regular color-484848",children:"Puede ejercerse el derecho de cambio o devolución del producto dentro de los 30 días siguientes a la compra del mismo, o dentro del plazo informado dentro de cada promoción, en el caso de que le sea aplicable."}),(0,n.jsx)("p",{className:"font-poppins font-14 regular color-484848",children:"Para ejercer el cambio o devolución, el producto pasará por un control de calidad,y de no ser aceptado, no podrá realizarse el cambio o devolución."}),(0,n.jsx)("p",{className:"font-poppins font-14 regular color-484848",children:"Para gestionar el cambio o devolución el usuario deberá comunicarse con nuestro Centro de Atención al Cliente al correo electrónico: xxxxxxx."})]}),(0,n.jsxs)("div",{className:"col-md-12 mb-3",children:[(0,n.jsx)("h4",{className:"font-poppins font-14 bold color-484848",children:"7. PROTECCIÓN DE DATOS PERSONALES"}),(0,n.jsx)("p",{className:"font-poppins font-14 regular color-484848",children:"Los datos personales que sean proporcionados por el usuario a través del sitio web www.anticonceptivo.cl, serán utilizados para procesar la compra, coordinar y efectuar el despacho de los productos adquiridos. En ese contexto, es que los datos personales proporcionados por el usuario podrán ser puestos a disposición de terceros con la finalidad de llevar a cabo el proceso de despacho de los productos, cuando así corresponda."}),(0,n.jsx)("p",{className:"font-poppins font-14 regular color-484848",children:"No obstante lo anterior, se adoptarán todas las medidas que correspondan para la protección y no divulgación de datos de dicho carácter, así como para impedir el uso no autorizado de tales. Los datos proporcionados podrán ser utilizados por K&G SPA. a través del sitio web www.anticonceptivo.cl de forma interna para el envío de publicidad y campañas, con fines estadísticos y para la obtención de perfiles de usuario que permitan mejorar los productos ofrecidos a la venta a través del sitio web. De igual forma, el usuario acepta que K&G SPA., pueda contactarlo con el objetivo de ejecutar servicios de post venta y realización de encuestas sobre experiencias de compras."}),(0,n.jsx)("p",{className:"font-poppins font-14 regular color-484848",children:"En el sitio web www.anticonceptivo.cl, se utilizan cookies para mejorar la experiencia del usuario. El usuario podrá deshabilitar el almacenamiento de cookies del sitio web por medio de su respectivo navegador de internet."})]}),(0,n.jsxs)("div",{className:"col-md-12 mb-3",children:[(0,n.jsx)("h4",{className:"font-poppins font-14 bold color-484848",children:"8. COMUNICACIONES"}),(0,n.jsx)("h4",{className:"font-poppins font-14 bold color-484848",children:"8.1. Comunicaciones promocionales de www.anticonceptivo.cl"}),(0,n.jsx)("p",{className:"font-poppins font-14 regular color-484848",children:"Toda comunicación promocional o de carácter publicitario que sea enviada a sus usuarios por el portal web www.anticonceptivo.cl, mediante correo electrónico identificará de forma clara como remitente al sitio web www.anticonceptivo.cl, y en el asunto indicará a que se refiere la comunicación enviada."}),(0,n.jsx)("p",{className:"font-poppins font-14 regular color-484848",children:"Los usuarios podrán solicitar la suspensión de los envíos de estas comunicaciones mediante un link que será incluido en cada correo electrónico."}),(0,n.jsx)("h4",{className:"font-poppins font-14 bold color-484848",children:"8.2. Comunicaciones recíprocas"}),(0,n.jsx)("p",{className:"font-poppins font-14 regular color-484848",children:"Las comunicaciones y notificaciones por parte de www.anticonceptivo.cl a los usuarios del sitio web, podrán realizarse a través de los siguientes medios: correo electrónico que hubiere proporcionado el usuario en el sitio web, llamados, SMS o whatsapp al número telefónico proporcionado por el usuario en el sitio web y redes sociales."}),(0,n.jsx)("p",{className:"font-poppins font-14 regular color-484848",children:"Las comunicaciones por parte de los usuarios al sitio web www.anticonceptivo.cl, podrán realizarse a través de los siguientes medios: agregar."})]}),(0,n.jsxs)("div",{className:"col-md-12 mb-3",children:[(0,n.jsx)("h4",{className:"font-poppins font-14 bold color-484848",children:"9. DISPENSACIÓN DE PRODUCTOS FARMACÉUTICOS"}),(0,n.jsx)("p",{className:"font-poppins font-14 regular color-484848",children:"El expendio de los productos farmacéuticos se hará de acuerdo a las condiciones de venta aprobadas en los respectivos registros sanitarios y rotuladas en su envase, las cuales pueden ser:"}),(0,n.jsxs)("p",{className:"font-poppins font-14 regular color-484848",children:["• Venta Directa, es decir, sin receta = VD ",(0,n.jsx)("br",{}),"• Venta bajo receta simple = R"]}),(0,n.jsx)("p",{className:"font-poppins font-14 regular color-484848",children:"En los casos en que sea procedente, el expendio se hará conforme a la respectiva receta y solo para consumidores finales. (Norma: DS. 466/1984, MINSAL)."}),(0,n.jsx)("p",{className:"font-poppins font-14 regular color-484848",children:"Se entenderá por Medicamentos de Venta Directa, aquellos que no necesitan de receta médica para su expendio."}),(0,n.jsx)("p",{className:"font-poppins font-14 regular color-484848",children:"El sitio web www.anticonceptivo.cl, solo venderá a sus usuarios aquellos productos farmacéuticos que requieran receta médica, previo envío de la receta médica a través de la Plataforma al momento de realizar la compra. Para ello, el Usuario deberá cargar una imagen de la receta médica a través del sitio web, receta que será validada por parte de un profesional químico farmacéutico que se encuentre habilitado."})]}),(0,n.jsxs)("div",{className:"col-md-12 mb-3",children:[(0,n.jsx)("h4",{className:"font-poppins font-14 bold color-484848",children:"10. MODIFICACIONES"}),(0,n.jsx)("p",{className:"font-poppins font-14 regular color-484848",children:"El sitio web www.anticonceptivo.cl podrá modificar los presentes Términos y Condiciones en cualquier momento. Dichas modificaciones o adiciones entrarán en vigencia de forma inmediata y se entenderán incorporadas en los presentes Términos y Condiciones en lo que no fueren contrarias."})]}),(0,n.jsxs)("div",{className:"col-md-12 mb-3",children:[(0,n.jsx)("h4",{className:"font-poppins font-14 bold color-484848",children:"11. NORMATIVA Y JURISDICCIÓN APLICABLE"}),(0,n.jsx)("p",{className:"font-poppins font-14 regular color-484848",children:"Los presentes Términos y Condiciones se rigen en todos y cada uno de sus alcances por la ley chilena, en especial por lo dispuesto en la Ley Nº19.496 de protección de los derechos a los consumidores y la reglamentación sanitaria vigente."}),(0,n.jsx)("p",{className:"font-poppins font-14 regular color-484848",children:"Asimismo, las partes de estos Términos y Condiciones (K&G SPA.) y el usuario, fijan como domicilio la ciudad de Santiago de Chile y se someten a la jurisdicción de sus Tribunales Ordinarios de Justicia."})]})]})}},17889:(e,o,a)=>{a.d(o,{Z:()=>p});var s=a(67294),n=a(47234),r=a(76775),i=a(73727),c=a(51871),t=a(38309),l=a(58522),d=a(85893);const p=function(e){var o=(0,s.useContext)(t.I).breakpoint,a=(0,s.useContext)(c.V).logout,p=(0,r.TH)();return(0,d.jsx)("div",{style:{background:"#FAFAFA"},children:(0,d.jsxs)("div",{className:"container py-4",children:[(0,d.jsx)(n.Z,{items:e.breadcrumbs}),(0,d.jsx)("div",{className:"panel mb-4",children:(0,d.jsx)("div",{className:"responsive-base-panel",style:e.style,children:(0,d.jsxs)("div",{className:"row",children:[o===l.j$.MEDIUM||o===l.j$.LARGE||o===l.j$.EXTRA_LARGE||o===l.j$.EXTRA_EXTRA_LARGE?(0,d.jsx)("div",{className:"col-md-12",children:e.title?(0,d.jsx)("h1",{className:"base-panel-one-title",children:e.title}):null}):(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("div",{className:"col",children:e.title?(0,d.jsx)("h1",{className:"base-panel-one-title",style:{marginBottom:0},children:e.title}):null}),p.pathname.includes("/mi-cuenta/")?(0,d.jsx)("div",{className:"col-auto d-flex  px-0",children:(0,d.jsx)(i.rU,{to:"#",onClick:function(){return a()},className:"my-auto font-poppins font-14 lh-12 bold pointer text-danger",children:(0,d.jsx)("div",{className:"text-right",children:"Cerrar"})})}):null]}),(0,d.jsx)("div",{className:"col-md-12",children:e.children})]})})})]})})}},25934:(e,o,a)=>{var s;a.d(o,{Z:()=>p});var n=new Uint8Array(16);function r(){if(!s&&!(s="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return s(n)}const i=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;const c=function(e){return"string"==typeof e&&i.test(e)};for(var t=[],l=0;l<256;++l)t.push((l+256).toString(16).substr(1));const d=function(e){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,a=(t[e[o+0]]+t[e[o+1]]+t[e[o+2]]+t[e[o+3]]+"-"+t[e[o+4]]+t[e[o+5]]+"-"+t[e[o+6]]+t[e[o+7]]+"-"+t[e[o+8]]+t[e[o+9]]+"-"+t[e[o+10]]+t[e[o+11]]+t[e[o+12]]+t[e[o+13]]+t[e[o+14]]+t[e[o+15]]).toLowerCase();if(!c(a))throw TypeError("Stringified UUID is invalid");return a};const p=function(e,o,a){var s=(e=e||{}).random||(e.rng||r)();if(s[6]=15&s[6]|64,s[8]=63&s[8]|128,o){a=a||0;for(var n=0;n<16;++n)o[a+n]=s[n];return o}return d(s)}}}]);