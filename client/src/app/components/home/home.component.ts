import { Component, OnInit } from '@angular/core';
import { TransitionController, Transition, TransitionDirection, SuiModalService } from 'ng2-semantic-ui';
import { Pedido } from '../../services/Models/pedido';
import { Plato } from '../../services/Models/plato';
import { Ingrediente } from '../../services/Models/ingrediente';
import { PlatoService } from '../../services/plato/plato.service';
import { IngredienteService } from '../../services/ingrediente/ingrediente.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public transitionController1 = new TransitionController();
  public transitionController2 = new TransitionController(false);
  public transitionController3 = new TransitionController(false);

  public activeCanvas = 1;
  public contPedidos = 0;

  public comentario: string = '';

  public show: boolean = false;

  public listaPlatos: Plato[] = [];
  public listaIngredientes: Ingrediente[] = [];

  public activoPlato: Plato;
  public activoIngrediente: Ingrediente;

  public tempPedido: Pedido[] = [];

  constructor(private servicioPlato: PlatoService,
              private servicioIngrediente: IngredienteService,
              public modalService: SuiModalService) { }

  ngOnInit() {
  }

  public getPlatosByTime(id: number) {
    this.servicioPlato.getPlatosByType(id).then( (data: Plato[] ) => {
      // console.log(data);
      this.listaPlatos = data;
    });
  }

  public agregarPlatoOrden(idLista: number, idPlato: number) {
    this.servicioIngrediente.getIngredienteByIdPlato(idPlato).then( ( data: Ingrediente[] ) => {
      this.tempPedido.push( new Pedido(this.listaPlatos[idLista], data, ''));
      this.contPedidos = this.contPedidos + 1;
    });
  }

  public guardarInfoPlato(plato: Plato, listaTempIngrediente: Ingrediente[]) {
    this.tempPedido.push( new Pedido(plato, listaTempIngrediente, ''));
  }

  public eliminarPedido(id: number) {
    this.tempPedido.splice(id, 1);
    this.contPedidos = this.contPedidos - 1;
  }

  public abrirModal(flag: number, dato: any, indx: number = 0) {
    if ( flag == 1 ) {
      this.servicioIngrediente.getIngredienteByIdPlato(dato.pk_idplate).then( (ingredientes: Ingrediente[]) => {
        this.listaIngredientes = ingredientes;
        this.activoPlato = dato;
        console.log(this.listaIngredientes);
        this.show = true;
      });
    } else if ( flag == 2 ) {
      this.activoPlato = this.tempPedido[indx].infoPlato;
      this.listaIngredientes = this.tempPedido[indx].listaIngredientes;
      this.comentario = this.tempPedido[indx].comentario;
    }
  }

  public animate1In(transitionName: string = 'scale') {

    this.transitionController1.animate(
        new Transition(transitionName, 2000, TransitionDirection.In, () => {})
    );
  }

  public animate1Out(transitionName: string = 'scale') {

    this.transitionController1.animate(
        new Transition(transitionName, 500, TransitionDirection.Out, () => {})
    );
  }

  public animate2In(transitionName: string = 'scale') {

    this.transitionController2.animate(
      new Transition(transitionName, 2000, TransitionDirection.In, () => {})
    );
  }

  public animate2Out(transitionName: string = 'scale') {

    this.transitionController2.animate(
      new Transition(transitionName, 500, TransitionDirection.Out, () => {})
    );
  }

  public animate3In(transitionName: string = 'scale') {
    this.transitionController3.animate(
      new Transition(transitionName, 2000, TransitionDirection.In, () => {} )
    );
  }

  public animate3Out(transitionName: string = 'scale') {
    this.transitionController3.animate(
      new Transition(transitionName, 500, TransitionDirection.Out, () => {} )
    );
  }

  public adelante(numero: number) {
    if (numero == 2) {
      this.animate1Out();
      this.activeCanvas = this.activeCanvas + 1;
      this.animate2In();
    } else if (numero == 3) {
      this.animate2Out();
      this.activeCanvas = this.activeCanvas + 1;
      this.animate3In();
    }
  }

  public atras(numero: number) {
    if (numero == 1) {
      this.animate2Out();
      this.activeCanvas = this.activeCanvas - 1;
      this.animate1In();
    } else if (numero == 2) {
      this.animate3Out();
      this.activeCanvas = this.activeCanvas - 1;
      this.animate2In();
    }
  }
}