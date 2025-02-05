import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Pagos} from '../components/Modulos/Pagos';
import {Observable} from 'rxjs';
import {Medio} from '../components/Modulos/Medio';
import { VerificarTokenService } from './verificar-token.service';
import { respuesta, guardado } from './../components/Modulos/respuesta';

@Injectable({
  providedIn: 'root'
})
export class PagosService {

  constructor(private http: HttpClient, private verificar: VerificarTokenService) { }


  Url = 'https://marketmini.herokuapp.com/payments';
    urlmedio = 'https://marketmini.herokuapp.com/half_payments';

  
  mostrarpagos() {
   return  this.http.get<Pagos[]>(this.Url);
  }

  guardapagos(pago: Pagos): Observable<Pagos> {
   return  this.http.post<Pagos>(this.Url, pago);
  }

  mostrarmediodepago() {
    return   this.http.get<Medio[]>(this.urlmedio);
  }

 async guardarmododepago(med) {
  await this.verificar.vierificarSaveHalfPyme().subscribe((respuesta: respuesta) => {
    console.log(respuesta);
    if (respuesta.resultado != 'existe') { return; }
    if (respuesta.resultado == 'existe') {

      this.http.post<Medio>(this.urlmedio, med.value).subscribe( res => {
       if( Object.values(res)[0] == 'correctamente'){
           med.reset()
       } 
       
       })
    }
  })  
  
  }
}
