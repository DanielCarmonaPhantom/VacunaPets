import { LitElement, html, css } from "lit-element";


class TableComponent extends LitElement {
    static get properties() {
        return {
            petId: {type:Number},
            vacines: {type:Number}

        };
    }
    constructor() {
        super();

        this.petId = 0;
        this.vacines = [];

        this.src = "http://localhost:3000/"
    }
    static get styles(){
        return css `            

        `;
    }

    render(){
        return html `
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">

            <table class="table">
                <thead>
                    <tr>
                    
                    <th scope="col">Fecha</th>
                    <th scope="col">Id Vacuna</th>
                    <th scope="col">Vacuna</th>
                    <th scope="col">Lugar</th>

                    </tr>
                </thead>
                <tbody>
                    ${this.vacines.map(function (vacine) {
                        return html `                            
                        <tr>
                            <th scope="row">${vacine.date}</th>
                            <td>${vacine.id}</td>
                            <td>${vacine.name}</td>
                            <td>${vacine.address}</td>
                        </tr>
                        `;
                    })}
                </tbody>
            </table>
        `;
    }

    updated(changedProperties){              
        if(changedProperties.has("petId")) {
            console.log(this.petId)
            this._obtenerVacunas(this.petId)  
        }        
    }
    _obtenerVacunas(id){       
        let xhr = new XMLHttpRequest();
        xhr.onload = function() {
        if(xhr.status === 200){
            let apiResponse = JSON.parse(xhr.responseText);            
            let user = apiResponse;
            this._pintarVacuna(user.vacines)
            
        }
        }.bind(this);
        xhr.open("GET",this.src + 'pets/' + id);
        xhr.setRequestHeader('Cache-Control', 'no-cache');
        xhr.send();
    }

    _pintarVacuna(array){
        this.vacines = [];
        array.forEach(element => {            
            this.vacines  = [...this.vacines , element] 
        });       
    }
}

customElements.define("table-component", TableComponent);





