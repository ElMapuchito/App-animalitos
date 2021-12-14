import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-card-entrada',
  templateUrl: './card-entrada.component.html',
  styleUrls: ['./card-entrada.component.scss'],
})
export class CardEntradaComponent implements OnInit {

  minDate: Date;
  maxDate: Date;
  categoria = ['Perro', 'Gato', 'Conejo', 'Hamster', 'Ave'];
  horas = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00'];

  @Input() reserva: {
    nombre: string,
    mascota: string,
    tipoMascota: string,
    fechaReserva: string,
    hora: string
  }

  @Input() soloLectura: Boolean = false;

  @Output() eventoGuardar: EventEmitter<{
    nombre: string,
    mascota: string,
    tipoMascota: string,
    fechaReserva: string,
    hora: string
  }> = new EventEmitter <{
    nombre: string,
    mascota: string,
    tipoMascota: string,
    fechaReserva: string,
    hora: string
  }>();;

  constructor(
    private toastCtrl: ToastController
  ) {
    /* Fechas para el calendario */
    this.minDate = new Date();
    const currentYear = new Date().toLocaleDateString('en-GB');
    this.maxDate = new Date(Number.parseInt(currentYear.slice(6,10)) + 1, Number.parseInt(currentYear.slice(3,5)), Number.parseInt(currentYear.slice(0,2)));
   }

  ngOnInit() {}

  async guardar(){
    let correcto = true;
    Object.entries(this.reserva).forEach(([key, value]) => {
      if (value === '' && key !== 'fechaReserva') {
        correcto = false;
      }
    });
    if (correcto) {
      this.eventoGuardar.emit(this.reserva);
    } else {
      const toast = await this.toastCtrl.create({
        message: 'Debe completar todos los campos',
        duration: 2000,
      });
      toast.present();
    }
  }

  limpiar(){ //No se toca
    Object.keys(this.reserva).forEach(key =>{
      Object.defineProperty(this.reserva, key, {value: ''});
    });
  }
}
