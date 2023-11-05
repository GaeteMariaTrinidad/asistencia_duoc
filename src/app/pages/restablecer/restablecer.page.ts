import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiServiceService } from 'src/app/services/api-service.service';
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

  mdl_nueva: string = '';
  mdl_actual: string = '';
  mdl_confirmacion: string = '';

  v_visible = false;
  v_mensaje = '';


  constructor(private api: ApiServiceService, private router: Router, public alertController: AlertController, private db: DbService) { }

  ngOnInit() {
    let parametros = this.router.getCurrentNavigation();
    if (parametros?.extras.state) {
      this.mdl_usuario = parametros?.extras.state['user'];
      this.mdl_contrasena = parametros?.extras.state['pass'];
    }
    this.mdl_nueva = '';
    this.mdl_actual = '';
    this.mdl_confirmacion = '';
  }

  cambiarContrasena() {
    this.db.loginUsuario(this.mdl_usuario, this.mdl_actual)
      .then(data => {
        if (data == 0) {
          this.v_visible = true;
          this.v_mensaje = 'La contraseña actual no es correcta';
        } else {
          if (this.mdl_nueva != this.mdl_confirmacion) {
            this.v_visible = true;
            this.v_mensaje = 'Las campos no coinciden';
          } else {
            this.db.cambiarContrasena(this.mdl_usuario, this.mdl_contrasena, this.mdl_nueva);
            this.api.personaModificarContrasena(this.mdl_usuario,this.mdl_nueva,this.mdl_contrasena).subscribe(()=>{
              this.db.presentAlert("Clave modificada exitosamente");
            },
            error =>{
              this.db.presentAlert("Error al modificar clave: " + JSON.stringify(error));
            });
            let parametros: NavigationExtras = {
              replaceUrl: true
            }
            this.router.navigate(['login'],parametros);
          }
        }
      })



  }


  volver() {
    let parametros: NavigationExtras = {
      state: {
        user: this.mdl_usuario,
        pass: this.mdl_contrasena
      }
    }
    this.router.navigate(['principal'], parametros);
  }


  async presentAlert(msj: string) {
    const alert = await this.alertController.create({
      header: 'Información',
      message: msj,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
