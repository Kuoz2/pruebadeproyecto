import { NavbotonesComponent } from './navbotones/navbotones.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
 {
   path: '',
   children:[{
     path: 'navboton',
     component: NavbotonesComponent,
     data:{title: "navegación por botones", breadcrumb:'otra forma de navegar'}
   }]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BotoncilloRoutingModule { }
