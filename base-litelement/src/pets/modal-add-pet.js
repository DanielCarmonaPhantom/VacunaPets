import { LitElement, html, css } from 'lit';

import sandbox from '../sandbox/sandbox.js';
export class ModalAddPet extends LitElement {
    static get properties() {
        return{
          mascota: {type:Object},
          src:{type:String},

          petId: { type:Number },
          petName: { type: String},
          petType: { type: String},
          petDescription: {type: String},
          petAge: {type:Number},
          petUrlImage: {type:String}
        }
    }
  
    constructor() {
      super();
      
      this.src="";

      this.petId = 0; 
      this.petName = ""; 
      this.petType = ""; 
      this.petDescription = ""; 
      this.petAge = 0; 
      this.petUrlImage = ";"
     
      sandbox.on('abrir-modal-add-pet',this.showDialog.bind(this));
    }
  
    
    static get styles(){
        return css `   
 
        `;
    }
  
    render() {
      return html`
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
        <!-- Modal -->
        <!-- Modal -->
        <div class="modal fade modal-lg " id="modalEliminar" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog ">
            <div class="modal-content shadow p-3 mb-5 rounded">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Crear una mascota</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="${this.esconderDialog}"></button>
                </div>
                <div class="modal-body">
                    <form>
                    <div class="row mb-3">
                        <label for="inputText" class="col-sm-4 col-form-label">Nombre de la mascota</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" @input="${this.updateNombre}">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="inputText" class="col-sm-4 col-form-label">Typo de la mascota</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" @input="${this.updateEspacie}">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="inputText" class="col-sm-4 col-form-label">Edad</label>
                        <div class="col-sm-8">
                            <select class="form-select" id="floatingSelect" aria-label="Floating label select example" @input="${this.updateEdad}">
                                <option selected>Seleccionar edad</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="row mb-3">
                        <label for="inputPassword" class="col-sm-4 col-form-label">Descripcción</label>
                        <div class="col-sm-8">
                            <textarea class="form-control" style="height: 100px" @input="${this.updateDescripcion}"></textarea>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="inputNumber" class="col-sm-4 col-form-label">Foto</label>
                        <div class="col-sm-8">
                            <input class="form-control" type="file" id="formFile">
                        </div>
                    </div>
           
                </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="${this.esconderDialog}" >Close</button>
                    <button type="button" class="btn btn-primary" @click="${this._addPet}">Guardar mascota</button>
                </div>
            </div>
        </div>
        </div>
      `;
    }
    showDialog(){
        let modalEliminar = this.shadowRoot.getElementById("modalEliminar");
        modalEliminar.classList.add('show');
        modalEliminar.style.display="block";
     
    }
    
    esconderDialog(){
        var modalElimiar = this.shadowRoot.getElementById("modalEliminar");
        modalElimiar.classList.remove('show');
        modalElimiar.style.display="none";
        this.shadowRoot.getElementById('formu').reset();
    }
      
  
    updateNombre(e) {
       this.petName = e.target.value;
    }
  
    updateEspacie(e) {
      this.petType = e.target.value;
    }
  
    updateEdad(e) {
      this.petAge = e.target.value;
    }
  
    updateDescripcion(e) {
      this.petDescription = e.target.value;
    }
    _addPet(){
        let today = new Date();
        let day = today.getDate();
        let month = today.getMonth() + 1;
        let year = today.getFullYear();

        sandbox.dispatch('add-pet',{
            "name": this.petName,
            "type": this.petType,
            "description": this.petDescription,
            "age": this.petAge,
            "createdAt": day + '/' + month + '/' + year,
            "image": {
            "src": "./img/perro.jpg"
            }
        },this);


        this.esconderDialog()
    }


}

customElements.define('modal-add-pet',ModalAddPet);