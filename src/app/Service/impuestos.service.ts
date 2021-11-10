import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Impuestos} from '../components/Modulos/impuestos';
import { VerificarTokenService, respuesta } from './verificar-token.service';

@Injectable({
  providedIn: 'root'
})
export class ImpuestosService {

  constructor(private HTTP: HttpClient,private verificar: VerificarTokenService) { }

  private HTTP_TAXES = 'https://marketmini.herokuapp.com/taxes';
    // uRL de prueba

  // Guardar impuesto
 async guardarIMP(im) {
   this.verificar.verificarSaveTax().subscribe((res:respuesta) => {
    
    if (res.resultado != 'existe'){return}
    if(res.resultado == 'existe'){
    this.HTTP.post<Impuestos>(this.HTTP_TAXES, im.value).subscribe(
      res => {if(Object.values(res)[0] == 'correctamente'){im.reset()}}
    );
    }
   })
  }

  // Obtener el impuesto
  obtneriIMP(): Observable<Impuestos[]> {
    return this.HTTP.get<Impuestos[]>(this.HTTP_TAXES);
  }

  // Buscar por la id
  impuestosporID(id: number): Observable<Impuestos> {
    return this.HTTP.get<Impuestos>(this.HTTP_TAXES + '/' + id);
  }

  actualizarimpuesto( imp: Impuestos) {
    return this.HTTP.put<Impuestos>(this.HTTP_TAXES + '/' + imp.id, imp);
  }

}
