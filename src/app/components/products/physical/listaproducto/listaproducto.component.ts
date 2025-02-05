import { async } from '@angular/core/testing';
import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ProductserviceService} from '../../../../Service/productservice.service';
import {date_expiration, Productos, Stock} from '../../../Modulos/Productos';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {PagosService} from '../../../../Service/pagos.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {takeUntil} from 'rxjs/operators';
import { ProductoActualizar } from 'src/app/components/Modulos/ProductoActualizar';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx'
import { read, utils, writeFileXLSX } from 'xlsx';
import { Timeouts } from 'selenium-webdriver';
const EXCEL_TYPE = 
'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8'

const EXCEL_EXT = '.xlsx'
@Component({
    selector: 'app-listaproducto',
    templateUrl: './listaproducto.component.html',
    styleUrls: ['./listaproducto.component.scss']
})
export class ListaproductoComponent implements OnInit, OnDestroy {
    public buscarinventario:string=""
    active = 1;
    public closeResult: string;
    public listproductosG: Observable<Productos[]>;
    private unsubscribe$ = new Subject<void>();
    public  ;
    listproductos: Observable<Productos[]> ;
    productoporid: Productos = new Productos();
    public inventario2;
    isloading: boolean;
    inventario2_datexpiration: date_expiration = new date_expiration();
    inventario2_stocknuevo: Stock =  new Stock();
    tomanuevoinventario
    x = []
    // tslint:disable-next-line:variable-name
    constructor(private prod: ProductserviceService,
                private modalService: NgbModal,
                private formBuilder: FormBuilder,
                private pd: PagosService,
                private ngxspinner: NgxSpinnerService,
                private cd: ChangeDetectorRef
    ) {
    this.isloading = false;

    }
    // tslint:disable-next-line:variable-name new-parens
    stock_actualizado: Stock = new Stock();
    // tslint:disable-next-line:new-parens
    ck = new Stock;
    // tslint:disable-next-line:variable-name
    stock_nuevo: number =0;
    // tslint:disable-next-line:variable-name
    stock_perdidas_nuevo: number;
    d = 0;
    h = 0;
    j = 0;
    g = 0;
    k = 0;
    n = 0;
    fechavencimiento: string;
    producstock: number;
    stockperdida: number;


  async ngOnInit() {
        this.ngxspinner.show("spinnerinventario", {
            type: "pacman",
            size: "large",
            color: "white"
        });
        await  this.productosAsync();
        await this.busquedaAsync2();
        await this.newinventario();
        await this.ngxspinner.hide("spinnerinventario");
        console.log('inventario 2', this.tomanuevoinventario);
        this.someMethodIThinkMightBeSlow()
    }

    // Tomando el inventario nuevo.
     newinventario() {
      return this.prod.getnewinventario().then(
          res =>  {this.tomanuevoinventario = res; }
      ).finally(() => { this.isloading = true; }).catch(
          err => { console.log('Ocurrio un error', err);        
        }
      );
    }

     cambiadColor(EsPr, i, id) {
         // tslint:disable-next-line:triple-equals
         if (EsPr > 10 || EsPr == 10) {
            const cambio = document.getElementById('estado' + i + id);
            cambio.style.backgroundColor = '#B5FF33';
        }
     }

     cambiarColorGestion(EsPr, i, id) {
         // tslint:disable-next-line:triple-equals
         if (EsPr < 10 && EsPr != 0) {
             const cambio2 = document.getElementById('gestionar' + i + id);
             cambio2.style.backgroundColor = '#F9FF33';
         }
     }

     cambiarColorSinStock(EsPr, i, id) {
         // tslint:disable-next-line:triple-equals
         if (EsPr == 0 ) {
             const cambio3 = document.getElementById('peligro' + i + id);
             cambio3.style.backgroundColor = '#FA0000';
         }
         if (EsPr < 10 && EsPr != 0) {
            const cambio2 = document.getElementById('peligro' + i + id);
            cambio2.style.backgroundColor = '#F9FF33';
        }
        if (EsPr > 10 || EsPr == 10) {
            const cambio = document.getElementById('peligro' + i + id);
            cambio.style.backgroundColor = '#B5FF33';
        }
     }


   async productosAsync() {
       try {
           this.listproductos = this.prod.products().pipe(takeUntil(this.unsubscribe$));
       } catch (e) {
           console.log('Ocurrio un error', e);
       }
       return this.listproductos;
   }

  async busquedaAsync2() {
       try {
           this.listproductosG = this.prod.products().pipe(takeUntil(this.unsubscribe$));
       } catch (e) {
           console.log('Ocurrion un error', e);
       }
       return this.listproductosG;
   }

   async editarproductos(producto: ProductoActualizar, nuevo, perdida) {
    console.log("los productos cambiando", producto)
    producto.pcodigo = producto.pcodigo.toString()
      await this.prod.actualizarproducto(producto)
      const stock = producto.stock;
      await this.editarstock(stock, nuevo, perdida);
    }



