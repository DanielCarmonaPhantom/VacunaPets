
import { LitElement, html } from "lit-element";

import './login-view.js'

import sandbox from '../sandbox/sandbox.js';

class LoginMain extends LitElement {

    static get properties() {
        return {
            src : {type:String}
        };
    }
    
    constructor() {
        super();

        this.src = "http://localhost:3000/login"
        sandbox.on('login-user',this._login.bind(this)); 

    }
    render() {
        return html`
            <main>
                <login-view></login-view>
            </main>
            
        `;
    }
    _login(e){
        var body =JSON.stringify(e);

		let xhr = new XMLHttpRequest();
		xhr.onload = function (){
			if (xhr.status === 200){
				let apiResponse = JSON.parse(xhr.responseText);
                this._auth(apiResponse)
                
			}
		}.bind(this);
		xhr.open("POST", this.src);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.send(body);
        
    }
    _auth(e){
        
        sandbox.dispatch('auth-user',{  
            'user':e,        
        },this);
    }
 }

 customElements.define("login-main", LoginMain);