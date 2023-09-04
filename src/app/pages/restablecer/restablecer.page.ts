import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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

  constructor(private router: Router,public alertController: AlertController) { }

  ngOnInit() {
    let parametros = this.router.getCurrentNavigation(); 
    if(parametros?.extras.state) { 
    this.mdl_usuario = parametros?.extras.state ['user'];
    this.mdl_contrasena = parametros?.extras.state ['pass'];
    }
  }

  contrasena_cambiada(){
    if (this.mdl_contrasena_nueva_1 == this.mdl_contrasena_nueva_2){
      this.presentAlert("Contraseña Cambiada");
      let parametros: NavigationExtras = {
        state:{
          pass: this.mdl_contrasena_nueva_1
        }
      }
      this.router.navigate(['login'],parametros);
    } 
    
    else{
      this.presentAlert("Las contraseñas no coinciden");
    }
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
