import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class respuesta{
  resultado: any;
}
export class VerificarTokenService {


  public URLPROBANDOJTI = 'https://marketmini.herokuapp.com/verificador_jti'
  public VsaveProdu = 'https://marketmini.herokuapp.com/products/verif_befores_save'

 private informerespuesta = new Subject<respuesta>()
  constructor(private http: HttpClient) { }
  validacion: any;
  jit:respuesta
  informacion = localStorage.getItem('ACCESS_JTLI')

  // Verificacion de la jti.
  probandojti(){


   this.http.post(this.URLPROBANDOJTI, this.informacion).subscribe(v => {
     console.log("jti", v)
        this.jit = {
          resultado: v
        };
    })
  }
  VerficSaveProd(){
   return   this.http.post(this.VsaveProdu, this.informacion)
   
  }
}
