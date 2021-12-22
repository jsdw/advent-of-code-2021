var app=function(){"use strict";function t(){}function e(t){return t()}function r(){return Object.create(null)}function n(t){t.forEach(e)}function i(t){return"function"==typeof t}function o(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function l(t,e){t.appendChild(e)}function s(t,e,r){t.insertBefore(e,r||null)}function a(t){t.parentNode.removeChild(t)}function f(t){return document.createElement(t)}function u(t){return document.createTextNode(t)}function c(){return u(" ")}function d(t,e,r,n){return t.addEventListener(e,r,n),()=>t.removeEventListener(e,r,n)}function p(t,e,r){null==r?t.removeAttribute(e):t.getAttribute(e)!==r&&t.setAttribute(e,r)}function h(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function m(t,e,r){t.classList[r?"add":"remove"](e)}let y;function g(t){y=t}const x=[],v=[],w=[],b=[],$=Promise.resolve();let k=!1;function M(t){w.push(t)}let z=!1;const I=new Set;function S(){if(!z){z=!0;do{for(let t=0;t<x.length;t+=1){const e=x[t];g(e),T(e.$$)}for(g(null),x.length=0;v.length;)v.pop()();for(let t=0;t<w.length;t+=1){const e=w[t];I.has(e)||(I.add(e),e())}w.length=0}while(x.length);for(;b.length;)b.pop()();k=!1,z=!1,I.clear()}}function T(t){if(null!==t.fragment){t.update(),n(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(M)}}const A=new Set;let R;function _(){R={r:0,c:[],p:R}}function E(){R.r||n(R.c),R=R.p}function j(t,e){t&&t.i&&(A.delete(t),t.i(e))}function L(t,e,r,n){if(t&&t.o){if(A.has(t))return;A.add(t),R.c.push((()=>{A.delete(t),n&&(r&&t.d(1),n())})),t.o(e)}}function N(t){t&&t.c()}function P(t,r,o,l){const{fragment:s,on_mount:a,on_destroy:f,after_update:u}=t.$$;s&&s.m(r,o),l||M((()=>{const r=a.map(e).filter(i);f?f.push(...r):n(r),t.$$.on_mount=[]})),u.forEach(M)}function O(t,e){const r=t.$$;null!==r.fragment&&(n(r.on_destroy),r.fragment&&r.fragment.d(e),r.on_destroy=r.fragment=null,r.ctx=[])}function W(t,e){-1===t.$$.dirty[0]&&(x.push(t),k||(k=!0,$.then(S)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function C(e,i,o,l,s,f,u,c=[-1]){const d=y;g(e);const p=e.$$={fragment:null,ctx:null,props:f,update:t,not_equal:s,bound:r(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(i.context||(d?d.$$.context:[])),callbacks:r(),dirty:c,skip_bound:!1,root:i.target||d.$$.root};u&&u(p.root);let h=!1;if(p.ctx=o?o(e,i.props||{},((t,r,...n)=>{const i=n.length?n[0]:r;return p.ctx&&s(p.ctx[t],p.ctx[t]=i)&&(!p.skip_bound&&p.bound[t]&&p.bound[t](i),h&&W(e,t)),r})):[],p.update(),h=!0,n(p.before_update),p.fragment=!!l&&l(p.ctx),i.target){if(i.hydrate){const t=function(t){return Array.from(t.childNodes)}(i.target);p.fragment&&p.fragment.l(t),t.forEach(a)}else p.fragment&&p.fragment.c();i.intro&&j(e.$$.fragment),P(e,i.target,i.anchor,i.customElement),S()}g(d)}class D{$destroy(){O(this,1),this.$destroy=t}$on(t,e){const r=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return r.push(e),()=>{const t=r.indexOf(e);-1!==t&&r.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function F(e){let r,i,o,y,g,x,v,w,b,$,k,M,z,I=e[5]>0?`solved in ${B(e[5])}`:"";return{c(){r=f("div"),i=f("em"),o=u("Star "),y=u(e[0]),g=u(":"),x=c(),v=f("div"),w=u(e[3]),b=c(),$=f("div"),k=u(I),p(i,"class","text svelte-1awrfhd"),p(v,"class","result svelte-1awrfhd"),m(v,"error",e[4]),p($,"class","timing svelte-1awrfhd"),p(r,"class","star svelte-1awrfhd"),m(r,"dragover",e[2]),m(r,"dragging",e[1])},m(t,n){s(t,r,n),l(r,i),l(i,o),l(i,y),l(i,g),l(r,x),l(r,v),l(v,w),l(r,b),l(r,$),l($,k),M||(z=[d(i,"click",e[11]),d(r,"dragstart",e[6]),d(r,"dragend",e[7]),d(r,"dragover",e[8]),d(r,"dragleave",e[9]),d(r,"drop",e[10])],M=!0)},p(t,[e]){1&e&&h(y,t[0]),8&e&&h(w,t[3]),16&e&&m(v,"error",t[4]),32&e&&I!==(I=t[5]>0?`solved in ${B(t[5])}`:"")&&h(k,I),4&e&&m(r,"dragover",t[2]),2&e&&m(r,"dragging",t[1])},i:t,o:t,d(t){t&&a(r),M=!1,n(z)}}}function B(t){return t>1e3?`${(t/1e3).toFixed(3)}s`:t<1?`${(1e3*t).toFixed(0)}μs`:`${t.toFixed(0)}ms`}function q(t,e,r){let{number:n}=e,{solver:i}=e,o=!1,l=!1,s="",a=!1,f=0;function u(t){r(3,s=""),r(4,a=!1),r(5,f=0),function(t){return new Promise(((e,r)=>{let n=new FileReader;n.onload=()=>{e(n.result)},n.onerror=()=>{r(n.error)},n.readAsText(t)}))}(t).then((t=>{let e=performance.now(),n=i(t),o=performance.now();r(3,s=n.value),r(5,f=o-e),"error"==n.kind?r(4,a=!0):r(4,a=!1)}))}return t.$$set=t=>{"number"in t&&r(0,n=t.number),"solver"in t&&r(12,i=t.solver)},[n,o,l,s,a,f,function(){r(1,o=!0)},function(){r(1,o=!1)},function(t){t.preventDefault(),t.stopPropagation(),r(2,l=!0)},function(t){r(2,l=!1)},function(t){var e;t.preventDefault(),t.stopPropagation(),r(2,l=!1);let n=null===(e=t.dataTransfer)||void 0===e?void 0:e.files[0];n&&u(n)},function(t){let e=document.createElement("input");e.type="file",e.oninput=function(t){var r;let n=null===(r=e.files)||void 0===r?void 0:r[0];n&&u(n)},e.click()},i]}class J extends D{constructor(t){super(),C(this,t,q,F,o,{number:0,solver:12})}}function H(t){let e,r;return e=new J({props:{number:2,solver:t[4]}}),{c(){N(e.$$.fragment)},m(t,n){P(e,t,n),r=!0},p(t,r){const n={};16&r&&(n.solver=t[4]),e.$set(n)},i(t){r||(j(e.$$.fragment,t),r=!0)},o(t){L(e.$$.fragment,t),r=!1},d(t){O(e,t)}}}function G(t){let e,r,n,i,o,d,m,y,g,x,v,w,b,$,k;b=new J({props:{number:1,solver:t[3]}});let M=t[4]&&H(t);return{c(){e=f("div"),r=f("h2"),n=u("Day "),i=u(t[1]),o=u(": \n        "),d=f("a"),m=u(t[0]),g=c(),x=f("p"),v=u(t[2]),w=c(),N(b.$$.fragment),$=c(),M&&M.c(),p(d,"href",y="https://adventofcode.com/2021/day/"+t[1]),p(r,"class","svelte-1gmmqs5"),p(x,"class","svelte-1gmmqs5"),p(e,"class","day")},m(t,a){s(t,e,a),l(e,r),l(r,n),l(r,i),l(r,o),l(r,d),l(d,m),l(e,g),l(e,x),l(x,v),l(e,w),P(b,e,null),l(e,$),M&&M.m(e,null),k=!0},p(t,[r]){(!k||2&r)&&h(i,t[1]),(!k||1&r)&&h(m,t[0]),(!k||2&r&&y!==(y="https://adventofcode.com/2021/day/"+t[1]))&&p(d,"href",y),(!k||4&r)&&h(v,t[2]);const n={};8&r&&(n.solver=t[3]),b.$set(n),t[4]?M?(M.p(t,r),16&r&&j(M,1)):(M=H(t),M.c(),j(M,1),M.m(e,null)):M&&(_(),L(M,1,1,(()=>{M=null})),E())},i(t){k||(j(b.$$.fragment,t),j(M),k=!0)},o(t){L(b.$$.fragment,t),L(M),k=!1},d(t){t&&a(e),O(b),M&&M.d()}}}function V(t,e,r){let{title:n}=e,{number:i}=e,{description:o}=e,{star1:l}=e,{star2:s}=e;return t.$$set=t=>{"title"in t&&r(0,n=t.title),"number"in t&&r(1,i=t.number),"description"in t&&r(2,o=t.description),"star1"in t&&r(3,l=t.star1),"star2"in t&&r(4,s=t.star2)},[n,i,o,l,s]}class X extends D{constructor(t){super(),C(this,t,V,G,o,{title:0,number:1,description:2,star1:3,star2:4})}}
/*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */function K(t,e,r,n){if("a"===r&&!n)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!n:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===r?n:"a"===r?n.call(t):n?n.value:e.get(t)}function Q(t,e,r,n,i){if("m"===n)throw new TypeError("Private method is not writable");if("a"===n&&!i)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!i:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===n?i.call(t,r):i?i.value=r:e.set(t,r),r}var U,Y,Z,tt,et,rt;function*nt(t,e){let r=0;for(;e.length>=r+t;){let n=[];for(let i=r;i<r+t;i++)n.push(e[i]);r++,yield n}}function*it(t,e){for(let r of t)yield e(r)}function*ot(t,e){for(let r of t)e(r)&&(yield r)}function*lt(t){let e=0;for(let r of t)yield[e,r],e++}function st(t,e,r){for(let n of t)e=r(e,n);return e}function at(t){let e=0;for(let r of t)e++;return e}function*ft(t,e){let r=t[Symbol.iterator](),n=e[Symbol.iterator]();for(;;){let t=r.next(),e=n.next();if(t.done||e.done)return;yield[t.value,e.value]}}function ut(t){let e=[];for(let r of t)e.push(r);return e}function ct(t,e){return t<e?[t,e]:[e,t]}function dt(t,e){for(let[r,n]of e)if(r(t))return n(t)}function pt(t){return function(e){return e===t}}class ht{constructor(t,e){U.set(this,void 0),Y.set(this,void 0),Z.set(this,void 0),Q(this,U,t,"f"),Q(this,Y,e,"f"),Q(this,Z,new Set,"f")}get[(U=new WeakMap,Y=new WeakMap,Z=new WeakMap,Symbol.iterator)](){return this.values.bind(this)}get size(){return K(this,Z,"f").size}has(t){return K(this,Z,"f").has(K(this,U,"f").call(this,t))}add(t){return K(this,Z,"f").add(K(this,U,"f").call(this,t))}delete(t){return K(this,Z,"f").delete(K(this,U,"f").call(this,t))}*values(){for(let t of K(this,Z,"f").values())yield K(this,Y,"f").call(this,t)}keys(){return this.values()}}class mt{constructor(t,e){tt.set(this,void 0),et.set(this,void 0),rt.set(this,void 0),Q(this,tt,t,"f"),Q(this,et,e,"f"),Q(this,rt,new Map,"f")}get[(tt=new WeakMap,et=new WeakMap,rt=new WeakMap,Symbol.iterator)](){return this.entries.bind(this)}get size(){return K(this,rt,"f").size}has(t){return K(this,rt,"f").has(K(this,tt,"f").call(this,t))}get(t){return K(this,rt,"f").get(K(this,tt,"f").call(this,t))}set(t,e){return K(this,rt,"f").set(K(this,tt,"f").call(this,t),e)}delete(t){return K(this,rt,"f").delete(K(this,tt,"f").call(this,t))}*keys(){for(let t of K(this,rt,"f").keys())yield K(this,et,"f").call(this,t)}values(){return K(this,rt,"f").values()}*entries(){for(let[t,e]of K(this,rt,"f").entries())yield[K(this,et,"f").call(this,t),e]}}let yt=t=>{let e=t.split("\n").map((t=>parseInt(t.trim(),10))),r=0;for(let[t,n]of nt(2,e))n>t&&r++;return r},gt=t=>{let e=it(nt(3,t.split("\n").map((t=>parseInt(t.trim(),10)))),(([t,e,r])=>t+e+r)),r=0;for(let[t,n]of nt(2,ut(e)))n>t&&r++;return r},xt=t=>{let e=wt(t),r=0,n=0;for(let t of e)"forward"==t.direction?r+=t.amount:"down"==t.direction?n+=t.amount:"up"==t.direction&&(n-=t.amount);return r*n},vt=t=>{let e=wt(t),r=0,n=0,i=0;for(let t of e)"forward"==t.direction?(r+=t.amount,n+=i*t.amount):"down"==t.direction?i+=t.amount:"up"==t.direction&&(i-=t.amount);return r*n};function wt(t){let e=[];for(let r of t.trim().split("\n")){let t=r.trim().match(/(forward|up|down)\s+([0-9]+)/);console.log(r,t),t&&e.push({direction:t[1],amount:Number(t[2])})}return e}let bt=t=>{let e=t.trim().split("\n").map((t=>t.trim())),r=kt(e).map((t=>"0"==t?0:1)).join(""),n=kt(e).map((t=>"0"==t?1:0)).join("");return parseInt(r,2)*parseInt(n,2)},$t=t=>{let e=t.trim().split("\n").map((t=>t.trim())),r=e[0].length,n=e.slice();for(let t=0;t<r;t++){let e=Mt(n,t);if(n=n.filter((r=>"="==e?"1"==r[t]:e==r[t])),1==n.length)break}let i=e.slice();for(let t=0;t<r;t++){let e=Mt(i,t);if(i=i.filter((r=>"="==e?"0"==r[t]:e!=r[t])),1==i.length)break}return parseInt(n[0],2)*parseInt(i[0],2)};function kt(t){let e=t[0].length,r=[];for(let n=0;n<e;n++)r.push(Mt(t,n));return r}function Mt(t,e){let r=0,n=0;for(let i of t)"1"==i[e]?n+=1:r+=1;return r>n?"0":r<n?"1":"="}let zt=t=>{let{numbers:e,boards:r}=Tt(t),n=Rt(e,r).next().value;if("number"==typeof n)return n;throw"Winning board not found"},It=t=>{let{numbers:e,boards:r}=Tt(t),n=function(t){let e;for(let r of t)e=r;return e}(Rt(e,r));if("number"==typeof n)return n;throw"Winning board not found"};function St(t){let e=t.length,r=t[0].length,n=new Map;for(let i=0;i<e;i++){let e=t[i];for(let t=0;t<r;t++){let r=e[t];n.set(r,{x:t,y:i})}}return n.width=r,n.height=e,n}function Tt(t){let e=t.trim().split("\n"),r=e[0].split(",").map((t=>parseInt(t.trim(),10))),n=[],i=[];for(let t of it(e.slice(1),(t=>t.trim())))0==t.length?(i.length&&n.push(St(i)),i=[]):i.push(t.split(/\s+/).map((t=>parseInt(t,10))));return{numbers:r,boards:n}}function At(t,e,r){let n=new Map,i=new Map;for(let{x:o,y:l}of r){let r=n.get(o)||0;if(n.set(o,r+1),r+1==t)return!0;if(r=i.get(l)||0,i.set(l,r+1),r+1==e)return!0}return!1}function*Rt(t,e){let r=new Set,n=function(t,e){let r=[];for(let n=0;n<t;n++)r.push(e());return r}(e.length,(()=>[]));for(let i of t)for(let[t,[o,l]]of lt(ft(e,n))){if(r.has(t))continue;let e=o.get(i);if(e&&(l.push(e),At(o.width,o.height,l))){r.add(t);let e=st(o.entries(),0,((t,[e,{x:r,y:n}])=>l.find((t=>t.x==r&&t.y==n))?t:t+e));yield e*i}}}let _t=t=>{let e=jt(t).filter((({from:t,to:e})=>t.x==e.x||t.y==e.y)),r=new mt((t=>JSON.stringify(t)),(t=>JSON.parse(t)));for(let t of e)for(let e of Lt(t)){let t=r.get(e)||0;r.set(e,t+1)}return at(ot(r.values(),(t=>t>1)))},Et=t=>{let e=jt(t),r=new mt((t=>JSON.stringify(t)),(t=>JSON.parse(t)));for(let t of e)for(let e of Lt(t)){let t=r.get(e)||0;r.set(e,t+1)}return at(ot(r.values(),(t=>t>1)))};function jt(t){return t.trim().split("\n").map((t=>{let[e,r,n,i,o]=t.trim().match(/([0-9]+),([0-9]+) -> ([0-9]+),([0-9]+)/);return{from:{x:parseInt(r,10),y:parseInt(n,10)},to:{x:parseInt(i,10),y:parseInt(o,10)}}}))}function*Lt({from:t,to:e}){let r=t.x<e.x?1:t.x>e.x?-1:0,n=t.y<e.y?1:t.y>e.y?-1:0;if(0!=r)for(let i=t.x,o=t.y;i!=e.x+r;i+=r)yield{x:i,y:o},o+=n;else if(0!=n)for(let i=t.x,o=t.y;o!=e.y+n;o+=n)yield{x:i,y:o},i+=r}let Nt=t=>{let e=Ot(t.trim().split(",").map((t=>parseInt(t,10))));for(let t=0;t<80;t++)e=Wt(e);return st(e.values(),0,((t,e)=>t+e))},Pt=t=>{let e=Ot(t.trim().split(",").map((t=>parseInt(t,10))));for(let t=0;t<256;t++)e=Wt(e);return st(e.values(),0,((t,e)=>t+e))};function Ot(t){let e=new Map;for(let r of t){let t=e.get(r)||0;e.set(r,t+1)}return e}function Wt(t){let e=new Map;for(let[r,n]of t.entries())0==r?(e.set(6,n+(e.get(6)||0)),e.set(8,n)):e.set(r-1,n+(e.get(r-1)||0));return e}let Ct=t=>Ft(t.trim().split(",").map((t=>parseInt(t,10))),((t,e)=>Math.abs(t-e))),Dt=t=>Ft(t.trim().split(",").map((t=>parseInt(t,10))),((t,e)=>{let r=Math.abs(t-e);return(r+1)/2*r}));function Ft(t,e){let[r,n]=t.reduce((([t,e],r)=>[Math.min(t,r),Math.max(e,r)]),[0,0]),i=Number.MAX_SAFE_INTEGER;for(let o=r;o<n;o++){let r=t.reduce(((t,r)=>t+e(r,o)),0);if(r<i&&(i=r),r>i)break}return i}let Bt=t=>{let e=Xt(t),r=0;for(let t of e)for(let e of t.output)[2,4,3,7].includes(e.length)&&r++;return r},qt=t=>{let e=Xt(t),r=0;for(let t of e){let e=Jt(t.input),n=t.output.map((t=>e.get(t))).join("");r+=parseInt(n,10)}return r};function Jt(t){let e=t.find((t=>2==t.length)),r=t.find((t=>4==t.length)),n=t.find((t=>3==t.length)),i=t.find((t=>7==t.length)),o=t.filter((t=>5==t.length)),[l,s]=Ht(o,(t=>Gt(t,e))),[a,f]=Ht(s,(t=>Gt(t,Vt(r,e)))),u=f[0],c=t.filter((t=>6==t.length)),[d,p]=Ht(c,(t=>!Gt(t,e))),[h,m]=Ht(p,(t=>!Gt(t,Vt(r,e)))),y=m[0];return new Map([[h,0],[e,1],[u,2],[l,3],[r,4],[a,5],[d,6],[n,7],[i,8],[y,9]])}function Ht(t,e){let r=t.filter(e)[0];if("string"!=typeof r)throw Error("Match not found in "+t+" with fn "+e.toString());return[r,t.filter((t=>t!=r))]}function Gt(t,e){for(let r of e)if(!t.includes(r))return!1;return!0}function Vt(t,e){let r="";for(let n of t)e.includes(n)||(r+=n);return r}function Xt(t){return t.trim().split("\n").map((t=>{let[e,r]=t.trim().split(" | ");return{input:e.split(" ").map((t=>t.split("").sort().join(""))),output:r.split(" ").map((t=>t.split("").sort().join("")))}}))}let Kt=t=>{let e=te(t),r=Zt(e),n=0;for(let{x:t,y:i,val:o}of Yt(e)){st(r(t,i),!0,((t,[r,n])=>t&&e[n][r]>o))&&(n+=o+1)}return n},Qt=t=>{let e=te(t),r=Zt(e),n=[];for(let{x:t,y:i,val:o}of Yt(e)){st(r(t,i),!0,((t,[r,n])=>t&&e[n][r]>o))&&n.push(Ut(t,i,e).size)}return n.sort(((t,e)=>e>t?-1:1)),n.pop()*n.pop()*n.pop()};function Ut(t,e,r){let n=Zt(r),i=new Set;return function t(e,o){for(let[l,s]of n(e,o)){let e=`${l},${s}`;9==r[s][l]||i.has(e)||(i.add(e),t(l,s))}}(t,e),i}function*Yt(t){for(let[e,r]of lt(t))for(let[t,n]of lt(r))yield{x:t,y:e,val:n}}function Zt(t){let e=t[0].length,r=t.length;return function*(t,n){t-1>=0&&(yield[t-1,n]),n-1>=0&&(yield[t,n-1]),t+1<e&&(yield[t+1,n]),n+1<r&&(yield[t,n+1])}}function te(t){return t.trim().split("\n").map((t=>t.trim().split("").map((t=>parseInt(t,10)))))}let ee=t=>{let e=t.trim().split("\n").map((t=>t.trim())),r=0;for(let t of e){let e=ne(t);"err"!=e.kind||(r+=dt(e.char,[[pt(")"),()=>3],[pt("]"),()=>57],[pt("}"),()=>1197],[pt(">"),()=>25137]])||0)}return r},re=t=>{let e=t.trim().split("\n").map((t=>t.trim())),r=[];for(let t of e){let e=ne(t);if("incomplete"==e.kind){let t=0;for(opener of e.openers.reverse()){t=5*t+(dt(opener,[[pt("("),()=>1],[pt("["),()=>2],[pt("{"),()=>3],[pt("<"),()=>4]])||0)}r.push(t)}}return r.sort(((t,e)=>t<e?-1:1)),r[Math.floor(r.length/2)]};function ne(t){let e=[];for(let r of t)if(["(","{","<","["].includes(r))e.push(r);else if([")","}",">","]"].includes(r)){if((dt(r,[[pt(")"),()=>"("],[pt("]"),()=>"["],[pt("}"),()=>"{"],[pt(">"),()=>"<"]])||"")!==e.pop())return{kind:"err",char:r}}return{kind:"incomplete",openers:e}}let ie=t=>{let e=ae(t),r=0;for(let t=0;t<100;t++){let t=le(e);e=t.grid,r+=t.flashes}return r},oe=t=>{let e=ae(t);for(let t=1;;t++){let r=le(e);if(e=r.grid,100===r.flashes)return t}};function le(t){let e=function(t){return t.map((t=>t.slice()))}(t),r=function(t){let e=t[0].length,r=t.length;function n(t,n){return t>=0&&t<e&&n>=0&&n<r}function*i(t,e){n(t,e)&&(yield[t,e])}return function*(t,e){yield*i(t-1,e-1),yield*i(t,e-1),yield*i(t+1,e-1),yield*i(t-1,e),yield*i(t+1,e),yield*i(t-1,e+1),yield*i(t,e+1),yield*i(t+1,e+1)}}(t);for(let{x:r,y:n,val:i}of se(t))e[n][r]=i+1;let n=new ht((([t,e])=>`${t},${e}`),(t=>t.split(",").map((t=>parseInt(t,10)))));function i(t,o){if(e[o][t]>9&&!n.has([t,o])){n.add([t,o]);for(let[n,l]of r(t,o))e[l][n]+=1,i(n,l)}}for(let{x:t,y:r}of se(e))i(t,r);for(let[t,r]of n)e[r][t]=0;return{grid:e,flashes:n.size}}function*se(t){for(let[e,r]of lt(t))for(let[t,n]of lt(r))yield{x:t,y:e,val:n}}function ae(t){return t.trim().split("\n").map((t=>t.trim().split("").map((t=>parseInt(t,10)))))}let fe=t=>de(ye(t),!1),ue=t=>de(ye(t),!0);function ce(t,e){let r=new Map(t),n=(r.get(e)||0)+1;return r.set(e,n),[r,e]}function de(t,e){let r=0,n=[[new Map([["start",1]]),"start"]];do{let{paths:i,done:o}=pe(n,t,e);n=i,r+=o}while(n.length>0);return r}function pe(t,e,r){let n=[],i=0;for(let[o,l]of t)for(let t of e.get(l)||[])"end"===t?i++:he([o,l],t,r)&&n.push(ce(o,t));return{paths:n,done:i}}function he([t,e],r,n){if("start"===r)return!1;if(me(r)){if(!t.has(r))return!0;if(!n)return!1;for(let[e,r]of t)if(me(e)&&2==r)return!1;return!0}return!!me(e)||!t.has(r)}function me(t){return t.toLowerCase()===t}function ye(t){return t.trim().split("\n").map((t=>t.trim().split("-"))).reduce(((t,[e,r])=>{function n(e,r){let n=t.get(e)||[];n.push(r),t.set(e,n)}return n(e,r),n(r,e),t}),new Map)}let ge=t=>{let{points:e,folds:r}=we(t);return ve(e,r[0]).size},xe=t=>{let{points:e,folds:r}=we(t);for(let t of r)e=ve(e,t);return console.log(function(t){let[e,r]=st(t,[0,0],(([t,e],[r,n])=>[Math.max(t,r),Math.max(e,n)])),n="";for(let i=0;i<=r;i++){for(let r=0;r<=e;r++)t.has([r,i])?n+="#":n+=".";n+="\n"}return n}(e)),"Look in dev console.."};function ve(t,e){let r=be();if("up"==e.to)for(let[n,i]of t)i<e.y?r.add([n,i]):i>e.y&&r.add([n,e.y-(i-e.y)]);else for(let[n,i]of t)n<e.x?r.add([n,i]):n>e.x&&r.add([e.x-(n-e.x),i]);return r}function we(t){let[e,r]=t.trim().split("\n\n"),n=be();e.trim().split("\n").map((t=>t.split(",").map((t=>parseInt(t,10))))).forEach((t=>n.add(t)));let i=r.trim().split("\n").map((t=>{let[e,r,n]=t.match(/([xy])=([0-9]+)/),i=parseInt(n,10);return"x"==r?{to:"left",x:i}:{to:"up",y:i}}));return{points:n,folds:i}}function be(){return new ht((([t,e])=>`${t},${e}`),(t=>t.split(",").map((t=>parseInt(t,10)))))}let $e=t=>{let{tpl:e,mappings:r,start:n,end:i}=Ie(t);for(let t=0;t<10;t++)e=ze(e,r);return Me(e,n,i)},ke=t=>{let{tpl:e,mappings:r,start:n,end:i}=Ie(t);for(let t=0;t<40;t++)e=ze(e,r);return Me(e,n,i)};function Me(t,e,r){let[n,i]=st(function(t,e,r){let n=new Map;for(let[e,r]of t.entries())for(let t of e)n.set(t,(n.get(t)||0)+r);for(let[t,i]of n.entries())t!==e&&t!==r||i++,n.set(t,i/2);return n}(t,e,r).values(),[1/0,-1/0],(([t,e],r)=>[Math.min(t,r),Math.max(e,r)]));return i-n}function ze(t,e){let r=new Map;for(let[n,i]of t.entries()){let t=e.get(n);if(!t)throw`${n} does not match anything!`;let[o,l]=n.split("");r.set(`${o}${t}`,(r.get(`${o}${t}`)||0)+i),r.set(`${t}${l}`,(r.get(`${t}${l}`)||0)+i)}return r}function Ie(t){let[e,r]=t.trim().split("\n\n"),n=new Map;for(let[t,r]of nt(2,e.trim().split("")))n.set(`${t}${r}`,1);let i=new Map;for(let t of r.trim().split("\n")){let[e,r]=t.split(" -> ");i.set(e,r)}return{tpl:n,mappings:i,start:e[0],end:e[e.length-1]}}let Se=t=>{let e=Re(t).map((t=>t.map((t=>({risk:t,totalRisk:1/0})))));return e[0][0].totalRisk=0,Ae(e)},Te=t=>{let e=function(t){let e=t[0].length,r=t.length,n=[];function i(t){return(t-1)%9+1}for(let o=0;o<r;o++){let r=[];for(let n=0;n<5;n++)for(let l=0;l<e;l++)r.push({risk:i(t[o][l]+n),totalRisk:1/0});n.push(r)}for(let t=1;t<5;t++)for(let e=0;e<r;e++)n.push(n[e].map((e=>({risk:i(e.risk+t),totalRisk:1/0}))));return n}(Re(t));return e[0][0].totalRisk=0,Ae(e)};function Ae(t){t[0][0].totalRisk=0;let e=function(t){let e=t[0].length,r=t.length;return function*(t,n){t-1>=0&&(yield[t-1,n]),n-1>=0&&(yield[t,n-1]),t+1<e&&(yield[t+1,n]),n+1<r&&(yield[t,n+1])}}(t),r=[[0,0]];for(;r.length>0;){let[n,i]=r.pop(),o=t[i][n].totalRisk;for(let[l,s]of e(n,i)){let e=t[s][l];e.risk+o<e.totalRisk&&(e.totalRisk=e.risk+o,r.push([l,s]),r.sort((([e,r],[n,i])=>t[r][e].totalRisk<t[i][n].totalRisk?1:-1)))}}let n=t[t.length-1];return n[n.length-1].totalRisk}function Re(t){return t.trim().split("\n").map((t=>t.split("").map((t=>parseInt(t,10)))))}let _e=t=>{let[e,r]=Ne(Le(t.trim()),1/0);return function t(e){let r=0;for(let n of e)r+=n.version,4!==n.type&&(r+=t(n.children));return r}(e)},Ee=t=>{let[e,r]=Ne(Le(t.trim()),1/0);return je(e[0])};function je(t){if(0===t.type)return t.children.slice(1).reduce(((t,e)=>t+je(e)),je(t.children[0]));if(1===t.type)return t.children.slice(1).reduce(((t,e)=>t*je(e)),je(t.children[0]));if(2===t.type)return t.children.reduce(((t,e)=>Math.min(t,je(e))),1/0);if(3===t.type)return t.children.reduce(((t,e)=>Math.max(t,je(e))),-1/0);if(4===t.type)return t.value;if(5===t.type)return je(t.children[0])>je(t.children[1])?1:0;if(6===t.type)return je(t.children[0])<je(t.children[1])?1:0;if(7===t.type)return je(t.children[0])==je(t.children[1])?1:0;throw`unexpected type ${t.type}`}function Le(t){let e="";for(let r of t){let t=Number(parseInt(r,16)).toString(2);for(;t.length<4;)t="0"+t;e+=t}return e}function Ne(t,e){let r=[];for(;t.length>5&&e>0;){let[n,i]=Pe(t);t=i,r.push(n),e--}return[r,t]}function Pe(t){let e=parseInt(t.slice(0,3),2),r=parseInt(t.slice(3,6),2);if(t=t.slice(6),4==r){let{value:n,rest:i}=function(t){let e="",r=!0;do{let n=Oe(t);t=n.rest,e+=n.bits,r=n.more}while(r);return{value:parseInt(e,2),rest:t}}(t);return[{type:r,version:e,value:n},i]}{let{children:n,rest:i}=function(t){let e=t.slice(0,1);if(t=t.slice(1),"0"===e){let e=parseInt(t.slice(0,15),2),[r,n]=Ne(t.slice(15,15+e),1/0);return{children:r,rest:t.slice(15+e)}}{let e=parseInt(t.slice(0,11),2),[r,n]=Ne(t.slice(11),e);return{children:r,rest:n}}}(t);return[{type:r,version:e,children:n},i]}}function Oe(t){let e=t.slice(0,5),r="1"===e[0];return{bits:e.slice(1),rest:t.slice(5),more:r}}let We=t=>{let e=Fe(t),r=Math.abs(e.bottom)-1;return((r-1)/2+1)*r},Ce=t=>{let e=Fe(t),r=e.bottom,n=Math.abs(e.bottom),i=e.right,o=0;for(let t=1;t<=i;t++)for(let i=r;i<=n;i++)De(t,i,e)&&o++;return o};function De(t,e,r){let n=0,i=0;for(;;){if(n+=t,i+=e,n>=r.left&&n<=r.right&&i<=r.top&&i>=r.bottom)return!0;if(e-=1,0==(t=Math.max(t-1,0))&&(n<r.left||n>r.right))return!1;if(n>r.right||i<r.bottom)return!1}}function Fe(t){let[e,r,n,i,o]=t.match(/(-?[0-9]+)\.\.(-?[0-9]+)[^-0-9]+(-?[0-9]+)\.\.(-?[0-9]+)/),[l,s]=ct(parseInt(r,10),parseInt(n,10)),[a,f]=ct(parseInt(i,10),parseInt(o,10));return{top:f,left:l,bottom:a,right:s}}let Be=t=>Je(Ge(t).reduce(He)),qe=t=>{let e=Ge(t),r=0;for(let t=0;t<e.length;t++)for(let n=0;n<e.length;n++){if(t===n)continue;let i=Je(He(e[t],e[n]));i>r&&(r=i)}return r};function Je(t){return Array.isArray(t)?3*Je(t[0])+2*Je(t[1]):t}function He(t,e){return function(t){function e(t,r){return Array.isArray(t)?[e(t[0],r),t[1]]:t+r}function r(t,e){return Array.isArray(t)?[t[0],r(t[1],e)]:t+e}let n=!1;function i(t){return n?t:Array.isArray(t)?[i(t[0]),i(t[1])]:"number"==typeof t&&t>=10?(n=!0,[Math.floor(t/2),Math.ceil(t/2)]):t}function o(t){function i(t,o){if(Array.isArray(t)&&o<4){let n=i(t[0],o+1);t=[n.new,t[1]],n.addToRight&&(t[1]=e(t[1],n.addToRight));let l=i(t[1],o+1);return t=[t[0],l.new],l.addToLeft&&(t[0]=r(t[0],l.addToLeft)),{new:t,addToLeft:n.addToLeft,addToRight:l.addToRight}}return Array.isArray(t)&&4==o&&"number"==typeof t[0]&&"number"==typeof t[1]?(n=!0,{new:0,addToLeft:t[0],addToRight:t[1]}):{new:t}}return i(t,0).new}do{n=!1,t=i(t=o(t))}while(n);return t}([t,e])}function Ge(t){return t.trim().split("\n").map((t=>JSON.parse(t)))}let Ve=t=>{let e=Ke(rr(t)),r=Ye();for(let{coords:t}of e)for(let e of t)r.add(e);return r.size},Xe=t=>{let e=Ke(rr(t)),r=0;for(let t=0;t<e.length;t++)for(let o=t+1;o<e.length;o++)r=Math.max(r,(n=e[t].scanner,i=e[o].scanner,Math.abs(n.x-i.x)+Math.abs(n.y-i.y)+Math.abs(n.z-i.z)));var n,i;return r};function Ke(t){let e=[{coords:Ue(Qe(t,0)),scanner:{x:0,y:0,z:0}}];for(let r=0;r<e.length;r++){console.log(`${e.length} found, ${t.length} to go`);let{coords:n,scanner:i}=e[r];for(let r=0;r<t.length;r++)for(let o of Ze(n,t[r])){let l=0,s=ut(o.bs);for(let t of s)n.has(t)&&l++;if(l>=12){Qe(t,r),i.x,o.scanner.x,i.y,o.scanner.y,i.z,o.scanner.z,e.push({coords:Ue(s),scanner:o.scanner}),r--;break}}}return e}function Qe(t,e){let r=t[e];return t[e]=t[t.length-1],t.pop(),r}function Ue(t){let e=Ye();for(let r of t)e.add(r);return e}function Ye(){return new ht((({x:t,y:e,z:r})=>`${t},${e},${r}`),(t=>{let[e,r,n]=t.split(",");return{x:parseInt(e,10),y:parseInt(r,10),z:parseInt(n,10)}}))}function*Ze(t,e){for(let r of function*(){function*t(){yield({x:t,y:e,z:r})=>({x:t,y:e,z:r}),yield({x:t,y:e,z:r})=>({x:t,y:-r,z:e}),yield({x:t,y:e,z:r})=>({x:t,y:-e,z:-r}),yield({x:t,y:e,z:r})=>({x:t,y:r,z:-e})}function*e(t){yield({x:e,y:r,z:n})=>t({x:n,y:r,z:-e}),yield({x:e,y:r,z:n})=>t({x:-e,y:r,z:-n}),yield({x:e,y:r,z:n})=>t({x:-n,y:r,z:e})}function*r(t){yield({x:e,y:r,z:n})=>t({x:r,y:-e,z:n}),yield({x:e,y:r,z:n})=>t({x:-r,y:e,z:n})}for(let n of t())yield n,yield*e(n),yield*r(n)}()){let n=ut(it(e,r));yield*tr(t,n)}}function*tr(t,e){for(let r of function*(t,e){for(let r of t)for(let t of e)yield{x:r.x-t.x,y:r.y-t.y,z:r.z-t.z}}(t,e)){let t=er(e,r);yield{bs:t,scanner:r}}}function*er(t,e){for(let r of t)yield{x:r.x+e.x,y:r.y+e.y,z:r.z+e.z}}function rr(t){return t.trim().split(/--- scanner [0-9]+ ---/).filter((t=>t.trim().length>0)).map((t=>t.trim().split("\n").map((t=>{let[e,r,n]=t.trim().split(",").map((t=>parseInt(t,10)));return{x:e,y:r,z:n}}))))}let nr=t=>{let[e,r]=cr(t);return r=or(r,e,2),r.size},ir=t=>{let[e,r]=cr(t);return r=or(r,e,50),r.size};function or(t,e,r){let n=e[0],i=function(t){let e=1/0,r=-1/0,n=1/0,i=-1/0;for(let[o,l]of t)e=Math.min(e,l),r=Math.max(r,l),n=Math.min(n,o),i=Math.max(i,o);return{top:e,bottom:r,left:n,right:i}}(t),o=!1;for(let l=0;l<r;l++)t=lr(t,e,i,o),o=n?!o:o,i=sr(i,1);return t}function lr(t,e,r,n){let i=ur(),{top:o,left:l,bottom:s,right:a}=r;for(let f=o-1;f<=s+1;f++)for(let o=l-1;o<=a+1;o++){e[ar([o,f],t,r,n)]&&i.add([o,f])}return i}function sr({top:t,bottom:e,left:r,right:n},i){return{top:t-i,bottom:e+i,left:r-i,right:n+i}}function ar([t,e],r,n,i){let o="";for(let[l,s]of function*(){yield[-1,-1],yield[0,-1],yield[1,-1],yield[-1,0],yield[0,0],yield[1,0],yield[-1,1],yield[0,1],yield[1,1]}()){fr([t+l,e+s],r,n,i)?o+="1":o+="0"}return parseInt(o,2)}function fr([t,e],r,n,i){return t<n.left||t>n.right||e<n.top||e>n.bottom?i:r.has([t,e])}function ur(){const t=16384;return new ht((([e,r])=>e+t<<15|r+t),(e=>[(e>>15)-t,(32767&e)-t]))}function cr(t){let e=t.trim().split("\n").filter((t=>t.length>0)),r=ut(it(e.shift(),(t=>"#"===t))),n=ur();for(let[t,r]of lt(e))for(let[e,i]of lt(r))"#"==i&&n.add([e,t]);return[r,n]}function dr(t,e,r){const n=t.slice();return n[1]=e[r],n[3]=r,n}function pr(e){let r,n;return r=new X({props:{title:e[1].title,number:e[3]+1,description:e[1].description,star1:mr(e[1].star1),star2:e[1].star2?mr(e[1].star2):void 0}}),{c(){N(r.$$.fragment)},m(t,e){P(r,t,e),n=!0},p:t,i(t){n||(j(r.$$.fragment,t),n=!0)},o(t){L(r.$$.fragment,t),n=!1},d(t){O(r,t)}}}function hr(t){let e,r,n,i,o,u,d,h=t[0],m=[];for(let e=0;e<h.length;e+=1)m[e]=pr(dr(t,h,e));const y=t=>L(m[t],1,1,(()=>{m[t]=null}));return{c(){e=f("div"),r=f("main"),n=f("h1"),n.innerHTML='<a href="https://adventofcode.com/2021">Advent of Code 2021</a>',i=c(),o=f("p"),o.textContent="To view the result for a given star, click or drag to upload some input data for it.",u=c();for(let t=0;t<m.length;t+=1)m[t].c();p(r,"class","svelte-1jxmuid"),p(e,"class","outer svelte-1jxmuid")},m(t,a){s(t,e,a),l(e,r),l(r,n),l(r,i),l(r,o),l(r,u);for(let t=0;t<m.length;t+=1)m[t].m(r,null);d=!0},p(t,[e]){if(1&e){let n;for(h=t[0],n=0;n<h.length;n+=1){const i=dr(t,h,n);m[n]?(m[n].p(i,e),j(m[n],1)):(m[n]=pr(i),m[n].c(),j(m[n],1),m[n].m(r,null))}for(_(),n=h.length;n<m.length;n+=1)y(n);E()}},i(t){if(!d){for(let t=0;t<h.length;t+=1)j(m[t]);d=!0}},o(t){m=m.filter(Boolean);for(let t=0;t<m.length;t+=1)L(m[t]);d=!1},d(t){t&&a(e),function(t,e){for(let r=0;r<t.length;r+=1)t[r]&&t[r].d(e)}(m,t)}}}function mr(t){return function(e){try{return{kind:"success",value:t(e)}}catch(t){return{kind:"error",value:String(t)}}}}function yr(t){return[[{title:"Sonar Sweep",description:"How many times does the depth increase?",star1:yt,star2:gt},{title:"Dive!",description:"Submarine forward/up/down piloting",star1:xt,star2:vt},{title:"Binary Diagnostic",description:"Gamma and epsilon rates from most/least common binary bits",star1:bt,star2:$t},{title:"Giant Squid",description:"Playing bingo with a squid",star1:zt,star2:It},{title:"Hydrothermal Venture",description:"Avoiding lines of hydrothermal vents",star1:_t,star2:Et},{title:"Lanternfish",description:"Array of fish multiplying every 7 days",star1:Nt,star2:Pt},{title:"The Treachery of Whales",description:"Align crabs horizontally using least fuel",star1:Ct,star2:Dt},{title:"Seven Segment Search",description:"Read digits from digital displays with scrambled wires",star1:Bt,star2:qt},{title:"Smoke Basin",description:"Find lowest points and basin sizes in the cave",star1:Kt,star2:Qt},{title:"Syntax Scoring",description:"Working with {[<( syntax chunks",star1:ee,star2:re},{title:"Dumbo Octopus",description:"10x10 grid, octopus flashing when energy hits 9; count them",star1:ie,star2:oe},{title:"Passage Pathing",description:"Find routes through a graph with upper and lowercase letters",star1:fe,star2:ue},{title:"Transparent Origami",description:"Fold up transparent paper with dots on",star1:ge,star2:xe},{title:"Extended Polymerization",description:"'CH -> B' Inserting elements between pairs (fun!)",star1:$e,star2:ke},{title:"Chiton",description:"Find the path with minimal risk through the 2D cavern",star1:Se,star2:Te},{title:"Packet Decoder",description:"Decoding hex to binary to packets with numbers and operators",star1:_e,star2:Ee},{title:"Trick Shot",description:"Set x,y trajectory of probe so it passes through the target area",star1:We,star2:Ce},{title:"Snailfish",description:"Adding pairs of numbers and reducing them by splitting and exploding",star1:Be,star2:qe},{title:"Beacon Scanner",description:"Relative coords of beacons from scanners.. assemble the map",star1:Ve,star2:Xe},{title:"Trench Map",description:"Infinite 2d image; repeatedly mapping groups of 9 pixels to a new value",star1:nr,star2:ir}]]}return new class extends D{constructor(t){super(),C(this,t,yr,hr,o,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
