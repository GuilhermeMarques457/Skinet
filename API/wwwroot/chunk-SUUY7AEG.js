import{G as B,J as S,Mb as w,d as l,e as R,j as f,q as v,wb as y}from"./chunk-UWFA7HJU.js";var b=l((A,x)=>{"use strict";x.exports=function(r,a){var t="000000000"+r;return t.substr(t.length-a)}});var T=l((E,I)=>{"use strict";var D=b(),F=typeof window=="object"?window:self,z=Object.keys(F).length,H=navigator.mimeTypes?navigator.mimeTypes.length:0,N=D((H+navigator.userAgent.length).toString(36)+z.toString(36),4);I.exports=function(){return N}});var q=l((G,V)=>{"use strict";var g,C=typeof window<"u"&&(window.crypto||window.msCrypto)||typeof self<"u"&&self.crypto;C?(P=Math.pow(2,32)-1,g=function(){return Math.abs(C.getRandomValues(new Uint32Array(1))[0]/P)}):g=Math.random;var P;V.exports=g});var M=l((J,L)=>{"use strict";var p=T(),U=b(),W=q(),u=0,m=4,h=36,$=Math.pow(h,m);function k(){return U((W()*$<<0).toString(h),m)}function j(){return u=u<$?u:0,u++,u-1}function c(){var i="c",r=new Date().getTime().toString(h),a=U(j().toString(h),m),t=p(),e=k()+k();return i+r+a+t+e}c.slug=function(){var r=new Date().getTime().toString(36),a=j().toString(36).slice(-4),t=p().slice(0,1)+p().slice(-1),e=k().slice(-2);return r.slice(-2)+a+t+e};c.isCuid=function(r){return typeof r!="string"?!1:!!r.startsWith("c")};c.isSlug=function(r){if(typeof r!="string")return!1;var a=r.length;return a>=7&&a<=10};c.fingerprint=p;L.exports=c});var O=R(M()),d=class{constructor(){this.id=(0,O.default)(),this.items=[],this.shippingPrice=0}};var tt=(()=>{let r=class r{constructor(t){this.http=t,this.baseUrl=w.apiUrl,this.basketSource=new f(null),this.basketTotalSource=new f(null),this.basketSource$=this.basketSource.asObservable(),this.basketTotalSource$=this.basketTotalSource.asObservable(),this.shipping=0}createPaymentIntent(){return this.http.post(`${this.baseUrl}payments/${this.getCurrentBasketValue()?.id}`,{}).pipe(v(t=>{this.basketSource.next(t)}))}getBasket(t){return this.http.get(`${this.baseUrl}basket?id=${t}`).subscribe({next:e=>{this.basketSource.next(e),this.calculateTotals()}})}postBasket(t){return this.http.post(`${this.baseUrl}basket`,t).subscribe({next:e=>{this.basketSource.next(e),this.calculateTotals()}})}deleteBasket(t){this.http.delete(`${this.baseUrl}basket?id=${t.id}`).subscribe({next:e=>{this.deleteLocalBasket()}})}deleteLocalBasket(){this.basketSource.next(null),this.basketTotalSource.next(null),localStorage.removeItem("basket_id")}getCurrentBasketValue(){return this.basketSource.value}addItemToBasket(t,e=1){this.isProduct(t)&&(t=this.mapProductToBasketItem(t));let s=this.getCurrentBasketValue()??this.createBasket();s.items=this.upsertBasketItem(s.items,t,e),this.postBasket(s)}removeItemFromBasket(t,e=1){let s=this.getCurrentBasketValue();if(!s)return;let n=s.items.find(o=>o.id==t);n&&(n.quantity-=e,n.quantity===0&&(s.items=s.items.filter(o=>o.id!==t)),s.items.length>0?this.postBasket(s):this.deleteBasket(s))}setShippingPrice(t){let e=this.getCurrentBasketValue();e&&(e.shippingPrice=t.price,e.deliveryMethodId=t.id,this.postBasket(e))}upsertBasketItem(t,e,s){let n=t.find(o=>o.id===e.id);return n?n.quantity+=s:(e.quantity=s,t.push(e)),t}createBasket(){let t=new d;return localStorage.setItem("basket_id",t.id),t}mapProductToBasketItem(t){return{id:t.id,productName:t.name,price:t.price,quantity:0,pictureUrl:t.pictureUrl,brand:t.productBrand,type:t.productType}}calculateTotals(){let t=this.getCurrentBasketValue();if(!t)return;let e=t.items.reduce((n,o)=>o.quantity*o.price+n,0),s=e+t.shippingPrice;this.basketTotalSource.next({shipping:t.shippingPrice,total:s,subtotal:e})}isProduct(t){return t.productBrand!==void 0}};r.\u0275fac=function(e){return new(e||r)(S(y))},r.\u0275prov=B({token:r,factory:r.\u0275fac,providedIn:"root"});let i=r;return i})();export{tt as a};