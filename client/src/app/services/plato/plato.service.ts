import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Plato } from '../Models/plato';

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

  public crearPlato(plato: Plato) {
    const URL = `http://localhost:3000/menu/ingredient?
    pk_idplate=${plato.pk_idplate}&
    fk_idtypeplate=${plato.fk_idtypeplate}&
    fk_idrestaurant=${plato.fk_idrestaurant}&
    platename=${plato.platename}&
    platedescription=${plato.platedescription}&
    amount=${plato.amount}&
    active=${plato.active}&
    imageplate=${plato.imageplate}`;
    this.httpHeaders = new HttpHeaders()
    .set('Accept', '*/*');
    return this.http.post(
      URL, { headers: this.httpHeaders }
      ).toPromise();
  }

  public actualizarPlato(plato: Plato) {
    const URL = `http://localhost:3000/menu/ingredient/${plato.pk_idplate}?
    fk_idtypeplate=${plato.fk_idtypeplate}&
    fk_idrestaurant=${plato.fk_idrestaurant}&
    platename=${plato.platename}&
    platedescription=${plato.platedescription}&
    amount=${plato.amount}&
    active=${plato.active}&
    imageplate=${plato.imageplate}`;
    this.httpHeaders = new HttpHeaders()
    .set('Accept', '*/*');
    return this.http.put(
      URL, { headers: this.httpHeaders }
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
