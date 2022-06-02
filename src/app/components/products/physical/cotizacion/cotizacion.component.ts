import { Observable, Subject } from 'rxjs';
import { ProductserviceService } from './../../../../Service/productservice.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Productos } from 'src/app/components/Modulos/Productos';
import { CartServiceService } from 'src/app/Service/cart-service.service';
import { takeUntil } from 'rxjs/operators';
import { HoraActualService, valorReloj } from 'src/app/Service/hora-actual.service';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { CotizarcarService } from 'src/app/Service/cotizarcar.service';
import { isUndefined } from 'util';
@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.scss']
})
export class CotizacionComponent implements OnInit, OnDestroy  {
  public count:number=0
  private unsubscribe$ = new Subject<void>();
  public closeResult: string;
  public cotizacion: FormGroup;
  public GetProduct: Observable<Productos[]>;
  public descontar: [] = [];
  public arreglo = []
  public numeral = [];
  public totaldescuento:number = 0;
  public encontrandoApp
  public cantidades: [] = []
  public menoque=true
  public descuento:number = 0
  public unidescuento: String[]  = []
  public condicionEntrega:string=""
  public condicionValides:string=""
  public condicionPago:string=""
  public totalIva:number=0
  public lacondicion:string=""
  public cambioPrecio:number= 0
  public cambioDesc:number=0
  public cambioCantidad:string=""
  public cambioDisponible:string=""
  public contador:number = 0
  public fueradeinventario: FormGroup
  norepetido
  hora: string;
  minutos: string;
  dia: string;
  fechaE: string;
  fecha_emision: string;
  hora_emision: string;
  private datos$: Observable<valorReloj>;
  private fechad;
  subtotal:[] 
  totalQuantity = 0;
  totalPrice = 0;
  p: any;
  public telefono:number;
  public persempresa:string= "";
  public correo:string = "";
  public vencimiento:string ="";
  public metodopago:string=""
  items: Array<any>;
  
  get cliente(){return this.cotizacion.get('cliente')};
  get telefonos(){return this.cotizacion.get('telefonos')};
  get corre(){return this.cotizacion.get('corre')};
  get fecha(){return this.cotizacion.get('fecha')};
  get formapago(){return this.cotizacion.get('formapago')};
  get descuentos(){return this.cotizacion.get('descuentos')};
  get total(){return this.cotizacion.get('total')};
  get totaldesc(){return this.cotizacion.get('totaldesc')};
  get condicion(){return this.cotizacion.get('condicion')};

