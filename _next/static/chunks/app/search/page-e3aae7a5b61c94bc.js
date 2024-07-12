(globalThis.webpackChunk_N_E=globalThis.webpackChunk_N_E||[]).push([[2797],{73264:(e,s,a)=>{Promise.resolve().then(a.bind(a,14954))},14954:(e,s,a)=>{"use strict";a.r(s),a.d(s,{default:()=>p});var t=a(57437),n=a(16463),l=a(2265),i=a(33690),r=a(93479),c=a(91617),o=a(26589),d=a(87138),m=a(45426),x=a(44839),u=a(77605),h=a(30774);function j(e){let{region:s}=e;return(0,t.jsxs)(i.Card,{className:"h-full",children:[(0,t.jsx)(f,{region:s.name,image:s.image,className:"size-52 flex-none max-sm:mx-auto max-sm:mt-4"}),(0,t.jsxs)(i.CardBody,{title:s.name,children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{className:"font-semibold",children:"Partecipanti:"})," ",s.num_contestants]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{className:"font-semibold",children:"Partecipanti medi all'anno:"})," ",s.avg_contestants_per_year]}),(0,t.jsx)("div",{className:"mt-2",children:(0,t.jsx)(h.$,{...s.medals})})]})]})}function f(e){let{region:s,image:a,className:n}=e;return(0,t.jsx)(u.E,{src:a,alt:"Stemma ".concat(s),className:(0,x.Z)("object-contain p-4",n)})}function v(e){var s,a;let{task:n,links:l}=e;return(0,t.jsxs)(i.Card,{className:"h-full",children:[(0,t.jsx)(N,{name:n.name,year:n.contest_year,image:n.image,className:"w-52 flex-none max-sm:mx-auto max-sm:mt-4 max-sm:rounded-box sm:min-h-52"}),(0,t.jsxs)(i.CardBody,{title:n.title,children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{className:"font-semibold",children:"Anno:"})," ",l?(0,t.jsx)(d.default,{href:"/contest/".concat(n.contest_year),className:"link",children:n.contest_year}):n.contest_year]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{className:"font-semibold",children:"Punteggio massimo:"})," ",null!==(s=n.max_score_possible)&&void 0!==s?s:"N/A"]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{className:"font-semibold",children:"Punteggio massimo totalizzato:"})," ",null!==(a=n.max_score)&&void 0!==a?a:"N/A"]}),l&&n.link&&(0,t.jsx)("div",{children:(0,t.jsx)(d.default,{href:n.link,className:"link",children:"Prova questo problema"})})]})]})}function N(e){let{name:s,year:a,image:n,className:l}=e;return n?(0,t.jsxs)("div",{className:(0,x.Z)("relative grid overflow-hidden",l),children:[(0,t.jsx)(u.E,{src:n,alt:"",className:"absolute inset-0 size-full object-cover max-sm:hidden"}),(0,t.jsx)(u.E,{src:n,alt:"Problema ".concat(s),className:"m-auto size-full object-contain sm:backdrop-blur-lg"})]}):(0,t.jsxs)("div",{className:(0,x.Z)("flex aspect-square items-center justify-center bg-neutral p-4 text-center text-5xl font-bold text-neutral-content",l),children:["OII ",a]})}var b=a(75240);function g(e){let{v:s}=e;return"contest"in s?(0,t.jsx)(d.default,{href:"/contest/".concat(s.contest.year),children:(0,t.jsx)(m.Z,{contest:s.contest})}):"region"in s?(0,t.jsx)(d.default,{href:"/region/".concat(s.region.id),children:(0,t.jsx)(j,{region:s.region})}):"task"in s?(0,t.jsx)(d.default,{href:"/task/".concat(s.task.year,"/").concat(s.task.task.name),children:(0,t.jsx)(v,{task:s.task.task})}):"user"in s?(0,t.jsx)(d.default,{href:"/contestant/".concat(s.user.contestant.id),children:(0,t.jsx)(b.O,{user:s.user})}):void 0}function p(){return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("h1",{className:"my-4 text-center text-4xl font-bold max-lg:hidden",children:"Risultati ricerca"}),(0,t.jsx)("h1",{className:"text-center text-2xl font-bold lg:hidden",children:"Ricerca"}),(0,t.jsxs)(i.Form,{onSubmit:y,className:"mb-4 lg:hidden",children:[(0,t.jsx)(i.TextField,{field:"q",label:"Parola da cercare",placeholder:"Inserisci la parola da cercare"}),(0,t.jsx)("div",{className:"self-start px-1 text-sm text-base-content/60",children:"Puoi cercare un partecipante, un problema o una gara"}),(0,t.jsx)(i.SubmitButton,{className:"!mt-2",children:"Cerca"})]}),(0,t.jsx)(l.Suspense,{fallback:(0,t.jsx)(o.g,{}),children:(0,t.jsx)(k,{})})]})}function y(e){let{q:s}=e;window.history.pushState({},"","/search?q=".concat(s))}function k(){var e;let s=(0,n.useSearchParams)(),{data:a}=(0,c.ZP)("search-index",_,{revalidateIfStale:!1,revalidateOnFocus:!1}),i=null!==(e=s.get("q"))&&void 0!==e?e:"",r=(0,l.useMemo)(()=>null==a?void 0:a.search(i,{prefix:!0,fuzzy:!0}).slice(0,20),[a,i]);return i?r?0===r.length?(0,t.jsx)("div",{className:"m-8 text-center text-2xl",children:"Nessun risultato trovato"}):(0,t.jsx)("div",{className:"grid gap-4 xl:grid-cols-2",children:null==r?void 0:r.map(e=>(0,t.jsx)(g,{v:e.v},e.id))}):(0,t.jsx)(o.g,{}):(0,t.jsx)("div",{className:"m-8 text-center text-2xl text-base-content/60 max-lg:hidden",children:"Usa la barra di ricerca per trovare un partecipante, un problema o una gara"})}async function _(){let e=await fetch("/api/search"),s=await e.text();return r.Z.loadJSONAsync(s,{fields:["k"],storeFields:["v"]})}},45426:(e,s,a)=>{"use strict";a.d(s,{Z:()=>c,j:()=>o});var t=a(57437),n=a(33690),l=a(44839),i=a(77605),r=a(30774);function c(e){var s,a,l,i;let{contest:c}=e;return(0,t.jsxs)(n.Card,{className:"h-full",children:[(0,t.jsx)(o,{year:c.year,image:c.image,className:"w-52 flex-none max-sm:mx-auto max-sm:mt-4 max-sm:rounded-box sm:min-h-52"}),(0,t.jsxs)(n.CardBody,{title:"".concat(null!==(s=c.location.location)&&void 0!==s?s:"OII"," ").concat(c.year),children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{className:"font-semibold",children:"Partecipanti:"})," ",null!==(a=c.num_contestants)&&void 0!==a?a:"N/A"]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{className:"font-semibold",children:"Punteggio massimo ottenuto:"})," ",null!==(l=c.max_score)&&void 0!==l?l:"N/A"]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{className:"font-semibold",children:"Punteggio medio:"})," ",null===(i=c.avg_score)?"N/A":Math.round(10*i)/10]}),(0,t.jsx)("div",{className:"mt-2",children:(0,t.jsx)(r.$,{gold:c.medals.gold.count,silver:c.medals.silver.count,bronze:c.medals.bronze.count})})]})]})}function o(e){let{year:s,image:a,className:n}=e;return a?(0,t.jsx)(i.E,{src:a,alt:"Logo OII ".concat(s),className:(0,l.Z)("bg-white p-4 sm:object-contain",n)}):(0,t.jsxs)("div",{className:(0,l.Z)("flex aspect-square items-center justify-center bg-neutral p-4 text-center text-5xl font-bold text-neutral-content",n),children:["OII ",s]})}},77605:(e,s,a)=>{"use strict";a.d(s,{E:()=>n});var t=a(57437);function n(e){let{src:s,alt:a,className:n}=e;return(0,t.jsx)("img",{src:s.src,srcSet:s.srcSet,width:s.width,height:s.height,alt:a,loading:"lazy",className:n})}},30774:(e,s,a)=>{"use strict";a.d(s,{$:()=>i});var t=a(57437),n=a(44839),l=a(43805);function i(e){let{gold:s,silver:a,bronze:n}=e;return(0,t.jsxs)("div",{className:"flex justify-center gap-4",children:[(0,t.jsx)(r,{type:"gold",children:s}),(0,t.jsx)(r,{type:"silver",children:a}),(0,t.jsx)(r,{type:"bronze",children:n})]})}function r(e){let{type:s,children:a}=e;return(0,t.jsxs)("span",{children:[(0,t.jsx)(l.Z,{className:(0,n.Z)("inline-block last:*:hidden",function(e){switch(e){case"gold":return"stroke-amber-400";case"silver":return"stroke-gray-400";case"bronze":return"stroke-amber-600";default:return"hidden"}}(s))}),(0,t.jsx)("span",{className:"mx-1.5 inline-block",children:null!=a?a:"N/A"})]})}},26589:(e,s,a)=>{"use strict";a.d(s,{g:()=>r});var t=a(57437),n=a(33690),l=a(30774);function i(){return(0,t.jsxs)(n.Card,{className:"h-full",children:[(0,t.jsx)("div",{className:"skeleton size-52 flex-none rounded-none max-sm:mx-auto max-sm:mt-4 max-sm:rounded-box"}),(0,t.jsxs)(n.CardBody,{title:(0,t.jsx)("span",{className:"skeleton my-1 inline-block h-5 w-56"}),children:[(0,t.jsx)("div",{className:"skeleton my-1 h-4 w-48"}),(0,t.jsx)("div",{className:"skeleton my-1 h-4 w-64"}),(0,t.jsx)("div",{className:"mt-2",children:(0,t.jsx)(l.$,{gold:(0,t.jsx)("span",{className:"skeleton inline-block h-4 w-5 translate-y-1/4 scale-y-150"}),silver:(0,t.jsx)("span",{className:"skeleton inline-block h-4 w-5 translate-y-1/4 scale-y-150"}),bronze:(0,t.jsx)("span",{className:"skeleton inline-block h-4 w-5 translate-y-1/4 scale-y-150"})})})]})]})}function r(){return(0,t.jsxs)("div",{className:"grid gap-4 xl:grid-cols-2",children:[(0,t.jsx)(i,{}),(0,t.jsx)(i,{}),(0,t.jsx)(i,{}),(0,t.jsx)(i,{})]})}},75240:(e,s,a)=>{"use strict";a.d(s,{O:()=>o});var t=a(57437),n=a(87138),l=a(33690),i=a(44839),r=a(77605),c=a(30774);function o(e){var s,a;let{user:i,links:r}=e;return(0,t.jsxs)(l.Card,{className:"h-full",children:[(0,t.jsx)("div",{className:"relative min-h-52 w-52 self-stretch max-sm:mx-auto max-sm:mt-4",children:(0,t.jsx)(d,{contestant:i.contestant,image:i.image,className:"absolute inset-0 size-full max-sm:rounded-box"})}),(0,t.jsxs)(l.CardBody,{title:"".concat(null!==(s=i.contestant.first_name)&&void 0!==s?s:""," ").concat(i.contestant.last_name),children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{className:"font-semibold",children:"Partecipazioni:"})," ",i.participations.map(e=>e.year).join(", ")]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{className:"font-semibold",children:"Miglior piazzamento:"})," ",null!==(a=i.best_rank)&&void 0!==a?a:"N/A","\xb0 posto"]}),r&&i.contestant.username&&(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{className:"font-semibold",children:"Profilo su training.olinfo.it:"})," ",(0,t.jsx)(n.default,{href:"https://training.olinfo.it/#/user/".concat(i.contestant.username,"/profile"),className:"link",children:i.contestant.username})]}),(0,t.jsx)("div",{className:"mt-2",children:(0,t.jsx)(c.$,{...i.num_medals})})]})]})}function d(e){var s,a,n;let{contestant:l,image:c,className:o}=e;return c?(0,t.jsx)(r.E,{src:c,alt:"Foto di ".concat(null!==(a=l.first_name)&&void 0!==a?a:""," ").concat(l.last_name),className:(0,i.Z)("object-cover",o)}):(0,t.jsx)("div",{className:(0,i.Z)("flex items-center justify-center bg-neutral p-4 text-7xl font-bold text-neutral-content",o),children:(null!==(n=null===(s=l.first_name)||void 0===s?void 0:s[0])&&void 0!==n?n:"")+l.last_name[0]})}}},e=>{var s=s=>e(e.s=s);e.O(0,[4859,8703,7059,6778,2971,7023,1744],()=>s(73264)),_N_E=e.O()}]);
//# sourceMappingURL=page-e3aae7a5b61c94bc.js.map