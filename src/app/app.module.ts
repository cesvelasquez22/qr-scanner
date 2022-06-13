import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Storage
import { IonicStorageModule } from '@ionic/storage-angular';

// In App Browser
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

// Plugins
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    File,
    BarcodeScanner,
    InAppBrowser,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
