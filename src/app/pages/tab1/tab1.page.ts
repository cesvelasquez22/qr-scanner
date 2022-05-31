import { Component } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { LocalDataService } from 'src/app/services/local-data.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  slidesOptions = {
    allowSlidePrev: false,
    allowSlideNext: false,
  };
  constructor(
    private barcodeScanner: BarcodeScanner,
    private localDataService: LocalDataService
  ) {}

  ionViewWillEnter() {
    this.scan();
  }

  ionViewDidEnter() {
    console.log('Tab 1 ionViewDidEnter');
  }

  ionViewWillLeave() {
    console.log('Tab 1 ionViewWillLeave');
  }

  ionViewDidLeave() {
    console.log('Tab 1 ionViewDidLeave');
  }

  scan() {
    this.barcodeScanner
      .scan()
      .then((barcodeData) => {
        console.log('Barcode data', barcodeData);
        if (!barcodeData.cancelled) {
          this.localDataService.saveQrLog(barcodeData.format, barcodeData.text);
        }
      })
      .catch((err) => {
        console.log('Error', err);
        this.localDataService.saveQrLog('QRCode', 'https://ionicframework.com/');
      });
  }
}
