import { NavbotonesComponent } from './navbotones/navbotones.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {VerificadorService} from "../../Service/verificador.service";

const routes: Routes = [
 {
   path: '',
   children:[{
     path: 'navboton',
     component: NavbotonesComponent,
     data:{title: "navegación por botones", breadcrumb:'otra forma de navegar'},
     canActivate: [VerificadorService]

   }]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BotoncilloRoutingModule { }
