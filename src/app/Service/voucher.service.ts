import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DetalleVoucher} from '../components/Modulos/DetalleVoucher';
import {Voucher} from '../components/Modulos/Voucher';
import {Observable} from 'rxjs';
import {V_Producto} from '../components/Modulos/GANANCIAS';

import {Reporete_perdidas_grafico, Reporte_grafico, totalperdiaspriminv, totalventasrapidas, Venta_mes_atras, Venta_por_mes, } from '../components/Modulos/reporte_grafico';
import { VerificarTokenService, respuesta } from './verificar-token.service';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {

  Urldetallevaucher = 'https://marketmini.herokuapp.com/voucher_details'; // Muestra el detalle del detalle del voucher con el producto en general
  Urlvoucher = 'https://marketmini.herokuapp.com/vouchers'; // Muestra el voucher completo
  UrlUltvoucher = 'https://marketmini.herokuapp.com/vouchers/showlast'; // Muestra el ultimo producto vendido
  URLVntMes = 'https://marketmini.herokuapp.com/show_date'; // Muestra el estado de las venta con el voucher y el producto vendido este mes.
  UrlVentasTotal = 'https://marketmini.herokuapp.com/voucher_details/show_cantidad'; // Muesta la cantidad ganada este mes
  URLmespasado = 'https://marketmini.herokuapp.com/voucher_details/show_after_month'; // Muestra las ganancas del mes anterior
  URLproductosV = 'https://marketmini.herokuapp.com/voucher_details/producto_max_vend'; // Muestra los productos mas vendidos
  UTLtotalganancias = 'https://marketmini.herokuapp.com/voucher_details/las_ganancias_totales_meses'; // Muestra el total de las ganancias.
  URLTOTALGANANCIAS_FV = 'https://marketmini.herokuapp.com/vouchers/mostrar_ganancias_por_mes'; // MUESTRA LAS GANANCIAS POR CADA MES Y MUESTRA EL RESULTADO.
  URLGuardarconfig = 'https://marketmini.herokuapp.com/config_vouchers'  ;
  inventarioperdida2 = 'https://marketmini.herokuapp.com/date_expirations/buscar_las_fechas_perdidas';
  todaslasperdidas = 'https://marketmini.herokuapp.com/date_expirations/todaslasperdidasdos';
  pruebatodaslasperdidasdinv1 = 'https://marketmini.herokuapp.com/stocks/todaslasperdiadasinvprim';
  pruebaquicksales = 'https://marketmini.herokuapp.com/quick_sales/ventarapida_fechas';
  totalventasrapidas= 'https://marketmini.herokuapp.com/quick_sales/totalventasrapidas';
  perdidaxmes = 'https://marketmini.herokuapp.com/stocks/buscar_las_fechas_perdidas';
  //de forma local se aran el ingreso.

  PruebaInformeXML = 'https://marketmini.herokuapp.com/archives'

  constructor(private http: HttpClient, private verificar: VerificarTokenService) { }
  // Ganancias totales del mes pasado.
  ganancia_mes_anterior(): Observable<Venta_mes_atras> {
      return this.http.get<Venta_mes_atras>(this.URLmespasado);
  }

  // Ganancias este mes
  cantidad_vendida(): Observable<Venta_por_mes> {
      return this.http.get<Venta_por_mes>(this.UrlVentasTotal);
  }

  // Lista de productos vendidos.
    p_vendidos() {
      return this.http.get<V_Producto[]>(this.URLproductosV);
    }
    // Productos de este mes
  vnts_mes(): Observable<DetalleVoucher> {
        return this.http.get<DetalleVoucher>(this.URLVntMes);
  }

 async crearvoucher(deta: DetalleVoucher) {
    await this.verificar.verificarSaveVouchDetai().subscribe((res: respuesta) => {
      if (res.resultado != 'existe') { return; }
     if (res.resultado == 'existe') {
       this.http.post<DetalleVoucher>(this.Urldetallevaucher, deta).subscribe();
     }
    })
  }
  crearunvoucher(vouch: Voucher) {
    return  this.http.post<Voucher>(this.Urlvoucher, vouch);
  }

 ultimovoucher(): Observable<Voucher> {
      return  this.http.get<Voucher>(this.UrlUltvoucher);
  }

  mostratodo() {
    return this.http.get<DetalleVoucher>(this.Urldetallevaucher);
  }

  detalledeventa(): Observable<DetalleVoucher[]> {
      return this.http.get<DetalleVoucher[]>(this.Urldetallevaucher);
  }


  mostrarvoucher(): Observable<Voucher[]> {
    return this.http.get<Voucher[]>(this.Urlvoucher);
  }

  // Muesta todas las ganancias obtenidas asta ahora.
    muestra_todas_ganancias() {
      return this.http.get<Reporte_grafico>(this.UTLtotalganancias);
    }
    // Muesta el total de las ganancias este mes. CON LOS RESULTADOS Y EL MES.
    mostrar_ganancias_fv() {
        return this.http.get<any[]>(this.URLTOTALGANANCIAS_FV);
    }
      //Muestra las perdidas por mes.
      mostrar_perdidasXmes(){
        return this.http.get<any[]>(this.perdidaxmes)
      }
  

    guardarcambios(d) {
      this.http.post(this.URLGuardarconfig, d);
    }

    // Guardar el xml para enviarlo por email.
    PostANDSendXML(xml){
      this.http.post(this.PruebaInformeXML, xml).subscribe(res => {console.log("envio",res)})
    }
     //Inventario 2 de perdidas.
     perdidas_inventario2(){
      return this.http.get<any[]>(this.inventarioperdida2)
    }

    //Muestra todas las perdidas
    todaslasperdiadsinventario2(){
        return this.http.get<Reporete_perdidas_grafico>(this.todaslasperdidas)
    }

    //Todas las perdidas del inventario primario.
    todaslasperdidasdinventario1(){
      return this.http.get<totalperdiaspriminv>(this.pruebatodaslasperdidasdinv1)
    }

    //Todas las ventas rapidas
    ventasrapidas(){
        return this.http.get<any[]>(this.pruebaquicksales)
    }

    //Total de las ventas rapidas
    totalventasR(){
      return this.http.get<totalventasrapidas>(this.totalventasrapidas)
    }
}
