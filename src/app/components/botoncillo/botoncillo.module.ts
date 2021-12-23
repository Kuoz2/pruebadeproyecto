import { CommonModule } from '@angular/common';
import { BotoncilloRoutingModule } from './botoncillo-routing.module';
import { NavbotonesComponent } from './navbotones/navbotones.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';


@NgModule({
  declarations: [NavbotonesComponent],
  imports: [
    CommonModule,
    BotoncilloRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
 
  ]
})
export class BotoncilloModule { }
