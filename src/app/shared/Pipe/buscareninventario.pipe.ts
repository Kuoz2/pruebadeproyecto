import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscareninventario'
})
export class BuscareninventarioPipe implements PipeTransform {
  transform(value: any[], args: string): any {
    //Esta condicional almacena lo buscado.
    const producto_app = [];
    if(args == ''){ return value}

      console.log('entrante', args)

      for (const p in value) {
        if (value[p].pcodigo.toString().indexOf( args ) > -1) {
          producto_app.push( value[p] )
        }
      }
      return producto_app
  }

}
