/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable prefer-const */
/* eslint-disable quote-props */
/* eslint-disable no-trailing-spaces */
/* eslint-disable radix */
/* eslint-disable max-len */
import { Component, AfterContentInit} from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController, NumericValueAccessor } from '@ionic/angular';
import { AnimationController , Animation } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  categoria = ['Perro', 'Gato', 'Conejo', 'Hamster', 'Ave'];
  horas = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00'];
  mascota = {
    'duenio': '',
    'nombre': '',
    'categoria': '',
    'fecha': '',
    'hora': '',
  };

  fecha: Date;
  minDate : Date;
  maxDate : Date;

  constructor(
    private alertCtrl: AlertController, 
    private animationCtrl: AnimationController,
    private navCtrl: NavController,
    private router: Router) {
    /* Fechas para el calendario */
    this.minDate = new Date();
    const currentYear = new Date().toLocaleDateString('en-GB');
    this.maxDate = new Date(Number.parseInt(currentYear.slice(6,10)) + 1, Number.parseInt(currentYear.slice(3,5)), Number.parseInt(currentYear.slice(0,2)));
  }

  segmentChanged($event){
    let direccion = $event.detail.value;
    this.router.navigate(['home/' + direccion]);
  }
  
  ngAfterContentInit() {
  }

  reservar(){
    if (this.validar()){
      let mens = `La reserva para la mascota ${this.mascota.nombre}
      ha sido registrada para el ${this.mascota.fecha} a las ${this.mascota.hora}`;
      this.showAlert(mens);
    } else{
      this.showAlert('Faltan Datos!');
    }
  }

  validar() {
    if (this.fecha == null){
      return false;
    }else{
      this.mascota.fecha = this.fecha.toLocaleDateString('en-GB'); 
    }
    let correcto = true;
    Object.values(this.mascota).forEach(val=>{
      if (val ===''){
        correcto = false;
      }
    });
    return correcto;
  }

  showAlert(mensaje: string) {
    
    this.alertCtrl.create({
      subHeader: mensaje,
      buttons: ['OK']
    }).then(res => {
      res.present();
    });
  }

  limpiar(){
    Object.keys(this.mascota).forEach(key =>{
      Object.defineProperty(this.mascota, key, {value: ''});
    })
  }

  async cerrarSesion() {
    localStorage.removeItem('ingresado');
    this.navCtrl.navigateRoot('login');
  }

  ngOnInit(){
    const animation = this.animationCtrl
      .create()
      .addElement(document.querySelector('#titulo'))
      .duration(2500)
      .iterations(Infinity)
      .keyframes([
        { offset: 0, transform: 'translateX(-200px)', opacity: 0},
        { offset: 0.1, opacity: 0.2},
        { offset: 0.2, opacity: 1},
        { offset: 0.8, opacity: 1},
        { offset: 0.9, opacity: 0.2},
        { offset: 1, transform: 'translateX(200px)', opacity: 0}
      ])
    animation.play();

    const moviCampo = this.animationCtrl.create()
    .addElement(document.querySelector('#dueno'))
    .addElement(document.querySelector('#mascota'))
    .duration(1000)
    .keyframes([
      { offset: 0.25, transform: 'translateX(80px)'},
      { offset: 0.5, transform: 'translateX(0px)'},
      { offset: 0.75, transform: 'translateX(-80px)'},
      { offset: 1, translate: 'translateX(0px)'},
    ]);
    
    document.querySelector('#limpiar').addEventListener('click', () => {
      moviCampo.play();
    });
  }
}
 