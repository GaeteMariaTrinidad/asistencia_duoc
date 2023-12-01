import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-lista-asistencia',
  templateUrl: './lista-asistencia.page.html',
  styleUrls: ['./lista-asistencia.page.scss'],
})
export class ListaAsistenciaPage implements OnInit {

  mdl_usuario: string = "";
  data: any;

  constructor(private router: Router, private api: ApiServiceService) { }

  ngOnInit() {
    let parametros = this.router.getCurrentNavigation();
    if (parametros?.extras.state) {
      this.mdl_usuario = parametros?.extras.state['user'];
    }

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
