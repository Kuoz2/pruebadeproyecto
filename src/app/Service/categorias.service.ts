import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Categories} from '../components/Modulos/Categories';
import {Observable} from 'rxjs';
import { respuesta, guardado } from './../components/Modulos/respuesta';
import { VerificarTokenService } from './verificar-token.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private http: HttpClient,private verificar: VerificarTokenService) { }

  UrlCategorias = 'https://marketmini.herokuapp.com/categories';
// Mostrar
  mostrarcategorias() {
    return this.http.get<Categories>(this.UrlCategorias).toPromise();
  }
// Por ID
  mostrarporID(id: number) {
  return this.http.get<Categories>(this.UrlCategorias + '/' + id);
  }
// Guardar
  async guardarcategorias(c) {
    await this.verificar.verificarSaveCate().subscribe((respuesta: respuesta) => {
      console.log(respuesta);
      if (respuesta.resultado != 'existe') { return; }
      if (respuesta.resultado == 'existe') {
 
        this.http.post<Categories>(this.UrlCategorias, c.value).subscribe( res => {
         if( Object.values(res)[0] == 'correctamente'){
             c.reset()
         } 
         
         })
      }
    })  }
// Editar
  actualizarcategoria( cat: Categories) {
  return this.http.put<Categories>(this.UrlCategorias + '/' + cat.id, cat);
  }


  veri_categorias(){
    return this.http.get(this.UrlCategorias + '/verificar_blank_category' )
  }
}

