import { FormGroup } from '@angular/forms';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Ventas} from '../components/Modulos/Ventas';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  constructor(private http: HttpClient) { }

  Urlventas = 'https://marketmini.herokuapp.com/sales';
  PruebaVentas = 'http://localhost:3000/sales';
  private ventarapida='http://localhost:3000/quick_sales';
  mostrarventas() {
   return this.http.get<Ventas>(this.Urlventas);
  }

  guardarventas(vebta: Ventas) {
    return this.http.post<Ventas[]>(this.Urlventas, vebta);
  }


  __guardar_ventaRapida(vrp){
    console.log('guardando', vrp)
  //  return this.http.post(this.ventarapida, vrp.value).toPromise().then(res => console.log(res)).catch(error => console.log(error))
  }
}
