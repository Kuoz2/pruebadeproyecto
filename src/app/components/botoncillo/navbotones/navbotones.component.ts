import { takeUntil } from 'rxjs/operators';
import { LocationStrategy } from '@angular/common';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { ImpuestosService } from 'src/app/Service/impuestos.service';
import { MarcaService } from 'src/app/Service/marca.service';
import { ProductserviceService } from 'src/app/Service/productservice.service';
import { VentasService } from 'src/app/Service/ventas.service';
import { Categories } from '../../Modulos/Categories';
import { Impuestos } from '../../Modulos/impuestos';
import { Marca } from '../../Modulos/Marca';
import { Provideer } from '../../Modulos/Provideer';
import * as devTools from 'devtools-detect';

@Component({
  selector: 'app-navbotones',
  templateUrl: './navbotones.component.html',
  styleUrls: ['./navbotones.component.scss']
})
export class NavbotonesComponent implements OnInit, OnDestroy{
  public ingresarproducto: FormGroup;
  public closeResult: string;
  public categoriaProducto: string;
  public marcaProducto: string;
  public nombreProducto:string;
  public Frmproducto: FormGroup;
  public prdiva;
  public immp: Observable<Impuestos[]>;
  public proveedor: Provideer[];
  public categorias: Categories[];
  public marcas: Marca[];
  public ventarapida: FormGroup;
  public mediopago = ["efectivo", "tarjeta"]
  public precio:number=0;
  public preciov:number=0;
  private unsubscribe$ = new Subject<void>();
  get pactivado() {return this.Frmproducto.get('pactivado'); }
  get pdescripcion() { return this.Frmproducto.get('pdescripcion'); }
  get pdetalle() { return this.Frmproducto.get('pdetalle'); }
  get pcodigo() { return this.Frmproducto.get('pcodigo'); }
  get pstock() {return this.Frmproducto.get('pstock'); }
  get pvalor() { return this.Frmproducto.get('pvalor'); }
  get category_id() { return this.Frmproducto.get('categorias'); }
  get stock_lost() {return this.Frmproducto.get('stock_lost'); }
  get stock_security() {return this.Frmproducto.get('stock_security'); }
  get provider_id() {return this.Frmproducto.get('provider_id'); }
  get tax_id() {return this.Frmproducto.get('tax_id'); }
    get brand_id() {return this.Frmproducto.get('brand_id'); }
    get pvneto() { return this.Frmproducto.get('pvneto'); }
    get fecha_vencimiento() {return  this.Frmproducto.get('fecha_vencimiento'); }
    get margen (){return this.Frmproducto.get('margen')}
    get utilidad () {return this. Frmproducto.get('utilidad')}
    get precio_provider(){return this.Frmproducto.get('precio_provider')}
    get preciva(){return this.Frmproducto.get('preciva')}
  constructor(private marc: MarcaService, private impt: ImpuestosService,
    private servi: ProductserviceService,
    private modalService: NgbModal,
     private fb: FormBuilder,
     private fb2:FormBuilder,
      private vns: VentasService,
      private cd: ChangeDetectorRef,
      ) {
    this.Frmproducto = this.fb.group({
      pcodigo: new FormControl( '', [Validators.required]),
      pdescripcion: new FormControl(''),
      pdetalle: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]),
      pvalor: new FormControl(0, [Validators.required]),
      provider_id: new FormControl('', [Validators.required]),
      precio_provider: new FormControl('', [Validators.required]),
      category_id: new FormControl ('', [Validators.required]),
      pactivado: new FormControl(false),
      tax_id: new FormControl(''),
      brand_id: new FormControl('', [Validators.required]),
      piva: new FormControl(''),
      utilidad: new FormControl(''),
      margen: new FormControl(''),
      stock: new FormGroup( {
          pstock: new FormControl( ''),
          stock_lost: new FormControl( '' ),
          stock_security: new FormControl(''),
          product_id: new FormControl(0)
      }),
      date_expiration: new FormGroup({
        fecha_vencimiento: new FormControl(''),
         stock_expiration: new FormControl(''),
         product_id: new FormControl(0)
      }),
      pvneto: new FormControl('', [Validators.required]),
      preciva: new FormControl('')
    })


    this.ventarapida = this.fb2.group({
      codigo_producto: new FormControl(''),
      nombre_product: new FormControl('',[Validators.required]),
      cantidad: new FormControl('',[Validators.required]),
      precio: new FormControl('', [Validators.required]),
      medio_pago: new FormControl('', [Validators.required])
   })
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();  }
  

 async ngOnInit(){
  
    await this.servi.__tomaproveedores().pipe(takeUntil(this.unsubscribe$)).subscribe(res => {this.proveedor = res; this.cd.markForCheck()} );
    await  this.servi.categorias().pipe(takeUntil(this.unsubscribe$)).subscribe(data => {this.categorias = data; this.cd.markForCheck() });
    await  this.marc.buscarmarca2().pipe(takeUntil(this.unsubscribe$)).subscribe(data => {this.marcas =  data; this.cd.markForCheck()});
    await this.buscarimpuesto();
  }



  navegador_habierto(){
    if(devTools.isOpen == true){
      window.location.href = "https://errorconsole.herokuapp.com/"
    }
}

  async buscarimpuesto() {
    this.immp = this.impt.obtneriIMP();
}

  datos(pvalor) {
    // @ts-ignore
document.getElementById('tax_id').value = '';
// @ts-ignore
document.getElementById('iva2').value = '';
if (pvalor.value != null) {
    // @ts-ignore
  window.document.getElementById('tax_id').disabled = false;


} else {
  // @ts-ignore
  window.document.getElementById( 'tax_id' ).disabled = true;
  // @ts-ignore
  window.document.getElementById('tax_id').value = '';
}
}

