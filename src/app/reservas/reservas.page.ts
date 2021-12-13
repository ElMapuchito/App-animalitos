/* eslint-disable @typescript-eslint/member-delimiter-style */
/* eslint-disable curly */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/ban-types */
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage implements OnInit {

  reservas: Array<{
    nombre: string,
    mascota: string,
    tipoMascota: string,
    fecha: string,
    hora: string
  }>;

  constructor(private router: Router) {
    this.cargarEntradas();
  }

  ngOnInit() {
  }

  cargarEntradas() {
    this.reservas = JSON.parse(localStorage.getItem('reservas'));
    if(!this.reservas) return;
    this.reservas.sort((item1, item2) => {
      if(new Date(item1.fecha) > new Date(item2.fecha)) return 1;
      if(new Date(item1.fecha) < new Date(item2.fecha)) return -1;
      return 0;
    });
  }

  irDetalle(reserva: {
    nombre: string,
    mascota: string,
    tipoMascota: string,
    fecha: string,
    hora: string
  }) {
    let datosNavegacion: NavigationExtras = {
      state: {
        entrada: reserva
      }
    }
    this.router.navigate(['/reserva-detalle'], datosNavegacion);
  }

}
