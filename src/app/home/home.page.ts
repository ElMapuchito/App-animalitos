/* eslint-disable @typescript-eslint/member-delimiter-style */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable object-shorthand */
/* eslint-disable eqeqeq */
/* eslint-disable arrow-body-style */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable prefer-const */
/* eslint-disable quote-props */
/* eslint-disable no-trailing-spaces */
/* eslint-disable radix */
/* eslint-disable max-len */
import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  fecha: string;
  minDate: Date;
  maxDate: Date;

  reserva: {
    nombre: string,
    mascota: string,
    tipoMascota: string,
    fechaReserva: string,
    hora: string
  };

  reservas: Array<{
    nombre: string,
    mascota: string,
    tipoMascota: string,
    fechaReserva: string,
    hora: string
  }>;

  constructor(
    public toastCtrl: ToastController) {
    moment.locale('es-cl');
    this.fecha = moment().format();
    this.cargarEntradas();
  }
  
  //Nuevas entradas
  cargarEntradas() {
    let fecha = moment(this.fecha).format('DD-MM-YY');

    this.reservas = JSON.parse(localStorage.getItem('reservas'));
    if(this.reservas) {
      let reserva = this.reservas.find((elemento)=>{
       return elemento.fechaReserva = fecha;
      });
        this.inicializarNuevaEntrada();
    } else {
      this.inicializarNuevaEntrada();
    }
  }

  inicializarNuevaEntrada() {
    let fecha = moment(this.fecha).format();

    this.reserva = {
      nombre: '',
      mascota: '',
      tipoMascota: '',
      fechaReserva: fecha,
      hora: ''
    }
  }

  async guardar(reserva: {
    nombre: string,
    mascota: string,
    tipoMascota: string,
    fechaReserva: string,
    hora: string
  }){

    let fecha = moment(this.fecha).format('DD-MM-YY');

    if (this.reservas) { //por aqui esta el problema
      let item = this.reservas.find((elemento)=>{
        return elemento.fechaReserva = fecha;
      });
      this.guardarItem(reserva);
    } else {
      this.reservas = []; //esta parte esta bien
      this.guardarItem(reserva);
    }

    const toast = await this.toastCtrl.create({
      message: 'Datos guardados',
      duration: 2000
    });
    toast.present();

   }

   guardarItem(entrada: {
    nombre: string,
    mascota: string,
    tipoMascota: string,
    fechaReserva: string,
    hora: string }) {
     this.reservas.push(entrada);
     localStorage.setItem('reservas', JSON.stringify(this.reservas))
   }

  ngOnInit(){
    
  }
}