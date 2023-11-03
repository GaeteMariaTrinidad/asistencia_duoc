import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  mdl_usuario: string = '';
  mdl_contrasena: string = '';

  correo: string ='';
  nombre: string ='';
  apellido: string ='';
  

  constructor(private router: Router, private db: DbService) { }

  ngOnInit() {
    let parametros = this.router.getCurrentNavigation(); // como llegamos desde el login  
    if(parametros?.extras.state) { 
    this.mdl_usuario = parametros?.extras.state ['user'];
    this.mdl_contrasena = parametros?.extras.state ['pass'];
    }

    this.infoUsuario();
  }

  infoUsuario(){
    this.db.infoUsuario(this.mdl_usuario, this.mdl_contrasena)
    .then(data => {
      this.correo = data.correo;
      this.nombre = data.nombre;
      this.correo = data.apellido;
    })
  }

  navegar() {
    this.router.navigate(['login']);
  }

  configurar() {
      this.router.navigate(['**']);
  }  


}
