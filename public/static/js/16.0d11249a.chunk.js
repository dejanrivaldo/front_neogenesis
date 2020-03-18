(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{134:function(e,a,t){"use strict";var n=t(28),l=t(9),r=t(3),c=t.n(r),m=t(1),i=t.n(m),s=(t(18),{h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6","display-1":"h1","display-2":"h1","display-3":"h1","display-4":"h1",p:"p",lead:"p",blockquote:"blockquote"}),o=function(e){var a,t=e.tag,r=e.className,m=e.type,o=Object(l.a)(e,["tag","className","type"]),u=c()(Object(n.a)({},m,!!m),r);return a=t||(!t&&s[m]?s[m]:"p"),i.a.createElement(a,Object.assign({},o,{className:u}))};o.defaultProps={type:"p"},a.a=o},135:function(e,a,t){"use strict";var n=t(9),l=t(1),r=t.n(l),c=(t(18),t(24)),m=t(140),i=t(141),s=t(134),o=c.a.create("page"),u=function(e){var a=e.title,t=e.breadcrumbs,l=e.tag,c=e.className,u=e.children,d=Object(n.a)(e,["title","breadcrumbs","tag","className","children"]),E=o.b("px-3",c);return r.a.createElement(l,Object.assign({className:E},d),r.a.createElement("div",{className:o.e("header")},a&&"string"===typeof a?r.a.createElement(s.a,{type:"h1",className:o.e("title")},a):a,t&&r.a.createElement(m.a,{className:o.e("breadcrumb")},r.a.createElement(i.a,null,"Home"),t.length&&t.map(function(e,a){var t=e.name,n=e.active;return r.a.createElement(i.a,{key:a,active:n},t)}))),u)};u.defaultProps={tag:"div",title:""},a.a=u},140:function(e,a,t){"use strict";var n=t(4),l=t(6),r=t(1),c=t.n(r),m=t(0),i=t.n(m),s=t(3),o=t.n(s),u=t(2),d={tag:u.q,listTag:u.q,className:i.a.string,listClassName:i.a.string,cssModule:i.a.object,children:i.a.node,"aria-label":i.a.string},E=function(e){var a=e.className,t=e.listClassName,r=e.cssModule,m=e.children,i=e.tag,s=e.listTag,d=e["aria-label"],E=Object(l.a)(e,["className","listClassName","cssModule","children","tag","listTag","aria-label"]),p=Object(u.m)(o()(a),r),h=Object(u.m)(o()("breadcrumb",t),r);return c.a.createElement(i,Object(n.a)({},E,{className:p,"aria-label":d}),c.a.createElement(s,{className:h},m))};E.propTypes=d,E.defaultProps={tag:"nav",listTag:"ol","aria-label":"breadcrumb"},a.a=E},141:function(e,a,t){"use strict";var n=t(4),l=t(6),r=t(1),c=t.n(r),m=t(0),i=t.n(m),s=t(3),o=t.n(s),u=t(2),d={tag:u.q,active:i.a.bool,className:i.a.string,cssModule:i.a.object},E=function(e){var a=e.className,t=e.cssModule,r=e.active,m=e.tag,i=Object(l.a)(e,["className","cssModule","active","tag"]),s=Object(u.m)(o()(a,!!r&&"active","breadcrumb-item"),t);return c.a.createElement(m,Object(n.a)({},i,{className:s,"aria-current":r?"page":void 0}))};E.propTypes=d,E.defaultProps={tag:"li"},a.a=E},142:function(e,a,t){"use strict";t.d(a,"a",function(){return n}),t.d(a,"b",function(){return l});var n=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"primary";return"undefined"===typeof window?null:window.getComputedStyle(document.documentElement).getPropertyValue("--".concat(e))},l=function(){return["primary","secondary","success","info","warning","danger"]}},450:function(e,a,t){"use strict";t.r(a);var n=t(135),l=t(1),r=t.n(l),c=t(127),m=t(128),i=t(108),s=t(113),o=t(109),u=t(129),d=t(119),E=t(120),p=t(121),h=t(41),b=t(142),g=Object(b.b)();a.default=function(){return r.a.createElement(n.a,{title:"Dropdowns",breadcrumbs:[{name:"dropdowns",active:!0}]},r.a.createElement(c.a,null,r.a.createElement(m.a,{md:6},r.a.createElement(i.a,null,r.a.createElement(s.a,null,"Single button dropdowns"),r.a.createElement(o.a,null,g.map(function(e,a){return r.a.createElement(u.a,{key:a},r.a.createElement(d.a,{caret:!0,color:e,className:"text-capitalize m-1"},e),r.a.createElement(E.a,null,r.a.createElement(p.a,{header:!0},"Header"),r.a.createElement(p.a,{disabled:!0},"Action"),r.a.createElement(p.a,null,"Another Action"),r.a.createElement(p.a,{divider:!0}),r.a.createElement(p.a,null,"Another Action")))})))),r.a.createElement(m.a,{md:6},r.a.createElement(i.a,null,r.a.createElement(s.a,null,"Split button dropdowns"),r.a.createElement(o.a,null,g.map(function(e,a){return r.a.createElement(u.a,{key:a,className:"text-capitalize m-1"},r.a.createElement(h.a,{color:e},e),r.a.createElement(d.a,{caret:!0,color:e}),r.a.createElement(E.a,null,r.a.createElement(p.a,{header:!0},"Header"),r.a.createElement(p.a,{disabled:!0},"Action"),r.a.createElement(p.a,null,"Another Action"),r.a.createElement(p.a,{divider:!0}),r.a.createElement(p.a,null,"Another Action")))}))))),r.a.createElement(c.a,null,r.a.createElement(m.a,{md:6},r.a.createElement(i.a,null,r.a.createElement(s.a,null,"Sizing"),r.a.createElement(o.a,null,r.a.createElement(u.a,{className:"m-1"},r.a.createElement(d.a,{caret:!0,size:"lg"},"Large"),r.a.createElement(E.a,null,r.a.createElement(p.a,null,"Another Action"),r.a.createElement(p.a,null,"Another Action"))),r.a.createElement(u.a,{className:"m-1"},r.a.createElement(d.a,{caret:!0},"Normal"),r.a.createElement(E.a,null,r.a.createElement(p.a,null,"Another Action"),r.a.createElement(p.a,null,"Another Action"))),r.a.createElement(u.a,{className:"m-1"},r.a.createElement(d.a,{caret:!0,size:"sm"},"Small"),r.a.createElement(E.a,null,r.a.createElement(p.a,null,"Another Action"),r.a.createElement(p.a,null,"Another Action")))))),r.a.createElement(m.a,{md:6},r.a.createElement(i.a,null,r.a.createElement(s.a,null,"Dropup"),r.a.createElement(o.a,null,r.a.createElement(u.a,{direction:"up"},r.a.createElement(d.a,{caret:!0,size:"lg"},"Dropup"),r.a.createElement(E.a,null,r.a.createElement(p.a,null,"Another Action"),r.a.createElement(p.a,null,"Another Action"))))))),r.a.createElement(c.a,null,r.a.createElement(m.a,{md:6},r.a.createElement(i.a,null,r.a.createElement(s.a,null,"Alignment"),r.a.createElement(o.a,null,r.a.createElement(u.a,{className:"m-1"},r.a.createElement(d.a,{caret:!0},"This dropdown's menu is right-aligned"),r.a.createElement(E.a,{right:!0},r.a.createElement(p.a,{header:!0},"Header"),r.a.createElement(p.a,{disabled:!0},"Action"),r.a.createElement(p.a,null,"Another Action"),r.a.createElement(p.a,{divider:!0}),r.a.createElement(p.a,null,"Another Action"))),r.a.createElement(u.a,{className:"m-1"},r.a.createElement(d.a,{caret:!0},"This dropdown's menu is left-aligned"),r.a.createElement(E.a,null,r.a.createElement(p.a,{header:!0},"Header"),r.a.createElement(p.a,{disabled:!0},"Action"),r.a.createElement(p.a,null,"Another Action"),r.a.createElement(p.a,{divider:!0}),r.a.createElement(p.a,null,"Another Action"))))))))}}}]);
//# sourceMappingURL=16.0d11249a.chunk.js.map