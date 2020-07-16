(this.webpackJsonpmemento=this.webpackJsonpmemento||[]).push([[0],{160:function(e,t,a){e.exports=a(347)},162:function(e,t,a){},347:function(e,t,a){"use strict";a.r(t);a(161),a(162),a(163);var n=a(143),r=a.n(n),c=a(0),o=a.n(c),s=a(41),l=a.n(s),i=a(13),m=a(71),u=a(11),d=a(45),p=a(30),h=a.n(p),b=a(353),f=a(12),E=a(76);function g(){const e=Object(u.a)(["\n  width: 100%;\n  font-size: 1rem;\n"]);return g=function(){return e},e}function v(){const e=Object(u.a)(["\n  text-decoration: none;\n"]);return v=function(){return e},e}const y=Object(f.a)(m.b)(v()),j=Object(f.a)(d.a)(g());var w=e=>{let t=e.to,a=e.label,n=Object(E.a)(e,["to","label"]);return o.a.createElement(o.a.Fragment,null,o.a.createElement(y,{to:t},o.a.createElement(j,n,a)))},O=a(147);const x=a.n(O)()({sm:576,md:768,lg:992,xl:1200},e=>"(min-width: ".concat(e,"px)"));function S(){const e=Object(u.a)(["\n  padding: 0 0.5rem;\n  @media "," {\n    margin-left: auto;\n    margin-right: auto;\n    max-width: 550px;\n  }\n\n  @media "," {\n    max-width: 1280px;\n  }\n"]);return S=function(){return e},e}const C=f.a.div(S(),x.md,x.lg);var k=a(19),D=a(1);const P=D.c.model({desc:D.c.maybe(D.c.string),data:D.c.maybe(D.c.string),path:D.c.maybe(D.c.string),type:D.c.maybe(D.c.string)});var M=D.c.model({lembrancaList:D.c.array(D.c.optional(P,{}))}).actions(e=>({addlembranca(t){e.lembrancaList.push(t)},clearAll(){e.lembrancaList.clear()}})),A=a(16),F=a(9),L=a.n(F),Y=a(79),N=a(2),T=(a(281),a(348),a(287),a(148));const z=a.n(T).a.initializeApp({apiKey:"AIzaSyBpZOq7d6dCnbTkadvh1Sy8IgWUGGE7GiE",authDomain:"memento-7e2ff.firebaseapp.com",databaseURL:"https://memento-7e2ff.firebaseio.com",projectId:"memento-7e2ff",storageBucket:"memento-7e2ff.appspot.com",messagingSenderId:"411058854398"}),_=z.database(),q=z.storage().ref();var R=a(17);function B(e){const t=e.match(/image|video?/gi);return Object(R.a)(t,1)[0].includes("video")?"video":"image"}const I=D.c.model({gameTime:D.c.maybe(D.c.string),data:D.c.maybe(D.c.string),dataSelecionada:D.c.maybe(D.c.string),numOfMementos:D.c.maybe(D.c.number),score:D.c.maybe(D.c.number)}),W=D.c.model({desc:D.c.maybe(D.c.string),data:D.c.maybe(D.c.string),path:D.c.maybe(D.c.string),type:D.c.maybe(D.c.string),url:D.c.maybe(D.c.string)}),J=D.c.model({id:D.c.maybe(D.c.string),name:D.c.maybe(D.c.string),birthday:D.c.maybe(D.c.string),cpf:D.c.maybe(D.c.string),weight:D.c.maybe(D.c.string),scores:D.c.array(D.c.optional(I,{})),mementos:D.c.array(D.c.optional(W,{}))}),U=D.c.model({type:D.c.maybeNull(D.c.string),name:D.c.maybe(D.c.string),birthday:D.c.maybe(D.c.string),cpf:D.c.maybe(D.c.string),uid:D.c.maybe(D.c.string),patients:D.c.array(J)});var G=D.c.model({user:D.c.maybeNull(U),token:D.c.maybe(D.c.string),loading:!1}).views(e=>({get isAuthorized(){return!!e.token}})).actions(e=>({fetchUser:Object(D.a)(L.a.mark((function t(){var a,n,r,c,o;return L.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.loading=!0,t.prev=1,t.next=4,_.ref("users/"+e.token).once("value");case 4:return a=t.sent,n=a.val(),e.user=n,t.next=9,_.ref("pacientes/").once("value");case 9:r=t.sent,c=Object.entries(r.val()),"Cuidador"===e.user.type&&(o=c.filter(([e])=>Object.values(n.pacientes).some(t=>t===e)),e.user.patients=o.map(([e,t])=>{const a=t.mementos?Object.values(t.mementos):[];return Object.assign({},Object(Y.a)({},t),{id:e},{mementos:a})})),"Medico"===e.user.type&&(e.user.patients=c.map(([e,t])=>{const a=t.mementos?Object.values(t.mementos):[],n=t.scores?Object.values(t.scores):[];return Object.assign({},Object(Y.a)({},t),{id:e},{mementos:a,scores:n})})),t.next=18;break;case 15:t.prev=15,t.t0=t.catch(1),console.error(t.t0.message);case 18:e.loading=!1;case 19:case"end":return t.stop()}}),t,null,[[1,15]])}))),addMemento:Object(D.a)(L.a.mark((function t(a,n,r,c,o,s){var l,i,m;return L.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,new Promise((e,t)=>{try{q.child("mementos/"+a+"/"+r).put(c,n).then(()=>{e("Uploaded")})}catch(o){t("Error upload!")}});case 3:return q.child("mementos/"+a+"/"+r).updateMetadata(n),l=q.child("mementos/"+a+"/"+r).fullPath,i=q.child(l),t.next=8,i.getDownloadURL();case 8:return m=t.sent,t.next=11,_.ref("pacientes/"+a+"/mementos").push({desc:r,data:o,path:l,type:B(s),url:m});case 11:e.user.patients.find(e=>e.id===a).mementos.push({desc:r,path:l,data:o,type:s,url:m}),t.next=18;break;case 15:t.prev=15,t.t0=t.catch(0),console.error(t.t0.message);case 18:case"end":return t.stop()}}),t,null,[[0,15]])}))),addScore:Object(D.a)(L.a.mark((function t(a,n){return L.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,_.ref("pacientes/"+a+"/scores").push(n);case 3:e.user.patients.find(e=>e.id===a).scores.push(n),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),console.error(t.t0.message);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})))})).actions(e=>({initialize:Object(D.a)(L.a.mark((function t(a){return L.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.token=a,!a){t.next=4;break}return t.next=4,e.fetchUser();case 4:case"end":return t.stop()}}),t)})))})).actions(e=>({login:Object(D.a)(L.a.mark((function t({email:a,password:n}){var r,c;return L.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,z.auth().signInWithEmailAndPassword(a,n);case 3:return r=t.sent,c=r.user.uid,t.next=7,e.initialize(c);case 7:return t.abrupt("return",{response:!0,message:"ok"});case 10:return t.prev=10,t.t0=t.catch(0),console.error(t.t0.message),t.abrupt("return",{response:!1,message:t.t0.message});case 14:case"end":return t.stop()}}),t,null,[[0,10]])}))),logout:()=>{e.token=void 0}})).actions(e=>({addPatient:Object(D.a)(L.a.mark((function t(a){var n,r,c;return L.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,_.ref("pacientes/").push(a);case 3:if(n=t.sent,r=Object.assign({},Object(Y.a)({},a),{id:n.key}),"Cuidador"!==e.user.type){t.next=9;break}return c=n.key,t.next=9,_.ref("users/"+e.token+"/pacientes").child(c).set(n.key);case 9:e.user.patients.push(r),t.next=15;break;case 12:t.prev=12,t.t0=t.catch(0),console.error(t.t0);case 15:case"end":return t.stop()}}),t,null,[[0,12]])})))})).actions(e=>({afterCreate:function(){var t=Object(A.a)(L.a.mark((function t(){var a;return L.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=localStorage.getItem("token"),t.next=3,e.initialize(a||void 0);case 3:Object(N.k)(()=>{e.token?localStorage.setItem("token",e.token):localStorage.removeItem("token")});case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()}));var H=D.c.model({userStore:D.c.optional(G,{}),lembrancaStore:D.c.optional(M,{})}).create();const K=()=>H,V=()=>{const e=K();return Object(k.d)(()=>e.userStore.isAuthorized)};function Z(){const e=Object(u.a)(["\n  margin-top: 1rem;\n"]);return Z=function(){return e},e}function $(){const e=Object(u.a)(["\n  display: inline-block;\n\n  font-weight: bold;\n  white-space: nowrap;\n"]);return $=function(){return e},e}function Q(){const e=Object(u.a)(["\n  display: flex;\n\n  align-items: center;\n"]);return Q=function(){return e},e}function X(){const e=Object(u.a)(["\n  width: 100%;\n  display: flex;\n\n  justify-content: space-between;\n  align-items: center;\n  color: white;\n"]);return X=function(){return e},e}function ee(){const e=Object(u.a)(["\n  padding: 1rem 0;\n"]);return ee=function(){return e},e}function te(){const e=Object(u.a)(["\n  width: 100vw;\n  position: sticky;\n\n  background-color: #007bff;\n"]);return te=function(){return e},e}const ae=f.a.div(te()),ne=Object(f.a)(C)(ee()),re=f.a.div(X()),ce=f.a.div(Q()),oe=f.a.span($()),se=f.a.div(Z());var le=({children:e})=>{const t=(()=>{const e=K();return Object(k.d)(()=>e.userStore.loading)})(),a=V(),n=K(),r=Object(b.a)().width,c=n.userStore.user?n.userStore.user.type:null,s=n.userStore.user?n.userStore.user.name:null;return r<768?o.a.createElement("div",null,"Dimes\xf5es inferiores a suportada! "):t?o.a.createElement(h.a,{type:"Puff",color:"#00BFFF",height:100,width:100}):a?o.a.createElement(o.a.Fragment,null,o.a.createElement(ae,null,o.a.createElement(ne,null,o.a.createElement(re,null,o.a.createElement(oe,null,s),o.a.createElement(ce,null,o.a.createElement(w,{variant:"primary",label:"Meus Pacientes",to:"/".concat(c)}),o.a.createElement(d.a,{variant:"primary",onClick:()=>{n.userStore.logout()}},"Sair"))))),o.a.createElement(se,null,e)):o.a.createElement(o.a.Fragment,null,e)},ie=a(6),me=a(14),ue=a(39),de=a(38);function pe(){const e=Object(u.a)(["\n  font-size: 1.2rem;\n"]);return pe=function(){return e},e}function he(){const e=Object(u.a)(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n\n  color: white;\n"]);return he=function(){return e},e}const be=f.a.div(he()),fe=f.a.span(pe());var Ee=()=>o.a.createElement(be,null,o.a.createElement(de.a,{size:"2x",icon:ue.a}),o.a.createElement(fe,null,"Memento"));function ge(){const e=Object(u.a)(["\n  display: flex;\n  justify-content: space-between;\n"]);return ge=function(){return e},e}function ve(){const e=Object(u.a)(["\n  min-width: 500px;\n  padding: 1rem;\n\n  display: flex;\n  flex-direction: column;\n\n  background-color: #007bff;\n  box-shadow: 0 0 1em gray;\n  color: white;\n  border-radius: 0.5rem;\n"]);return ve=function(){return e},e}function ye(){const e=Object(u.a)(["\n  width: 100%;\n  height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  flex-direction: column;\n"]);return ye=function(){return e},e}const je=f.a.div(ye()),we=Object(f.a)(me.a)(ve()),Oe=Object(f.a)(me.a)(ge());class xe extends c.Component{constructor(e){var t;super(e),t=this,this.handleChange=e=>{this.setState({[e.target.id]:e.target.value})},this.handleSubmit=function(){var e=Object(A.a)(L.a.mark((function e(a){var n,r,c,o,s,l,i,m,u;return L.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.preventDefault(),n=t.state,r=n.email,c=n.password,o=t.props,s=o.store,l=o.history,e.next=5,s.userStore.login({email:r,password:c});case 5:i=e.sent,m=i.response,u=i.message,m&&l.push("".concat(s.userStore.user.type)),m||alert(u);case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),this.routeChange=()=>{this.props.history.push("/cadastro")},this.props=e,this.state={email:"",password:""}}validateForm(){return this.state.email.length>0&&this.state.password.length>0}render(){return this.props.store.userStore.isAuthorized?o.a.createElement(ie.a,{to:"/".concat(this.props.store.userStore.user.type)}):o.a.createElement(C,null,o.a.createElement(je,null,o.a.createElement(we,{onSubmit:this.handleSubmit,id:"login"},o.a.createElement(Ee,null),o.a.createElement(me.a.Group,{controlId:"email"},o.a.createElement(me.a.Label,null,"Email"),o.a.createElement(me.a.Control,{autoFocus:!0,type:"email",value:this.state.email,onChange:this.handleChange})),o.a.createElement(me.a.Group,{controlId:"password"},o.a.createElement(me.a.Label,null,"Senha"),o.a.createElement(me.a.Control,{value:this.state.password,onChange:this.handleChange,type:"password"})),o.a.createElement(Oe,null,o.a.createElement(d.a,{className:"btn btn-primary",disabled:!this.validateForm(),type:"submit",form:"login"},"Login"),o.a.createElement(d.a,{className:"btn btn-primary",onClick:this.routeChange},"Cadastrar")))))}}var Se=Object(ie.i)(Object(i.b)("store")(Object(i.c)(xe))),Ce=a(351),ke=a(352),De=a(159),Pe=a(156),Me=a(49),Ae=a(150),Fe=a(151);class Le extends c.Component{constructor(e){var t;super(e),t=this,this.handleSubmit=function(){var e=Object(A.a)(L.a.mark((function e(a){var n,r,c,o,s;return L.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.preventDefault(),n=t.state,r=n.birthday,c=n.name,o=n.cpf,s=n.weight,e.prev=2,t.setState({loading:!0}),e.next=6,t.props.store.userStore.addPatient({birthday:r,name:c,cpf:o,weight:s});case 6:t.setState({loading:!1}),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(2),alert(e.t0);case 12:case"end":return e.stop()}}),e,null,[[2,9]])})));return function(t){return e.apply(this,arguments)}}(),this.handleControl=e=>{const t=e.target,a=t.value,n=t.id;this.setState({[n]:a})},this.state={birthday:"",name:"",cpf:"",weight:"",loading:!1}}render(){return this.state.loading?o.a.createElement(h.a,{type:"Puff",color:"#00BFFF",height:100,width:100}):o.a.createElement(me.a,{onSubmit:this.handleSubmit},o.a.createElement(Ae.a,null,o.a.createElement(me.a.Label,null,"Nome"),o.a.createElement(Fe.a,{type:"name",id:"name",placeholder:"Jose da Silva",onChange:this.handleControl,onClick:this.handleControl,required:!0})),o.a.createElement(Ae.a,null,o.a.createElement(me.a.Label,null,"Peso"),o.a.createElement(Fe.a,{type:"text",id:"weight",placeholder:"peso",onChange:this.handleControl,onClick:this.handleControl,required:!0})),o.a.createElement(Ae.a,null,o.a.createElement(me.a.Label,null,"CPF"),o.a.createElement(Fe.a,{type:"text",id:"cpf",placeholder:"CPF",onChange:this.handleControl,onClick:this.handleControl,required:!0})),o.a.createElement(Ae.a,null,o.a.createElement(me.a.Label,null,"Data de nascimento"),o.a.createElement(Fe.a,{type:"date",id:"birthday",placeholder:"Data nascimento",onChange:this.handleControl,onClick:this.handleControl,required:!0})),o.a.createElement(d.a,{type:"submit"}," Cadastar "))}}var Ye=Object(ie.i)(Object(i.b)("store")(Object(i.c)(Le))),Ne=a(36),Te=a.n(Ne);class ze extends c.Component{constructor(...e){super(...e),this.routeChange=e=>{const t=e.target.id,a=this.props,n=a.history,r=a.patient;n.push("".concat(t,"/").concat(r.id))}}render(){return o.a.createElement("tr",null,o.a.createElement("td",null,this.props.name),o.a.createElement("td",null,this.props.weight,"Kg"),o.a.createElement("td",null,this.props.cpf),o.a.createElement("td",null,Te()(this.props.birthday,"YYYY-MM-DD").format("DD/MM/YYYY")),o.a.createElement("td",null,o.a.createElement(d.a,{id:"paciente",className:"btn btn-primary",onClick:this.routeChange},"Acessar")),o.a.createElement("td",null,o.a.createElement(d.a,{id:"jogar",className:"btn btn-primary",onClick:this.routeChange},"Jogar")))}}var _e=Object(ie.i)(ze);function qe(){const e=Object(u.a)(["\n  margin-left: 1rem;\n  cursor: pointer;\n"]);return qe=function(){return e},e}function Re(){const e=Object(u.a)(["\n  display: flex;\n  align-items: center;\n  margin-bottom: 1rem;\n  font-size: 1.5rem;\n"]);return Re=function(){return e},e}const Be=f.a.div(Re()),Ie=Object(f.a)(de.a)(qe());class We extends c.Component{constructor(e){super(e),this.handleClose=()=>{this.setState({show:!1})},this.handleShow=()=>{this.setState({show:!0})},this.state={rows:[],show:!1}}render(){const e=Object(D.b)(this.props.store.userStore.user.patients);return"Cuidador"!==this.props.store.userStore.user.type?o.a.createElement("div",null,"Voc\xea n\xe3o pode entrar aqui!"):o.a.createElement(C,null,o.a.createElement(Be,null,o.a.createElement("h1",null,"Meus pacientes"),o.a.createElement(Ie,{onClick:this.handleShow,icon:ue.b})),o.a.createElement(Ce.a,{striped:!0,bordered:!0,hover:!0},o.a.createElement("thead",null,o.a.createElement("tr",null,o.a.createElement("th",{scope:"col"},"Nome"),o.a.createElement("th",{scope:"col"},"Peso"),o.a.createElement("th",{scope:"col"},"CPF"),o.a.createElement("th",{scope:"col"},"Data nascimento"),o.a.createElement("th",{scope:"col"},"Acesso ao paciente"),o.a.createElement("th",{scope:"col"},"Jogar"))),o.a.createElement("tbody",null,e.map((e,t)=>o.a.createElement(_e,Object.assign({key:t,patient:e},e))))),o.a.createElement(ke.a,{show:this.state.show,onHide:this.handleClose,backdrop:"static",keyboard:!1},o.a.createElement(Me.a,{closeButton:!0},o.a.createElement(De.a,null,"Novo Paciente")),o.a.createElement(Pe.a,null,o.a.createElement(Ye,null))))}}var Je=Object(ie.i)(Object(i.b)("store")(Object(i.c)(We)));class Ue extends c.Component{constructor(...e){super(...e),this.routeChange=e=>{const t=e.target.id,a=this.props,n=a.history,r=a.patient;n.push("".concat(t,"/").concat(r.id))}}render(){return o.a.createElement("tr",null,o.a.createElement("td",null,this.props.name),o.a.createElement("td",null,this.props.weight,"Kg"),o.a.createElement("td",null,this.props.cpf),o.a.createElement("td",null,Te()(this.props.birthday,"YYYY-MM-DD").format("DD/MM/YYYY")),o.a.createElement("td",null,o.a.createElement(d.a,{id:"paciente",className:"btn btn-primary",onClick:this.routeChange},"Acessar")),o.a.createElement("td",null,o.a.createElement(d.a,{id:"jogos",className:"btn btn-primary",onClick:this.routeChange},"Acessar")),o.a.createElement("td",null,o.a.createElement(d.a,{id:"jogar",className:"btn btn-primary",onClick:this.routeChange},"Jogar")))}}var Ge=Object(ie.i)(Ue);function He(){const e=Object(u.a)(["\n  margin-left: 1rem;\n  cursor: pointer;\n"]);return He=function(){return e},e}function Ke(){const e=Object(u.a)(["\n  display: flex;\n  align-items: center;\n  margin-bottom: 1rem;\n  font-size: 1.5rem;\n"]);return Ke=function(){return e},e}const Ve=f.a.div(Ke()),Ze=Object(f.a)(de.a)(He());class $e extends c.Component{constructor(e){super(e),this.handleClose=()=>{this.setState({show:!1})},this.handleShow=()=>{this.setState({show:!0})},this.state={show:!1}}render(){const e=Object(D.b)(this.props.store.userStore.user.patients);return"Medico"!==this.props.store.userStore.user.type?o.a.createElement("div",null,"Voc\xea n\xe3o pode entrar aqui!"):o.a.createElement(C,null,o.a.createElement(Ve,null,o.a.createElement("h1",null,"Meus pacientes"),o.a.createElement(Ze,{onClick:this.handleShow,icon:ue.b})),o.a.createElement(Ce.a,{striped:!0,bordered:!0,hover:!0},o.a.createElement("thead",null,o.a.createElement("tr",null,o.a.createElement("th",null,"Nome"),o.a.createElement("th",null,"Peso"),o.a.createElement("th",null,"CPF"),o.a.createElement("th",null,"Data nascimento"),o.a.createElement("th",null,"Acesso as lembra\xe7as"),o.a.createElement("th",null,"Acesso as scores"),o.a.createElement("th",null,"Jogar"))),o.a.createElement("tbody",null,e.map((e,t)=>o.a.createElement(Ge,Object.assign({key:t,patient:e},e))))),o.a.createElement(ke.a,{show:this.state.show,onHide:this.handleClose,backdrop:"static",keyboard:!1},o.a.createElement(Me.a,{closeButton:!0},o.a.createElement(De.a,null,"Novo Paciente")),o.a.createElement(Pe.a,null,o.a.createElement(Ye,null))))}}var Qe=Object(ie.i)(Object(i.b)("store")(Object(i.c)($e))),Xe=a(74);function et(){const e=Object(u.a)(["\n  width: 250px;\n  height: 200px;\n\n  object-fit: contain;\n"]);return et=function(){return e},e}function tt(){const e=Object(u.a)(["\n  width: 250px;\n  height: 200px;\n\n  object-fit: contain;\n"]);return tt=function(){return e},e}const at=f.a.img(tt()),nt=f.a.video(et());var rt=({type:e,data:t,desc:a,url:n})=>{let r;return console.log(e),e.includes("image")&&(r=o.a.createElement(at,{src:n,alt:"lembran\xe7a"})),e.includes("video")&&(r=o.a.createElement(nt,{controls:!0,src:n})),o.a.createElement("tr",null,o.a.createElement("td",null,r),o.a.createElement("td",null,a),o.a.createElement("td",null,Te()(t,"YYYY-MM-DD").format("DD/MM/YYYY")))};function ct(){const e=Object(u.a)(["\n  margin-left: 1rem;\n  cursor: pointer;\n"]);return ct=function(){return e},e}function ot(){const e=Object(u.a)(["\n  display: flex;\n  align-items: center;\n  margin-bottom: 1rem;\n  font-size: 1.5rem;\n"]);return ot=function(){return e},e}const st=f.a.div(ot()),lt=Object(f.a)(de.a)(ct());var it=Object(i.c)(()=>{const e=o.a.useState(!1),t=Object(R.a)(e,2),a=t[0],n=t[1],r=o.a.useState(!1),c=Object(R.a)(r,2),s=c[0],l=c[1],i=o.a.useState(void 0),m=Object(R.a)(i,2),u=m[0],p=m[1],b=Object(Xe.a)(),f=b.handleSubmit,E=b.register,g=K(),v=Object(ie.h)().id;o.a.useEffect(()=>{const e=Object(D.b)(g.userStore.user.patients.find(e=>e.id===v));p(e)},[]);const y=function(){var e=Object(A.a)(L.a.mark((function e(t){var a,r,c,o,s,i;return L.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=t.desc,r=t.data,c=t.file[0],a&&c&&r){e.next=5;break}return alert("Todos os campos devem estar preenchidos!"),e.abrupt("return");case 5:return e.prev=5,l(!0),o=c.type,s={customMetadata:{desc:a,data:r}},e.next=11,g.userStore.addMemento(v,s,a,c,r,o);case 11:i=Object(D.b)(g.userStore.user.patients.find(e=>e.id===v)),p(i),n(!1),l(!1),e.next=20;break;case 17:e.prev=17,e.t0=e.catch(5),alert(e.t0);case 20:case"end":return e.stop()}}),e,null,[[5,17]])})));return function(t){return e.apply(this,arguments)}}();return u?o.a.createElement(C,null,o.a.createElement(st,null,o.a.createElement("h1",null,"Lembran\xe7as de ",u.name),o.a.createElement(lt,{onClick:()=>n(!0),icon:ue.b})),o.a.createElement(Ce.a,{striped:!0,bordered:!0,hover:!0},o.a.createElement("thead",null,o.a.createElement("tr",null,o.a.createElement("th",{scope:"col"},"Lembran\xe7a"),o.a.createElement("th",{scope:"col"},"Descri\xe7\xe3o"),o.a.createElement("th",{scope:"col"},"Data"))),o.a.createElement("tbody",null,u.mementos.map((e,t)=>o.a.createElement(rt,Object.assign({key:t},e))))),o.a.createElement(ke.a,{show:a,onHide:()=>n(!1),backdrop:"static",keyboard:!1},o.a.createElement(ke.a.Header,{closeButton:!s},o.a.createElement(ke.a.Title,null,"Envio de lembra\xe7a")),o.a.createElement(ke.a.Body,null,s?o.a.createElement(h.a,{type:"Puff",color:"#00BFFF",height:100,width:100}):o.a.createElement(me.a,{onSubmit:f(y)},o.a.createElement(Ae.a,null,o.a.createElement(me.a.Label,null,"Descri\xe7\xe3o"),o.a.createElement(Fe.a,{type:"text",name:"desc",placeholder:"Decri\xe7\xe3o da lembra\xe7a",ref:E,required:!0})),o.a.createElement(Ae.a,null,o.a.createElement(me.a.Label,null,"Data da lembran\xe7a"),o.a.createElement(Fe.a,{type:"date",name:"data",placeholder:"Data de ocorrencia",ref:E,required:!0})),o.a.createElement(Ae.a,null,o.a.createElement(me.a.Label,null,"Arquivo da lembran\xe7a (video ou imagem)"),o.a.createElement(Fe.a,{type:"file",name:"file",accept:".mp4,.avi,.png,.jpeg",placeholder:"Selecione a lembran\xe7a",ref:E,required:!0})),o.a.createElement(d.a,{type:"submit",variant:"primary"},"Enviar"))))):o.a.createElement("div",null,"Paciente nao encontrado")});var mt=({data:e,gameTime:t,score:a,numOfMementos:n})=>o.a.createElement("tr",null,o.a.createElement("td",null,a),o.a.createElement("td",null,n),o.a.createElement("td",null,t),o.a.createElement("td",null,e));function ut(){const e=Object(u.a)(["\n  display: flex;\n  align-items: center;\n  margin-bottom: 1rem;\n  font-size: 1.5rem;\n"]);return ut=function(){return e},e}const dt=f.a.div(ut());class pt extends c.Component{constructor(e){super(e),this.state={jogos:[],patient:void 0}}render(){if(!this.state.patient)return null;const e=this.state.patient.name;return o.a.createElement(C,null,o.a.createElement(dt,null,o.a.createElement("h1",null,"Scores de ",e)),o.a.createElement(Ce.a,{striped:!0,bordered:!0,hover:!0},o.a.createElement("thead",null,o.a.createElement("tr",null,o.a.createElement("th",{scope:"col"},"Acertos"),o.a.createElement("th",{scope:"col"},"Numero de lembran\xe7as"),o.a.createElement("th",{scope:"col"},"Tempo de jogo (mm:ss)"),o.a.createElement("th",{scope:"col"},"Data do jogo"))),o.a.createElement("tbody",null,this.state.patient.scores.map((e,t)=>o.a.createElement(mt,Object.assign({key:t},e))))))}componentDidMount(){const e=this.props.match.params.id,t=this.props.store.userStore.user.patients.find(t=>t.id===e);this.setState({patient:t?Object(D.b)(t):void 0})}}var ht=Object(ie.i)(Object(i.b)("store")(Object(i.c)(pt)));function bt(){const e=Object(u.a)(["\n  min-width: 500px;\n  padding: 1rem;\n\n  display: flex;\n  flex-direction: column;\n\n  background-color: #007bff;\n  box-shadow: 0 0 1em gray;\n  color: white;\n  border-radius: 0.5rem;\n"]);return bt=function(){return e},e}function ft(){const e=Object(u.a)(["\n  width: 100%;\n  height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"]);return ft=function(){return e},e}const Et=f.a.div(ft()),gt=Object(f.a)(me.a)(bt());var vt=Object(ie.i)(()=>{const e=Object(Xe.a)(),t=e.handleSubmit,a=e.register,n=Object(ie.g)(),r=o.a.useState(!1),c=Object(R.a)(r,2),s=c[0],l=c[1],i=function(){var e=Object(A.a)(L.a.mark((function e(t){var a,r,c,o,s,i,m;return L.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.email,r=t.password,c=t.birthday,o=t.name,s=t.cpf,i=t.type,l(!0),e.prev=2,e.next=5,z.auth().createUserWithEmailAndPassword(a,r);case 5:return m=e.sent,e.next=8,_.ref("users/"+m.user.uid).set({name:o,email:a,birthday:c,cpf:s,type:i});case 8:l(!1),n.push("/"),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(2),alert(e.t0);case 15:case"end":return e.stop()}}),e,null,[[2,12]])})));return function(t){return e.apply(this,arguments)}}();return s?o.a.createElement(h.a,{type:"Puff",color:"#00BFFF",height:100,width:100}):o.a.createElement(C,null,o.a.createElement(Et,null,o.a.createElement(gt,{onSubmit:t(i)},o.a.createElement(Ee,null),o.a.createElement(Ae.a,null,o.a.createElement(me.a.Label,null,"Email"),o.a.createElement(Fe.a,{type:"email",autoComplete:"email",id:"email",name:"email",placeholder:"name@example.com",ref:a,required:!0})),o.a.createElement(Ae.a,null,o.a.createElement(me.a.Label,null,"Senha"),o.a.createElement(Fe.a,{type:"password",id:"password",name:"password",placeholder:"senha",ref:a,required:!0})),o.a.createElement(Ae.a,null,o.a.createElement(me.a.Label,null,"Nome"),o.a.createElement(Fe.a,{type:"name",id:"name",name:"name",placeholder:"Nome",ref:a,required:!0})),o.a.createElement(Ae.a,null,o.a.createElement(me.a.Label,null,"CPF"),o.a.createElement(Fe.a,{type:"text",id:"cpf",name:"cpf",placeholder:"CPF",ref:a,required:!0})),o.a.createElement(Ae.a,null,o.a.createElement(me.a.Label,null,"Data nascimento "),o.a.createElement(Fe.a,{type:"date",id:"birthday",name:"birthday",placeholder:"Data nascimento",ref:a,required:!0})),o.a.createElement(Ae.a,null,o.a.createElement(me.a.Label,null,"Tipo de usuario"),o.a.createElement(Fe.a,{as:"select",id:"type",name:"type",ref:a,required:!0,defaultValue:"Medico"},o.a.createElement("option",null,"Medico"),o.a.createElement("option",null,"Cuidador"))),o.a.createElement(d.a,{type:"submit"}," Cadastar "))))}),yt=a(75),jt=a(157),wt=a.n(jt),Ot=a(158),xt=a.n(Ot);function St(e){return e.gapCorreto===e.gapSelecionado?1:0}const Ct=e=>{let t=Te.a.duration(e,"milliseconds"),a=Math.floor(t.asMinutes()),n=Math.floor(t.asSeconds()-60*a);return Math.floor(t.asSeconds())>=60?(a<=9?"0"+a:a)+":"+(n<=9?"0"+n:n):"00:"+(n<=9?"0"+n:n)};let kt=window.innerWidth,Dt=window.innerHeight;class Pt extends c.Component{constructor(e){var t;super(e),t=this,this.handleFrameTasks=function(){var e=Object(A.a)(L.a.mark((function e(a){var n,r,c,o,s,l,i,m,u,d,p,h,b,f,E;return L.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=a.data.fnName,r=t.state,c=r.ready,o=r.gameSpecs,s=t.props.store.userStore,l=t.props.match.params.id,"returnJson"===n&&c&&("Rex_FrameMessage.Return",i={type:"Rex_FrameMessage.Return",sender:'""',fnName:"returnJson",value:JSON.stringify(o)},t.ifr.contentWindow.postMessage(i,"*")),"endGame"!==n||!c){e.next=20;break}if(i=a.data,m=Object(R.a)(i.params,1),u=m[0],d=JSON.parse(u),!window.confirm("Jogo finalizado, deseja salvar os dados?")){e.next=18;break}for(p=Object.values(d),h=0,b=0,f=p;b<f.length;b++)i=f[b],h+=St(i);return E={score:h,numOfMementos:p.length,data:Te()().format("DD/MM/YYYY"),gameTime:Ct(Date.now()-t.state.initGame)},e.next=16,s.addScore(l,E);case 16:e.next=19;break;case 18:alert("Jogo n\xe3o salvo nos scores!");case 19:t.setState({done:!0});case 20:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),this.onWindowResize=()=>{kt=window.innerWidth,Dt=window.innerHeight,this.ifr.width=kt,this.ifr.height=Dt},this.state={ready:!1,gameSpecs:void 0,initGame:Date.now(),done:!1}}render(){const e=this.state.ready;return this.state.done?o.a.createElement(ie.a,{to:"/"}):this.state.gameSpecs?e?o.a.createElement("iframe",{ref:e=>this.ifr=e,id:"game",title:"game",src:"./game",width:kt,height:Dt}):e?void 0:o.a.createElement(h.a,{type:"Puff",color:"#00BFFF",height:100,width:100}):o.a.createElement("div",null,"N\xe3o \xe9 possivel criar um jogo, n\xfamero insufiiciente de lembran\xe7as!")}componentDidUpdate(){this.ifr&&(this.ifr.onload=()=>{window.addEventListener("message",this.handleFrameTasks)})}componentWillUnmount(){window.removeEventListener("message",this.handleFrameTasks),window.removeEventListener("resize",this.onWindowResize)}componentDidMount(){const e=this.props.match.params.id,t=this.props.store.userStore.user.patients.find(t=>t.id===e);if(!t||t.mementos.length<3)return void this.setState({gameSpecs:void 0});const a={},n=t.name,r=t.cpf,c=Object(D.b)(t.mementos);let o=xt()(c);if(o.length>5){var s=wt()(o,5);o=Object(R.a)(s,1)[0]}Object.assign(a,{nome:n,cpf:r,size:o.length-1});var l,i=Object(yt.a)(o.entries());try{for(i.s();!(l=i.n()).done;){const e=Object(R.a)(l.value,2),t=e[0],n=e[1],r=n.desc,c=n.data,o=n.type,s=n.url,i='{"'.concat(t,'":{"desc": "').concat(r,'", "data": "').concat(c,'", "type": "').concat(o,'", "url": "').concat(s,'"}}'),m=JSON.parse(i);Object.assign(a,m)}}catch(m){i.e(m)}finally{i.f()}window.addEventListener("resize",this.onWindowResize,!1),this.setState({ready:!0,gameSpecs:a})}}var Mt=Object(ie.i)(Object(i.b)("store")(Object(i.c)(Pt)));var At=e=>{let t=e.component,a=Object(E.a)(e,["component"]);const n=V();return o.a.createElement(ie.b,Object.assign({},a,{render:e=>n?o.a.createElement(t,e):o.a.createElement(ie.a,{to:{pathname:"/"}})}))};var Ft=()=>o.a.createElement(ie.d,null,o.a.createElement(ie.b,{exact:!0,path:"/",component:Se}),o.a.createElement(ie.b,{exact:!0,path:"/cadastro",component:vt}),o.a.createElement(At,{exact:!0,path:"/cuidador",component:Je}),o.a.createElement(At,{exact:!0,path:"/cadastropaciente",component:Ye}),o.a.createElement(At,{exact:!0,path:"/paciente/:id",component:it}),o.a.createElement(At,{exact:!0,path:"/jogar/:id",component:Mt}),o.a.createElement(At,{exact:!0,path:"/jogos/:id",component:ht}),o.a.createElement(At,{exact:!0,path:"/medico",component:Qe}));const Lt=Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,REACT_APP_apiKey:"AIzaSyBpZOq7d6dCnbTkadvh1Sy8IgWUGGE7GiE",REACT_APP_authDomain:"memento-7e2ff.firebaseapp.com",REACT_APP_databaseURL:"https://memento-7e2ff.firebaseio.com",REACT_APP_messagingSenderId:"411058854398",REACT_APP_projectId:"memento-7e2ff",REACT_APP_storageBucket:"memento-7e2ff.appspot.com"}).BASE_PATH||"/";var Yt=()=>o.a.createElement(m.a,{basename:Lt},o.a.createElement(i.a,{store:H},o.a.createElement(le,null,o.a.createElement(Ft,null))));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.config(),l.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(Yt,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(e=>{e.unregister()})}},[[160,1,2]]]);
//# sourceMappingURL=main.b17524b5.chunk.js.map