import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {Device} from '@ionic-native/device/ngx';
import {Network} from '@ionic-native/network/ngx';
import {SQLite} from '@ionic-native/sqlite/ngx';
import {SQLitePorter} from '@ionic-native/sqlite-porter/ngx';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import { HttpClientModule } from '@angular/common/http';
import {BaseLocalService} from '../app/services/base-local.service';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [HttpClientModule,BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    Geolocation,
    SQLite,
    SQLitePorter,
    Network,
    Device,
    StatusBar,
    BaseLocalService,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
