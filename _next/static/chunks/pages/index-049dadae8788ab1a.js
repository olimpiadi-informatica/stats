(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{45301:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(96253)}])},12664:function(t,e,n){"use strict";n.d(e,{j:function(){return a}});var s=n(85893),r=n(41183);function a(t){var e=t.year;return(0,s.jsx)(r.E,{path:"contests/".concat(e,".jpg"),alt:"Contest ".concat(e)})}},2115:function(t,e,n){"use strict";n.d(e,{p:function(){return a}});var s=n(85893),r=n(41183);function a(t){var e=t.contestant;return(0,s.jsx)(r.E,{path:"contestants/".concat(e.id,".jpg"),alt:"".concat(e.first_name," ").concat(e.last_name)})}},38173:function(t,e,n){"use strict";n.d(e,{h:function(){return a}});var s=n(85893),r={gold:"#ffdb19",silver:"#c0c0c0",bronze:"#cd7f32"};function a(t){var e=t.color,n=t.className,a=t.size;if(!e)return(0,s.jsx)("span",{});var i=r[e];return e?(0,s.jsx)("svg",{className:n,fill:i,width:null!==a&&void 0!==a?a:"35px",height:null!==a&&void 0!==a?a:"35px",viewBox:"0 0 1024 1024",children:(0,s.jsx)("path",{d:"M547 304.2h-451l108.2-207.8h481.4z M685.6 754.4c0 95.656-77.544 173.2-173.2 173.2s-173.2-77.544-173.2-173.2c0-95.656 77.544-173.2 173.2-173.2s173.2 77.544 173.2 173.2z M697.8 598.2l230.2-294-138.6-207.8-276.6 415.6c64.6 0 125.4 25.4 171 71 5 5 9.6 10 14 15.2z M411.6 533.2l-107-161.2h-207.8l180.2 323c10.4-42.4 32.2-81.2 64-112.8 20.8-20.6 44.6-37.2 70.6-49z"})}):(0,s.jsx)("span",{})}},92858:function(t,e,n){"use strict";n.d(e,{$:function(){return c}});var s=n(85893),r=n(38173),a=n(32554),i=n.n(a);function o(t){var e=t.medals,n=t.cutoffs,a=t.showCutoffs;return(0,s.jsxs)("div",{className:i().medals,children:[(0,s.jsxs)("div",{className:i().medal,children:[(0,s.jsx)(r.h,{color:"gold"}),(0,s.jsx)("div",{children:e.gold||0}),(0,s.jsx)("div",{children:n&&a?n.gold:""})]}),(0,s.jsxs)("div",{className:i().medal,children:[(0,s.jsx)(r.h,{color:"silver"}),(0,s.jsx)("div",{children:e.silver||0}),(0,s.jsx)("div",{children:n&&a?n.silver:""})]}),(0,s.jsxs)("div",{className:i().medal,children:[(0,s.jsx)(r.h,{color:"bronze"}),(0,s.jsx)("div",{children:e.bronze||0}),(0,s.jsx)("div",{children:n&&a?n.bronze:""})]})]})}function c(t){var e=t.contest,n=t.showCutoffs,r=t.medals;if(r)return(0,s.jsx)(o,{medals:r});if(e){var a={gold:e.medals.gold.count,silver:e.medals.silver.count,bronze:e.medals.bronze.count},i={gold:e.medals.gold.cutoff,silver:e.medals.silver.cutoff,bronze:e.medals.bronze.cutoff};return(0,s.jsx)(o,{medals:a,cutoffs:i,showCutoffs:n})}throw new Error("Provide euther contest or medals")}},7465:function(t,e,n){"use strict";n.d(e,{s:function(){return a}});var s=n(85893),r=n(41183);function a(t){var e=t.contest_year,n=t.name;return(0,s.jsx)(r.E,{path:"tasks/".concat(e,"/").concat(n,".png"),alt:"".concat(n," (").concat(e,")")})}},59934:function(t,e,n){"use strict";function s(t,e){if(null===t)return null;var n=""+t,s=""+e;if(n.includes("e")){var r=n.split("e"),a="";+r[1]+e>0&&(a="+");var i=+r[0]+"e"+a+(+r[1]+e);return+(Math.round(i)+"e-"+s)}return+(Math.round(parseFloat(n+"e+"+s))+"e-"+s)}n.d(e,{N:function(){return s}})},96253:function(t,e,n){"use strict";n.r(e),n.d(e,{__N_SSG:function(){return vt},default:function(){return jt}});var s=n(85893),r=n(76821),a=n(67294),i=n(79535),o=n.n(i),c=n(78182),l={region:o().tileRegion,user:o().tileUser,task:o().tileTask,contest:o().tileContest};function u(t){var e=t.variant,n=t.children;return(0,s.jsx)(c.Z,{className:"".concat(o().tile," ").concat(l[e]),children:n})}var d=n(41664),h=n(59934);function _(t){var e=t.id;return(0,s.jsx)(d.default,{href:"/region/".concat(e),children:(0,s.jsx)("a",{children:(0,s.jsx)("img",{className:o().image,src:"/static/regions/".concat(e,".svg"),alt:e,onError:function(t){t.target.style="display: none"}})})})}function f(t){var e=t.id,n=t.name;return(0,s.jsx)(d.default,{href:"/region/".concat(e),children:n})}function m(t){var e=t.stat.region_with_most_medals,n=e.first,r=e.second;return(0,s.jsxs)("div",{children:[(0,s.jsx)(_,{id:n.id}),"The region that won the highest number of medals is"," ",(0,s.jsx)(f,{id:n.id,name:n.name})," with"," ",n.num_medals.gold," golds, ",n.num_medals.silver," silvers and"," ",n.num_medals.bronze," bronzes. At second place there is"," ",(0,s.jsx)(f,{id:r.id,name:r.name})," with respectivly"," ",r.num_medals.gold,", ",r.num_medals.silver," and"," ",r.num_medals.bronze,"."]})}function x(t){var e=t.stat.region_with_most_medals_per_participant;return(0,s.jsxs)("div",{children:[(0,s.jsx)(_,{id:e.id}),"The region that won the highest number of medals per participant is"," ",(0,s.jsx)(f,{id:e.id,name:e.name}),","," ",(0,h.N)(100*e.medals_per_participant,2),"% of the students won a medal."]})}function v(t){var e=t.stat.region_with_most_first_places;return(0,s.jsxs)("div",{children:[(0,s.jsx)(_,{id:e.id}),"The region with the highest number of first places is"," ",(0,s.jsx)(f,{id:e.id,name:e.name}),", with"," ",e.num_first_places,"."]})}function j(t){var e=t.stat.region_with_most_participants;return(0,s.jsxs)("div",{children:[(0,s.jsx)(_,{id:e.id}),"The region with the highest number of participants is"," ",(0,s.jsx)(f,{id:e.id,name:e.name}),", with"," ",e.num_participants,"."]})}function p(t){var e=t.stat,n=null;return"region_with_most_medals"in e&&(n=(0,s.jsx)(m,{stat:e})),"region_with_most_medals_per_participant"in e&&(n=(0,s.jsx)(x,{stat:e})),"region_with_most_first_places"in e&&(n=(0,s.jsx)(v,{stat:e})),"region_with_most_participants"in e&&(n=(0,s.jsx)(j,{stat:e})),(0,s.jsx)(u,{variant:"region",children:n})}var g=n(34051),y=n(31555),w=n(83350),k=n.n(w);function b(t){var e=t.tiles;return(0,s.jsx)(g.Z,{children:(0,s.jsx)(y.Z,{md:"12",children:(0,s.jsx)("div",{className:k().container,children:e})})})}function N(t,e){for(var n=e.length-1;n>0;n--){var s,r=Math.floor(t.double()*(n+1));s=[e[r],e[n]],e[n]=s[0],e[r]=s[1]}return e}function z(t,e,n){for(var s=N(t,Array.from(e.keys())),r=[],a=0;a<n&&a<s.length;a++)r.push(e[s[a]]);return r}var C=n(92858),T=n(2115);function E(t){var e=t.contestant;return(0,s.jsx)(d.default,{href:"/contestant/".concat(e.id),children:(0,s.jsx)("a",{className:o().image,children:(0,s.jsx)(T.p,{contestant:e})})})}function S(t){var e=t.contestant;return(0,s.jsx)(d.default,{href:"/contestant/".concat(e.id),children:(0,s.jsxs)("a",{children:[e.first_name," ",e.last_name]})})}function M(t){var e=t.stat.best_student,n=e.contestant,r=e.num_medals;return(0,s.jsxs)("div",{children:[(0,s.jsx)(E,{contestant:n}),"The student that won the most is"," ",(0,s.jsx)(S,{contestant:n}),(0,s.jsx)(C.$,{medals:r})]})}function F(t){var e=t.stat.win_at_first_participation,n=e.contestant,r=e.year;return(0,s.jsxs)("div",{children:[(0,s.jsx)(T.p,{contestant:n}),(0,s.jsx)(S,{contestant:n})," won the ",r," edition, at first try!"]})}function B(t){var e=t.stat.student_with_most_participations,n=e.contestant,r=e.num_participations;return(0,s.jsxs)("div",{children:[(0,s.jsx)(T.p,{contestant:n}),(0,s.jsx)(S,{contestant:n})," is the student that did the highest number of national competitions, ",r,"!"]})}function K(t){var e=t.stat.ioist_with_worst_rank,n=e.contestant,r=e.contest_year,a=e.rank;return(0,s.jsxs)("div",{children:[(0,s.jsx)(T.p,{contestant:n}),"In ",r,", ",(0,s.jsx)(S,{contestant:n})," went to IOI even if he arrived at ",a," place at the national competition."]})}function O(t){var e=t.stat,n=null;return"best_student"in e&&(n=(0,s.jsx)(M,{stat:e})),"win_at_first_participation"in e&&(n=(0,s.jsx)(F,{stat:e})),"student_with_most_participations"in e&&(n=(0,s.jsx)(B,{stat:e})),"ioist_with_worst_rank"in e&&(n=(0,s.jsx)(K,{stat:e})),(0,s.jsx)(u,{variant:"user",children:n})}var q=n(7465);function I(t){var e=t.task;return(0,s.jsx)(d.default,{href:"/task/".concat(e.contest_year,"/").concat(e.name),children:(0,s.jsx)("a",{className:o().image,children:(0,s.jsx)(q.s,{contest_year:e.contest_year,name:e.name})})})}function U(t){var e=t.task;return(0,s.jsx)(d.default,{href:"/task/".concat(e.contest_year,"/").concat(e.name),children:(0,s.jsx)("a",{children:e.title})})}function A(t){var e=t.stat.task_with_lowest_avg_score;return(0,s.jsxs)("div",{children:[(0,s.jsx)(I,{task:e}),(0,s.jsx)(U,{task:e})," is the task with the lowest average score,"," ",(0,h.N)(e.avg_score,2)," out of ",e.max_score_possible,"."]})}function G(t){var e=t.stat.task_with_highest_avg_score;return(0,s.jsxs)("div",{children:[(0,s.jsx)(I,{task:e}),(0,s.jsx)(U,{task:e})," is the task with the highest average score,"," ",(0,h.N)(e.avg_score,2)," out of ",e.max_score_possible,"."]})}function J(t){var e=t.stat.task_with_lowest_max_score;return(0,s.jsxs)("div",{children:[(0,s.jsx)(I,{task:e}),(0,s.jsx)(U,{task:e})," is one of the hardest task of its time, everyone scored no more than ",(0,h.N)(e.max_score,2)," out of"," ",e.max_score_possible,"."]})}function R(t){var e=t.stat.task_with_most_zeros;return(0,s.jsxs)("div",{children:[(0,s.jsx)(I,{task:e}),(0,s.jsx)(U,{task:e})," is one of the most challenging tasks,"," ",e.num_zeros," out of ",e.num_participants," students scored zero points."]})}function Z(t){var e=t.stat.task_with_most_fullscores;return(0,s.jsxs)("div",{children:[(0,s.jsx)(I,{task:e}),(0,s.jsx)(U,{task:e})," is one of the easiest tasks,"," ",e.num_fullscores," out of ",e.num_participants," students had full score."]})}function P(t){var e=t.stat,n=null;return"task_with_lowest_avg_score"in e&&(n=(0,s.jsx)(A,{stat:e})),"task_with_highest_avg_score"in e&&(n=(0,s.jsx)(G,{stat:e})),"task_with_lowest_max_score"in e&&(n=(0,s.jsx)(J,{stat:e})),"task_with_most_zeros"in e&&(n=(0,s.jsx)(R,{stat:e})),"task_with_most_fullscores"in e&&(n=(0,s.jsx)(Z,{stat:e})),(0,s.jsx)(u,{variant:"task",children:n})}var D=n(57172),L={fill:"#ECEFF1",stroke:"#607D8B"};function W(t){var e,n,r=t.scale,a=t.width,i=t.height,o=t.center,c=t.map,l=t.markers;return(0,s.jsx)(D.ComposableMap,{projectionConfig:{scale:null!==r&&void 0!==r?r:1500},width:null!==a&&void 0!==a?a:350,height:null!==i&&void 0!==i?i:350,style:{width:"100%",height:"auto"},children:(0,s.jsxs)(D.ZoomableGroup,{center:[null!==(e=null===o||void 0===o?void 0:o[1])&&void 0!==e?e:14,null!==(n=null===o||void 0===o?void 0:o[0])&&void 0!==n?n:41],filterZoomEvent:function(t){return!1},children:[(0,s.jsx)(D.Geographies,{geography:null!==c&&void 0!==c?c:"/static/maps/italy-regions.json",children:function(t){return t.geographies.map((function(t,e){return"ATA"!==t.id&&(0,s.jsx)(D.Geography,{geography:t,style:{default:L,hover:L,pressed:L}},e)}))}}),(null!==l&&void 0!==l?l:[]).map((function(t){return(0,s.jsx)(D.Marker,{coordinates:[t[1],t[0]],style:{default:{stroke:"#FF5722"},hover:{stroke:"#FF5722"},pressed:{stroke:"#FF5722"}},children:(0,s.jsxs)("g",{fill:"none",stroke:"#FF5533",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",transform:"translate(-12, -24)",children:[(0,s.jsx)("circle",{cx:"12",cy:"10",r:"3"}),(0,s.jsx)("path",{d:"M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"})]})},"".concat(t[1],"-").concat(t[0]))}))]})})}var X=n(57539),$=n(14195),Y=n(3023),H=n(75358),Q=n(14888),V=n(83235),tt=n(12664);function et(t){var e=t.year;return(0,s.jsx)(d.default,{href:"/contest/".concat(e),children:(0,s.jsx)("a",{className:o().image,children:(0,s.jsx)(tt.j,{year:e})})})}function nt(t){var e=t.year;return(0,s.jsx)(d.default,{href:"/contest/".concat(e),children:(0,s.jsx)("a",{children:e})})}function st(t){var e=t.location;return null===e.latitude||null===e.longitude?null:(0,s.jsx)(W,{markers:[[e.latitude,e.longitude]]})}function rt(t){var e=t.stat.contest_with_most_participants,n=e.year,r=e.num_participants;return(0,s.jsxs)("div",{children:[(0,s.jsx)(et,{year:n}),"The ",(0,s.jsx)(nt,{year:n})," competition registered the highest number of contestants, ",r,"!"]})}function at(t){var e=t.stat.contest_with_most_ex_aequo,n=e.year,r=e.num_ex_aequo;return(0,s.jsxs)("div",{children:[(0,s.jsx)(et,{year:n}),r," is the highest number of ex-aequo, in"," ",(0,s.jsx)(nt,{year:n})," all those students ended at the first place with the same score!"]})}function it(t){var e=t.stat.most_northern_contest,n=e.year,r=e.location;return(0,s.jsxs)("div",{children:[(0,s.jsx)(st,{location:r}),"The most northern contest was held in ",(0,s.jsx)(nt,{year:n})," in"," ",r.location,"."]})}function ot(t){var e=t.stat.most_southern_contest,n=e.year,r=e.location;return(0,s.jsxs)("div",{children:[(0,s.jsx)(st,{location:r}),"The most southern contest was held in ",(0,s.jsx)(nt,{year:n})," in"," ",r.location,"."]})}function ct(t){var e=t.stat;return(0,s.jsxs)(X.T,{width:300,height:350,data:e.num_boys_girls.years,className:o().image,children:[(0,s.jsx)($.q,{strokeDasharray:"3 3"}),(0,s.jsx)(Y.K,{dataKey:"year"}),(0,s.jsx)(H.B,{width:30}),(0,s.jsx)(Q.u,{}),(0,s.jsx)(V.u,{type:"monotone",dataKey:"num_boys",stackId:"1",stroke:"#99ebff",fill:"#99ebff",name:"Boys"}),(0,s.jsx)(V.u,{type:"monotone",dataKey:"num_girls",stackId:"1",stroke:"#ffb3cb",fill:"#ffb3cb",name:"Girls"})]})}function lt(t){var e=t.stat.contest_with_most_girls,n=e.year,r=e.num_girls,a=e.num_participants;return(0,s.jsxs)("div",{children:[(0,s.jsx)(et,{year:n}),(0,s.jsx)(nt,{year:n})," was the contest with the highest number of girl, ",r," out of ",a," participants!"]})}function ut(t){var e=t.stat;return(0,s.jsxs)(X.T,{width:300,height:350,data:e.num_participants_per_year.years,className:o().image,children:[(0,s.jsx)($.q,{strokeDasharray:"3 3"}),(0,s.jsx)(Y.K,{dataKey:"year"}),(0,s.jsx)(H.B,{width:30}),(0,s.jsx)(Q.u,{}),(0,s.jsx)(V.u,{type:"monotone",dataKey:"num_participants",stackId:"1",stroke:"#226600",fill:"#4ce600",name:"Participants"})]})}function dt(t){var e=t.stat.most_used_location,n=e.location,r=e.years,a=r.slice(0,-2).map((function(t){return(0,s.jsxs)("span",{children:[(0,s.jsx)(nt,{year:t}),","," "]},"most-used-location-".concat(t))}));return a.push((0,s.jsx)("span",{children:(0,s.jsx)(nt,{year:r[r.length-2]})},"most-used-location-".concat(r[r.length-2]))),(0,s.jsxs)("div",{children:[(0,s.jsx)(st,{location:n}),n.location," is the most used location, it has beed used"," ",r.length," times, in ",a," and"," ",(0,s.jsx)(nt,{year:r[r.length-1]}),"."]})}function ht(t){var e=t.stat,n=null;return"contest_with_most_participants"in e&&(n=(0,s.jsx)(rt,{stat:e})),"contest_with_most_ex_aequo"in e&&(n=(0,s.jsx)(at,{stat:e})),"most_northern_contest"in e&&(n=(0,s.jsx)(it,{stat:e})),"most_southern_contest"in e&&(n=(0,s.jsx)(ot,{stat:e})),"num_boys_girls"in e&&(n=(0,s.jsx)(ct,{stat:e})),"num_participants_per_year"in e&&(n=(0,s.jsx)(ut,{stat:e})),"most_used_location"in e&&(n=(0,s.jsx)(dt,{stat:e})),"contest_with_most_girls"in e&&(n=(0,s.jsx)(lt,{stat:e})),(0,s.jsx)(u,{variant:"contest",children:n})}var _t=n(11163),ft=n(36377),mt=n.n(ft),xt=function(t){var e=t.home,n=function(){var t=(0,a.useState)(0),e=t[0],n=t[1],s=(0,_t.useRouter)();return(0,a.useEffect)((function(){var t=function(t){var e=t.split("#")[1];void 0!==e&&(n(Number(e)),window.history.replaceState("","",location.pathname+location.search))};return s.events.on("hashChangeComplete",t),function(){return s.events.off("hashChangeComplete",t)}}),[s,s.events]),(0,a.useEffect)((function(){n(Math.floor(1e5*Math.random()))}),[]),e}(),r=(0,a.useState)([]),i=r[0],o=r[1];return(0,a.useEffect)((function(){var t=mt()(n.toString()),r=[],a=!0,i=!1,c=void 0;try{for(var l,u=z(t,e.region,2)[Symbol.iterator]();!(a=(l=u.next()).done);a=!0){var d=l.value;r.push((0,s.jsx)(p,{stat:d},JSON.stringify(d)))}}catch(B){i=!0,c=B}finally{try{a||null==u.return||u.return()}finally{if(i)throw c}}var h=!0,_=!1,f=void 0;try{for(var m,x=z(t,e.user,2)[Symbol.iterator]();!(h=(m=x.next()).done);h=!0){var v=m.value;r.push((0,s.jsx)(O,{stat:v},JSON.stringify(v)))}}catch(B){_=!0,f=B}finally{try{h||null==x.return||x.return()}finally{if(_)throw f}}var j=!0,g=!1,y=void 0;try{for(var w,k=z(t,e.task,2)[Symbol.iterator]();!(j=(w=k.next()).done);j=!0){var b=w.value;r.push((0,s.jsx)(P,{stat:b},JSON.stringify(b)))}}catch(B){g=!0,y=B}finally{try{j||null==k.return||k.return()}finally{if(g)throw y}}var C=!0,T=!1,E=void 0;try{for(var S,M=z(t,e.contest,2)[Symbol.iterator]();!(C=(S=M.next()).done);C=!0){var F=S.value;r.push((0,s.jsx)(ht,{stat:F},JSON.stringify(F)))}}catch(B){T=!0,E=B}finally{try{C||null==M.return||M.return()}finally{if(T)throw E}}N(t,r),o(r)}),[e,n]),(0,s.jsx)(s.Fragment,{children:(0,s.jsx)(b,{tiles:i})})},vt=!0;function jt(t){var e=t.home;return(0,s.jsx)(r.A,{children:(0,s.jsx)(xt,{home:e})})}},79535:function(t){t.exports={tile:"tile_tile__63BUM",image:"tile_image__JUBTv",tileRegion:"tile_tileRegion__lsg81",tileUser:"tile_tileUser__Ugepw",tileTask:"tile_tileTask__75h_C",tileContest:"tile_tileContest__wrwaS"}},83350:function(t){t.exports={container:"tilesContainer_container__MgTW8"}},32554:function(t){t.exports={medals:"medals_medals__NeWR7",medal:"medals_medal__dYsxL"}},75042:function(){}},function(t){t.O(0,[432,793,821,774,888,179],(function(){return e=45301,t(t.s=e);var e}));var e=t.O();_N_E=e}]);