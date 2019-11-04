import { Component, OnInit } from '@angular/core';
import { TransitionController, Transition, TransitionDirection, SuiAccordionModule } from 'ng2-semantic-ui';

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

  constructor() { }

  ngOnInit() {
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
