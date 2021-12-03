import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { DatosPersonalesComponent } from '../datos-personales/datos-personales.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {
        path: 'datos_personales', component: DatosPersonalesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
