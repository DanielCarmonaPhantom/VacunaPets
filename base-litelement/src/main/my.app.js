
import { LitElement, html } from "lit-element";
import { router } from "lit-element-router";

import "./app-link.js"
import "./main.js"

import "../login/login-main.js"
import "../signup/signup-main.js"

import "../dashboard/dashboard-main.js" 
import "../sections/header-login.js"
 

import sandbox from '../sandbox/sandbox.js';
 

 class App extends router(LitElement) {
   static get properties() {
     return {
       route: { type: String },
       params: { type: Object },
       query: { type: Object },
       data: { type: Object },
       success: {type: Boolean},

       user: { type: Object },
       username: { type:String },
       idUser: { type:Number}
     };
   }
 
   static get routes() {
     return [
       {
         name: "home",
         pattern: "",
         data: { title: "Home" }
       },
       {
         name: "signup",
         pattern: "signup"
       },
       {
         name: "user",
         pattern: "user/:id"
       },
       {
         name: "not-found",
         pattern: "*"
       },
       {
         name: "dashboard",
         pattern: "dashboard"
       },
     ];
   }
 
   constructor() {
     super();

     this.success = false;
     this.route = "";
     this.params = {};
     this.query = {};
     this.data = {};
     this.user = {};
     
     this.username = '';
     this.idUser = 0;

     sandbox.on('auth-user',this._auth.bind(this)); 
   }
 
   router(route, params, query, data) {
     this.route = route;
     this.params = params;
     this.query = query;
     this.data = data;
     this.succes = false;
   }
 
    render() {
        return html`
       
        ${this.succes
        ? html `
            <app-main active-route=${this.route}>
                <div route="dashboard">   
                    <header-login username="${this.username}"></header-login>                
                    <dashboard-main idUser="${this.idUser}"></dashboard-main>
                </div>
            </app-main>
        `
        : html `
            <app-link href="/">Login</app-link>
            <app-link href="/signup">Signup</app-link>
    
    
            <app-main active-route=${this.route}>
                <div route="home">                    
                    <login-main></login-main>
                </div>
                <div route="signup">                    
                    <signup-main></signup-main>
                </div>

            </app-main>
        `        
        }
       
     `;
   }
   updated(){
    
   }
   _auth(e){
    
    this.user = e.user.user

    this.username = e.user.user.username
    this.idUser = e.user.user.id

    this.route = 'dashboard'
    this.succes = true;   
    
   }
 }
 
 customElements.define("my-app", App);
 