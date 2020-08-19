import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class APIService {
 url:string='http://157.245.248.79:3000/';
  constructor(private http:HttpClient) { }
  getTiempo(){
    return this.http.get(this.url + 'Rutas/Rutas.php')
  }
  registrarDispositivo(datos){
    return this.http.post<{id}>(this.url + 'dispositivos',datos)
  }
}
