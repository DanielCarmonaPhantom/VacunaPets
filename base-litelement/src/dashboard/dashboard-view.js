
import { LitElement, html, css } from "lit-element";
import { router } from "lit-element-router";

import '../main/app-link.js'

import '../pets/card-component.js'
import '../pets/modal-add-pet.js'
import '../pets/modal-edit-pet.js'

import sandbox from '../sandbox/sandbox.js';

class DashboardView extends router(LitElement) {

    static get properties() {
        return {
            idUser: { type:Number} ,
            pets: { type: Array },
            src: { type:String}

        };
    }
    constructor() {
        super();

        this.pets = [];
        this.idUser = 0;
        this.src = "http://localhost:3000/"

        sandbox.on('add-pet',this._crearMascota.bind(this));
         

    }
    static get styles(){
        return css `
            #about{
                margin-top:120px;
            }

        `;
    }

    render() {
        return html`
            <!-- CSS only -->
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
            <section id="about" class="about-mf sect-pt4 route">
                <div class="container">
                    <div class="row">
                    ${this.pets.map(function (mascota) {
                        return html `                            
                            <card-component petId="${mascota.id}" petName="${mascota.name}" petType="${mascota.type}" petDescription="${mascota.description}" petAge="${mascota.age}" petUrlImage="${mascota.image.src}"></card-component>
                            <modal-edit-pet petId="${mascota.id}" petName="${mascota.name}" petType="${mascota.type}" petDescription="${mascota.description}" petAge="${mascota.age}" petUrlImage="${mascota.image.src}"></modal-edit-pet>
                        `;
                    })}
                    </div>
                </div>
            </section>

            <modal-add-pet></modal-add-pet>
            
        `;
    }
    updated(changedProperties){        
        
        if(changedProperties.has("idUser")) {
            this._obtenerMascotas(this.idUser)  
        }
        
    }
    _obtenerMascotas(id){       
        let xhr = new XMLHttpRequest();
        xhr.onload = function() {
        if(xhr.status === 200){
            let apiResponse = JSON.parse(xhr.responseText);            
            let user = apiResponse;
            this._pintarMascotas(user.pets)
            
        }
        }.bind(this);
        xhr.open("GET",this.src + 'users/' + id);
        xhr.setRequestHeader('Cache-Control', 'no-cache');
        xhr.send();
    }
    _pintarMascotas(array){
        this.pets = [];
        array.forEach(element => {
            
            let xhr = new XMLHttpRequest();
            xhr.onload = function(){
                if(xhr.status === 200){
                    let apiResponse = JSON.parse(xhr.responseText);                                        
                    this.pets  = [...this.pets , apiResponse]                   
                                    
                }
            }.bind(this);
            xhr.open("GET", this.src + 'pets/' + element);
            xhr.setRequestHeader('Cache-Control', 'no-cache');
            xhr.send();
        });       
    }
    _crearMascota(e){
        var body =JSON.stringify(e);

		let xhr = new XMLHttpRequest();
		xhr.onload = function (){
			if (xhr.status === 201){
				let apiResponse = JSON.parse(xhr.responseText);
                console.log("Se creo a "+ apiResponse.name)
                this._asignarMascota(this.idUser, apiResponse.id)
			}
		}.bind(this);
		xhr.open("POST", this.src+ 'pets');
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.send(body);
    }
    _asignarMascota(idUser, idMascota){
        let xhr = new XMLHttpRequest();
        xhr.onload = function() {
        if(xhr.status === 200){
            let apiResponse = JSON.parse(xhr.responseText);            
            let user = apiResponse;
            this._actualizarMascotas(idUser, idMascota, user.pets)
            
        }
        }.bind(this);
        xhr.open("GET",this.src + 'users/' + idUser);
        xhr.setRequestHeader('Cache-Control', 'no-cache');
        xhr.send();
    }
    _actualizarMascotas(id, idMascota, mascotasAntiguas){
        let mascotasNuevas = [... mascotasAntiguas, idMascota]

        let body = {'pets': mascotasNuevas}

		let xhr = new XMLHttpRequest();
		xhr.onload = function (){
			if (xhr.status === 200){
				let apiResponse = JSON.parse(xhr.responseText);                    
                let user = apiResponse;
                this._pintarMascotas(user.pets)         
			}
		}.bind(this);
		xhr.open("PATCH", this.src + 'users/' + id);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.send(JSON.stringify(body));
    }
    
    
}

customElements.define("dashboard-view", DashboardView);