import{a as x}from"./chunk-2ULZUSFP.js";import{a as N}from"./chunk-AKCQTZEE.js";import{c as s,e as b,f as y,g as j,h as E,i as S,k as C,l as F,q as R,s as w}from"./chunk-6LQ67QB6.js";import{B as I,Ea as g,Fb as G,Hb as h,N as u,Ra as d,Wa as c,ga as n,ha as p,q as M,qa as a,sb as f,ua as m,va as l,w as D,wa as v,x as T,z as A}from"./chunk-UWFA7HJU.js";var U=(()=>{let e=class e{};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=u({type:e,selectors:[["app-account"]],standalone:!0,features:[c],decls:2,vars:0,template:function(t,r){t&1&&(m(0,"p"),d(1,"account works!"),l())},dependencies:[f]});let o=e;return o})();var k=(()=>{let e=class e{constructor(i,t,r){this.accountService=i,this.router=t,this.route=r,this.loginForm=new j({email:new E("",[s.required,s.email]),password:new E("",s.required)}),this.returnUrl=this.route.snapshot.queryParams.returnUrl||"/Shop"}onSubmit(){this.accountService.login({email:this.loginForm.value.email,password:this.loginForm.value.password}).subscribe({next:i=>{this.router.navigateByUrl(this.returnUrl)}})}};e.\u0275fac=function(t){return new(t||e)(p(N),p(h),p(G))},e.\u0275cmp=u({type:e,selectors:[["app-login"]],standalone:!0,features:[c],decls:11,vars:8,consts:[[1,"d-flex","justify-content-center","mt-5"],[1,"col-3"],[3,"formGroup","ngSubmit"],[1,"text-center","mb-4"],[1,"mb-5"],[3,"label","type","formControl"],[1,"d-grid"],["type","submit",1,"btn","btn-lg","btn-primary","mt-4",3,"disabled"]],template:function(t,r){t&1&&(m(0,"div",0)(1,"div",1)(2,"form",2),g("ngSubmit",function(){return r.onSubmit()}),m(3,"div",3)(4,"h1",4),d(5,"Login"),l(),v(6,"app-text-input",5)(7,"app-text-input",5),m(8,"div",6)(9,"button",7),d(10," Sign In "),l()()()()()()),t&2&&(n(2),a("formGroup",r.loginForm),n(4),a("label","Email Address")("type","email")("formControl",r.loginForm.controls.email),n(),a("label","Password")("type","password")("formControl",r.loginForm.controls.password),n(2),a("disabled",r.loginForm.invalid))},dependencies:[w,S,b,y,C,F,f,x]});let o=e;return o})();var P=(()=>{let e=class e{constructor(i,t,r){this.fb=i,this.accountService=t,this.router=r,this.errors=null,this.complexPassword="(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$",this.registerForm=this.fb.group({displayName:["",s.required],email:["",[s.required,s.email],[this.validateEmailNotTaken()]],password:["",[s.required,s.pattern(this.complexPassword)]]})}ngOnInit(){}onSubmit(){this.accountService.register({displayName:this.registerForm.value.displayName,email:this.registerForm.value.email,password:this.registerForm.value.password}).subscribe({next:i=>{this.router.navigateByUrl("/Shop")},error:i=>{this.errors=i.errors,console.log(this.errors)}})}onChange(i){}validateEmailNotTaken(){return i=>i.valueChanges.pipe(D(500),T(1),I(()=>this.accountService.checkEmailExists(i.value).pipe(M(t=>t?{emailExists:!0}:null),A(()=>i.markAllAsTouched()))))}};e.\u0275fac=function(t){return new(t||e)(p(R),p(N),p(h))},e.\u0275cmp=u({type:e,selectors:[["app-register"]],standalone:!0,features:[c],decls:12,vars:11,consts:[[1,"d-flex","justify-content-center","mt-5"],[1,"col-3"],[3,"formGroup","ngSubmit"],[1,"mb-4"],[1,"mb-5","text-center"],[3,"label","type","formControl"],[1,"d-grid"],["type","submit",1,"btn","btn-lg","btn-primary","mt-4",3,"disabled"]],template:function(t,r){t&1&&(m(0,"div",0)(1,"div",1)(2,"form",2),g("ngSubmit",function(){return r.onSubmit()}),m(3,"div",3)(4,"h1",4),d(5,"Sign Up"),l(),v(6,"app-text-input",5)(7,"app-text-input",5)(8,"app-text-input",5),m(9,"div",6)(10,"button",7),d(11," Sign Up "),l()()()()()()),t&2&&(n(2),a("formGroup",r.registerForm),n(4),a("label","Display Name")("type","text")("formControl",r.registerForm.controls.displayName),n(),a("label","Email Address")("type","email")("formControl",r.registerForm.controls.email),n(),a("label","Password")("type","password")("formControl",r.registerForm.controls.password),n(2),a("disabled",r.registerForm.invalid))},dependencies:[w,S,b,y,C,F,f,x]});let o=e;return o})();var re=[{path:"",component:U},{path:"login",component:k},{path:"register",component:P}];export{re as AccountRouting};
