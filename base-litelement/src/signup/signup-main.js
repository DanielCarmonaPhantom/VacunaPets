
import { LitElement, html } from "lit-element";

import './signup-view.js'

import sandbox from '../sandbox/sandbox.js';

class SignMain extends LitElement {

    static get properties() {
        return {
            src : {type:String}
        };
    }
    
    constructor() {
        super();

        this.src = "http://localhost:3000/signup"
        sandbox.on('add-user',this._signup.bind(this)); 

    }
    render() {
        return html`
            <main>
                <signup-view></signup-view>
            </main>
            
        `;
    }

    _signup(e){
        var body =JSON.stringify(e);

		let xhr = new XMLHttpRequest();
		xhr.onload = function (){
			if (xhr.status === 201){
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

 customElements.define("sign-main", SignMain);