calImp(imp, valor): number {

  
  const n2 = parseInt(valor.value);
  const multiva = ( n2 *( 19/100 ));
  const resultiva: number = multiva / 100;
  console.log('impuesto', resultiva);
  this.prdiva = multiva.toFixed(0)
 const ivaprecio =  (parseInt(multiva.toFixed(0)) + parseInt(this.Frmproducto.value.pvalor))
  this.Frmproducto.controls['preciva'].setValue(ivaprecio)

  // @ts-ignore 
  return resultiva;
}


  openModal(content1){
    this.modalService.open(content1, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  open2( content2){
    this.modalService.open(content2, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  open3(content3){
    this.modalService.open(content3, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  open4(content4){
    this.modalService.open(content4, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  open5(content5){
    this.modalService.open(content5, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  open6(content6){
    this.modalService.open(content6, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  open7(content7){
    this.modalService.open(content7, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  open8(content8){
    this.modalService.open(content8, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  open9(content8){
    this.modalService.open(content8, { ariaLabelledBy: 'modal-basic-title',size: <any>'xl '   }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    const pdescripcion = <HTMLInputElement> window.document.getElementById('pdescripcion')
    const pcodigo = <HTMLInputElement> window.document.getElementById('pcodigo')
    const categoria = <HTMLInputElement> window.document.getElementById('categoria')
    const marca = <HTMLInputElement> window.document.getElementById('marca')
    const precio = <HTMLInputElement> window.document.getElementById('valor')
    const stock = <HTMLInputElement> window.document.getElementById('stock')
    const fecha = <HTMLInputElement> window.document.getElementById('fecha')
    const perdidas = <HTMLInputElement> window.document.getElementById('perdidas')
    pdescripcion.value = this.Frmproducto.value.pdescripcion
    pcodigo.value = this.Frmproducto.value.pcodigo
    categoria.value = this.Frmproducto.value.category_id.cnombre
    marca.value = this.Frmproducto.value.brand_id.bnombre
    precio.value = this.Frmproducto.value.pvalor
    stock.value = this.Frmproducto.value.stock.pstock
    fecha.value = this.Frmproducto.value.date_expiration.fecha_vencimiento
    perdidas.value = this.Frmproducto.value.stock.stock_lost
  }
  open10(content10){
    this.modalService.open(content10, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  open0(content0){
    this.modalService.open(content0, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  Guardaregistro(form, a){
  
    if (this.Frmproducto.valid) { return;}
      try {

       this.Frmproducto.value.category_id = this.Frmproducto.value.category_id.id;
          this.Frmproducto.value.provider_id = this.Frmproducto.value.provider_id.id;
          this.Frmproducto.value.tax_id = this.Frmproducto.value.tax_id.id;
          this.Frmproducto.value.brand_id = this.Frmproducto.value.brand_id.id;
          this.Frmproducto.value.date_expiration.stock_expiration = this.Frmproducto.value.stock.pstock;
          this.Frmproducto.value.stock.product_id = 0;
          this.Frmproducto.value.date_expiration.product_id = 0;
         this.servi.guardarproductos( this.Frmproducto );
         a.dismiss('Cross click')
      } catch (e) {
          console.log( 'ocurrio un error', e );
      }
 

  }

  BusCode(){
    // cordova.plugins.barcodeScanner.scan(
     // function (result) {

       //    var variable =   document.getElementById("codigo")

         //  variable.value = result.text
       //},
      //function (error) {
        //  alert("Scanning failed: " + error);
      //},
      //{
        //  preferFrontCamera : true, // iOS and Android
          //showFlipCameraButton : true, // iOS and Android
          //showTorchButton : true, // iOS and Android
          //torchOn: true, // Android, launch with the torch switched on (if available)
          //saveHistory: true, // Android, save scan history (default false)
          //prompt : "Place a barcode inside the scan area", // Android
          //resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          //formats : "QR_CODE,PDF_417,UPC_A, UPC_E,EAN_8,EAN_13,CODE_128", // default: all but PDF_417 and RSS_EXPANDED
          //orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
          //disableAnimations : true, // iOS
          //disableSuccessBeep: false // iOS and Android
      //}
   //);
  }
  realizarventa(){
    if(this.ventarapida.valid){
  
      this.vns.__guardar_ventaRapida(this.ventarapida)

    }

  }
//Obterner las utilidades-
  Obutildiad(frm){

    const resultado = (this.Frmproducto.value.precio_provider * (this.Frmproducto.value.margen/100));
    const valor = (this.Frmproducto.value.precio_provider + resultado)
    //frm.value.pvalor = parseInt(resultado.toFixed(0));
  //  frm.value.utilidad =  parseInt((resultado - frm.value.pvalor).toFixed(0));
    this.Frmproducto.controls['pvalor'].setValue(parseInt(valor.toFixed(0)));
    const dato = resultado.toFixed(0)
    this.Frmproducto.controls['utilidad'].setValue( resultado)
   
 }

}
