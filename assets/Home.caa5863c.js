import{f as e,u as t,g as a,h as s,o as i,c as l,b as o,w as n,i as r,t as c,j as v,_ as f,p as d,k as u,F as m,l as k,r as p,e as h,m as g}from"./app.7b464a41.js";d("data-v-630fe728");const y={key:0,class:"home-hero"},x={key:0,class:"figure"},_=["src","alt"],b={key:1,id:"main-title",class:"title"},I={key:2,class:"description"};u();var T=e({setup(e){const{site:d,frontmatter:u}=t(),m=a((()=>{const{heroImage:e,heroText:t,tagline:a,actionLink:s,actionText:i}=u.value;return e||t||a||s&&i})),k=a((()=>u.value.heroText||d.value.title));return(e,t)=>s(m)?(i(),l("header",y,[s(u).heroImage?(i(),l("figure",x,[o("img",{class:"image",src:s(n)(s(u).heroImage),alt:s(u).heroAlt},null,8,_)])):r("v-if",!0),s(k)?(i(),l("h1",b,c(s(k)),1)):r("v-if",!0),s(u).tagline?(i(),l("p",I,c(s(u).tagline),1)):r("v-if",!0),s(u).actionLink&&s(u).actionText?(i(),v(f,{key:3,item:{link:s(u).actionLink,text:s(u).actionText},class:"action"},null,8,["item"])):r("v-if",!0),s(u).altActionLink&&s(u).altActionText?(i(),v(f,{key:4,item:{link:s(u).altActionLink,text:s(u).altActionText},class:"action alt"},null,8,["item"])):r("v-if",!0)])):r("v-if",!0)}});T.__scopeId="data-v-630fe728",d("data-v-245bde66");const A={key:0,class:"home-features"},L={class:"wrapper"},$={class:"container"},j={class:"features"},w={key:0,class:"title"},C={key:1,class:"details"};u();var F=e({setup(e){const{frontmatter:n}=t(),v=a((()=>n.value.features&&n.value.features.length>0)),f=a((()=>n.value.features?n.value.features:[]));return(e,t)=>s(v)?(i(),l("div",A,[o("div",L,[o("div",$,[o("div",j,[(i(!0),l(m,null,k(s(f),((e,t)=>(i(),l("section",{key:t,class:"feature"},[e.title?(i(),l("h2",w,c(e.title),1)):r("v-if",!0),e.details?(i(),l("p",C,c(e.details),1)):r("v-if",!0)])))),128))])])])])):r("v-if",!0)}});F.__scopeId="data-v-245bde66",d("data-v-bff49316");const q={key:0,class:"footer"},z={class:"container"},B={class:"text"};u();var D=e({setup(e){const{frontmatter:a}=t();return(e,t)=>s(a).footer?(i(),l("footer",q,[o("div",z,[o("p",B,c(s(a).footer),1)])])):r("v-if",!0)}});D.__scopeId="data-v-bff49316",d("data-v-40a20ed2");const E={class:"home","aria-labelledby":"main-title"},G={class:"home-content"};u();var H=e({setup:e=>(e,t)=>{const a=p("Content");return i(),l("main",E,[h(T),g(e.$slots,"hero",{},void 0,!0),h(F),o("div",G,[h(a)]),g(e.$slots,"features",{},void 0,!0),h(D),g(e.$slots,"footer",{},void 0,!0)])}});H.__scopeId="data-v-40a20ed2";export{H as default};
