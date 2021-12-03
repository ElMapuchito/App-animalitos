/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable quote-props */
/* eslint-disable prefer-const */
/* eslint-disable no-trailing-spaces */
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginFormulario: FormGroup;

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    public fb: FormBuilder) {

      this.loginFormulario = this.fb.group({
        'nombre': new FormControl("", Validators.required),
        'password': new FormControl("", Validators.required)
      });

    }

  showAlert(mensaje: string) {
    
    this.alertController.create({
      header: 'Datos Inválidos',
      subHeader: mensaje,
      buttons: ['OK']
    }).then(res => {
      res.present();
    });

  }

  ngOnInit() {
  }

  async ingresar(){
    let f = this.loginFormulario.value;
    let usuario = JSON.parse(localStorage.getItem('usuario'));

    if (usuario.nombre !== f.nombre && usuario.password !== f.password ){
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Los datos ingresados no son correctos',
        buttons: ['aceptar']
      });
      await alert.present;
    } else {
      localStorage.setItem('ingresado', 'true');
      this.navCtrl.navigateRoot('home');
    }
  }

}
