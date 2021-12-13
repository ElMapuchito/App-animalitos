import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reserva-detalle',
  templateUrl: './reserva-detalle.page.html',
  styleUrls: ['./reserva-detalle.page.scss'],
})
export class ReservaDetallePage implements OnInit {

  reserva: {
    nombre: string,
    mascota: string,
    tipoMascota: string,
    fechaReserva: string,
    hora: string
  };

  constructor(private router: Router) { 
    if(this.router.getCurrentNavigation().extras.state){
      this.reserva = this.router.getCurrentNavigation().extras.state.entrada;
      console.log(this.reserva);
    }
  }
  
  ngOnInit() {
  }

}
