import { QuickSaleComponent } from './quick-sale/quick-sale.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MedioComponent} from "./medio/medio.component";
import {BoletaComponent} from "./boleta/boleta.component";
import {ListPageComponent} from "./list-page/list-page.component";
import {ActualizarbolComponent} from "./actualizarbol/actualizarbol.component";
import {VerificadorService} from "../../Service/verificador.service";
import { ContenedorAppComponent } from './contenedor-app/contenedor-app.component';


const routes: Routes = [
  {
    path: '',
   canActivate: [VerificadorService]
,
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
        path:'lista-pago',
        component:ListPageComponent,
        data:{
          title: "Ventas",
          breadcrumb:'Lista de ventas'
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
        path:'app-pago',
        component:ContenedorAppComponent,
        data:{
          title:"Pago movil",
          breadcrumb:"App pago"
        }
      },
 
      {
        path: 'actualizar_boleta',
        component: ActualizarbolComponent,
        data:{
          title:' Actualizar boleta',
          breadcrumb: 'Actualizar boleta'
        },
                canActivate: [VerificadorService]

      },
 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
