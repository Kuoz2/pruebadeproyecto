import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BitacoraService {

  constructor(private http: HttpClient) { }
  url_registros_realizados = 'https://marketmini.herokuapp.com/binnacles'
  url_registro_producto = 'https://marketmini.herokuapp.com/products'
  registros_almacenados(){
    return this.http.get(this.url_registros_realizados)
  }
  Obtener_Registro_id(id){
    return this.http.get(this.url_registro_producto+'/'+id)
  }
}
