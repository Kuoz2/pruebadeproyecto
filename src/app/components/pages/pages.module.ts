import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';
import {CKEditorModule} from 'ngx-ckeditor';

import {PagesRoutingModule} from './pages-routing.module';
import {SharedModule} from "../../shared/shared.module";
import {TicketComponent} from './ticket/ticket/ticket.component';
import {MedioComponent} from './medio/medio.component';
import {AppsaleComponent} from './appsale/appsale.component';
import {ListproductComponent} from './appsale/listproduct/listproduct.component';
import {HoraActualService} from "../../Service/hora-actual.service";
import {BoletaComponent} from './boleta/boleta.component';
import {ListPageComponent} from "./list-page/list-page.component";
import {NgxPaginationModule} from "ngx-pagination";
import {ActualizarbolComponent} from './actualizarbol/actualizarbol.component';
import {Ng4LoadingSpinnerModule} from "ng4-loading-spinner";
import {NgxSpinnerModule} from "ngx-spinner";
import {NgxPrintModule} from 'ngx-print';
import { QuickSaleComponent } from './quick-sale/quick-sale.component';
import { ContenedorAppComponent } from './contenedor-app/contenedor-app.component';
@NgModule({
  declarations:
      [
      TicketComponent,
      MedioComponent,
      AppsaleComponent,
      ListproductComponent,
      BoletaComponent,
      ListPageComponent,
      ActualizarbolComponent,
      QuickSaleComponent,
      ContenedorAppComponent
    
      ],
    imports: [
        CommonModule,
        PagesRoutingModule,
        NgbModule,
        ReactiveFormsModule,
        CKEditorModule,
        SharedModule,
        NgxPaginationModule,
        Ng4LoadingSpinnerModule,
        NgxSpinnerModule,
        NgxPrintModule,
    ],
    providers:[HoraActualService],
    schemas:[
        NO_ERRORS_SCHEMA
    ]
})
export class PagesModule { }
