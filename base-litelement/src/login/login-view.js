
import { LitElement, html, css } from "lit-element";
import { router } from "lit-element-router";

import '../main/app-link.js'

import sandbox from '../sandbox/sandbox.js';

class LoginView extends router(LitElement) {
    static get properties() {
        return {
            email: {type:String},
            password: {type:String},

        };
    }
    constructor() {
        super();

        this.email = '';
        this.password = '';
    }
    static get styles(){
        return css `
            /* Card */
            .card {
            margin-bottom: 30px;
            border: none;
            border-radius: 5px;
            box-shadow: 0px 0 30px rgba(1, 41, 112, 0.1);
            }

            .card-header,
            .card-footer {
            border-color: #ebeef4;
            background-color: #fff;
            color: #798eb3;
            padding: 15px;
            }

            .card-title {
            padding: 20px 0 15px 0;
            font-size: 18px;
            font-weight: 500;
            color: #012970;
            font-family: "Poppins", sans-serif;
            }

            .card-title span {
            color: #899bbd;
            font-size: 14px;
            font-weight: 400;
            }

            .card-body {
            padding: 0 20px 20px 20px;
            }

            .card-img-overlay {
            background-color: rgba(255, 255, 255, 0.6);
            }
        `;
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
                                <img src="" alt="">
                                <span class="d-none d-lg-block">Vacuna Pets</span>
                                </a>
                            </div><!-- End Logo -->

                            <div class="card mb-3">

                                <div class="card-body">

                                <div class="pt-4 pb-2">
                                    <h5 class="card-title text-center pb-0 fs-4">Ingresa a tu cuenta</h5>
                                    <p class="text-center small">Teclea tu correo y contraseña</p>
                                </div>

                                <form class="row g-3 needs-validation" novalidate>

                                    <div class="col-12">
                                        <label for="yourEmail" class="form-label">Tu Correo</label>
                                        <div class="input-group has-validation">
                                            <input type="email" name="email" class="form-control" id="yourEmail" required @input="${this.updateEmail}">
                                            <div class="invalid-feedback">Please enter a valid Email adddress!</div>
                                        </div>
                                    </div>


                                    

                                    <div class="col-12">
                                    <label for="yourPassword" class="form-label">Contraseña</label>
                                    <input type="password" name="password" class="form-control" id="yourPassword" required @input="${this.updatePassword}">
                                    <div class="invalid-feedback">Please enter your password!</div>
                                    </div>

                                    <div class="col-12">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="remember" value="true" id="rememberMe">
                                        <label class="form-check-label" for="rememberMe">Recuerdame</label>
                                    </div>
                                    </div>
                                    <div class="col-12">
                                    <button class="btn btn-secondary" type="button" @click="${this.loginUser}">Ingresar</button>
                                    
                                    </div>
                                    <div class="col-12">
                                    <p class="small mb-0">¿No tienes una cuenta? <app-link href="/signup">Registrarse</app-link></p>
                                    </div>
                                </form>

                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        `;
    }
    loginUser(){
        sandbox.dispatch('login-user',{  
            'email':this.email,        
            'password': this.password,
        },this);
    }
    updateEmail(e){
        this.email=e.target.value;
    }
    updatePassword(e){
        this.password=e.target.value;
    }
}

customElements.define("login-view", LoginView);