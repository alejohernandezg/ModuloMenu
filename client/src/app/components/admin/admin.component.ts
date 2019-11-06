import { Component, OnInit } from '@angular/core';
import { IngredienteService } from '../../services/ingrediente/ingrediente.service';
import { PlatoService } from '../../services/plato/plato.service';
import { Ingrediente } from '../../services/Models/ingrediente';
import { Plato } from '../../services/Models/plato';
import { SuiModalService, TemplateModalConfig, ModalTemplate } from 'ng2-semantic-ui';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public listIngredientes: Ingrediente[];
  public listPlatos: Plato[];

  public actualIngrediente: Ingrediente = {'pk_idingredient' : 1,
                                          ingredientname: '',
                                          description: '',
                                          active: false};
  public actualPlato: Plato = {'pk_idplate': 1,
                              'fk_idtypeplate': 1,
                              'fk_idrestaurant': 1,
                              platename: '',
                              platedescription: '',
                              amount: 1,
                              active: false,
                              imageplate: ''};

  public show: boolean = false;

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
      console.log(this.listIngredientes);
    });
  }

  async getPlatos() {
    this.platoService.getPlatos().then( (tempPlatos: Plato[]) => {
      console.log(tempPlatos);
      this.listPlatos = tempPlatos;
    });
    this.ingredienteService.getIngredienteById(3).then( (data: any) => {
      console.log(data);
    });
  }

  public abrirModal(id: number, flag: number) {
    if (flag == 1) {
      this.actualIngrediente = this.listIngredientes[id];
    } else if (flag == 2) {
      this.platoService.getPlatosById(id).then( (data: any ) => {
        console.log(data);
      });
    } else { }
    this.show = true;
  }
}
