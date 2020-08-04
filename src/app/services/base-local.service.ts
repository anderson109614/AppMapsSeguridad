import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';


import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';

import { BehaviorSubject, Observable } from 'rxjs';

import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BaseLocalService {

/*para usar
 this.database.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.database.getUsuarioLog().then((data) => {
          this.msjConsola('cont:' + data);

          if (data == 0) {
            this.MostrarLogin();
          } else {
            this.cargarUsuarioBD();

          }

        }, (error) => {
          this.msjConsola(error);
          this.database.GuardarError('c007::' + error);
          this.MostrarLogin();
        });

      }
    });*/


  private database: SQLiteObject;
  private dbReady = new BehaviorSubject<boolean>(false);

  constructor(public toastController: ToastController,
     private plt: Platform, 
     private sqlitePorter: SQLitePorter,
      private sqlite: SQLite,
       private http: HttpClient) {

    this.plt.ready().then(() => {

      this.sqlite.create({ name: "LocaMaps001.db", location: "default" }).then((db: SQLiteObject) => {
        this.database = db;

        this.crearBaseDeDatos();
      }).catch((error) => {
        console.log(error);
      })
    });



  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }
  crearBaseDeDatos() {
    this.http.get('assets/base.sql', { responseType: 'text' })
      .subscribe(sql => {
        this.sqlitePorter.importSqlToDb(this.database, sql)
          .then(_ => {

            this.dbReady.next(true);
          })
          .catch(e => console.error(e));
      });
  }

  añaddirUsuarrioLog(usr) {

    let data = [usr.usuario_id,
    usr.usuario_nombre,
    usr.usuario_password,
    usr.usuario_nc,
    usr.usuario_identificacion,
    usr.usuario_intentos,
    usr.idZona.substring(1, usr.idZona.length - 1),
    usr.secciones.substring(1, usr.secciones.length - 1),
      'LOG'];
    //this.eliminarUSR(usr.usuario_id.toString());
    return this.database.executeSql('INSERT INTO Usuarios2  VALUES (?, ?, ?,?,?,?, ?, ?,?)', data).then(data => {

    });
  }
  GuardarUsuario(id:string) {

    let data = [id];
    //this.eliminarUSR(usr.usuario_id.toString());
    return this.database.executeSql('INSERT INTO Usuarios  VALUES (?)', data).then(data => {

    });
  }

  actualizarUSR(id: string) {
    return this.database.executeSql('UPDATE Usuarios2 SET est = ?  WHERE usuario_id=?;', ['LOG', id]).then(data => {

    });
  }
  
  eliminarEstados() {
    return this.database.executeSql('DELETE FROM Estado; ', []).then(data => {

    });
  }
  getUsuario() {
    //let query = 'SELECT * FROM Paquetes WHERE zona=?;';
    let query = 'SELECT * FROM Usuarios';
    return this.database.executeSql(query, []).then(data => {
      let lisusr = [];
      
      if (data.rows.length > 0) {

        for (var i = 0; i < data.rows.length; i++) {
          let usr = {
            usuario_id: data.rows.item(i).usuario_id,
           
          }
          lisusr.push(usr);
        }
      }
      return lisusr;
    });
  }




}
