import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {date_expiration, Productos, Stock} from '../components/Modulos/Productos';
import {Categories} from '../components/Modulos/Categories';
import {Stock_productos} from '../components/Modulos/stock_productos';
import {Perdidas_este_mes} from '../components/Modulos/reporte_grafico';
import {Provideer} from '../components/Modulos/Provideer';
import {FormGroup} from '@angular/forms';
import {Mermas} from '../components/Modulos/mermas';
import {DateExpiration, Fecha_vencimiento} from '../components/Modulos/Fecha_vencimiento';
import { VerificarTokenService, respuesta } from './verificar-token.service';
import { ProductoActualizar } from '../components/Modulos/ProductoActualizar';


@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {
// Variables publicas
  public resipiente_Resu: respuesta
  constructor(private http: HttpClient, private verifica: VerificarTokenService) { }

private UrlProductos = 'https://marketmini.herokuapp.com/products';
private UrlCategorias = 'https://marketmini.herokuapp.com/categories';
private URLStock = 'https://marketmini.herokuapp.com/stocks';
private URLStockPerdida = 'https://marketmini.herokuapp.com/stocks/mostrar_stock_de_perdidas';
private URLStockPerdidaAnterior = 'https://marketmini.herokuapp.com/stocks/p_mes_anterior';
private URL_STOCK_PRODUCTOS = 'https://marketmini.herokuapp.com/stocks/stock_products';
private URL_STOCK_PERDIDA = 'https://marketmini.herokuapp.com/stocks/mostrar_stock_de_perdidas';
private URL_STCK_GRF_PERDIDAS = 'https://marketmini.herokuapp.com/stocks/buscar_las_fechas_perdidas';
private URL_PROVIDERS = 'https://marketmini.herokuapp.com/providers';
private UR_MERMAS = 'https://marketmini.herokuapp.com/decreases';
private URLINFORME = 'https://marketmini.herokuapp.com/mrmsolutions';
private URLFECHAS = 'https://marketmini.herokuapp.com/date_expirations';
urlListprovider = 'https://marketmini.herokuapp.com/providers'

    // Actualizar la fecha al realizar una venta.
    
  // Tomar todos los productos
   products(): Observable<Productos[]> {
    return this.http.get<Productos[]>(this.UrlProductos);
  }
  // Tomar algunos datos para los items del carrito.
    item_productos(): Observable<Productos[]> {
      return this.http.get<Productos[]>(this.UrlProductos);
    }

    // Tomar la cantidad del inventario que se debe gestionar
    inventario_gestion() {
      return this.http.get(this.UrlProductos + '/inventario_gestionable' ).toPromise();
    }


// Buscar un producto por su ID
  buscarproductoporID(id: number) {
      return this.http.get<Productos>(this.UrlProductos + '/' + id);

  }

  // Buscar el el stock por su ID
  buscarelstockporID(id: number) {
      return this.http.get<Stock>(this.URLStock + '/' + id);
  }
// Actualizar productos (detalle, texto referencia)
    actualizarproducto(produ: ProductoActualizar) {
        const uproducto = produ
        const Swal = require('sweetalert2')

      this.verifica.verificaUpdateProd().subscribe(async (res: respuesta) => {
        if(res.resultado != 'existe'){return ;}
        if(res.resultado == 'existe'){

          await this.http.put<ProductoActualizar>(this.UrlProductos + '/' + uproducto.id , uproducto).subscribe(  res => {
                        const Swal = require('sweetalert2')

            Swal.fire({
              title: 'Exitoso!!',
              text: 'El producto fue actualizado correctamente.',
              icon: 'success',
              confirmButtonText: 'cerrar'
            })}
          );
        } 
      })
    }

    // Actializar el stock de los productos.
    actualizarstock(stck: Stock) {
      console.log('stck', stck);
      this.verifica.veriuPsTock().subscribe((res:respuesta) => {
        if (res.resultado != 'existe') { return; }
     if (res.resultado == 'existe') {
      this.http.put<Stock>(this.URLStock + '/' + stck.id, stck).subscribe();
     }
      })
    }
    //Guardar un proveedor
    guardarProvider(c) {
      this.verifica.verificarSaveProvider().subscribe((res: respuesta) => {
        if (res.resultado == 'existe') { 
          this.http.post<Provideer>(this.URL_PROVIDERS, c.value).subscribe(resp => {
            if (Object.values(resp)[0] == 'correctamente') {
              c.reset()
             }
  
          });
        }
      
      })
    }
    // Guardar un nuevo producto
   async guardarproductos(p) {
     
    
    await  this.verifica.VerficSaveProd().subscribe((res: respuesta) => {
     
        if(res.resultado == 'existe'){
        this.http.post<Productos>(this.UrlProductos, p.value).subscribe( res => {
          if( Object.values(res)[0] == 'correctamente'){
            const Swal = require('sweetalert2')
            Swal.fire({
              title: 'Exitoso!!',
              text: 'El producto fue guardado correctamente.',
              icon: 'success',
              confirmButtonText: 'cerrar'
            })
          
            p.reset()
          } 
          
          })
        } 
  
      })
      
     // if(this.respuesta_guardando.guardado = 'Se guardo'){
     // return p.reset()

      //}
      //return p.reset()
  }
    // Guardar un proveedor
    


  // Tomar todas las categorias
   categorias(): Observable<Categories[]> {
      return this.http.get<Categories[]>(this.UrlCategorias);
  }

  // Guardar una categoria
   categoriassave(c: Categories) {
    return this.http.post<Categories>(this.UrlCategorias, c);
  }


   
    // Busca el stock de perdidas con el precio del producto para poder ser multiplicados y a si sacar el valor de la perdida
    _stock_productos() {
      return this.http.get<Stock_productos[]>(this.URL_STOCK_PRODUCTOS);
    }

    // Guardar el nuevo stock para el inventario 2 
    _stockinventario2(stck: Stock):Observable<Stock>{
      return this.http.post<Stock>(this.URLStock,stck);
    }



  // Aqui sSKe conecta a los proveedores
    __tomaproveedores() {
      return this.http.get<Provideer[]>(this.URL_PROVIDERS);
    }

    


   

    // Buscar mermas
  

 
    // Actualizar registro merma
  

        //Productos que venceran el siguiente mes.

    GetPorvencer() {
        return this.http.get<Fecha_vencimiento[]>(this.UrlProductos + '/vencimientoproximomes').toPromise();
    }

        // Productos que estan por vencer.
    Getprodvencmes(){
      return this.http.get<any[]>(this.UrlProductos + '/obtener_fecha_productos_mes').toPromise();
    }

    //Productos que venceran el siguiente mes.
    
    // Actualizar el stock de las fechas
async actualizar_stock_fecha(fchAct: date_expiration) {
   await this.verifica.VerifiUpDateExp().subscribe((res: respuesta) => {
    if (res.resultado != 'existe') { return; }
    if (res.resultado == 'existe') {
      this.http.put<date_expiration>(this.URLFECHAS + '/' + fchAct.id, fchAct).subscribe();
    }
   })      
    }
    // Tomando el nuevo inventario con su stock de perdida y fecha de vencimiento.
    getnewinventario() {
       return this.http.get(this.URLFECHAS + '/date_product_id_on').toPromise();
    }

    // Buscar la fecha del nuevo inventario
    segundoinventarioID(id: number) {
     return  this.http.get(this.URLFECHAS + '/' + id ).toPromise();
    }

    // Guardar la fecha actual del inventario 2
  _guardarfechainventario2(dtex:date_expiration):Observable<date_expiration>{
    return this.http.post<date_expiration>(this.URLFECHAS, dtex)
  }

  // Get a las fechas y productos que estan registrados en el segundo inventario.

  _buscandolasfechasin_productid(){
    return this.http.get(this.URLFECHAS + '/date_product_id_on').toPromise();
  }

  // Actualizar la fecha vencimiento.

 async _actualizar_fechavence(dt: date_expiration){
    await this.verifica.VerifiUpDateExp().subscribe((res: respuesta) => {
      if (res.resultado != 'existe') { return; }
      if (res.resultado == 'existe') {
        this.http.put(this.URLFECHAS + '/' + dt.id, dt).subscribe()
      }
     })   
  }

  ListaProveedor():Observable<any>{
    const headers = new HttpHeaders()
  .set("X-CustomHeader", "custom header value");
    return this.http.get(this.urlListprovider, {headers})
  }
}