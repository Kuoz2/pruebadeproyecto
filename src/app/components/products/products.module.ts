import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CKEditorModule} from 'ngx-ckeditor';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {ProductsRoutingModule} from './products-routing.module';
import {CategoryComponent} from './physical/category/category.component';

import {GalleryModule} from '@ks89/angular-modal-gallery';
import 'hammerjs';
import 'mousetrap';

import {DROPZONE_CONFIG, DropzoneConfigInterface, DropzoneModule} from 'ngx-dropzone-wrapper';
import {SharedModule} from "../../shared/shared.module";
import {ListaproductoComponent} from './physical/listaproducto/listaproducto.component';
import {NgxPaginationModule} from "ngx-pagination";
import {StockComponent} from './physical/stock/stock.component';
import {ProvideerComponent} from './provideer/provideer.component';
import {ImpuestosComponent} from './physical/impuestos/impuestos.component';
import {MarcaComponent} from './physical/marca/marca.component';
import {Ng4LoadingSpinnerModule} from "ng4-loading-spinner";
import { VencimientosComponent } from './physical/vencimientos/vencimientos.component';
import {NgxSpinnerModule} from "ngx-spinner";
import { VerificarTokenService } from 'src/app/Service/verificar-token.service';
import { CotizacionComponent } from './physical/cotizacion/cotizacion.component';
import { BitacoraComponent } from './bitacora/bitacora.component';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  maxFilesize: 50,
  url: 'https://httpbin.org/post',
};



@NgModule({
  declarations: [CategoryComponent,
    ListaproductoComponent,
    StockComponent,
    ProvideerComponent,
    ImpuestosComponent,
    MarcaComponent,
    VencimientosComponent,
    CotizacionComponent,
    BitacoraComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CKEditorModule,
        ProductsRoutingModule,
        NgbModule,
        DropzoneModule,
        GalleryModule.forRoot(),
        SharedModule,
        NgxPaginationModule,
        Ng4LoadingSpinnerModule,
        NgxSpinnerModule
    ],
  providers: [VerificarTokenService,
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    },
    NgbActiveModal,
  ]
})
export class ProductsModule { }
