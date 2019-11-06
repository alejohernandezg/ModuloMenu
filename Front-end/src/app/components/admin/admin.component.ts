import { Component, OnInit } from '@angular/core';
import { IngredienteService } from '../../services/ingrediente/ingrediente.service';
import { PlatoService } from '../../services/plato/plato.service';
import { Ingrediente } from '../../services/Models/ingrediente';
import { Plato } from '../../services/Models/plato';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private ingredienteService: IngredienteService,
              private platoService: PlatoService) {
    this.getIngredientes();
    this.getPlatos();
  }

  ngOnInit() { }

  async getIngredientes() {
    this.ingredienteService.getIngredientes().then( (tempIngredientes: Ingrediente[]) => {
      console.log(tempIngredientes);
    });
  }

  async getPlatos() {
    this.platoService.getPlatos().then( (tempPlatos: Plato[]) => {
      console.log(tempPlatos);
    });
  }
}
