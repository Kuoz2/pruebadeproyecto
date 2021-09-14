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

constructor(private userservi: UsuarioService) {

}



  async ngOnInit() {
    //await this.navegador_habierto()

    //await window.addEventListener('devtoolschange', event => {
      //console.log('Is DevTools open:', event.detail.isOpen);
      //console.log('DevTools orientation:', event.detail.orientation);
      //if(event.detail.isOpen == true)
      //{
       // window.location.href = "https://errorconsole.herokuapp.com/"
     // }
    //});
  }

  navegador_habierto(){
    if(devTools.isOpen == true){
      window.location.href = "https://errorconsole.herokuapp.com/"
    }
}

}
