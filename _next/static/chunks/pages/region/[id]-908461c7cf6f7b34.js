(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[480],{13070:function(n,e,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/region/[id]",function(){return t(50183)}])},12664:function(n,e,t){"use strict";t.d(e,{j:function(){return a}});var r=t(85893),s=t(41183);function a(n){var e=n.year;return(0,r.jsx)(s.E,{path:"contests/".concat(e,".jpg"),alt:"Contest ".concat(e)})}},91413:function(n,e,t){"use strict";t.d(e,{q:function(){return x}});var r=t(85893),s=t(67294),a=t(94184),i=t.n(a),o=t(76792);const l=s.forwardRef((({bsPrefix:n,bg:e,pill:t,text:s,className:a,as:l="span",...c},d)=>{const u=(0,o.vE)(n,"badge");return(0,r.jsx)(l,{ref:d,...c,className:i()(a,u,t&&"rounded-pill",s&&`text-${s}`,e&&`bg-${e}`)})}));l.displayName="Badge",l.defaultProps={bg:"primary",pill:!1};var c=l,d=t(28662),u=t.n(d);function x(n){var e,t=n.international,s=(e=(e=t.color).replace("#",""),(299*parseInt(e.substring(0,2),16)+587*parseInt(e.substring(2,4),16)+114*parseInt(e.substring(4,6),16))/1e3>150?"black":"white");return(0,r.jsx)(c,{pill:!0,bg:"",className:u().international,style:{"--background":t.color,"--color":s},children:t.link?(0,r.jsx)("a",{href:t.link,target:"_blank",rel:"noreferrer",children:(0,r.jsx)("abbr",{title:t.name,children:t.code})}):(0,r.jsx)("abbr",{title:t.name,children:t.code})})}},38173:function(n,e,t){"use strict";t.d(e,{h:function(){return a}});var r=t(85893),s={gold:"#ffdb19",silver:"#c0c0c0",bronze:"#cd7f32"};function a(n){var e=n.color,t=n.className,a=n.size;if(!e)return(0,r.jsx)("span",{});var i=s[e];return e?(0,r.jsx)("svg",{className:t,fill:i,width:null!==a&&void 0!==a?a:"35px",height:null!==a&&void 0!==a?a:"35px",viewBox:"0 0 1024 1024",children:(0,r.jsx)("path",{d:"M547 304.2h-451l108.2-207.8h481.4z M685.6 754.4c0 95.656-77.544 173.2-173.2 173.2s-173.2-77.544-173.2-173.2c0-95.656 77.544-173.2 173.2-173.2s173.2 77.544 173.2 173.2z M697.8 598.2l230.2-294-138.6-207.8-276.6 415.6c64.6 0 125.4 25.4 171 71 5 5 9.6 10 14 15.2z M411.6 533.2l-107-161.2h-207.8l180.2 323c10.4-42.4 32.2-81.2 64-112.8 20.8-20.6 44.6-37.2 70.6-49z"})}):(0,r.jsx)("span",{})}},92858:function(n,e,t){"use strict";t.d(e,{$:function(){return l}});var r=t(85893),s=t(38173),a=t(32554),i=t.n(a);function o(n){var e=n.medals,t=n.cutoffs,a=n.showCutoffs;return(0,r.jsxs)("div",{className:i().medals,children:[(0,r.jsxs)("div",{className:i().medal,children:[(0,r.jsx)(s.h,{color:"gold"}),(0,r.jsx)("div",{children:e.gold||0}),(0,r.jsx)("div",{children:t&&a?t.gold:""})]}),(0,r.jsxs)("div",{className:i().medal,children:[(0,r.jsx)(s.h,{color:"silver"}),(0,r.jsx)("div",{children:e.silver||0}),(0,r.jsx)("div",{children:t&&a?t.silver:""})]}),(0,r.jsxs)("div",{className:i().medal,children:[(0,r.jsx)(s.h,{color:"bronze"}),(0,r.jsx)("div",{children:e.bronze||0}),(0,r.jsx)("div",{children:t&&a?t.bronze:""})]})]})}function l(n){var e=n.contest,t=n.showCutoffs,s=n.medals;if(s)return(0,r.jsx)(o,{medals:s});if(e){var a={gold:e.medals.gold.count,silver:e.medals.silver.count,bronze:e.medals.bronze.count},i={gold:e.medals.gold.cutoff,silver:e.medals.silver.cutoff,bronze:e.medals.bronze.cutoff};return(0,r.jsx)(o,{medals:a,cutoffs:i,showCutoffs:t})}throw new Error("Provide euther contest or medals")}},85738:function(n,e,t){"use strict";t.d(e,{W:function(){return c}});var r=t(85893),s=t(61709),a=t.n(s),i=t(51130),o=t.n(i),l=t(41664);function c(n){var e=n.navigation,t=n.title,s=n.genLink,i=n.genTitle,c=i||function(n){return n};return(0,r.jsxs)("div",{className:a().navigation,children:[(0,r.jsx)("h1",{className:o().pageHeader,children:t}),(0,r.jsx)("div",{className:a().previous,children:null!==e.previous&&(0,r.jsx)(l.default,{href:s(e.previous),children:(0,r.jsxs)("a",{children:["\u2190 ",c(e.previous)]})})}),(0,r.jsx)("div",{className:a().next,children:null!==e.next&&(0,r.jsx)(l.default,{href:s(e.next),children:(0,r.jsxs)("a",{children:[c(e.next)," \u2192"]})})})]})}},39886:function(n,e,t){"use strict";t.d(e,{D:function(){return c}});var r=t(85893),s=t(59934),a=t(41664),i=t(48775),o=t.n(i),l=["#d53e4f","#f46d43","#fdae61","#FFCC00","#41ab5d","#66c2a5","#3288bd"];function c(n){var e=n.score,t=n.maxScore,i=n.year,c=n.task,d=null!==e&&null!==t?e/t:null,u=null===d?"black":l[Math.round(d*(l.length-1))];return(0,r.jsx)(a.default,{href:"/task/".concat(i,"/").concat(c),children:(0,r.jsxs)("a",{children:[(0,r.jsx)("span",{className:o().score,style:{color:u},children:null===e?"?":(0,s.N)(e,2)}),(0,r.jsx)("span",{className:o().task,children:c})]})})}},59934:function(n,e,t){"use strict";function r(n,e){if(null===n)return null;var t=""+n,r=""+e;if(t.includes("e")){var s=t.split("e"),a="";+s[1]+e>0&&(a="+");var i=+s[0]+"e"+a+(+s[1]+e);return+(Math.round(i)+"e-"+r)}return+(Math.round(parseFloat(t+"e+"+r))+"e-"+r)}t.d(e,{N:function(){return r}})},50183:function(n,e,t){"use strict";t.r(e),t.d(e,{__N_SSG:function(){return vn},default:function(){return hn}});var r=t(85893),s=t(9008),a=t(76821),i=t(67294),o=t(82537),l=t.n(o),c=t(8142),d=t(78831),u=t(76626),x=t(87126);var f=function({children:n,in:e,mountOnEnter:t,unmountOnExit:r}){const s=(0,i.useRef)(e);return(0,i.useEffect)((()=>{e&&(s.current=!0)}),[e]),e?n:r||!s.current&&t?null:n};const v=["active","eventKey","mountOnEnter","transition","unmountOnExit"],h=["activeKey","getControlledId","getControllerId"],m=["as"];function p(n,e){if(null==n)return{};var t,r,s={},a=Object.keys(n);for(r=0;r<a.length;r++)t=a[r],e.indexOf(t)>=0||(s[t]=n[t]);return s}function j(n){let{active:e,eventKey:t,mountOnEnter:r,transition:s,unmountOnExit:a}=n,o=p(n,v);const l=(0,i.useContext)(u.Z);if(!l)return[o,{eventKey:t,isActive:e,mountOnEnter:r,transition:s,unmountOnExit:a}];const{activeKey:c,getControlledId:d,getControllerId:f}=l,m=p(l,h),j=(0,x.h)(t);return[Object.assign({},o,{id:d(t),"aria-labelledby":f(t)}),{eventKey:t,isActive:null==e&&null!=j?(0,x.h)(c)===j:e,transition:s||m.transition,mountOnEnter:null!=r?r:m.mountOnEnter,unmountOnExit:null!=a?a:m.unmountOnExit}]}const b=i.forwardRef(((n,e)=>{let{as:t="div"}=n,s=p(n,m);const[a,{isActive:i,onEnter:o,onEntering:l,onEntered:c,onExit:d,onExiting:v,onExited:h,mountOnEnter:b,unmountOnExit:_,transition:g=f}]=j(s);return(0,r.jsx)(u.Z.Provider,{value:null,children:(0,r.jsx)(x.Z.Provider,{value:null,children:(0,r.jsx)(g,{in:i,onEnter:o,onEntering:l,onEntered:c,onExit:d,onExiting:v,onExited:h,mountOnEnter:b,unmountOnExit:_,children:(0,r.jsx)(t,Object.assign({},a,{ref:e,role:"tabpanel",hidden:!i,"aria-hidden":!i}))})})})}));b.displayName="TabPanel";const _=n=>{const{id:e,generateChildId:t,onSelect:s,activeKey:a,defaultActiveKey:o,transition:l,mountOnEnter:f,unmountOnExit:v,children:h}=n,[m,p]=(0,c.$c)(a,o,s),j=(0,d.gP)(e),b=(0,i.useMemo)((()=>t||((n,e)=>j?`${j}-${e}-${n}`:null)),[j,t]),_=(0,i.useMemo)((()=>({onSelect:p,activeKey:m,transition:l,mountOnEnter:f||!1,unmountOnExit:v||!1,getControlledId:n=>b(n,"tabpane"),getControllerId:n=>b(n,"tab")})),[p,m,l,f,v,b]);return(0,r.jsx)(u.Z.Provider,{value:_,children:(0,r.jsx)(x.Z.Provider,{value:p||null,children:h})})};_.Panel=b;var g=_,y=t(60834),E=t(76671),N=t(41244),$=(0,t(66611).Z)("tab-content"),O=t(94184),w=t.n(O),C=t(76792),k=t(41068);function P(n){return"boolean"===typeof n?n?k.Z:void 0:n}const Z=i.forwardRef((({bsPrefix:n,transition:e,...t},s)=>{const[{className:a,as:i="div",...o},{isActive:l,onEnter:c,onEntering:d,onEntered:v,onExit:h,onExiting:m,onExited:p,mountOnEnter:b,unmountOnExit:_,transition:g=f}]=j({...t,transition:P(e)}),y=(0,C.vE)(n,"tab-pane");return(0,r.jsx)(u.Z.Provider,{value:null,children:(0,r.jsx)(x.Z.Provider,{value:null,children:(0,r.jsx)(g,{in:l,onEnter:c,onEntering:d,onEntered:v,onExit:h,onExiting:m,onExited:p,mountOnEnter:b,unmountOnExit:_,children:(0,r.jsx)(i,{...o,ref:s,className:w()(a,y,l&&"active")})})})})}));Z.displayName="TabPane";var K=Z;function S(n,e){let t=0;return i.Children.map(n,(n=>i.isValidElement(n)?e(n,t++):n))}function T(n){let e;return function(n,e){let t=0;i.Children.forEach(n,(n=>{i.isValidElement(n)&&e(n,t++)}))}(n,(n=>{null==e&&(e=n.props.eventKey)})),e}function z(n){const{title:e,eventKey:t,disabled:s,tabClassName:a,id:i}=n.props;return null==e?null:(0,r.jsx)(N.Z,{as:"li",role:"presentation",children:(0,r.jsx)(E.Z,{as:"button",type:"button",eventKey:t,disabled:s,id:i,className:a,children:e})})}const I=n=>{const{id:e,onSelect:t,transition:s,mountOnEnter:a,unmountOnExit:i,children:o,activeKey:l=T(o),...d}=(0,c.Ch)(n,{activeKey:"onSelect"});return(0,r.jsxs)(g,{id:e,activeKey:l,onSelect:t,transition:P(s),mountOnEnter:a,unmountOnExit:i,children:[(0,r.jsx)(y.Z,{...d,role:"tablist",as:"ul",children:S(o,z)}),(0,r.jsx)($,{children:S(o,(n=>{const e={...n.props};return delete e.title,delete e.disabled,delete e.tabClassName,(0,r.jsx)(K,{...e})}))})]})};I.defaultProps={variant:"tabs",mountOnEnter:!1,unmountOnExit:!1},I.displayName="Tabs";var R=I,M=t(45697),A=t.n(M);const W=({transition:n,...e})=>(0,r.jsx)(g,{...e,transition:P(n)});W.displayName="TabContainer";var F=W;const L={eventKey:A().oneOfType([A().string,A().number]),title:A().node.isRequired,disabled:A().bool,tabClassName:A().string},B=()=>{throw new Error("ReactBootstrap: The `Tab` component is not meant to be rendered! It's an abstract component that is only valid as a direct Child of the `Tabs` Component. For custom tabs components use TabPane and TabsContainer directly")};B.propTypes=L;var V=Object.assign(B,{Container:F,Content:$,Pane:K}),X=t(18695),q=t(41664),G=t(94568),D=t.n(G),H=t(92858),Y=t(34051),U=t(31555),J=t(12664);function Q(n){var e=n.year;return(0,r.jsxs)(Y.Z,{as:"dl",children:[(0,r.jsx)(U.Z,{xs:"9",as:"dt",children:"Contestants"}),(0,r.jsx)(U.Z,{xs:"3",as:"dd",children:e.num_contestants})]})}function nn(n){var e=n.year;return(0,r.jsxs)("div",{className:D().layout,children:[(0,r.jsx)("div",{className:D().title,children:(0,r.jsx)(q.default,{href:"/contest/".concat(e.year),children:(0,r.jsxs)("a",{children:[e.location.location," ",e.year]})})}),(0,r.jsx)("div",{className:D().image,children:(0,r.jsx)(q.default,{href:"/contest/".concat(e.year),children:(0,r.jsx)("a",{children:(0,r.jsx)(J.j,{year:e.year})})})}),(0,r.jsx)("div",{className:D().info,children:(0,r.jsx)(Q,{year:e})}),(0,r.jsx)("div",{className:D().medals,children:(0,r.jsx)(H.$,{medals:e.num_medals})})]})}function en(n){var e=n.region;return(0,r.jsx)(X.Z,{variant:"flush",children:e.years.map((function(n){return(0,r.jsx)(X.Z.Item,{children:(0,r.jsx)(nn,{year:n})},n.year)}))})}var tn=t(43596),rn=t.n(tn),sn=t(75147),an=t(59934),on=t(38173),ln=t(39886),cn=t(91413);function dn(n){for(var e=n.year,t=n.scores,s=n.numTasks,a=[],i=0;i<s-t.length;i++)a.push((0,r.jsx)("td",{},i));return(0,r.jsxs)(r.Fragment,{children:[t.map((function(n){return(0,r.jsx)("td",{children:(0,r.jsx)(ln.D,{score:n.score,year:e,task:n.name,maxScore:n.max_score_possible})},n.name)})),a]})}function un(n){var e=n.results,t=0,s=!0,a=!1,i=void 0;try{for(var o,l=e.results[Symbol.iterator]();!(s=(o=l.next()).done);s=!0){var c=o.value,d=!0,u=!1,x=void 0;try{for(var f,v=c.contestants[Symbol.iterator]();!(d=(f=v.next()).done);d=!0){var h=f.value;t=Math.max(t,h.task_scores.length)}}catch(b){u=!0,x=b}finally{try{d||null==v.return||v.return()}finally{if(u)throw x}}}}catch(b){a=!0,i=b}finally{try{s||null==l.return||l.return()}finally{if(a)throw i}}var m,p,j=function(n){var e=null,t=null,r=!0,s=!1,a=void 0;try{for(var i,o=n[Symbol.iterator]();!(r=(i=o.next()).done);r=!0){var l=i.value;null!==l.score&&(null===e&&(e=0),e+=l.score),null!==l.max_score_possible&&(null===t&&(t=0),t+=l.max_score_possible)}}catch(b){s=!0,a=b}finally{try{r||null==o.return||o.return()}finally{if(s)throw a}}return null===e?"?":null===t?(0,an.N)(e,2).toString():"".concat((0,an.N)(e,2)," / ").concat((0,an.N)(t,2))};return(0,r.jsx)("div",{className:"container ".concat(rn().wrapper),children:(0,r.jsxs)(sn.Z,{className:rn().table,children:[(0,r.jsx)("thead",{children:(0,r.jsxs)("tr",{children:[(0,r.jsx)("th",{children:"Year"}),(0,r.jsx)("th",{children:"Contestant"}),(0,r.jsx)("th",{children:"Rank"}),(0,r.jsx)("th",{children:"Score"}),(0,r.jsx)("th",{className:rn().medal,children:"Medal"}),(0,r.jsx)("th",{colSpan:t,children:"Tasks"})]})}),(0,r.jsx)("tbody",{children:e.results.flatMap((function(n){return n.contestants.map((function(e){return(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)(q.default,{href:"/contest/".concat(n.year),children:(0,r.jsx)("a",{children:n.year})})}),(0,r.jsxs)("td",{children:[(0,r.jsx)(q.default,{href:"/contestant/".concat(e.contestant.id),children:(0,r.jsxs)("a",{children:[e.contestant.first_name," ",e.contestant.last_name]})}),e.internationals.map((function(n){return(0,r.jsx)(cn.q,{international:n},n.code)}))]}),(0,r.jsx)("td",{children:null!==(m=e.rank)&&void 0!==m?m:"?"}),(0,r.jsx)("td",{children:null!==(p=j(e.task_scores))&&void 0!==p?p:"?"}),(0,r.jsx)("td",{className:rn().medal,children:e.medal?(0,r.jsx)(on.h,{color:e.medal}):null}),(0,r.jsx)(dn,{year:n.year,scores:e.task_scores,numTasks:t})]},"".concat(n.year," ").concat(e.contestant.id))}))}))})]})})}var xn=t(85738);function fn(n){var e=n.region,t=n.results,s=(0,i.useState)(!0),a=s[0],o=s[1];return(0,r.jsxs)("div",{className:l().layout,children:[(0,r.jsx)("div",{className:l().title,children:(0,r.jsx)(xn.W,{navigation:t.navigation,title:e.name,genLink:function(n){return"/region/".concat(n)}})}),(0,r.jsx)("div",{className:l().logo,children:a&&(0,r.jsx)("img",{src:"/static/regions/".concat(e.navigation.current,".svg"),alt:e.name,onError:function(){return o(!1)}})}),(0,r.jsx)("div",{className:l().nav,children:(0,r.jsxs)(R,{defaultActiveKey:"participations",children:[(0,r.jsx)(V,{eventKey:"participations",title:"Participations",children:(0,r.jsx)(en,{region:e})}),(0,r.jsx)(V,{eventKey:"results",title:"Results",children:(0,r.jsx)(un,{results:t})})]})})]})}var vn=!0;function hn(n){var e=n.region,t=n.results;return(0,r.jsxs)(a.A,{children:[(0,r.jsx)(s.default,{children:(0,r.jsxs)("title",{children:["OII Stats - ",e.name]})}),(0,r.jsx)(fn,{region:e,results:t})]})}},28662:function(n){n.exports={international:"international_international__w0Kga"}},32554:function(n){n.exports={medals:"medals_medals__NeWR7",medal:"medals_medal__dYsxL"}},61709:function(n){n.exports={navigation:"navigation_navigation__8EURn",previous:"navigation_previous__lWwF8",next:"navigation_next__dUXRw"}},94568:function(n){n.exports={layout:"participations_layout__t1WnS",title:"participations_title__mWnFZ",image:"participations_image__WCtXm",info:"participations_info__lpaNG",medals:"participations_medals__dTW2c"}},82537:function(n){n.exports={title:"region_title__Q8h0W",logo:"region_logo__stuRw",nav:"region_nav__u5kw1"}},43596:function(n){n.exports={wrapper:"results_wrapper__B9Wp_",table:"results_table__zXTpV",medal:"results_medal__5wLi8",pastMedal:"results_pastMedal__21OPq",region:"results_region__Vhlbb"}},48775:function(n){n.exports={score:"scoreBadge_score__AmAXO",task:"scoreBadge_task__tJACb"}},51130:function(n){n.exports={pageHeader:"common_pageHeader__nYxaV",h2:"common_h2__NLV4u"}},31555:function(n,e,t){"use strict";var r=t(94184),s=t.n(r),a=t(67294),i=t(76792),o=t(85893);const l=["xxl","xl","lg","md","sm","xs"];const c=a.forwardRef(((n,e)=>{const[{className:t,...r},{as:a="div",bsPrefix:c,spans:d}]=function({as:n,bsPrefix:e,className:t,...r}){e=(0,i.vE)(e,"col");const a=[],o=[];return l.forEach((n=>{const t=r[n];let s,i,l;delete r[n],"object"===typeof t&&null!=t?({span:s,offset:i,order:l}=t):s=t;const c="xs"!==n?`-${n}`:"";s&&a.push(!0===s?`${e}${c}`:`${e}${c}-${s}`),null!=l&&o.push(`order${c}-${l}`),null!=i&&o.push(`offset${c}-${i}`)})),[{...r,className:s()(t,...a,...o)},{as:n,bsPrefix:e,spans:a}]}(n);return(0,o.jsx)(a,{...r,ref:e,className:s()(t,!d.length&&c)})}));c.displayName="Col",e.Z=c},18695:function(n,e,t){"use strict";t.d(e,{Z:function(){return m}});var r=t(94184),s=t.n(r),a=t(67294),i=(t(42473),t(8142)),o=t(21586),l=t(76792),c=t(78146),d=t(73716),u=t(87126),x=t(85893);const f=a.forwardRef((({bsPrefix:n,active:e,disabled:t,eventKey:r,className:a,variant:i,action:o,as:f,...v},h)=>{n=(0,l.vE)(n,"list-group-item");const[m,p]=(0,d.v)({key:(0,u.h)(r,v.href),active:e,...v}),j=(0,c.Z)((n=>{if(t)return n.preventDefault(),void n.stopPropagation();m.onClick(n)}));t&&void 0===v.tabIndex&&(v.tabIndex=-1,v["aria-disabled"]=!0);const b=f||(o?v.href?"a":"button":"div");return(0,x.jsx)(b,{ref:h,...v,...m,onClick:j,className:s()(a,n,p.isActive&&"active",t&&"disabled",i&&`${n}-${i}`,o&&`${n}-action`)})}));f.displayName="ListGroupItem";var v=f;const h=a.forwardRef(((n,e)=>{const{className:t,bsPrefix:r,variant:a,horizontal:c,numbered:d,as:u="div",...f}=(0,i.Ch)(n,{activeKey:"onSelect"}),v=(0,l.vE)(r,"list-group");let h;return c&&(h=!0===c?"horizontal":`horizontal-${c}`),(0,x.jsx)(o.Z,{ref:e,...f,as:u,className:s()(t,v,a&&`${v}-${a}`,h&&`${v}-${h}`,d&&`${v}-numbered`)})}));h.displayName="ListGroup";var m=Object.assign(h,{Item:v})},34051:function(n,e,t){"use strict";var r=t(94184),s=t.n(r),a=t(67294),i=t(76792),o=t(85893);const l=["xxl","xl","lg","md","sm","xs"],c=a.forwardRef((({bsPrefix:n,className:e,as:t="div",...r},a)=>{const c=(0,i.vE)(n,"row"),d=`${c}-cols`,u=[];return l.forEach((n=>{const e=r[n];let t;delete r[n],null!=e&&"object"===typeof e?({cols:t}=e):t=e;const s="xs"!==n?`-${n}`:"";null!=t&&u.push(`${d}${s}-${t}`)})),(0,o.jsx)(t,{ref:a,...r,className:s()(e,c,...u)})}));c.displayName="Row",e.Z=c},75147:function(n,e,t){"use strict";var r=t(94184),s=t.n(r),a=t(67294),i=t(76792),o=t(85893);const l=a.forwardRef((({bsPrefix:n,className:e,striped:t,bordered:r,borderless:a,hover:l,size:c,variant:d,responsive:u,...x},f)=>{const v=(0,i.vE)(n,"table"),h=s()(e,v,d&&`${v}-${d}`,c&&`${v}-${c}`,t&&`${v}-striped`,r&&`${v}-bordered`,a&&`${v}-borderless`,l&&`${v}-hover`),m=(0,o.jsx)("table",{...x,className:h,ref:f});if(u){let n=`${v}-responsive`;return"string"===typeof u&&(n=`${n}-${u}`),(0,o.jsx)("div",{className:n,children:m})}return m}));e.Z=l}},function(n){n.O(0,[432,821,774,888,179],(function(){return e=13070,n(n.s=e);var e}));var e=n.O();_N_E=e}]);