(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-fc98cbf0"],{1199:function(t,i,s){},"1c62":function(t,i,s){"use strict";s.r(i);var e=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"home"},[s("div",{staticClass:"bg",style:"height: "+t.bgHeight+"px"},[s("div",{staticClass:"bg-content loading waiting"},[s("h1",{staticClass:"title"},[t._v(" PY's Blog")]),s("h3",{staticClass:"sub-title"},[t._v("welcome to my blog")]),s("el-button",{staticClass:"btn",attrs:{type:"primary"},on:{click:t.handleClickToblog}},[t._v("Enter blog")])],1),s("i",{staticClass:"el-icon-arrow-down bg-icon",on:{click:t.handletoHot}})]),s("div",{class:["menu",{click:t.ifclick}]},[s("div",{staticClass:"btn",on:{click:t.handleClick}},[s("span",{staticClass:"line"}),s("span",{staticClass:"line"}),s("span",{staticClass:"line"})]),s("div",{staticClass:"cover"},[s("div",{staticClass:"point"},[s("router-link",{attrs:{to:"/"}},[t._v("首页")]),s("router-link",{attrs:{to:"/blog/0"}},[t._v("博客")]),s("router-link",{attrs:{to:"/message"}},[t._v("留言")])],1),t._m(0),s("div",{staticClass:"cover-logo"},[t._v("py's blog")])])]),s("div",{staticClass:"hot"},[t._m(1),s("ul",{staticClass:"list loading waiting"},t._l(t.articleHotList,(function(i,e){return s("li",{key:e},[s("div",{staticClass:"detail"},[s("div",{staticClass:"title"},[s("a",{attrs:{href:"javascript:;"}},[t._v(t._s(i.title))])]),s("div",{staticClass:"time"},[t._v(t._s(i.date))]),s("div",{staticClass:"content"},[t._v(t._s(i.content))]),s("router-link",{staticClass:"link",attrs:{to:"article/"+i._id}},[t._v("阅读更多>>")])],1)])})),0)]),s("div",{staticClass:"home-box"},[s("div",{staticClass:"home-box-about loading waiting"},[s("router-link",{staticClass:"box-about",attrs:{to:"/about"}},[t._v("关于")]),s("router-link",{staticClass:"box-about",attrs:{to:"/daily"}},[t._v("个人作品")])],1)]),t._m(2)])},a=[function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"github"},[s("a",{staticClass:"github-link",attrs:{href:"https://github.com/ximengpy"}},[s("p",[t._v(" github地址: ")]),s("span",[t._v("https://github.com/ximengpy")])])])},function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:" hot-main"},[s("div",{staticClass:"loading waiting text"},[s("h2",{staticClass:"title"},[t._v("热门文章")]),s("p",{staticClass:"text"},[t._v("很想给你写封信，告诉你这里的天气")]),s("p",{staticClass:"text"},[t._v("昨夜的那场电影，还有你的心情")])])])},function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"intro"},[s("h2",[t._v("记录技术上的点点滴滴~~")])])}],n=(s("4160"),s("159b"),s("365c")),l={name:"Home",data:function(){return{bgHeight:0,ifclick:!1,articleHotList:[],imgurl:[s("3276"),s("9a48"),s("2da7")]}},methods:{getwindowHeight:function(){this.bgHeight=window.innerHeight},handleClick:function(){this.ifclick=!this.ifclick},handleScroll:function(){var t=document.querySelectorAll(".waiting");t.forEach((function(t){var i=t.getBoundingClientRect(),s=i.top,e=i.bottom;i.height;s<=window.innerHeight-50&&e>=0?t.classList.remove("loading"):t.classList.add("loading")}))},handletoHot:function(){document.documentElement.scrollTop=1e3},handleClickToblog:function(){this.$router.push("/blog/0")}},created:function(){this.getwindowHeight()},mounted:function(){var t=this;Object(n["e"])(3).then((function(i){t.articleHotList=i.data,console.log(t.articleHotList)})),this.bgHeight=window.innerHeight,window.addEventListener("resize",this.getwindowHeight),window.addEventListener("scroll",this.handleScroll),this.handleScroll()},destroyed:function(){removeEventListener("resize",this.getwindowHeight),removeEventListener("scroll",this.handleScroll)}},o=l,c=(s("4002"),s("2877")),r=Object(c["a"])(o,e,a,!1,null,"6ef4f113",null);i["default"]=r.exports},"2da7":function(t,i,s){t.exports=s.p+"img/3.ec134d14.jpg"},3276:function(t,i,s){t.exports=s.p+"img/1.5caf47aa.jpg"},4002:function(t,i,s){"use strict";var e=s("1199"),a=s.n(e);a.a},"9a48":function(t,i,s){t.exports=s.p+"img/2.8a779bfc.jpg"}}]);
//# sourceMappingURL=chunk-fc98cbf0.186016ee.js.map