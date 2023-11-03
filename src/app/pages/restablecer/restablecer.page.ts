import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage implements OnInit {

  mdl_usuario: string = '';
  mdl_contrasena: string = '';
  mdl_contrasena_nueva_1: string = '';
  mdl_contrasena_nueva_2: string = '';

  contrasenaNueva: string = '';


  constructor(private router: Router,public alertController: AlertController, private db:DbService) { }

  ngOnInit() {
    let parametros = this.router.getCurrentNavigation(); 
    if(parametros?.extras.state) { 
    this.mdl_usuario = parametros?.extras.state ['user'];
    this.mdl_contrasena = parametros?.extras.state ['pass'];
    }
  }

  cambiarContrasena(){
    this.db.cambiarContrasena(this.mdl_usuario, this.mdl_contrasena, this.contrasenaNueva);
    this.router.navigate(['login']);
  }

  contrasena_cambiada(){

    if (this.mdl_contrasena_nueva_1 == this.mdl_contrasena_nueva_2 
       && this.mdl_contrasena_nueva_1 != '' && this.mdl_contrasena_nueva_2 != ''){
      this.presentAlert("Contraseña Cambiada");
      let parametros: NavigationExtras = {
        replaceUrl: true,
        state:{
          pass: this.mdl_contrasena_nueva_1
        }
      }
      this.router.navigate(['login'],parametros);
      
    } 
    
    else if(this.mdl_contrasena_nueva_1 == '' && this.mdl_contrasena_nueva_2 == ''){
      this.presentAlert("Los campos están vacíos");
    } else {
      this.presentAlert("Las contraseñas no coinciden");
    }
  }
  volver(){
    this.router.navigate(['login']);
  }


  async presentAlert(msj:string) {
    const alert = await this.alertController.create({
      header: 'Información',
      message: msj,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
