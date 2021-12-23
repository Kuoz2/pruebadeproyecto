import { AfterViewInit, Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Bancos} from "../../../shared/tables/bancos";
import {ProductserviceService} from "../../../Service/productservice.service";
import {Provideer} from "../../Modulos/Provideer";
import { map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-provideer',
  templateUrl: './provideer.component.html',
  styleUrls: ['./provideer.component.scss']
})
export class ProvideerComponent implements OnInit {
  public provideer: FormGroup;
  public provideer_post: Provideer;
  constructor(private serviProvider: ProductserviceService, private spinner: NgxSpinnerService) {
    this.provideer = ProvideerComponent.CreateFormProvider()
  }

    provedores
    providers
    listprovider: string[]
    provedor
  p = 1
  ngOnInit(): void {
    this.spinner.show("spinnerdashcategori")
    this.ListaProveedor()
  }

  static CreateFormProvider(){
    return new FormGroup({
      nombre_provider: new FormControl('',[Validators.required]),     
    })
  }

  resetiarform() {
    this.provideer.reset()
  }

 async guardarprovider() {
 
    if(this.provideer.valid){
    
   await this.serviProvider.guardarProvider(this.provideer);
      setTimeout(()=>{
       this.ListaProveedor();

      }, 1500)

    }
  }

 ListaProveedor(){
  this.serviProvider.ListaProveedor().subscribe(x  => {this.provedor =x;     this.spinner.hide("spinnerdashcategori")
})
}
}
