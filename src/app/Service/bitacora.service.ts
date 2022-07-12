import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BitacoraService {

  constructor(private http: HttpClient) { }
  url_registros_realizados = 'http://localhost:3000/binnacles'
  url_registro_producto = 'http://localhost:3000/products'
  registros_almacenados(){
    return this.http.get(this.url_registros_realizados)
  }
  Obtener_Registro_id(id){
    return this.http.get(this.url_registro_producto+'/'+id)
  }
}
