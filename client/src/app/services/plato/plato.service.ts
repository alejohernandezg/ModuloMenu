import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Plato } from '../Models/plato';
import { Ingrediente } from '../Models/ingrediente';

@Injectable({
  providedIn: 'root'
})
export class PlatoService {

  private httpHeaders: HttpHeaders;
  private parametros: HttpParams;

  constructor(private http: HttpClient) { }

  public getPlatos() {
    const URL = 'http://localhost:3000/menu/plates';
    this.httpHeaders = new HttpHeaders()
    .set('Accept', '*/*');
    return this.http.get(
      URL, { headers: this.httpHeaders }
      ).toPromise();
  }

  public getPlatosByType(id: number) {
    const URL = `http://localhost:3000/menu/plates/type/${id}`;
    this.httpHeaders = new HttpHeaders()
    .set('Accept', '*/*');
    return this.http.get(
      URL, { headers: this.httpHeaders }
      ).toPromise();
  }

  public getPlatosById(id: number) {
    const URL = `http://localhost:3000/menu/plates/${id}`;
    this.httpHeaders = new HttpHeaders()
    .set('Accept', '*/*');
    return this.http.get(
      URL, { headers: this.httpHeaders }
      ).toPromise();
  }

  public crearPlato(plato: Plato, ingredientes: number[]) {
    const URL = `http://localhost:3000/menu/plate`;
    const tempPlatoNuevo = {plateName: plato.platename,
      plateDescription: plato.platedescription,
      amount: +plato.amount,
      fk_idTypePlate: plato.fk_idtypeplate,
      fk_idRestaurant: plato.fk_idrestaurant,
      imageplate: plato.imageplate,
      ingredients: ingredientes};
    this.httpHeaders = new HttpHeaders()
    .set('Accept', '*/*')
    .set('Content-Type', 'application/json');
    return this.http.post(
      URL, tempPlatoNuevo, { headers: this.httpHeaders }
    ).toPromise();
  }

  public actualizarPlato(plato: Plato, ingredientes: number[]) {
    const URL = `http://localhost:3000/menu/ingredient/${plato.pk_idplate}`;
    const tempPlatoUpdate = {plateName: plato.platename,
      plateDescription: plato.platedescription,
      amount: +plato.amount,
      fk_idTypePlate: plato.fk_idtypeplate,
      fk_idRestaurant: plato.fk_idrestaurant,
      imageplate: plato.imageplate,
      ingredients: ingredientes};
    this.httpHeaders = new HttpHeaders()
    .set('Accept', '*/*')
    .set('Content-Type', 'application/json');
    console.log(tempPlatoUpdate);
    return this.http.put(
      URL, tempPlatoUpdate , { headers: this.httpHeaders }
      ).toPromise();
  }

  public deletePlato(plato: Plato) {
    const URL = `http://localhost:3000/menu/delete/plate/${plato.pk_idplate}`;
    this.httpHeaders = new HttpHeaders()
    .set('Accept', '*/*');
    return this.http.put(
      URL, { headers: this.httpHeaders }
      ).toPromise();
  }
}
