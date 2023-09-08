import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  mdl_usuario: string = '';
  mdl_contrasena: string = '';
  usuario : string = 'ALBERTO';
  contrasena : string = '12345';

  isAlertOpen = false;
  alertButtons = ['OK'];

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    let parametros = this.router.getCurrentNavigation(); 
    this.route.queryParams.subscribe(params => {
      if (params) {
        const pass = params['pass'];
        if (pass) {
          window.location.reload();
        }
      }
    });

    if(parametros?.extras.state) {   
      this.contrasena = parametros?.extras.state['pass'];
    }
    console.log(this.contrasena)
  }

  navegar(){
    if(this.mdl_usuario == this.usuario && this.mdl_contrasena == this.contrasena){

      let parametros: NavigationExtras = {
        state: {
          user: this.mdl_usuario,
          pass: this.mdl_contrasena
        }
      }

      this.router.navigate(['principal'], parametros);
    } else {
      this.isAlertOpen = true;
    }

  }

  restablecer(){
    let parametros: NavigationExtras = {
      state: {
        user: this.usuario,
        pass: this.contrasena
      }   
    }
    this.router.navigate(['restablecer'], parametros);
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

}
