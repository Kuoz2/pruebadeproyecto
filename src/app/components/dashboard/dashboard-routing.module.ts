import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import {VerificadorService} from "../../Service/verificador.service";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'default',
        component: DashboardComponent,
        data: {
          title: "Dashboard",
          breadcrumb: "Dashboard"
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
export class DashboardRoutingModule { }
