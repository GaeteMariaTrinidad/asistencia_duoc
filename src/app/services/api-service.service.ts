import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*'
    })
  }

  ruta= 'https://fer-sepulveda.cl/API_PRUEBA_2/api-service.php';
  constructor(private http:HttpClient, private alertController: AlertController) { }

  personaAlmacenar(usuario: string, correo: string, contrasena:string, nombre:string, apellido:string){
    return this.http.post(this.ruta,{
      nombreFuncion: 'UsuarioAlmacenar',
      parametros: [
        usuario, correo, contrasena, nombre, apellido
      ]
    }).pipe();
  }

  personaLogin(usuario: string, contrasena: string){
    return this.http.post(this.ruta, {
      nombreFuncion: 'UsuarioLogin',
      parametros: [
        usuario, contrasena
      ]
    }).pipe();
  }

  personaModificarContrasena(usuario: string, contrasenaNueva: string, contrasenaActual: string){
    return this.http.patch(this.ruta, {
      nombreFuncion: 'UsuarioModificarContrasena',
      parametros: [
        usuario, contrasenaNueva, contrasenaActual
      ]
    }).pipe();
  }


  //funciones de API para la evaluación 3
  ruta2 = "https://fer-sepulveda.cl/API_PRUEBA_3/api-service.php";

  asistenciaAlmacenar(usuario:string,asignatura:string,seccion:string,fecha:string): Observable<any>{
    return this.http.post(this.ruta2,{
      nombreFuncion: "AsistenciaAlmacenar",
      parametros: [
        usuario,asignatura,seccion,fecha
      ]
    }).pipe();
  }

  asistenciaObtener(usuario:string): Observable<any>{
    return this.http.get(this.ruta2 + '?nombreFuncion=AsistenciaObtener&usuario=' + usuario).pipe();
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