  get pvalor(){return this.fueradeinventario.get('pvalor')}
  get pdescripcion(){return this.fueradeinventario.get('pdescripcion')}
  get quantity(){return this.fueradeinventario.get('quantity')}
  constructor(private modalService: NgbModal,
     private frm: FormBuilder,
      private pservi: ProductserviceService,
      private carservice:CotizarcarService,
      private productos_car:ProductserviceService, 
      private cd: ChangeDetectorRef,
      public secoind: HoraActualService,) { 
this.cotizacion = this.frm.group({
  cliente: new FormControl(''),
  telefonos: new FormControl(''),
  corre: new FormControl(''),
  fecha: new FormControl(''),
  formapago: new FormControl(''),
  descuentos: new FormControl(''),
  total: new FormControl(''),
  totaldesc: new FormControl(''),
  condicion: new FormControl('')
})

  this.fueradeinventario = this.frm.group({
    pdescripcion: new FormControl(''),
    pvalor: new FormControl(''),
    quantity: new FormControl('')
  })

  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit() {
  this.datos$ = this.secoind.getInfoReloj();
  this.fechad =  this.datos$.subscribe( x => {
        this.hora = x.diaymes + 'T' + x.hora.toString() + ':' + x.minutos + ':' + x.segundo;
        this.fechaE = x.diaymes;
        this.fecha_emision = x.diaymes;
        this.hora_emision = x.hora.toString() + ':' + x.minutos + ':' +  x.segundo;
      })
    this.productos();
    console.log(this.GetProduct.subscribe(res => console.log(res)))
     this.carservice.currentDataCart$.pipe(takeUntil(this.unsubscribe$)).subscribe(
      x => {
var sinDecimal
        if (x) { 
          this.items = x;
          this.totalQuantity = x.length;
          this.totalPrice = x.reduce((sum, current) => sum + ((current.pvalor || current.product.pvalor) * current.cantidad), 0 )
          this.totalIva = x.reduce((sum, current) => sum + ((current.piva * current.cantidad).toFixed(2) || current.product.piva),0)
          x.map(res => {
            console.log("mape",typeof(undefined) != res.descuento ? res.descuento : res.descuento = '0')
          })
          sinDecimal = x.reduce((sum, current) => sum + ((((undefined != current.descuento ? current.descuento : current.descuento = '0'|| current.product.descuento ? undefined :  0) /100 )*current.pvalor))*current.cantidad ,0 ) 
            if(isNaN(sinDecimal) === true){this.descuento = 0}else{ this.descuento = sinDecimal.toFixed(0)}
          x.map(unides => 
             {
               console.log(unides.descuento)
              console.log("segundo mape", undefined !== unides.descuento ?  unides.descuento : unides.descuento = 0) 
              const valor = ((unides.pvalor || unides.product.pvalor)*((undefined != unides.descuento ? unides.descuento : unides.descuento =  '0' || unides.product.descuento ? undefined :0)/100)*unides.cantidad)
             console.log(unides.descuento)
              this.unidescuento.push(valor.toFixed(0))
              this.norepetido  =  this.unidescuento.filter((item, index) => {
                 this.unidescuento.indexOf(item) === index
                return this.unidescuento.indexOf(item) === index
              })
              console.log("valor ingresado", this.norepetido)
            }
            )
          this.cd.markForCheck();
        }
      
      }
  );
  this.norepetido
  }
  esmayor(cantidad, i, item){
    const Swal = require('sweetalert2')

    if(cantidad[i] > item){
      window.document.getElementById('btnagregar').hidden = true;
      (window.document.getElementById('cantidad') as HTMLInputElement).value = "";
      Swal.fire({
        title: 'Error!',
        text: 'La cantidad ingresada es mayor al stock',
        icon: 'error',
        confirmButtonText: 'cerrar'
      })
    }
    if(cantidad[i] < item){
      window.document.getElementById('btnagregar').hidden = false

    }
  }
  open(content) {
    console.log(content)
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: <any>'xl ' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

getDismissReason(reason){
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
  }

  productos() {
   return this.GetProduct =   this.pservi.products()
  }

  addSininventario(a){
    console.log(a.value)
    Object.assign(a.value, {category:{cnombre:"no en inventario"}})
    Object.assign(a.value, {pcodigo: "0000"})
    Object.assign(a.value, [{cantidad: a.value.quantity}])
    Object.assign(a.value,{brand:{bnombe:"no en inventario"}})
    Object.assign(a.value,{piva:a.value.pvalor * 0.19})
    console.log(a.value)
      this.addCart(a.value,[parseInt(a.value.quantity)] , 0 , 1)
      a.reset()
  }

  addCart(product: any, cantidad, i, descuento) {
    console.log(cantidad)
    const Swal = require('sweetalert2')
    if(undefined !== cantidad[i] && cantidad[i] !== null && cantidad[i] > 0 || product.pcodigo=="0000"){
    delete product.sinventario
    delete product.sinventario2
    console.log('lo que entra', descuento)

    if(product.pcodigo){
      Object.assign(product, {sinventario:true})
      Object.assign(product, {cantidad: cantidad[i]})
      Object.assign(product, {descuento: descuento[i]})
    }else{
      Object.assign(product, {sinventario2:false})
      Object.assign(product, {cantidad:cantidad[i]})
      Object.assign(product, {descuento:descuento[i]})

    }
    const data = product;
    const elemento = {quantity: 1};
    if (data.quantity >= elemento.quantity){
      this.carservice.changeCart(data)
    }else {
      const cambio = Object.assign( product, elemento )
      this.carservice.changeCart(cambio)
    }
  }else{
    Swal.fire({
      title: 'Error!',
      text: 'Debe ingresar una cantidad mayor a 0',
      icon: 'error',
      confirmButtonText: 'cerrar'
    })
  }
  }
 generarDesc(a, i, valor ) {
 if(this.totalPrice !=  0){
  const porcentaje = a[i] / 100    
  const preciodescuento = (porcentaje * valor)
  console.log(this.arreglo.length)
  if(this.arreglo.length == 0){
    this.arreglo.push(preciodescuento.toFixed(0))
  }else{
    this.arreglo.splice(i, 1, preciodescuento.toFixed(0))
  }
  console.log(this.arreglo)
   
    const subtotal = this.arreglo.reduce((a,b) => (a + b)) 
  console.log("precio del descuento",subtotal)
  console.log("total precio", this.totalPrice)
    this.totaldescuento = (this.totalPrice - Math.abs(subtotal))
   
    console.log('resultado',this.totaldescuento)
  }
 }

 generarCotizar(){
  this.telefono
  this.persempresa
  this.correo
  this.vencimiento
  this.metodopago
 }

 descargarpdf(){
   console.log(this.count)

    const da = window.document.getElementsByTagName('button')
   const data = window.document.getElementById('factura')
    console.log(da.length)
    var  n= 0  
    while(n < da.length){
      window.document.getElementsByTagName('button').item(n).hidden = true
        console.log('botnes',n)
        n++;
      }
    
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 210;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
      const contentDataURL = canvas.toDataURL('image/png')  
      const pdf = new jsPDF({
        orientation: 'landscape',
      });
      const imgProps= pdf.getImageProperties(contentDataURL);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(contentDataURL, 'PNG', 10, 0, 290, 180);
      pdf.save('download.pdf'); 
      });
   
 
setTimeout(() => {
  window.location.reload()  
  
}, 2000);
 }


async editarcotiza(content, item, i){


  const Swal = require('sweetalert2')
await Swal.fire({
          title: 'Error!',
          text: 'Si preciona aceptar no podra ingresar más productos a la cotización',
          icon: 'warning',
          confirmButtonText: 'Aceptar',
          showCancelButton: true,
          cancelButtonText:"Cancelar"
        }).then((result) => {
          if(result.isConfirmed){
            this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: <any>'xl ' }).result.then((result) => {
              this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
              this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
          
             this.cambioPrecio = item.pvalor
             this.cambioDesc = item.descuento
           this.cambioCantidad = item.cantidad
           this.cambioDisponible = item.stock.pstock
           this.contador = i          
          window.document.getElementById('CrearContizacion').hidden = true
          
          }
        })



 
 }
 Gcambio(a, b, i,norepetido ){
   console.log(i)
  b[0].pvalor =  this.cambioPrecio
  b[0].descuento = this.cambioDesc
  b[0].cantidad = this.cambioCantidad
  const impuesto = this.cambioPrecio * (19/100)
  b[0].piva = impuesto.toFixed(0)
  
    const camdesc = this.cambioPrecio *(this.cambioDesc / 100)
    this.norepetido[this.contador] = camdesc.toFixed(0)
    console.log("no repetidos",this.norepetido)
  console.log(b)
const sinDecimal = this.norepetido.reduce((a, b) => parseInt(a)+parseInt(b))
const guardartotal =[]
const guardartotaliva=[]
for(const i in b)
{
 guardartotal.push(b[i].pvalor)
 guardartotaliva.push(b[i].piva)
}
this.totalPrice = guardartotal.reduce((a,b) => parseInt(a)+parseInt(b));
this. totalIva = guardartotaliva.reduce((a,b) => parseInt(a) + parseInt(b));
 this.descuento = sinDecimal
}
}
