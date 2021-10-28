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
  private ventarapida='https://marketmini.herokuapp.com/quick_sales';
  mostrarventas() {
   return this.http.get<Ventas>(this.Urlventas);
  }

  guardarventas(vebta: Ventas) {
    return this.http.post<Ventas[]>(this.Urlventas, vebta);
  }


  __guardar_ventaRapida(vrp){
    console.log('venta rapida', vrp)
  return this.http.post(this.ventarapida, vrp).toPromise().then(res => console.log(res)).catch(error => console.log(error))
  }
}
