import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { DbService } from 'src/app/services/db.service';

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

  constructor(private db: DbService, private router: Router, private api: ApiServiceService) { }

  ngOnInit() {
  }
  almacenarUsuario(){
    this.db.almacenarUsuario(this.mdl_usuario, this.mdl_contrasena, this.mdl_correo, this.mdl_nombre, this.mdl_apellido);
    this.api.personaAlmacenar(this.mdl_usuario,this.mdl_correo,this.mdl_contrasena,this.mdl_nombre, this.mdl_apellido).subscribe(()=>{
      this.db.presentAlert("persona agregada correctamente");
    },
    error =>{
      this.db.presentAlert("Error al agregar persona: " + JSON.stringify(error));
    });
    
    this.router.navigate(['login']);
  }

  volver(){
    let parametros: NavigationExtras ={
      replaceUrl: true
    }
    this.router.navigate(['login']),parametros;
  }

}
