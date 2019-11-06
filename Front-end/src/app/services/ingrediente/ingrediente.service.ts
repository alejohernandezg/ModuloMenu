import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IngredienteService {

  private httpHeaders: HttpHeaders;
  private parametros: HttpParams;

  constructor(private http: HttpClient) { }

  public getIngredientes() {
    const URL = 'http://localhost:8641/menu/ingredients';
    this.httpHeaders = new HttpHeaders()
    .set('Accept', '*/*');
    return this.http.get(
      URL, { headers: this.httpHeaders }
      ).toPromise();
  }
}
