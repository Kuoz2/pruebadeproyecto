import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Marca} from '../components/Modulos/Marca';
import {Observable} from 'rxjs';
import { VerificarTokenService, respuesta } from './verificar-token.service';

@Injectable({
  providedIn: 'root'
})


export class MarcaService {


  constructor(private http: HttpClient, private verificar: VerificarTokenService) { }
  urlmarca = 'https://marketmini.herokuapp.com/brands';
  // Buscarunamarca
 async buscarmarca() {
   return await this.http.get<Marca>( this.urlmarca );
  }

  //verificar si existe una marca
  
  buscarmarca2(): Observable<Marca[]> {

   return  this.http.get<Marca[]>(this.urlmarca);
  }

  // Guardar una marca.
 async guardarmarca(m) {
  await this.verificar.verificaSaveBrand().subscribe((res: respuesta) => {

    if (res.resultado != 'existe') { return; }
    if (res.resultado == 'existe') {
      this.http.post<Marca>(this.urlmarca , m.value).subscribe(res => {
        console.log(res)
        if(Object.values(res)[0] == 'correctamente'){
          m.reset()
        }
      });
    }
  })
  }
  // Actualizar una marca.
  actualizarmarca(m: Marca) {
   return this.http.put(this.urlmarca + '/' + m.id , m );
  }

    mostrarporID(id: number) {
        return this.http.get<Marca>(this.urlmarca + '/' + id);
    }
}
