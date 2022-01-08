import { QuickSaleComponent } from './quick-sale/quick-sale.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VoucherCreateComponent} from "./voucher-create/voucher-create.component";
import {ListavoucherComponent} from "./listavoucher/listavoucher.component";
import {MedioComponent} from "./medio/medio.component";
import {ContenedorAppComponent} from "./contenedor-app/contenedor-app.component";
import {BoletaComponent} from "./boleta/boleta.component";
import {CierrecajaComponent} from "./cierrecaja/cierrecaja.component";
import {ListPageComponent} from "./list-page/list-page.component";
import {ActualizarbolComponent} from "./actualizarbol/actualizarbol.component";
import {VerificadorService} from "../../Service/verificador.service";


const routes: Routes = [
  {
    path: '',
    children: [

      {
        path: 'medio-pago',
        component: MedioComponent,
        data: {
          title: "Medio de pago",
          breadcrumb: "Formas de pago"
        },
                canActivate: [VerificadorService]

      },


      {
        path: 'create-voucher',
        component: VoucherCreateComponent,
               data:{
          title: "Crear voucher",
          breadcrumb: "Crear voucher"
        },
                canActivate: [VerificadorService]

      },
      {
        path:'lista-pago',
        component:ListPageComponent,
        data:{
          title: "Ventas",
          breadcrumb:'Lista de ventas'
        },
                canActivate: [VerificadorService]

      },
      {
        path: 'lista-voucher',
        component: ListavoucherComponent,
        data:{
          title: "Lista de voucher",
          breadcrumb: "Listado voucher"
        },
                canActivate: [VerificadorService]

      },
      {
        path: 'create-voucher',
        component: VoucherCreateComponent,
        data:{
          title: "Crear pago",
          breadcrumb: "Crear pago"
        },
                canActivate: [VerificadorService]

      },
      {
        path:'app-pago',
        component:ContenedorAppComponent,
        data:{
          title:"Pago movil",
          breadcrumb:"App pago"
        },
                canActivate: [VerificadorService]

      },
      {
        path: "quick_sale",
        component: QuickSaleComponent,
        data:{
          title:"Listas de las ventas rapidas",
          breadcrumb: "Venta rapida"
        },
                canActivate: [VerificadorService]

      },
      {
        path:'boleta',
        component: BoletaComponent,
        data:{
          title:'Boleta',
          breadcrumb:'Boleta'
        },
                canActivate: [VerificadorService]

      },
      {
        path:'cierre',
        component: CierrecajaComponent,
        data:{
          title:'cierre de caja',
          breadcrumb:'caja'
        },
                canActivate: [VerificadorService]

      },
      {
        path: 'actualizar_boleta',
        component: ActualizarbolComponent,
        data:{
          title:' Actualizar boleta',
          breadcrumb: 'Actualizar boleta'
        },
                canActivate: [VerificadorService]

      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
