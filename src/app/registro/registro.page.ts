/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';
import { NavController } from '@ionic/angular'; 

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  registroFormulario: FormGroup;

  constructor(
    public alertCtrl: AlertController,
    public fb: FormBuilder,
    public animationCtrl: AnimationController,
    public navCtrl: NavController
  ) { 
    this.registroFormulario = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
      'password2': new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
  }

  async confirmar() {
    let f = this.registroFormulario.value;

    if(this.registroFormulario.invalid){
      const alert = await this.alertCtrl.create({
        header: 'Datos Incompletos',
        message: 'Debe completar todos los campos del formularios',
        buttons: ['Aceptar']
      });

      await alert.present();
      return;
    } else if (f.password !== f.password2) {
      const alert = await this.alertCtrl.create({
        header: 'Datos Erroneos',
        message: 'Las contraseñas no pueden ser distintas',
        buttons: ['Aceptar']
      });

      await alert.present();
      return;
    }

    const alertReg = await this.alertCtrl.create({
      message: 'Registrado de forma correcta',
      buttons: ['Aceptar']
    });

    let usuario = {
      nombre: f.nombre,
      password: f.password,
    };

    localStorage.setItem('usuario', JSON.stringify(usuario));
    await alertReg.present();
    localStorage.setItem('ingresado', 'true');
    this.navCtrl.navigateRoot('login');
  }
}
