
import { LitElement, html } from "lit-element";

import './dashboard-view.js'

import sandbox from '../sandbox/sandbox.js';

class DashboardMain extends LitElement {

    static get properties() {
        return {
            src : {type:String},
            idUser: { type: Number },
        };
    }
    
    constructor() {
        super();

        this.idUser = 0;

        this.src = "http://localhost:3000/login"
        //sandbox.on('login-user',this._login.bind(this)); 

    }
    render() {
        return html`
            <main>
                <dashboard-view idUser='${this.idUser}'></dashboard-view>                
            </main>
            
        `;
    }
    updated(){
        
    }

 }

 customElements.define("dashboard-main", DashboardMain);