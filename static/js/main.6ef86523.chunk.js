(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{44:function(t,e,n){},45:function(t,e,n){},77:function(t,e,n){},78:function(t,e,n){},79:function(t,e,n){},80:function(t,e,n){},81:function(t,e,n){},82:function(t,e,n){"use strict";n.r(e);var c=n(0),r=n(1),o=n.n(r),u=n(37),a=n.n(u),i=(n(44),n(45),n(2)),s=n(7),l={clientRole:null,playerTurn:"host",inviteCode:"",gameState:"LOBBY",turnsLeft:15,subject:""},f=r.createContext([l,function(){}]),j=function(t){var e=t.children,n=r.useState(l),o=f.Provider;return Object(c.jsx)(o,{value:n,children:e})},O=function(){var t=r.useContext(f),e=Object(s.a)(t,2),n=e[0],c=e[1];return{state:n,joinAsHost:function(t){return c((function(e){return Object(i.a)(Object(i.a)({},e),{},{clientRole:"host",gameState:"WAITING_FOR_PLAYER",inviteCode:t})}))},joinAsGuest:function(){return c((function(t){return Object(i.a)(Object(i.a)({},t),{},{clientRole:"guest",gameState:"IN_PROGRESS"})}))},leaveGame:function(){c(l)},startGame:function(t){c((function(e){return Object(i.a)(Object(i.a)({},e),{},{gameState:"IN_PROGRESS",subject:t})}))},guestTurnEnded:function(){c((function(t){return t.turnsLeft>1?Object(i.a)(Object(i.a)({},t),{},{gameState:"IN_PROGRESS",playerTurn:"guest",turnsLeft:t.turnsLeft-1}):Object(i.a)(Object(i.a)({},t),{},{gameState:"OVER"})}))},endGuestTurn:function(){c((function(t){return Object(i.a)(Object(i.a)({},t),{},{playerTurn:"host"})}))},startGuestTurn:function(t){c((function(e){return Object(i.a)(Object(i.a)({},e),{},{turnsLeft:t,playerTurn:"guest"})}))},startHostTurn:function(){c((function(t){var e=t.turnsLeft-1;return e>1?Object(i.a)(Object(i.a)({},t),{},{playerTurn:"host",turnsLeft:e}):Object(i.a)(Object(i.a)({},t),{},{gameState:"OVER"})}))},setGameOver:function(){c((function(t){return Object(i.a)(Object(i.a)({},t),{},{gameState:"OVER"})}))},setNewTurns:function(t){c((function(e){return Object(i.a)(Object(i.a)({},e),{},{turnsLeft:t})}))}}},b=n(38);console.log("https://whispering-bayou-18693.herokuapp.com/");var d=Object(b.io)("https://whispering-bayou-18693.herokuapp.com/");d.on("connect",(function(){console.log("client connected")}));var h=function(){return{socket:d}},v=function(t,e,n){return t.on(e,n),function(){return t.off(e)}},m=(n(77),function(t){var e=t.children,n=t.onclick;return Object(c.jsx)("button",{className:"button",onClick:function(t){t.stopPropagation(),n()},children:e})}),g=(n(78),function(t){var e=t.playerLiftedPen,n=t.playerActive,u=o.a.useRef(null),a=Object(r.useState)(!1),i=Object(s.a)(a,2),l=i[0],f=i[1],j=Object(r.useState)({x:0,y:0}),b=Object(s.a)(j,2),d=b[0],g=b[1],x=h().socket,p=O().leaveGame,y=function(t,e,n){t.beginPath(),t.moveTo(e.x,e.y),t.lineTo(n.x,n.y),t.stroke()},S=Object(r.useCallback)((function(){var t=u.current;t&&t.clearRect(0,0,900,450)}),[450,900]);Object(r.useEffect)((function(){var t=u.current;t&&(t.lineWidth=3,t.lineJoin="round",t.lineCap="round",t.strokeStyle="#000");var e=[v(x,"drawing",(function(t){var e=u.current;e&&y(e,t.lineStart,t.lineEnd)})),v(x,"clearCanvas",(function(){S()})),v(x,"hostLeft",(function(){alert("The host left"),p()}))];return function(){return e.forEach((function(t){return t()}))}}),[p,S,x]);return Object(c.jsxs)("div",{className:"canvas",children:[Object(c.jsx)("canvas",{width:"".concat(900,"px"),height:"".concat(450,"px"),onMouseMove:function(t){if(l&&u.current){var e={x:d.x,y:d.y},n={x:t.nativeEvent.offsetX,y:t.nativeEvent.offsetY};y(u.current,e,n),c=e,r=n,x.emit("drawing",{lineStart:c,lineEnd:r}),g({x:n.x,y:n.y})}var c,r},onMouseDown:function(t){n&&(g({x:t.nativeEvent.offsetX,y:t.nativeEvent.offsetY}),f(!0))},onMouseUp:function(){f(!1),n&&e()},ref:function(t){t&&(u.current=t.getContext("2d"))},className:"canvas"}),Object(c.jsx)("div",{className:"canvas-buttons",children:Object(c.jsx)(m,{onclick:function(){x.emit("leaveGame"),p()},children:"Exit"})})]})}),x="123456789abcdefghijklmnopqrstuvwxyz",p=function(){var t=Math.floor(Math.random()*x.length);return x[t]},y=(n(79),function(t){var e=t.children;return Object(c.jsx)("div",{className:"modal",children:Object(c.jsx)("div",{className:"modal-content",children:e})})}),S=(n(80),function(){var t=h().socket,e=O(),n=e.joinAsHost,o=e.joinAsGuest,u=Object(r.useState)(!1),a=Object(s.a)(u,2),i=a[0],l=a[1],f=Object(r.useState)(""),j=Object(s.a)(f,2),b=j[0],d=j[1];Object(r.useEffect)((function(){var e=[v(t,"confirmGameCreated",(function(t){console.log("room created"),n(t)})),v(t,"confirmGameJoined",(function(){console.log("room joined"),l(!1),o()})),v(t,"gameNotFound",(function(){console.log("room joined"),l(!0)}))];return function(){return e.forEach((function(t){return t()}))}}),[o,n,t]);return Object(c.jsx)(y,{children:Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)(m,{onclick:function(){var e=new Array(9).fill(null).map((function(t,e,n){var c=e+1,r=c!==n.length&&c%3===0;return"".concat(p()).concat(r?"-":"")})).join("");t.emit("createRoom",e),console.log("start clicked")},children:"Start new game"}),"Join existing game",i&&Object(c.jsx)("span",{style:{color:"red"},children:"Room not Found"}),Object(c.jsx)("input",{onChange:function(t){d(t.target.value)},type:"text",placeholder:"paste invite code..."}),Object(c.jsx)(m,{onclick:function(){console.log("join clicked"),t.emit("joinGame",b)},children:"Join existing game"})]})})}),T=function(){var t=O().state.inviteCode;return Object(c.jsxs)(y,{children:[Object(c.jsxs)("p",{children:["Invite code: ",t]}),Object(c.jsx)("p",{children:"Waiting for player..."})]})},E=(n(81),function(){var t=O(),e=t.state,n=e.clientRole,o=e.gameState,u=e.playerTurn,a=e.turnsLeft,i=e.subject,s=t.guestTurnEnded,l=t.startGuestTurn,f=t.startGame,j=t.setGameOver,b=t.startHostTurn,d=t.setNewTurns,m=t.endGuestTurn,x=h().socket;Object(r.useEffect)((function(){var t=[v(x,"playerJoined",(function(){console.log("player joined");var t=R();f(t),x.emit("startGameGuest",{newSubject:t})})),v(x,"startGameGuest",(function(t){var e=t.newSubject;f(e)})),v(x,"hostTurnOver",(function(t){var e=t.turnsLeft;l(e)})),v(x,"guestTurnOver",(function(){b()})),v(x,"gameOver",(function(){j()})),v(x,"updateGuestTurns",(function(t){var e=t.turnsLeft;d(e)}))];return function(){return t.forEach((function(t){return t()}))}}),[x,l,j,f,b,d]),Object(r.useEffect)((function(){"host"===n&&("OVER"===o?x.emit("gameOver"):"guest"===u?x.emit("hostTurnOver",{turnsLeft:a}):(console.log([n,x,o,u]),x.emit("updateGuestTurns",{turnsLeft:a})))}),[n,x,o,u]);var p=Object(r.useCallback)((function(){"host"===n?s():"guest"===n&&(m(),x.emit("guestTurnOver"))}),[s,x,n,m]);return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsxs)("div",{className:"turn-display",children:["IN_PROGRESS"===o&&Object(c.jsxs)(c.Fragment,{children:[Object(c.jsxs)("h3",{children:["Draw a ",i]}),Object(c.jsxs)("h4",{children:["Turns left: ",a]}),Object(c.jsxs)("p",{children:["Its ",G(n,u)?"your":"their"," ","turn"]})]}),"OVER"===o&&Object(c.jsx)("h3",{children:"Look what you made ! :D"})]}),Object(c.jsx)(g,{playerLiftedPen:p,playerActive:"IN_PROGRESS"===o&&G(n,u)}),null===n&&Object(c.jsx)(S,{}),"WAITING_FOR_PLAYER"===o&&Object(c.jsx)(T,{})]})}),G=function(t,e){return t===e},R=function(){var t=["penguin","rat","dinosaur","pikachu","cat","pickle Rick","robot","monkey"];return t[Math.floor(Math.round(Math.random()*t.length))]};var k=function(){return Object(c.jsx)("div",{className:"App",children:Object(c.jsx)(j,{children:Object(c.jsx)(E,{})})})},L=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,83)).then((function(e){var n=e.getCLS,c=e.getFID,r=e.getFCP,o=e.getLCP,u=e.getTTFB;n(t),c(t),r(t),o(t),u(t)}))};a.a.render(Object(c.jsx)(o.a.StrictMode,{children:Object(c.jsx)(k,{})}),document.getElementById("root")),L()}},[[82,1,2]]]);
//# sourceMappingURL=main.6ef86523.chunk.js.map