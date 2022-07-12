import { BitacoraComponent } from './bitacora/bitacora.component';
import { CotizacionComponent } from './physical/cotizacion/cotizacion.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CategoryComponent} from './physical/category/category.component';

import {ListaproductoComponent} from "./physical/listaproducto/listaproducto.component";
import {ProvideerComponent} from "./provideer/provideer.component";
import {ImpuestosComponent} from "./physical/impuestos/impuestos.component";
import {MarcaComponent} from "./physical/marca/marca.component";
import {VencimientosComponent} from "./physical/vencimientos/vencimientos.component";
import {VerificadorService} from "../../Service/verificador.service";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path:'physical/marca',
        component: MarcaComponent,
        data:{
          title:"Marcas",
          breadcrumb: "Marcas"
        },
      canActivate: [VerificadorService],
      },
      {
        path: 'physical/category',
        component: CategoryComponent,
        data: {
          title: "Categoarias",
          breadcrumb: "Categorias"
        },
      canActivate: [VerificadorService],
      },
   
      {
        path: 'physical/impuestos',
        component: ImpuestosComponent,
        data:{
          title:'Agregar impuestos',
          breadcrumb: 'Agregar impuestos'
        },
        canActivate: [VerificadorService],
      },
      {
        path: 'physical/lista-editar',
        component: ListaproductoComponent,
        data:{
          title: 'lista y editar producto',
          breadcrumb:'lista editar producto'
        },
        canActivate: [VerificadorService],
       },
      {
        path:'physical/proveedor',
        component: ProvideerComponent,
        data:{
          title:'Ingreso proveedor',
          breadcrumb:'Nuevo Proveedor'
        },
        canActivate: [VerificadorService]
      },
   
      {
        path:'physical/vencimiento',
        component: VencimientosComponent,
        data:{
          title:'Vencimiento',
          breadcrumb:'Productos vencidos'
        },
        canActivate: [VerificadorService]
      },
      {
        path:'products/cotizacion',
        component: CotizacionComponent,
        data:{
          title: 'Cotización',
          breadcrumb: 'Cotizar'
        },
        canActivate:[VerificadorService]
      },
      {
        path:'physical/bitacora',
        component: BitacoraComponent,
        data:{
          title: 'Bitacora',
          breadcrumb: 'Bitacora'
        },
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
