import { ImpuestosService } from './Service/impuestos.service';
import { ProductserviceService } from './Service/productservice.service';
import { CategoriasService } from './Service/categorias.service';
import { MarcaService } from './Service/marca.service';
import { Marca } from './components/Modulos/Marca';
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {UsuarioService} from './Service/usuario.service';
import * as devTools from 'devtools-detect';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class AppComponent implements OnInit {
  title = 'Beta';

constructor(private userservi: UsuarioService, 
  private marca:MarcaService, 
  private categoria: CategoriasService,
   private impuesto: ImpuestosService,
   private proveedor: ProductserviceService) {

}
// Verificar si estan las marcas, categorias, productos
datosnovacios(){
  
}


   ngOnInit() {
    /*this.navegador_habierto()
   window.addEventListener('devtoolschange', event => {
   console.log('Is DevTools open:', event.detail.isOpen);
   console.log('DevTools orientation:', event.detail.orientation);
   if(event.detail.isOpen == true)
    {
    window.location.href = "https://errorconsole.herokuapp.com/"
   }
   });*/
  }

 
  navegador_habierto(){
    if(devTools.isOpen == true){
      window.location.href = "https://errorconsole.herokuapp.com/"
    }
}



navegador(){
  var sBrowser, sUsrAg = navigator.userAgent;
  if(sUsrAg.indexOf("Chrome") > -1) {
    sBrowser = "Google Chrome";
} else if (sUsrAg.indexOf("Safari") > -1) {
    sBrowser = "Apple Safari";
} else if (sUsrAg.indexOf("Opera") > -1) {
    sBrowser = "Opera";
} else if (sUsrAg.indexOf("Firefox") > -1) {
    sBrowser = "Mozilla Firefox";
} else if (sUsrAg.indexOf("MSIE") > -1) {
    sBrowser = "Microsoft Internet Explorer";
}

alert("Usted está utilizando: " + sBrowser);
}

}
