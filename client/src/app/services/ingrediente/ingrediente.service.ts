import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Ingrediente } from '../Models/ingrediente';

@Injectable({
  providedIn: 'root'
})
export class IngredienteService {

  private httpHeaders: HttpHeaders;
  private parametros: HttpParams;

  constructor(private http: HttpClient) { }

  public getIngredientes() {
    const URL = 'http://localhost:3000/menu/ingredients';
    this.httpHeaders = new HttpHeaders()
    .set('Accept', '*/*');
    return this.http.get(
      URL, { headers: this.httpHeaders }
      ).toPromise();
  }

  public getIngredienteByIdPlato(id: number) {
    const URL = `http://localhost:3000/menu/ingredients/${id}`;
    this.httpHeaders = new HttpHeaders()
    .set('Accept', '*/*');
    return this.http.get(
      URL, { headers: this.httpHeaders }
      ).toPromise();
  }

  public crearIngrediente(ingrediente: Ingrediente) {
    const URL = `http://localhost:3000/menu/ingredient?
    pk_idingredient=${ingrediente.pk_idingredient}&
    ingredientname=${ingrediente.ingredientname}&
    description=${ingrediente.description}&
    active=${ingrediente.active}`;
    this.httpHeaders = new HttpHeaders()
    .set('Accept', '*/*');
    return this.http.post(
      URL, { headers: this.httpHeaders }
      ).toPromise();
  }

  public getIngredienteById(id: number) {
    const URL = `http://localhost:3000/menu/ingredients/${id}`;
    this.httpHeaders = new HttpHeaders()
    .set('Accept', '*/*');
    return this.http.get(
      URL, { headers: this.httpHeaders }
      ).toPromise();
  }

  public actualizarIngrediente(id: number, ingrediente: Ingrediente) {
    const URL = `http://localhost:3000/menu/ingredient/${id}`;
    this.httpHeaders = new HttpHeaders()
    .set('Accept', '*/*');
    return this.http.put(
      URL, { headers: this.httpHeaders }
      ).toPromise();
  }

  public deleteIngredienteById(id: number) {
    const URL = `http://localhost:3000/menu/delete/ingredient/${id}`;
    this.httpHeaders = new HttpHeaders()
    .set('Accept', '*/*');
    return this.http.put(
      URL, { headers: this.httpHeaders }
      ).toPromise();
  }
}
