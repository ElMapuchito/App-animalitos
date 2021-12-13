/* eslint-disable eol-last */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  indiceSeleccionado: number = 0;

  paginas = [
    {
      titulo: 'Inicio',
      url: '/menu/home',
      icono: 'home'
    },
    {
      titulo: 'Reservas',
      url: '/menu/reservas',
      icono: 'book'
    }
  ]

  constructor(public alertController: AlertController, public navCtrl: NavController) { }

  ngOnInit() { }

  cambiarIndice(i) {
    this.indiceSeleccionado = i;
  }

  async salir() {
    const alert = await this.alertController.create({
      header: 'Salir',
      message: '¿Está seguro que desea salir?',
      buttons: [
        {
          text: 'No, mejor no',
          handler: () => {

          }
        }, {
          text: 'Si',
          handler: () => {
            localStorage.removeItem('ingresado');
            this.navCtrl.navigateRoot('login');
          }
        }
      ]
    });

    await alert.present();
  }

}