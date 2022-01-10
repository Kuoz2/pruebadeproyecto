import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { VoucherService } from 'src/app/Service/voucher.service';

@Component({
  selector: 'app-comparacionventa',
  templateUrl: './comparacionventa.component.html',
  styleUrls: ['./comparacionventa.component.scss']
})
export class ComparacionventaComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();
  public producto1;
  public producto2;
  isload: boolean
  constructor(private cd: ChangeDetectorRef,
    private ventas: VoucherService, private spinner: NgxSpinnerService) { }
   async  ngOnInit() {
     this.isload =false
      this.spinner.show('spinnercompa', {
        type: "pacman",
            size: "large",
              color: "white"
      })
     await  this.B_todas_ventas();
    }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  public Realizadas
  


  B_todas_ventas(){
    this.ventas.mostrar_promise().then(res => this.Realizadas = res ).catch(err => console.log(err)).finally(()=> {this.isload = true; this.spinner.hide('spinnercompa')})

   
  }

  verificame(){
    console.log(this.Realizadas)
    for (const i of this.Realizadas){
        console.log(i.product.category.cnombre)
    }
  }

  onScroll (){
    console.log('scrolled!!');

  }

  Comparar(){

    if(typeof(this.producto1)== undefined || typeof(this.producto2)== undefined){return}
  if(this.producto1 && this.producto2 ){
    if(this.producto1.product.brand.id != this.producto2.product.brand.id){
      console.log("entrante en producto1", this.producto1)
      console.log("entrante en producto2", this.producto2)
    }
  }
  }

}
