import { Component, OnInit } from '@angular/core';
import { IngredienteService } from '../../services/ingrediente/ingrediente.service';
import { PlatoService } from '../../services/plato/plato.service';
import { Ingrediente } from '../../services/Models/ingrediente';
import { Plato } from '../../services/Models/plato';
import { SuiModalService } from 'ng2-semantic-ui';
import { element } from 'protractor';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public listIngredientes: Ingrediente[];
  public listPlatosIngredientes: Ingrediente[];
  public listNewPlatoIngredientes: number[] = [];
  public listPlatos: Plato[];

  public checkBox = true;

  public selectedOption; // Se coloca el valor por defecto
  public selectorTipo: any = {
    opciones: [
      { id: 1, name: 'Almuerzo'},
      { id: 2, name: 'Cena'},
    ],
    seleccionado: undefined
  };

  public actualIngrediente: Ingrediente = {pk_idingredient : 1,
                                          ingredientname: '',
                                          description: '',
                                          active: false};

  public actualPlato: Plato = {pk_idplate: 1,
                              fk_idtypeplate: 1,
                              fk_idrestaurant: 1,
                              platename: '',
                              platedescription: '',
                              amount: 1,
                              active: false,
                              imageplate: ''};

  public show: boolean = false;
  public show1: boolean = false;
  public show2: boolean = false;
  public show3: boolean = false;

  constructor(private ingredienteService: IngredienteService,
              private platoService: PlatoService,
              public modalService: SuiModalService) {
    this.getIngredientes();
    this.getPlatos();
  }

  ngOnInit() { }

  async getIngredientes() {
    this.ingredienteService.getIngredientes().then( (tempIngredientes: Ingrediente[]) => {
      this.listIngredientes = tempIngredientes;
    });
  }

  async getPlatos() {
    this.platoService.getPlatos().then( (tempPlatos: Plato[]) => {
      this.listPlatos = tempPlatos;
    });
    /*this.ingredienteService.getIngredienteById(3).then( (data: any) => {
      console.log(data);
    });*/
  }

  public update() {
    this.ingredienteService.getIngredientes().then( (tempIngredientes: Ingrediente[]) => {
      this.listIngredientes = tempIngredientes;
      console.log(this.listIngredientes);
    });
  }

  public createPlato(nombre: string, valor: number, foto: string, descripcion: string) {
    const tempPlatoNuevo: Plato = {
      pk_idplate: 0,
      fk_idtypeplate: this.selectedOption,
      fk_idrestaurant: 2, // Se nesecita traer de otros modulos
      platename: nombre,
      platedescription: descripcion,
      amount: valor,
      active: this.checkBox,
      imageplate: foto
    };
    console.log(tempPlatoNuevo);
    this.platoService.crearPlato(tempPlatoNuevo, this.listNewPlatoIngredientes).then();
  }

  public anadirIngredientePlato(i: number) {
    this.listNewPlatoIngredientes.push(i);
    console.log(this.listNewPlatoIngredientes);
  }

  public quitarIngredientePlato(i: number) {
    this.listNewPlatoIngredientes.splice(i, 1);
    console.log(this.listNewPlatoIngredientes);
  }

  public createIngrediente(nombre: string, descripcion: string) {
    const tempIngredienteNuevo: Ingrediente = {
      pk_idingredient: 0,
      ingredientname: nombre,
      description: descripcion,
      active: true
    };
    this.ingredienteService.crearIngrediente(tempIngredienteNuevo).then( (data: any) => {
      this.update();
    });
  }

  public updatePlate(plato: Plato, nombre: string, valor: number, foto: string, descripcion: string) {
    console.log(plato);
    if (this.checkBox) {
      plato.platename = nombre;
      plato.platedescription = descripcion;
      plato.amount = valor;
      plato.imageplate = foto;

      this.platoService.actualizarPlato(plato, this.listNewPlatoIngredientes).then( (data: any) => {});
    } else {
      this.platoService.deletePlato(plato).then();
    }
  }

  public updateIngrediente(nombre: string, descripcion: string) {
    if (this.checkBox) {
      this.actualIngrediente.ingredientname = nombre;
      this.actualIngrediente.description = descripcion;
      this.ingredienteService.actualizarIngrediente(this.actualIngrediente.pk_idingredient, this.actualIngrediente).then();
    } else {
      this.ingredienteService.deleteIngredienteById(this.actualIngrediente.pk_idingredient).then();
    }
  }

  public abrirModal(id: number = -1, flag: number, index: number) {
    if (flag === 1) {
      this.actualIngrediente = this.listIngredientes[index];
      this.checkBox = this.actualIngrediente.active;
      this.show = true;
    } else if (flag === 2) {
      this.listNewPlatoIngredientes = [];
      this.ingredienteService.getIngredienteByIdPlato(id).then( (data: Ingrediente[] ) => {
        this.actualPlato = this.listPlatos[index];
        this.selectedOption = this.actualPlato.fk_idtypeplate;
        this.listPlatosIngredientes = data;
        for  (let i = 0; i < data.length; i++) {
          this.listNewPlatoIngredientes.push(this.listPlatosIngredientes[i].pk_idingredient);
        }
        this.checkBox = this.actualPlato.active;
        this.show1 = true;
      });
    } else if (flag === 3) {
      this.listNewPlatoIngredientes = [];
      this.show2 = true;
    } else if (flag === 4) {
      this.show3 = true;
    } else { }
  }

  public getIngredienteNuevoEstado(i: number) {
    const temp = this.listNewPlatoIngredientes.find(x => x == i);
    if (temp == null){
      return false;
    } else {
      return true;
    }
  }
}
