import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BotoncilloRoutingModule } from './botoncillo-routing.module';
import { NavbotonesComponent } from './navbotones/navbotones.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [NavbotonesComponent],
  imports: [
    CommonModule,
    BotoncilloRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BotoncilloModule { }
