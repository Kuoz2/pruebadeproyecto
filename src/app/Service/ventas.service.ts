import { async } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Ventas} from '../components/Modulos/Ventas';
import { VerificarTokenService } from './verificar-token.service';
import { respuesta, guardado } from './../components/Modulos/respuesta';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  constructor(private http: HttpClient, private verificar: VerificarTokenService) { }

  Urlventas = 'https://marketmini.herokuapp.com/sales';
  private ventarapida='https://marketmini.herokuapp.com/quick_sales';
  mostrarventas() {
   return this.http.get<Ventas>(this.Urlventas);
  }

 async guardarventas(vebta: Ventas) {
  this.verificar.verificarSaveVouchDetai().subscribe((res: respuesta) => {
    if (res.resultado != 'existe') { return; }
   if (res.resultado == 'existe') {
    this.http.post<Ventas[]>(this.Urlventas, vebta).subscribe();
  }
  })
  }


  __guardar_ventaRapida(vrp){
   this.verificar.verificarSaveQuickSale().subscribe((res: respuesta) => {
    if (res.resultado != 'existe') { return; }
   if (res.resultado == 'existe') {
    this.http.post(this.ventarapida, vrp.value).subscribe(res => {
      if( Object.values(res)[0] == 'correctamente'){
        vrp.reset()
    } 
    });
  }
  })
  }
}
