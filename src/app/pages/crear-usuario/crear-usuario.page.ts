import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.page.html',
  styleUrls: ['./crear-usuario.page.scss'],
})
export class CrearUsuarioPage implements OnInit {

  mdl_usuario: string = '';
  mdl_contrasena: string = '';
  mdl_correo: string = '';
  mdl_nombre: string = '';
  mdl_apellido: string = '';

  constructor() { }

  ngOnInit() {
  }
  contrasena_cambiada(){}

  volver(){}

}
