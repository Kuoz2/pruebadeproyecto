import { CotizacionComponent } from './physical/cotizacion/cotizacion.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CategoryComponent} from './physical/category/category.component';
import {AddProductComponent} from './physical/add-product/add-product.component';

import {ListaproductoComponent} from "./physical/listaproducto/listaproducto.component";
import {ProvideerComponent} from "./provideer/provideer.component";
import {PromocionesComponent} from "./physical/promociones/promociones.component";
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
        path: 'physical/add-product',
        component: AddProductComponent,
        data: {
          title: 'Agregar producto',
          breadcrumb: 'Agregar producto'
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
        path:'physical/promociones',
        component: PromocionesComponent,
        data:{
          title:'Crear promociones',
          breadcrumb:'Nuevas promociones'
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
        path:'cotizacion',
        component: CotizacionComponent,
        data:{
          title:'Cotización',
          breadcrumb:'Crear cotización'
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
export class ProductsRoutingModule { }
