import { Component, OnInit } from '@angular/core';
import { BaseLocalService } from '../services/base-local.service';
import { APIService } from '../services/api.service';
import { EstadoConeccionService } from '../services/estado-coneccion.service';
import { SocketService } from '../services/socket.service';
import { Device } from '@ionic-native/device/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx'
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  uuid: string = 'uuid p';
  manofactura: string = 'manu p';
  modelo: string = 'modelo p';
  idUsuario: string = '';
  Latitud: string = '-1.98787';
  Longitud: string = '-78.98989';
  isConnected = false;
  isConnected2 = true;
  Estado: string = 'Transmitiendo';
  // private database: BaseLocalService,

  //   private apiser: APIService,
  //  private sock: SocketService,
  constructor(private networkService: EstadoConeccionService,
    private apiser: APIService,
    private sock: SocketService,
    private geolocation: Geolocation,
    private device: Device,
    public toastController: ToastController) { }

  ngOnInit(): void {
    this.networkService.getNetworkStatus().subscribe((connected: boolean) => {
      this.isConnected = connected;
      this.isConnected2 = !connected;
    });
    this.IniciarAplicacion();
  }

  IniciarAplicacion() {
    /*
    this.database.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.database.getUsuario().then((data) => {
          console.log('usuario:' + data);

          if (data.length == 0) {
            this.MostrarRegistro(true);
            this.cargarInformacionDispositivo();

          } else {
            this.MostrarRegistro(false);
            this.idUsuario = data[0].usuario_id;
          }

        }, (error) => {
          this.MostrarRegistro(true);
        });

      }
    });
    */
    this.MostrarRegistro(false);
    this.cargarPosicio();
    //  this.cargarInformacionDispositivo();
  }
  cargarInformacionDispositivo() {
    this.uuid = this.device.uuid;
    this.manofactura = this.device.manufacturer;
    this.modelo = this.device.model;
  }

  cargarPosicio() {
    /*
    this.geolocation.getCurrentPosition().then((resp) => {
      this.Latitud = resp.coords.latitude.toString();
      this.Longitud = resp.coords.longitude.toString();

    });
*/
let watch = this.geolocation.watchPosition();
watch.subscribe((data) => {
 // data can be a set of coordinates, or an error (if an error occurred).
 // data.coords.latitude
 // data.coords.longitude
 this.Latitud = data.coords.latitude.toString();
      this.Longitud = data.coords.longitude.toString();
});
  }

  MostrarRegistro(estado: boolean) {
    console.log('entro');
    if (estado) {
      (<HTMLDivElement>document.getElementById('divRegistro')).style.display = 'block';
      (<HTMLDivElement>document.getElementById('divEnvioInformacion')).style.display = 'none';

    } else {
      (<HTMLDivElement>document.getElementById('divRegistro')).style.display = 'none';
      (<HTMLDivElement>document.getElementById('divEnvioInformacion')).style.display = 'block';

    }

  }
  clRegistrar() {
    let datos = {
      UUID: this.uuid,
      manufacture: this.manofactura,
      model: this.modelo
    }
    console.log('datos res', datos);
    this.apiser.registrarDispositivo(datos).subscribe(
      res => {
        // console.log(res.id);
        this.idUsuario = res.id;
        this.guardarIdBaseLocal();
        console.log(this.idUsuario);
        this.MostrarRegistro(false);
      },
      err => {
        this.presentToast('Error al registrar dispositivo');
      });
  }
  guardarIdBaseLocal() {
    // this.database.getUsuario()
  }
  async presentToast(msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 5000
    });
    toast.present();
  }
}
