import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private sqlite: SQLite) { 
    this.crearTablas();
   }

   crearTablas() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('create table if not exists persona (usuario varchar(30), contrasena varchar(30), correo varchar(75), nombre varchar(30), apellido varchar(30))', [])
          .then(() => console.log('TAGD: TABLA PERSONA CREADA CORRECTAMENTE'))
          .catch(e => console.log('TAGD: ERROR AL CREAR TABLA PERSONA: ' + JSON.stringify(e) ));
      })
      .catch(e => console.log('TAGD: ERROR AL CREAR O ABRIR BD'));
   }

   almacenarUsuario(usuario: string, contrasena: string, correo: string, nombre: string, apellido: string){
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('insert into persona values(?,?,?,?,?)', [usuario, contrasena, correo, nombre, apellido])
          .then(() => console.log('TAGD: PERSONA ALMACENADA OK'))
          .catch(e => console.log('TAGD: ERROR AL ALMACENAR PERSONA: ' + JSON.stringify(e) ));
      })
      .catch(e => console.log('TAGD: ERROR AL CREAR O ABRIR BD'));

   }
}