    async editarstock(stck: Stock, stnuevo, stlost) {
        // tslint:disable-next-line:variable-name
        const edicion_producto = stck;

        // tslint:disable-next-line:triple-equals
        if (stnuevo == 0 && stlost == 0 || stnuevo == null && stlost == null) {
        } else {
            // tslint:disable-next-line:triple-equals
            if (stnuevo != 0 && stlost == 0 || stlost == null) {
                edicion_producto.pstock += stnuevo;
                edicion_producto.stock_lost += 0;
            } else {
                // tslint:disable-next-line:triple-equals
                if (stlost != 0 && stnuevo == 0 || stnuevo == null) {
                    edicion_producto.stock_lost += stlost;
                    edicion_producto.pstock += 0;
                } else {
                    // tslint:disable-next-line:triple-equals
                    if (stnuevo != 0 && stlost != 0 && stnuevo != null && stlost != null) {
                        edicion_producto.pstock += stnuevo;
                        edicion_producto.stock_lost += stlost;

                    }
                }

            }

            try{
                await this.prod.actualizarstock(stck);
      
            }catch(error){
                console.log(error)
            }

        }
    }



   async editar() {
    
        const id = localStorage.getItem('idc');

       // tslint:disable-next-line:max-line-length
        await this.prod.buscarproductoporID(+id).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {this.productoporid = data; this.cd.markForCheck(); });
    }

    open2(content2, catego: Productos): void {
            
       
        console.log(catego)

      console.log('lo que entra', catego.id);
      this.modalService.open(content2, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });

      localStorage.setItem('idc', catego.id.toString());
      localStorage.setItem('idc2', catego.id.toString());

      this.editar();
      this.editar2();
      this.stock_nuevo = 0
     // var elemento= <HTMLInputElement>  document.querySelector('input[name="newstock"]');
     /* var elementoperdida = <HTMLInputElement> document.querySelector('input[name="nuevasperdidas"]');
      var elementofecha = <HTMLInputElement> document.querySelector('input[name="fechavencimientos"]')  
        if(catego.stock.pstock != 0 )
        {
            elemento.disabled = true
            elementoperdida.disabled = true
            elementofecha.disabled=true

        }else{
            elemento.disabled = false
            elementoperdida.disabled=false
            elementofecha.disabled=false
        }*/

    }

    open4(content) {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        },
            (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
            );
    }

    async open5(content, inv2) {
        localStorage.setItem('inv2', inv2.id.toString());
        await this.editar5();
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
      },
          (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          }
      );
    }

   async editar2() {
        const id = localStorage.getItem('idc2');
        await this.prod.buscarelstockporID(+id).subscribe(data => {this.stock_actualizado = data; });
    }

      editar5() {
        const id = localStorage.getItem('inv2');
         // tslint:disable-next-line:max-line-length
        this.prod.segundoinventarioID(+id).then((res) => {this.inventario2 = res; console.log('respuesta', this.inventario2.product.pdescripcion); }
        ).catch((err) => {console.log('se obtuvo un error', err); }).finally(() => {this.isloading = true; });
    }

    open3(content3, catego: Stock): void {
        this.modalService.open(content3, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }


    guardarnewFyS(fechavencimiento, producstock, stockperdida) {
        this.inventario2_datexpiration.fecha_vencimiento = fechavencimiento;
        this.inventario2_datexpiration.stock_expiration = producstock;
        this.inventario2_datexpiration.cambio_fecha = true
        this.inventario2_datexpiration.cantidad_cambiadas = stockperdida;
        this.inventario2_datexpiration.actualizado_stockm = true
        this.inventario2_datexpiration.product_id = this.productoporid.id
        this.inventario2_stocknuevo.product_id = this.productoporid.id;
        this.inventario2_stocknuevo.pstock = producstock;
        this.inventario2_stocknuevo.stock_lost = stockperdida;
        this.prod._stockinventario2(this.inventario2_stocknuevo).subscribe((res) => console.log('resultado stock',res));
        this.prod._guardarfechainventario2(this.inventario2_datexpiration).subscribe((res) =>  console.log('resultado fecha', res));
    }
    guardarinventario2(fechavencimiento, producstock, stockperdida){
        
    }

    Obutildiad(productoporid){

           const resultado = (productoporid.precio_provider * (productoporid.margen/100));
           //frm.value.pvalor = parseInt(resultado.toFixed(0));
         //  frm.value.utilidad =  parseInt((resultado - frm.value.pvalor).toFixed(0));
            const valor = (productoporid.precio_provider + parseInt(resultado.toFixed(0)))
           this.productoporid.pvalor = parseInt(resultado.toFixed(0));
           const dato = resultado.toFixed(0)
           productoporid.utilidad = valor
          
        }

    editarproducto2(productoporid, stock_nuevo, stock_perdidas_nuevo){

    }

    someMethodIThinkMightBeSlow() {
        const startTime = performance.now();
    
        // Do the normal stuff for this function
    
        const duration = performance.now() - startTime;
        console.log(`someMethodIThinkMightBeSlow took ${duration}ms`);
    }
    async  eliminarproducto(a){
        var codigovalidador:string[] = []
        var codigovalidador2:string[] = []
        var codigovalidador3:string[] = []
        var codigovalidador4:string[] = []
        var validante = []
        for (var i = 0; i < 1; i++) {
           codigovalidador.push( this.randomNumber(0, 10))
           codigovalidador2.push( this.randomNumber(0, 10))
           codigovalidador3.push( this.randomNumber(0, 10))
           codigovalidador4.push( this.randomNumber(0, 10))
          }
          validante.push(codigovalidador[0],codigovalidador2[0],codigovalidador3[0],codigovalidador4[0])

          const Swal = require('sweetalert2')
        const valor = await Swal.fire({
            title: `Código: ${codigovalidador[0]} ${ codigovalidador2[0]} ${codigovalidador3[0]} ${codigovalidador4[0]}`,
            text: '¿Esta seguro de eliminar este producto?, si este producto esta asociado a una venta, se eliminaran ambos registros.'+ 
            ' debe ingresar el código antes de 10 segundos. ',
            icon: 'warning',
            timer: 10000,
            input: 'text',
            showConfirmButton:true,
            inputValue: '',
            confirmButtonText: 'Confirmar',
            timerProgressBar: true,
            inputPlaceholder:'Ingresar código',
            inputValidator: (value) => {
                if (!value) {
                  "Ingrese el código que se encuentra en la parte superior"
                }
              },
          })
            
            console.log("valor del swal",valor)
          let codig = validante.join().replace(/,/g, "")
          if( codig === valor.value){
                this.prod.eliminardatos(a)
          }else
          {
              alert("esto no se eliminara")
          }
        }
        randomNumber(max: number, min: number): any {
            const r = Math.random()*(max-min) + min
            return Math.floor(r)}
    sumarstock(a){
         this.productoporid.stock.pstock = (this.productoporid.stock.pstock + a)
    }

    // Exportador de excel
    exportar_excel_table()
    {   
        
        console.log("excel", this.x)
        const excelnombre = "prueba"
        const contra=window.prompt()
        contra
        if(contra == '@#123#'){
        if(this.x.length != 0){
            const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.x)
        const workBook: XLSX.WorkBook = {
            Sheets: {'data' : worksheet},
            SheetNames: ['data']
        }
        const excelBuffer: any  = XLSX.write(workBook, {bookType: 'xlsx', type: 'array'});

        this.saveExcel(excelBuffer, excelnombre)
    }
    
    }else{alert("contraseña incorrecta")}
       
 
       
        
    }
   async export_all_inventarie(){
        //this.almacenar(this.listproductosG, 1
        this.ngxspinner.show("SpinnerCarga", {
            type: "cog",
            size: "large",
            color: "white",
        });
        this.listproductos.forEach( (res:any) => {
        
        this.x.splice(0, this.x.length)
      
                const sum = res.map(item => item.pvalor).reduce((prev, curr) => prev + curr, 0)
                const sumStock = res.map(item => item.stock.pstock).reduce((prev, curr) => prev + curr, 0)
                const psumiva = res.map(item => item.piva).reduce((prev, curr) => prev + curr, 0)
                console.log("sum inventario", this.x.length)
                console.log("sum inventario", sumStock)
                let dato = {}
                console.log("valor de x ", this.x)
               for(const i of res){
            

                 dato = {
                    Codigo: i.pcodigo,
                    Nombre: i.category.cnombre +''+i.brand.bnombre + '' + i.pdescripcion,
                    Costo: i.precio_provider,
                    Précio: i.pvalor,
                    Margen: i.margen,
                    Utilidad: i.utilidad,
                    Unidades: i.stock.pstock,
                    
                }
                this.x.push(dato)

               }
               this.x.unshift(Object.assign(dato, {Precio_sin_iva: sum},{Precio_iva: psumiva},{Total_stock: sumStock})  ) 
      
             }  ).then(()=>  {
                this.ngxspinner.hide("SpinnerCarga")

                this.exportar_excel_table();
             }  )
       
        
    }
    private saveExcel(buffer: any, fileName:string):void{ 
        const Swal = require('sweetalert2')
        const termino = Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Exportación exitosa',
            showConfirmButton: false,
            timer: 1500
          })
        const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
        FileSaver.saveAs(data, fileName + '_export_' + EXCEL_EXT);  
        termino

            }
    almacenar(variable, id):void{
        const checkboxpf =  window.document.getElementById("sanos" + id) as HTMLInputElement;
        if(checkboxpf.checked == false){
            this.x.splice(id, 1)
        }else{
            const dato = {
                Codigo: variable.pcodigo,
                Nombre: variable.category.cnombre +''+variable.brand.bnombre + '' + variable.pdescripcion,
                Costo: variable.precio_costo,
                Précio: variable.pvalor,
                Margen: variable.margen,
                Utilidad: variable.utilidad,
                Unidades: variable.stock.pstock
            }
            this.x.push(dato)
        }
        
        console.log("datos ingresados", variable)
        console.log("esta fakse i trye", id)
        console.log("document", this.x)
    }
}
