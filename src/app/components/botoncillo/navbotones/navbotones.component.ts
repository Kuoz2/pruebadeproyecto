import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ImpuestosService } from 'src/app/Service/impuestos.service';
import { MarcaService } from 'src/app/Service/marca.service';
import { ProductserviceService } from 'src/app/Service/productservice.service';
import { VentasService } from 'src/app/Service/ventas.service';
import { Categories } from '../../Modulos/Categories';
import { Impuestos } from '../../Modulos/impuestos';
import { Marca } from '../../Modulos/Marca';
import { Provideer } from '../../Modulos/Provideer';
import * as devTools from 'devtools-detect';
import { VerificarTokenService } from 'src/app/Service/verificar-token.service';

@Component({
  selector: 'app-navbotones',
  templateUrl: './navbotones.component.html',
  styleUrls: ['./navbotones.component.scss']
})
export class NavbotonesComponent implements OnInit {
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
  constructor(private marc: MarcaService, private impt: ImpuestosService,
    private servi: ProductserviceService,
    private modalService: NgbModal,
     private fb: FormBuilder,
     private fb2:FormBuilder,
      private vns: VentasService,
      private verifica: VerificarTokenService) {
    this.Frmproducto = this.fb.group({
      pcodigo: new FormControl( '', [Validators.required]),
      pdescripcion: new FormControl(''),
      pdetalle: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]),
      pvalor: new FormControl('', [Validators.required]),
      provider_id: new FormControl('', [Validators.required]),
      precio_provider: new FormControl('', [Validators.required]),
      category_id: new FormControl ('', [Validators.required]),
      pactivado: new FormControl(false),
      tax_id: new FormControl(''),
      brand_id: new FormControl('', [Validators.required]),
      piva: new FormControl('',),
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
    })


    this.ventarapida = this.fb2.group({
      codigo_producto: new FormControl(''),
      nombre_product: new FormControl(''),
      cantidad: new FormControl(''),
      precio: new FormControl(''),
      medio_pago: new FormControl('')
   })
  }
  

 async ngOnInit(){
  
    await this.servi.__tomaproveedores().subscribe(res => {this.proveedor = res; });
    await  this.servi.categorias().subscribe(data => {this.categorias = data; });
    await  this.marc.buscarmarca2().subscribe(data => {this.marcas =  data; });
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

  const n = parseInt(imp.value.timpuesto);
  const n2 = parseInt(valor.value);
  const multiva = (n * n2);
  const resultiva: number = multiva / 100;
  console.log('impuesto', resultiva);
  this.prdiva = resultiva.toFixed();
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
  open9(content9){
    this.modalService.open(content9, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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

  Guardaregistro(form){
  
    if (this.Frmproducto.valid) { return;}
      try {

       this.Frmproducto.value.category_id = this.Frmproducto.value.category_id.id;
          this.Frmproducto.value.provider_id = this.Frmproducto.value.provider_id.id;
          this.Frmproducto.value.tax_id = this.Frmproducto.value.tax_id.id;
          this.Frmproducto.value.brand_id = this.Frmproducto.value.brand_id.id;
          this.Frmproducto.value.date_expiration.stock_expiration = this.Frmproducto.value.stock.pstock;
          this.Frmproducto.value.stock.product_id = 0;
          this.Frmproducto.value.date_expiration.product_id = 0;
         this.servi.guardarproductos( this.Frmproducto.value );
          console.log( 'productos', this.Frmproducto.value );
         // this.productForm.reset();

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
    console.log("formulario", this.ventarapida.value)
    if(this.ventarapida.value.codigo_producto == ''){
  
      this.vns.__guardar_ventaRapida(this.ventarapida.value)

    }

  }

}