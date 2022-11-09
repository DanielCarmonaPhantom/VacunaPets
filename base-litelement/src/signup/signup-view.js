
import { LitElement, html } from "lit-element";
import { router } from "lit-element-router";

import '../main/app-link.js'

import sandbox from '../sandbox/sandbox.js';

class SingUpView extends router(LitElement) {
    static get properties() {
        return {
            name: {type:String},
            username: {type:String},
            email: {type:String},
            password: {type:String},
        };
    }
    constructor() {
        super();
        
        this.name = '';
        this.username = '';
        this.email = '';
        this.password = '';
    }
    render() {
        return html`
            <!-- CSS only -->
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
            <div class="container">

                <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                                <div class="d-flex justify-content-center py-4">
                                    <a href="index.html" class="logo d-flex align-items-center w-auto">
                                    <img src="assets/img/logo.png" alt="">
                                    <span class="d-none d-lg-block">NiceAdmin</span>
                                    </a>
                                </div><!-- End Logo -->

                                <div class="card mb-3">

                                    <div class="card-body">

                                    <div class="pt-4 pb-2">
                                        <h5 class="card-title text-center pb-0 fs-4">Crear una cuenta</h5>
                                        <p class="text-center small">Ingresa tu información personal para crear una cuentat</p>
                                    </div>

                                    <form class="row g-3 needs-validation" novalidate>
                                        <div class="col-12">
                                        <label for="yourName" class="form-label">Tu Nombre</label>
                                        <input type="text" name="name" class="form-control" id="yourName" required @input="${this.updateName}">
                                        <div class="invalid-feedback">Por favor, Ingresa un nombre!</div>
                                        </div>

                                        <div class="col-12">
                                        <label for="yourEmail" class="form-label">Tu Correo</label>
                                        <input type="email" name="email" class="form-control" id="yourEmail" required @input="${this.updateEmail}">
                                        <div class="invalid-feedback">Please enter a valid Email adddress!</div>
                                        </div>

                                        <div class="col-12">
                                        <label for="yourUsername" class="form-label">Username</label>
                                        <div class="input-group has-validation">
                                            <span class="input-group-text" id="inputGroupPrepend">@</span>
                                            <input type="text" name="username" class="form-control" id="yourUsername" required @input="${this.updateUsername}">
                                            <div class="invalid-feedback">Please choose a username.</div>
                                        </div>
                                        </div>

                                        <div class="col-12">
                                        <label for="yourPassword" class="form-label">Contraseña</label>
                                        <input type="password" name="password" class="form-control" id="yourPassword" required @input="${this.updatePassword}">
                                        <div class="invalid-feedback">Porfavor ingresa tu contraseña!</div>
                                        </div>

                                        <div class="col-12">
                                        <div class="form-check">
                                            <input class="form-check-input" name="terms" type="checkbox" value="" id="acceptTerms" required>
                                            <label class="form-check-label" for="acceptTerms">Yo acepto los <a href="#">terminos y condiciones</a></label>
                                            <div class="invalid-feedback">Tu dees aceptar los terminos y condiciones</div>
                                        </div>
                                        </div>
                                        <div class="col-12">
                                        <button class="btn btn-secondary" type="button" @click="${this.addUser}">Crear Cuenta</button>
                                        </div>
                                        <div class="col-12">
                                        <p class="small mb-0">Ya tienes una cuenta? <a href="pages-login.html">Iniciar sesión</a></p>
                                        </div>
                                    </form>                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        `;
    }
    addUser(){
        sandbox.dispatch('add-user',{
            'name':this.name,    
            'username':this.name,        
            'email':this.email,
            'password': this.password,
            'pets': []
        },this);
    }
    updateName(e){
        this.name=e.target.value;
    }
    updateUsername(e){
        this.username=e.target.value;
    }
    updateEmail(e){
        this.email=e.target.value;
    }
    updatePassword(e){
        this.password=e.target.value;
    }
}

customElements.define("signup-view", SingUpView);