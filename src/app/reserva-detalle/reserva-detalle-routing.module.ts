import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservaDetallePage } from './reserva-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: ReservaDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservaDetallePageRoutingModule {}
