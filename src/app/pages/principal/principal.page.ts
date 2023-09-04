import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  mdl_usuario: string = '';
  mdl_contrasena: string = '';
  

  constructor(private router: Router) { }

  ngOnInit() {
    let parametros = this.router.getCurrentNavigation(); // como llegamos desde el login  
    if(parametros?.extras.state) { 
    this.mdl_usuario = parametros?.extras.state ['user'];
    this.mdl_contrasena = parametros?.extras.state ['pass'];
    }
  }



}
