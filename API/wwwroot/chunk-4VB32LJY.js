import{a as E}from"./chunk-QJKD3SDR.js";import{$a as f,Ca as S,Da as d,Ga as V,Gb as P,Ha as M,Jb as R,L as x,Pa as o,Q as v,Qa as _,R as g,Ra as F,Ua as I,_ as z,_a as u,ea as m,fa as y,ha as w,hb as O,ib as N,jb as h,ma as p,mb as C,oa as s,pb as b,qb as B,sa as t,ta as e,ua as T,ya as k}from"./chunk-CVZN5AOS.js";function j(i,n){if(i&1&&(t(0,"ul",4)(1,"li",5)(2,"strong",6),o(3,"Order Subtotal"),e(),t(4,"strong"),o(5),u(6,"currency"),e()(),t(7,"li",5)(8,"strong",6),o(9,"Shipping and handling"),e(),t(10,"strong"),o(11),u(12,"currency"),e()(),t(13,"li",5)(14,"strong",6),o(15,"Total"),e(),t(16,"strong"),o(17),u(18,"currency"),e()()()),i&2){let r=n.ngIf;m(5),_(f(6,3,r.subtotal)),m(6),_(f(12,5,r.shipping)),m(6),_(f(18,7,r.total))}}var K=(()=>{let n=class n{constructor(a){this.basketService=a}};n.\u0275fac=function(l){return new(l||n)(y(E))},n.\u0275cmp=x({type:n,selectors:[["app-order-totals"]],standalone:!0,features:[I],decls:7,vars:3,consts:[[1,"bg-light","px-4","py-3","text-uppercase","fw-bold"],[1,"py-4"],[1,"fst-italic","mb-4"],["class","list-unstyled mb-4",4,"ngIf"],[1,"list-unstyled","mb-4"],[1,"d-flex","justify-content-between","py-3","border-bottom"],[1,"text-muted"]],template:function(l,c){l&1&&(t(0,"div",0),o(1,"Order summary"),e(),t(2,"div",1)(3,"p",2),o(4," Shipping const will be calculated based on choices made during checkout "),e(),p(5,j,19,9,"ul",3),u(6,"async"),e()),l&2&&(m(5),s("ngIf",f(6,1,c.basketService.basketTotalSource$)))},dependencies:[B,h,C,b]});let i=n;return i})();function q(i,n){i&1&&(t(0,"div",4),o(1,"Remove"),e())}function L(i,n){if(i&1){let r=k();t(0,"i",19),S("click",function(){v(r);let l=d().$implicit,c=d(2);return g(c.onRemoveBasketItem(l.id,1))}),e()}}function U(i,n){if(i&1){let r=k();t(0,"i",20),S("click",function(){v(r);let l=d().$implicit,c=d(2);return g(c.onAddBasketItem(l))}),e()}}function Q(i,n){if(i&1){let r=k();t(0,"td",13)(1,"a",21),S("click",function(){v(r);let l=d().$implicit,c=d(2);return g(c.onRemoveBasketItem(l.id,l.quantity))}),T(2,"i",22),e()()}}function G(i,n){if(i&1&&(t(0,"tr")(1,"th")(2,"div",7),T(3,"img",8),e(),t(4,"div",9)(5,"h5",10)(6,"a",11),o(7),e()(),t(8,"span",12),o(9),e()()(),t(10,"td",13)(11,"strong"),o(12),u(13,"currency"),e()(),t(14,"td",13)(15,"div",14),p(16,L,1,0,"i",15),t(17,"strong",16),o(18),e(),p(19,U,1,0,"i",17),e()(),t(20,"td",13)(21,"strong"),o(22),u(23,"currency"),e()(),p(24,Q,3,0,"td",18),e()),i&2){let r=n.$implicit,a=d(2);m(3),V("src",r.pictureUrl,z),V("alt",r.productName),m(3),M("routerLink","/Shop/",r.id,""),m(),F(" ",r.productName," "),m(2),F(" Type: ",r.type," "),m(3),_(f(13,12,r.price)),m(3),s("ngClass",a.isBasket?"":"ms-1"),m(),s("ngIf",a.isBasket),m(2),_(r.quantity),m(),s("ngIf",a.isBasket),m(3),_(f(23,14,r.price*r.quantity)),m(2),s("ngIf",a.isBasket)}}function H(i,n){if(i&1&&(t(0,"div",1)(1,"table",2)(2,"thead",3)(3,"tr")(4,"th")(5,"div",4),o(6,"Product"),e()(),t(7,"th")(8,"div",4),o(9,"Price"),e()(),t(10,"th")(11,"div",4),o(12,"Quantity"),e()(),t(13,"th")(14,"div",4),o(15,"Total"),e()(),t(16,"th"),p(17,q,2,0,"div",5),e()()(),t(18,"tbody"),p(19,G,25,16,"tr",6),e()()()),i&2){let r=n.ngIf,a=d();m(17),s("ngIf",a.isBasket),m(2),s("ngForOf",r.items)}}var re=(()=>{let n=class n{constructor(a){this.basketService=a,this.addItem=new w,this.removeItem=new w,this.isBasket=!0}onAddBasketItem(a){this.addItem.emit(a)}onRemoveBasketItem(a,l=1){this.removeItem.emit({id:a,quantity:l})}};n.\u0275fac=function(l){return new(l||n)(y(E))},n.\u0275cmp=x({type:n,selectors:[["app-basket-summary"]],inputs:{isBasket:"isBasket"},outputs:{addItem:"addItem",removeItem:"removeItem"},standalone:!0,features:[I],decls:2,vars:3,consts:[["class","table-responsive",4,"ngIf"],[1,"table-responsive"],[1,"table","bg-light"],[1,"text-uppercase"],[1,"py-2"],["class","py-2",4,"ngIf"],[4,"ngFor","ngForOf"],[1,"p-2","d-inline-block"],[1,"img-fluid","d-inline-block",2,"width","40px","height","50px",3,"src","alt"],[1,"ms-3","d-inline-block","align-middle"],[1,"mb-0"],[1,"text-dark","text-decoration-none","fw-bold",3,"routerLink"],[1,"text-muted","fw-normal","fst-italic"],[1,"align-middle"],[1,"d-flex","align-items-center",3,"ngClass"],["class","fa fa-minus-circle text-warning me-2","style","cursor: pointer; font-size: 2em",3,"click",4,"ngIf"],[2,"font-size","1.3em"],["class","fa fa-plus-circle text-warning mx-2","style","cursor: pointer; font-size: 2em",3,"click",4,"ngIf"],["class","align-middle",4,"ngIf"],[1,"fa","fa-minus-circle","text-warning","me-2",2,"cursor","pointer","font-size","2em",3,"click"],[1,"fa","fa-plus-circle","text-warning","mx-2",2,"cursor","pointer","font-size","2em",3,"click"],[1,"text-danger",3,"click"],[1,"fa","fa-trash",2,"font-size","2em","cursor","pointer"]],template:function(l,c){l&1&&(p(0,H,20,2,"div",0),u(1,"async")),l&2&&s("ngIf",f(1,1,c.basketService.basketSource$))},dependencies:[B,O,N,h,C,b,R,P]});let i=n;return i})();export{K as a,re as b};
