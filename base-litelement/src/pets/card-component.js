
import { LitElement, html, css } from "lit-element";

import './table-component.js'

import sandbox from '../sandbox/sandbox.js';

class CardComponent extends LitElement {
    static get properties() {
        return {
            petId: { type:Number },
            petName: { type: String},
            petType: { type: String},
            petDescription: {type: String},
            petAge: {type:Number},
            petUrlImage: {type:String}



        };
    }
    constructor() {
        super();

        this.petId = 0; 
        this.petName = ""; 
        this.petType = ""; 
        this.petDescription = ""; 
        this.petAge = 0; 
        this.petUrlImage = ";"

        sandbox.on('update-pet',this._editarMascota.bind(this)); 
        this.src = "http://localhost:3000/"
    }
    static get styles(){
        return css `            
        .about-mf .box-shadow-full {
            padding-top: 4rem;
            padding-bottom: 4rem;
        }
        
        .about-mf .about-img {
            margin-bottom: 2rem;
        }
        
        .about-mf .about-img img {
            margin-left: 10px;
        }
        .box-pl2 {
            padding-left: 2rem;
          }
          
          .box-shadow-full {
            padding: 3rem 1.25rem;
            position: relative;
            background-color: #fff;
            margin-bottom: 3rem;
            z-index: 2;
            box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.06), 0 2px 5px 0 rgba(0, 0, 0, 0.2);
          }
          .profile-card img {
          }
          
          .profile-card h2 {
            font-size: 24px;
            font-weight: 700;
            color: #2c384e;
            margin: 10px 0 0 0;
          }
          
          .profile-card h3 {
            font-size: 18px;
          }
          
          .profile-card .social-links a {
            font-size: 20px;
            display: inline-block;
            color: rgba(1, 41, 112, 0.5);
            line-height: 0;
            margin-right: 10px;
            transition: 0.3s;
          }
          
          .profile-card .social-links a:hover {
            color: #012970;
          }
          
          .profile-overview .row {
            margin-bottom: 20px;
            font-size: 15px;
          }
          
          .profile-overview .card-title {
            color: #012970;
          }
          
          .profile-overview .label {
            font-weight: 600;
            color: rgba(1, 41, 112, 0.6);
          }
          
          .profile-edit label {
            font-weight: 600;
            color: rgba(1, 41, 112, 0.6);
          }
          
          .profile-edit img {
            max-width: 120px;
          }
        `;
    }

    render(){
        return html `
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css">
            <div class="col-sm-12">
                <div class="box-shadow-full">
                    <div class="row">
                        <div class="col-md-6">
                            <div class='text-start mb-3'>
                                <button type="button" class="btn btn-info" @click="${this._mostrarModal}"><i class="bi bi-pencil-square"></i> Editar mascota</button>
                                <button type="button" class="btn btn-success "><i class="bi bi-plus"></i> Agregar vacuna</button>
                                <button type="button" class="btn btn-danger"><i class="bi bi-trash3-fill"></i></button>
                            </div>
                            <div class="row">
                                <div class="col-sm-4 col-md-5">                                    
                                    <div class="card">
                                        <div class="card-body profile-card d-flex flex-column align-items-center">
                                            <img src="${this.petUrlImage}" alt="Profile" class="img-fluid">
                                            <h2>${this.petName}</h2>
                                            <div class="social-links mt-2">
                                                <a href="#" class="twitter"><i class="bi bi-qr-code"></i></a>
                                                
                                            </div>
                                     
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-8 col-md-7">                                
                                    <div class="about-info">
                                        <div class="tab-pane fade show active profile-overview" id="profile-overview">
                                            <h5 class="card-title mb-3">Sobre ${this.petName}</h5>
                                            <p class="small fst-italic">${this.petDescription}</p>

                                            <h5 class="card-title mt-5 mb-3">Detalles de la mascota</h5>

                                            <div class="row">
                                                <div class="col-lg-5 label">Nombre completo</div>
                                                <div class="col-lg-7 ">${this.petName}</div>
                                            </div>
                                            <div class="row">
                                                <div class="col-lg-5 label">Edad</div>
                                                <div class="col-lg-7 ">${this.petAge}</div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div class="col-md-6">
                            
                            <div class="about-me">                                
                                    <table-component petId="${this.petId}"></table-component>                                
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    _mostrarModal(){
        sandbox.dispatch('abrir-modal-edit-pet',this);
    }
    _editarMascota(e){
        console.log(e)
        let body = {"name": e.name, "tpye": e.type, "description": e.description, "age": e.age}

		let xhr = new XMLHttpRequest();
		xhr.onload = function (){
			if (xhr.status === 200){
				let apiResponse = JSON.parse(xhr.responseText);                    
                let mascota = apiResponse;

                this.petId = mascota.id;
                this.petName = mascota.name;
                this.petType = mascota.type;
                this.petDescription = mascota.description;
                this.petAge = mascota.age;      
			}
		}.bind(this);
		xhr.open("PATCH", this.src + 'pets/' + e.id);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.send(JSON.stringify(body));
    }
}

customElements.define("card-component", CardComponent);