import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservaDetallePageRoutingModule } from './reserva-detalle-routing.module';

import { ReservaDetallePage } from './reserva-detalle.page';
import { ModuloComponentsModule } from 'src/componentes/modulo-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservaDetallePageRoutingModule,
    ModuloComponentsModule
  ],
  declarations: [ReservaDetallePage]
})
export class ReservaDetallePageModule {}
