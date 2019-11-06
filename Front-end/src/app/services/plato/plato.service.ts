import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlatoService {

  private httpHeaders: HttpHeaders;
  private parametros: HttpParams;

  constructor(private http: HttpClient) { }

  public getPlatos() {
    const URL = 'http://localhost:8641/menu/plates';
    this.httpHeaders = new HttpHeaders()
    .set('Accept', '*/*');
    return this.http.get(
      URL, { headers: this.httpHeaders }
      ).toPromise();
  }
}
