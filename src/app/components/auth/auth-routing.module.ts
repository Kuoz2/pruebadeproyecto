import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {VerificadorService} from "../../Service/verificador.service";

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent,
    canActivate: [VerificadorService]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
