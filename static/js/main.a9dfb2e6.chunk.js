(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{43:function(n,e,t){},44:function(n,e,t){},76:function(n,e,t){"use strict";t.r(e);var o=t(5),c=t(4),i=t.n(c),a=t(36),r=t.n(a),s=(t(43),t(21)),u=(t(44),t(37)),f=Object(u.io)("https://whispering-bayou-18693.herokuapp.com/");var l=function(){var n=i.a.useRef(null),e=Object(c.useState)(!1),t=Object(s.a)(e,2),a=t[0],r=t[1],u=Object(c.useState)({x:0,y:0}),l=Object(s.a)(u,2),v=l[0],d=l[1],x={socket:f}.socket,b=function(n,e,t){n.beginPath(),n.moveTo(e.x,e.y),n.lineTo(t.x,t.y),n.stroke()};return x.on("connect",(function(){console.log("client connected"),x.emit("joinRoom","room1")})),x.on("drawing",(function(e){console.log(e);var t=n.current;t&&b(t,e.lineStart,e.lineEnd)})),Object(c.useEffect)((function(){var e=n.current;e&&(e.lineWidth=3,e.lineJoin="round",e.lineCap="round",e.strokeStyle="#00CC99")}),[]),Object(o.jsxs)("div",{className:"App",children:["Draw stuff... :)",Object(o.jsx)("canvas",{width:"".concat(900,"px"),height:"".concat(450,"px"),onMouseMove:function(e){if(a&&n.current){var t={x:v.x,y:v.y},o={x:e.nativeEvent.offsetX,y:e.nativeEvent.offsetY};b(n.current,t,o),c=t,i=o,x.emit("drawing",{lineStart:c,lineEnd:i}),d({x:o.x,y:o.y})}var c,i},onMouseDown:function(n){d({x:n.nativeEvent.offsetX,y:n.nativeEvent.offsetY}),r(!0)},onMouseUp:function(){r(!1)},ref:function(e){e&&(n.current=e.getContext("2d"))},className:"canvas"})]})},v=function(n){n&&n instanceof Function&&t.e(3).then(t.bind(null,77)).then((function(e){var t=e.getCLS,o=e.getFID,c=e.getFCP,i=e.getLCP,a=e.getTTFB;t(n),o(n),c(n),i(n),a(n)}))};r.a.render(Object(o.jsx)(i.a.StrictMode,{children:Object(o.jsx)(l,{})}),document.getElementById("root")),v()}},[[76,1,2]]]);
//# sourceMappingURL=main.a9dfb2e6.chunk.js.map