import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  mdl_usuario: string = '';
  mdl_contrasena: string = '';

  isAlertOpen = false;
  alertButtons = ['OK'];

  constructor(private router: Router, private route: ActivatedRoute, private db:DbService) {
    this.mdl_contrasena = "";
    this.mdl_usuario = "";
  }

 
  ngOnInit() {
    this.mdl_contrasena = "";
    this.mdl_usuario = "";
  }

  navegar(){
    let parametros: NavigationExtras = {
        replaceUrl: true,
        state: {

          user: this.mdl_usuario,
          pass: this.mdl_contrasena
        }
      }
      this.router.navigate(['principal'], parametros);
    }




  navegarCrearUsuario(){
    this.router.navigate(['crear-usuario']);
  }

  login(){
    let parametros: NavigationExtras = {
      replaceUrl: true,
      state: {

        user: this.mdl_usuario,
        pass: this.mdl_contrasena
      }
    }

    this.db.loginUsuario(this.mdl_usuario, this.mdl_contrasena)
    .then(data => {
      if (data == 1) {
        this.router.navigate(['principal'],parametros);
      } else {
        this.db.presentAlert('credenciales inválidas');
      }
    })
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

}
