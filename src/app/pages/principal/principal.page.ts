import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { ApiServiceService } from 'src/app/services/api-service.service';

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
  
//variables para el scanner del QR
  isSupported = false;
  barcodes: Barcode[] = [];

  constructor(private router: Router, private db: DbService, private api:ApiServiceService) { }

  ngOnInit() {
    let parametros = this.router.getCurrentNavigation(); // como llegamos desde el login  
    if(parametros?.extras.state) { 
    this.mdl_usuario = parametros?.extras.state ['user'];
    this.mdl_contrasena = parametros?.extras.state ['pass'];
    }

    //this.infoUsuario();
    this.db.fetchUsuario().subscribe(datos=>{
      this.correo = datos[0].correo;
      this.nombre = datos[0].nombre;
      this.mdl_usuario = datos[0].usuario;
      this.apellido = datos[0].apellido;
      this.mdl_contrasena = datos[0].contrasena;
    })

    //verifica si el barcoder scanner es soportado en el dispositivo movil donde se ejecuta la app
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  infoUsuario(){
    this.db.infoUsuario(this.mdl_usuario, this.mdl_contrasena)
    .then(data => {
      this.correo = data.correo;
      this.nombre = data.nombre;
      this.apellido = data.apellido;
    })
  }

  navegar() {
    this.router.navigate(['login']);
  }

  
  
  irPrincipal(){
    this.router.navigate(['principal']);
  }

  irCamara(){
    this.router.navigate(['camara']);
  }

  navegarCambiarContrasena(){
    
    this.router.navigate(['restablecer']);
  }

  asistencia(){
    
    this.router.navigate(['lista-asistencia']);
  }
//funciones del scanner QR
async scan(): Promise<void> {
  const ress = await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();

  if (!ress.available) {
    await BarcodeScanner.installGoogleBarcodeScannerModule()
  }

  const granted = await this.requestPermissions();
  if (!granted) {
    this.db.presentAlert("Please grant camera permission to use the barcode scanner.");
    return;
  }
  const { barcodes } = await BarcodeScanner.scan();
  this.barcodes.push(...barcodes);
  //this.db.presentAlert("Tipo Scan: "+ this.barcodes[0].format + " Scaneado: " + this.barcodes[0].rawValue);
  //obtenemos y separamos todo el texto que viene en el QR y que cada palabra en este caso esta separada por el simbolo | 
  //se debe ver lo que devuelve el QR por si acaso este simbolo cambia
  let palabras: string[] = this.barcodes[0].rawValue.split("|");
  //obtenemos el nombre de usuario que esta logueado
  let usuario = this.mdl_usuario;
  //obtenemos del arreglo anterior los datos que necesitamos para registrar asistencia, manejando las posiciones que v imos cuando obtuvimos el texto completo scaneado
  let fecha = palabras[3].trim();
  //debemos separar sección que esta junto con el codigo de asignatura
  let completo: string[] = palabras[0].split("-")
  let asignatura = completo[0].trim();
  let seccion = completo[1].trim();
  //this.db.presentAlert("Usuario: " + usuario + "  Asignatura: " + asignatura + "  Seccion: " + seccion + "  Fecha: " + fecha);
  this.api.asistenciaAlmacenar(usuario,asignatura,seccion,fecha).subscribe(res=>{
    //this.db.presentAlert("Respuesta: " + res);
    
    this.db.presentAlert("Respuesta f: " + JSON.stringify(res));
  });
  //this.db.presentAlert("Asistencia Realizada");
}

async requestPermissions(): Promise<boolean> {
  const { camera } = await BarcodeScanner.requestPermissions();
  return camera === 'granted' || camera === 'limited';
}


}
