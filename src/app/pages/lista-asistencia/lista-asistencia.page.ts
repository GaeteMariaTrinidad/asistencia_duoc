import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-lista-asistencia',
  templateUrl: './lista-asistencia.page.html',
  styleUrls: ['./lista-asistencia.page.scss'],
})
export class ListaAsistenciaPage implements OnInit {

  mdl_usuario: string = "";
  data: any;

  constructor(private router: Router, private api: ApiServiceService, private db: DbService) { }

  ngOnInit() {
    this.db.fetchUsuario().subscribe(datos=>{
      this.mdl_usuario = datos[0].nombre;
    })

    this.api.asistenciaObtener(this.mdl_usuario).subscribe(res=>{
      //this.api.presentAlert(JSON.stringify(res));
      this.data = res.result;
      //this.api.presentAlert(JSON.stringify(res));
    });
    
  }

  volver() {
    this.router.navigate(['principal']);
  }

}
