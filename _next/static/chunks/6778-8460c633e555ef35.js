"use strict";(globalThis.webpackChunk_N_E=globalThis.webpackChunk_N_E||[]).push([[6778],{16463:(e,t,i)=>{var s=i(71169);i.o(s,"usePathname")&&i.d(t,{usePathname:function(){return s.usePathname}}),i.o(s,"useRouter")&&i.d(t,{useRouter:function(){return s.useRouter}}),i.o(s,"useSearchParams")&&i.d(t,{useSearchParams:function(){return s.useSearchParams}})},93479:(e,t,i)=>{function s(e,t,i,s){return new(i||(i=Promise))(function(n,r){function o(e){try{u(s.next(e))}catch(e){r(e)}}function l(e){try{u(s.throw(e))}catch(e){r(e)}}function u(e){var t;e.done?n(e.value):((t=e.value)instanceof i?t:new i(function(e){e(t)})).then(o,l)}u((s=s.apply(e,t||[])).next())})}i.d(t,{Z:()=>y}),"function"==typeof SuppressedError&&SuppressedError;let n="KEYS",r="VALUES";class o{constructor(e,t){let i=e._tree,s=Array.from(i.keys());this.set=e,this._type=t,this._path=s.length>0?[{node:i,keys:s}]:[]}next(){let e=this.dive();return this.backtrack(),e}dive(){if(0===this._path.length)return{done:!0,value:void 0};let{node:e,keys:t}=l(this._path);if(""===l(t))return{done:!1,value:this.result()};let i=e.get(l(t));return this._path.push({node:i,keys:Array.from(i.keys())}),this.dive()}backtrack(){if(0===this._path.length)return;let e=l(this._path).keys;e.pop(),e.length>0||(this._path.pop(),this.backtrack())}key(){return this.set._prefix+this._path.map(({keys:e})=>l(e)).filter(e=>""!==e).join("")}value(){return l(this._path).node.get("")}result(){switch(this._type){case r:return this.value();case n:return this.key();default:return[this.key(),this.value()]}}[Symbol.iterator](){return this}}let l=e=>e[e.length-1],u=(e,t,i)=>{let s=new Map;if(void 0===t)return s;let n=t.length+1,r=n+i,o=new Uint8Array(r*n).fill(i+1);for(let e=0;e<n;++e)o[e]=e;for(let e=1;e<r;++e)o[e*n]=e;return h(e,t,i,s,o,1,n,""),s},h=(e,t,i,s,n,r,o,l)=>{let u=r*o;e:for(let d of e.keys())if(""===d){let t=n[u-1];t<=i&&s.set(l,[e.get(d),t])}else{let u=r;for(let e=0;e<d.length;++e,++u){let s=d[e],r=o*u,l=r-o,h=n[r],a=Math.max(0,u-i-1),c=Math.min(o-1,u+i);for(let e=a;e<c;++e){let i=s!==t[e],o=n[l+e]+ +i,u=n[l+e+1]+1,d=n[r+e]+1,a=n[r+e+1]=Math.min(o,u,d);a<h&&(h=a)}if(h>i)continue e}h(e.get(d),t,i,s,n,u,o,l+d)}};class d{constructor(e=new Map,t=""){this._size=void 0,this._tree=e,this._prefix=t}atPrefix(e){if(!e.startsWith(this._prefix))throw Error("Mismatched prefix");let[t,i]=a(this._tree,e.slice(this._prefix.length));if(void 0===t){let[t,s]=p(i);for(let i of t.keys())if(""!==i&&i.startsWith(s)){let n=new Map;return n.set(i.slice(s.length),t.get(i)),new d(n,e)}}return new d(t,e)}clear(){this._size=void 0,this._tree.clear()}delete(e){return this._size=void 0,m(this._tree,e)}entries(){return new o(this,"ENTRIES")}forEach(e){for(let[t,i]of this)e(t,i,this)}fuzzyGet(e,t){return u(this._tree,e,t)}get(e){let t=c(this._tree,e);return void 0!==t?t.get(""):void 0}has(e){let t=c(this._tree,e);return void 0!==t&&t.has("")}keys(){return new o(this,n)}set(e,t){if("string"!=typeof e)throw Error("key must be a string");return this._size=void 0,f(this._tree,e).set("",t),this}get size(){if(this._size)return this._size;this._size=0;let e=this.entries();for(;!e.next().done;)this._size+=1;return this._size}update(e,t){if("string"!=typeof e)throw Error("key must be a string");this._size=void 0;let i=f(this._tree,e);return i.set("",t(i.get(""))),this}fetch(e,t){if("string"!=typeof e)throw Error("key must be a string");this._size=void 0;let i=f(this._tree,e),s=i.get("");return void 0===s&&i.set("",s=t()),s}values(){return new o(this,r)}[Symbol.iterator](){return this.entries()}static from(e){let t=new d;for(let[i,s]of e)t.set(i,s);return t}static fromObject(e){return d.from(Object.entries(e))}}let a=(e,t,i=[])=>{if(0===t.length||null==e)return[e,i];for(let s of e.keys())if(""!==s&&t.startsWith(s))return i.push([e,s]),a(e.get(s),t.slice(s.length),i);return i.push([e,t]),a(void 0,"",i)},c=(e,t)=>{if(0===t.length||null==e)return e;for(let i of e.keys())if(""!==i&&t.startsWith(i))return c(e.get(i),t.slice(i.length))},f=(e,t)=>{let i=t.length;t:for(let s=0;e&&s<i;){for(let n of e.keys())if(""!==n&&t[s]===n[0]){let r=Math.min(i-s,n.length),o=1;for(;o<r&&t[s+o]===n[o];)++o;let l=e.get(n);if(o===n.length)e=l;else{let i=new Map;i.set(n.slice(o),l),e.set(t.slice(s,s+o),i),e.delete(n),e=i}s+=o;continue t}let n=new Map;return e.set(t.slice(s),n),n}return e},m=(e,t)=>{let[i,s]=a(e,t);if(void 0!==i){if(i.delete(""),0===i.size)_(s);else if(1===i.size){let[e,t]=i.entries().next().value;g(s,e,t)}}},_=e=>{if(0===e.length)return;let[t,i]=p(e);if(t.delete(i),0===t.size)_(e.slice(0,-1));else if(1===t.size){let[i,s]=t.entries().next().value;""!==i&&g(e.slice(0,-1),i,s)}},g=(e,t,i)=>{if(0===e.length)return;let[s,n]=p(e);s.set(n+t,i),s.delete(n)},p=e=>e[e.length-1];class y{constructor(e){if((null==e?void 0:e.fields)==null)throw Error('MiniSearch: option "fields" must be provided');let t=null==e.autoVacuum||!0===e.autoVacuum?C:e.autoVacuum;this._options=Object.assign(Object.assign(Object.assign({},x),e),{autoVacuum:t,searchOptions:Object.assign(Object.assign({},I),e.searchOptions||{}),autoSuggestOptions:Object.assign(Object.assign({},O),e.autoSuggestOptions||{})}),this._index=new d,this._documentCount=0,this._documentIds=new Map,this._idToShortId=new Map,this._fieldIds={},this._fieldLength=new Map,this._avgFieldLength=[],this._nextId=0,this._storedFields=new Map,this._dirtCount=0,this._currentVacuum=null,this._enqueuedVacuum=null,this._enqueuedVacuumConditions=M,this.addFields(this._options.fields)}add(e){let{extractField:t,tokenize:i,processTerm:s,fields:n,idField:r}=this._options,o=t(e,r);if(null==o)throw Error(`MiniSearch: document does not have ID field "${r}"`);if(this._idToShortId.has(o))throw Error(`MiniSearch: duplicate ID ${o}`);let l=this.addDocumentId(o);for(let r of(this.saveStoredFields(l,e),n)){let n=t(e,r);if(null==n)continue;let o=i(n.toString(),r),u=this._fieldIds[r],h=new Set(o).size;for(let e of(this.addFieldLength(l,u,this._documentCount-1,h),o)){let t=s(e,r);if(Array.isArray(t))for(let e of t)this.addTerm(u,l,e);else t&&this.addTerm(u,l,t)}}}addAll(e){for(let t of e)this.add(t)}addAllAsync(e,t={}){let{chunkSize:i=10}=t,s={chunk:[],promise:Promise.resolve()},{chunk:n,promise:r}=e.reduce(({chunk:e,promise:t},s,n)=>(e.push(s),(n+1)%i==0)?{chunk:[],promise:t.then(()=>new Promise(e=>setTimeout(e,0))).then(()=>this.addAll(e))}:{chunk:e,promise:t},s);return r.then(()=>this.addAll(n))}remove(e){let{tokenize:t,processTerm:i,extractField:s,fields:n,idField:r}=this._options,o=s(e,r);if(null==o)throw Error(`MiniSearch: document does not have ID field "${r}"`);let l=this._idToShortId.get(o);if(null==l)throw Error(`MiniSearch: cannot remove document with ID ${o}: it is not in the index`);for(let r of n){let n=s(e,r);if(null==n)continue;let o=t(n.toString(),r),u=this._fieldIds[r],h=new Set(o).size;for(let e of(this.removeFieldLength(l,u,this._documentCount,h),o)){let t=i(e,r);if(Array.isArray(t))for(let e of t)this.removeTerm(u,l,e);else t&&this.removeTerm(u,l,t)}}this._storedFields.delete(l),this._documentIds.delete(l),this._idToShortId.delete(o),this._fieldLength.delete(l),this._documentCount-=1}removeAll(e){if(e)for(let t of e)this.remove(t);else if(arguments.length>0)throw Error("Expected documents to be present. Omit the argument to remove all documents.");else this._index=new d,this._documentCount=0,this._documentIds=new Map,this._idToShortId=new Map,this._fieldLength=new Map,this._avgFieldLength=[],this._storedFields=new Map,this._nextId=0}discard(e){let t=this._idToShortId.get(e);if(null==t)throw Error(`MiniSearch: cannot discard document with ID ${e}: it is not in the index`);this._idToShortId.delete(e),this._documentIds.delete(t),this._storedFields.delete(t),(this._fieldLength.get(t)||[]).forEach((e,i)=>{this.removeFieldLength(t,i,this._documentCount,e)}),this._fieldLength.delete(t),this._documentCount-=1,this._dirtCount+=1,this.maybeAutoVacuum()}maybeAutoVacuum(){if(!1===this._options.autoVacuum)return;let{minDirtFactor:e,minDirtCount:t,batchSize:i,batchWait:s}=this._options.autoVacuum;this.conditionalVacuum({batchSize:i,batchWait:s},{minDirtCount:t,minDirtFactor:e})}discardAll(e){let t=this._options.autoVacuum;try{for(let t of(this._options.autoVacuum=!1,e))this.discard(t)}finally{this._options.autoVacuum=t}this.maybeAutoVacuum()}replace(e){let{idField:t,extractField:i}=this._options,s=i(e,t);this.discard(s),this.add(e)}vacuum(e={}){return this.conditionalVacuum(e)}conditionalVacuum(e,t){return this._currentVacuum?(this._enqueuedVacuumConditions=this._enqueuedVacuumConditions&&t,null!=this._enqueuedVacuum||(this._enqueuedVacuum=this._currentVacuum.then(()=>{let t=this._enqueuedVacuumConditions;return this._enqueuedVacuumConditions=M,this.performVacuuming(e,t)})),this._enqueuedVacuum):!1===this.vacuumConditionsMet(t)?Promise.resolve():(this._currentVacuum=this.performVacuuming(e),this._currentVacuum)}performVacuuming(e,t){return s(this,void 0,void 0,function*(){let i=this._dirtCount;if(this.vacuumConditionsMet(t)){let t=e.batchSize||z.batchSize,s=e.batchWait||z.batchWait,n=1;for(let[e,i]of this._index){for(let[e,t]of i)for(let[s]of t)this._documentIds.has(s)||(t.size<=1?i.delete(e):t.delete(s));0===this._index.get(e).size&&this._index.delete(e),n%t==0&&(yield new Promise(e=>setTimeout(e,s))),n+=1}this._dirtCount-=i}yield null,this._currentVacuum=this._enqueuedVacuum,this._enqueuedVacuum=null})}vacuumConditionsMet(e){if(null==e)return!0;let{minDirtCount:t,minDirtFactor:i}=e;return t=t||C.minDirtCount,i=i||C.minDirtFactor,this.dirtCount>=t&&this.dirtFactor>=i}get isVacuuming(){return null!=this._currentVacuum}get dirtCount(){return this._dirtCount}get dirtFactor(){return this._dirtCount/(1+this._documentCount+this._dirtCount)}has(e){return this._idToShortId.has(e)}getStoredFields(e){let t=this._idToShortId.get(e);if(null!=t)return this._storedFields.get(t)}search(e,t={}){let i=this.executeQuery(e,t),s=[];for(let[e,{score:n,terms:r,match:o}]of i){let i=r.length||1,l={id:this._documentIds.get(e),score:n*i,terms:Object.keys(o),queryTerms:r,match:o};Object.assign(l,this._storedFields.get(e)),(null==t.filter||t.filter(l))&&s.push(l)}return e===y.wildcard&&null==t.boostDocument&&null==this._options.searchOptions.boostDocument||s.sort(F),s}autoSuggest(e,t={}){t=Object.assign(Object.assign({},this._options.autoSuggestOptions),t);let i=new Map;for(let{score:s,terms:n}of this.search(e,t)){let e=n.join(" "),t=i.get(e);null!=t?(t.score+=s,t.count+=1):i.set(e,{score:s,terms:n,count:1})}let s=[];for(let[e,{score:t,terms:n,count:r}]of i)s.push({suggestion:e,terms:n,score:t/r});return s.sort(F),s}get documentCount(){return this._documentCount}get termCount(){return this._index.size}static loadJSON(e,t){if(null==t)throw Error("MiniSearch: loadJSON should be given the same options used when serializing the index");return this.loadJS(JSON.parse(e),t)}static loadJSONAsync(e,t){return s(this,void 0,void 0,function*(){if(null==t)throw Error("MiniSearch: loadJSON should be given the same options used when serializing the index");return this.loadJSAsync(JSON.parse(e),t)})}static getDefault(e){if(x.hasOwnProperty(e))return v(x,e);throw Error(`MiniSearch: unknown option "${e}"`)}static loadJS(e,t){let{index:i,documentIds:s,fieldLength:n,storedFields:r,serializationVersion:o}=e,l=this.instantiateMiniSearch(e,t);for(let[e,t]of(l._documentIds=E(s),l._fieldLength=E(n),l._storedFields=E(r),l._documentIds))l._idToShortId.set(t,e);for(let[e,t]of i){let i=new Map;for(let e of Object.keys(t)){let s=t[e];1===o&&(s=s.ds),i.set(parseInt(e,10),E(s))}l._index.set(e,i)}return l}static loadJSAsync(e,t){return s(this,void 0,void 0,function*(){let{index:i,documentIds:s,fieldLength:n,storedFields:r,serializationVersion:o}=e,l=this.instantiateMiniSearch(e,t);for(let[e,t]of(l._documentIds=yield L(s),l._fieldLength=yield L(n),l._storedFields=yield L(r),l._documentIds))l._idToShortId.set(t,e);let u=0;for(let[e,t]of i){let i=new Map;for(let e of Object.keys(t)){let s=t[e];1===o&&(s=s.ds),i.set(parseInt(e,10),(yield L(s)))}++u%1e3==0&&(yield T(0)),l._index.set(e,i)}return l})}static instantiateMiniSearch(e,t){let{documentCount:i,nextId:s,fieldIds:n,averageFieldLength:r,dirtCount:o,serializationVersion:l}=e;if(1!==l&&2!==l)throw Error("MiniSearch: cannot deserialize an index created with an incompatible version");let u=new y(t);return u._documentCount=i,u._nextId=s,u._idToShortId=new Map,u._fieldIds=n,u._avgFieldLength=r,u._dirtCount=o||0,u._index=new d,u}executeQuery(e,t={}){if(e===y.wildcard)return this.executeWildcardQuery(t);if("string"!=typeof e){let i=Object.assign(Object.assign(Object.assign({},t),e),{queries:void 0}),s=e.queries.map(e=>this.executeQuery(e,i));return this.combineResults(s,i.combineWith)}let{tokenize:i,processTerm:s,searchOptions:n}=this._options,r=Object.assign(Object.assign({tokenize:i,processTerm:s},n),t),{tokenize:o,processTerm:l}=r,u=o(e).flatMap(e=>l(e)).filter(e=>!!e).map(S(r)).map(e=>this.executeQuerySpec(e,r));return this.combineResults(u,r.combineWith)}executeQuerySpec(e,t){let i,s;let n=Object.assign(Object.assign({},this._options.searchOptions),t),r=(n.fields||this._options.fields).reduce((e,t)=>Object.assign(Object.assign({},e),{[t]:v(n.boost,t)||1}),{}),{boostDocument:o,weights:l,maxFuzzy:u,bm25:h}=n,{fuzzy:d,prefix:a}=Object.assign(Object.assign({},I.weights),l),c=this._index.get(e.term),f=this.termResults(e.term,e.term,1,c,r,o,h);if(e.prefix&&(i=this._index.atPrefix(e.term)),e.fuzzy){let t=!0===e.fuzzy?.2:e.fuzzy,i=t<1?Math.min(u,Math.round(e.term.length*t)):t;i&&(s=this._index.fuzzyGet(e.term,i))}if(i)for(let[t,n]of i){let i=t.length-e.term.length;if(!i)continue;null==s||s.delete(t);let l=a*t.length/(t.length+.3*i);this.termResults(e.term,t,l,n,r,o,h,f)}if(s)for(let t of s.keys()){let[i,n]=s.get(t);if(!n)continue;let l=d*t.length/(t.length+n);this.termResults(e.term,t,l,i,r,o,h,f)}return f}executeWildcardQuery(e){let t=new Map,i=Object.assign(Object.assign({},this._options.searchOptions),e);for(let[e,s]of this._documentIds){let n=i.boostDocument?i.boostDocument(s,"",this._storedFields.get(e)):1;t.set(e,{score:n,terms:[],match:{}})}return t}combineResults(e,t="or"){if(0===e.length)return new Map;let i=b[t.toLowerCase()];if(!i)throw Error(`Invalid combination operator: ${t}`);return e.reduce(i)||new Map}toJSON(){let e=[];for(let[t,i]of this._index){let s={};for(let[e,t]of i)s[e]=Object.fromEntries(t);e.push([t,s])}return{documentCount:this._documentCount,nextId:this._nextId,documentIds:Object.fromEntries(this._documentIds),fieldIds:this._fieldIds,fieldLength:Object.fromEntries(this._fieldLength),averageFieldLength:this._avgFieldLength,storedFields:Object.fromEntries(this._storedFields),dirtCount:this._dirtCount,index:e,serializationVersion:2}}termResults(e,t,i,s,n,r,o,l=new Map){if(null==s)return l;for(let u of Object.keys(n)){let h=n[u],d=this._fieldIds[u],a=s.get(d);if(null==a)continue;let c=a.size,f=this._avgFieldLength[d];for(let s of a.keys()){if(!this._documentIds.has(s)){this.removeTerm(d,s,t),c-=1;continue}let n=r?r(this._documentIds.get(s),t,this._storedFields.get(s)):1;if(!n)continue;let m=a.get(s),_=this._fieldLength.get(s)[d],g=i*h*n*w(m,c,this._documentCount,_,f,o),p=l.get(s);if(p){p.score+=g,k(p.terms,e);let i=v(p.match,t);i?i.push(u):p.match[t]=[u]}else l.set(s,{score:g,terms:[e],match:{[t]:[u]}})}}return l}addTerm(e,t,i){let s=this._index.fetch(i,V),n=s.get(e);if(null==n)(n=new Map).set(t,1),s.set(e,n);else{let e=n.get(t);n.set(t,(e||0)+1)}}removeTerm(e,t,i){if(!this._index.has(i)){this.warnDocumentChanged(t,e,i);return}let s=this._index.fetch(i,V),n=s.get(e);null==n||null==n.get(t)?this.warnDocumentChanged(t,e,i):1>=n.get(t)?n.size<=1?s.delete(e):n.delete(t):n.set(t,n.get(t)-1),0===this._index.get(i).size&&this._index.delete(i)}warnDocumentChanged(e,t,i){for(let s of Object.keys(this._fieldIds))if(this._fieldIds[s]===t){this._options.logger("warn",`MiniSearch: document with ID ${this._documentIds.get(e)} has changed before removal: term "${i}" was not present in field "${s}". Removing a document after it has changed can corrupt the index!`,"version_conflict");return}}addDocumentId(e){let t=this._nextId;return this._idToShortId.set(e,t),this._documentIds.set(t,e),this._documentCount+=1,this._nextId+=1,t}addFields(e){for(let t=0;t<e.length;t++)this._fieldIds[e[t]]=t}addFieldLength(e,t,i,s){let n=this._fieldLength.get(e);null==n&&this._fieldLength.set(e,n=[]),n[t]=s;let r=this._avgFieldLength[t]||0;this._avgFieldLength[t]=(r*i+s)/(i+1)}removeFieldLength(e,t,i,s){if(1===i){this._avgFieldLength[t]=0;return}let n=this._avgFieldLength[t]*i-s;this._avgFieldLength[t]=n/(i-1)}saveStoredFields(e,t){let{storeFields:i,extractField:s}=this._options;if(null==i||0===i.length)return;let n=this._storedFields.get(e);for(let r of(null==n&&this._storedFields.set(e,n={}),i)){let e=s(t,r);void 0!==e&&(n[r]=e)}}}y.wildcard=Symbol("*");let v=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)?e[t]:void 0,b={or:(e,t)=>{for(let i of t.keys()){let s=e.get(i);if(null==s)e.set(i,t.get(i));else{let{score:e,terms:n,match:r}=t.get(i);s.score=s.score+e,s.match=Object.assign(s.match,r),j(s.terms,n)}}return e},and:(e,t)=>{let i=new Map;for(let s of t.keys()){let n=e.get(s);if(null==n)continue;let{score:r,terms:o,match:l}=t.get(s);j(n.terms,o),i.set(s,{score:n.score+r,terms:n.terms,match:Object.assign(n.match,l)})}return i},and_not:(e,t)=>{for(let i of t.keys())e.delete(i);return e}},w=(e,t,i,s,n,r)=>{let{k:o,b:l,d:u}=r;return Math.log(1+(i-t+.5)/(t+.5))*(u+e*(o+1)/(e+o*(1-l+l*s/n)))},S=e=>(t,i,s)=>{let n="function"==typeof e.fuzzy?e.fuzzy(t,i,s):e.fuzzy||!1,r="function"==typeof e.prefix?e.prefix(t,i,s):!0===e.prefix;return{term:t,fuzzy:n,prefix:r}},x={idField:"id",extractField:(e,t)=>e[t],tokenize:e=>e.split(A),processTerm:e=>e.toLowerCase(),fields:void 0,searchOptions:void 0,storeFields:[],logger:(e,t)=>{"function"==typeof(null==console?void 0:console[e])&&console[e](t)},autoVacuum:!0},I={combineWith:"or",prefix:!1,fuzzy:!1,maxFuzzy:6,boost:{},weights:{fuzzy:.45,prefix:.375},bm25:{k:1.2,b:.7,d:.5}},O={combineWith:"and",prefix:(e,t,i)=>t===i.length-1},z={batchSize:1e3,batchWait:10},M={minDirtFactor:.1,minDirtCount:20},C=Object.assign(Object.assign({},z),M),k=(e,t)=>{e.includes(t)||e.push(t)},j=(e,t)=>{for(let i of t)e.includes(i)||e.push(i)},F=({score:e},{score:t})=>t-e,V=()=>new Map,E=e=>{let t=new Map;for(let i of Object.keys(e))t.set(parseInt(i,10),e[i]);return t},L=e=>s(void 0,void 0,void 0,function*(){let t=new Map,i=0;for(let s of Object.keys(e))t.set(parseInt(s,10),e[s]),++i%1e3==0&&(yield T(0));return t}),T=e=>new Promise(t=>setTimeout(t,e)),A=/[\n\r\p{Z}\p{P}]/u}}]);
//# sourceMappingURL=6778-8460c633e555ef35.js.map