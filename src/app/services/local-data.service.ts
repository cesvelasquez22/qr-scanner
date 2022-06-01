import { Injectable } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { QrLog } from '../models/qr-log.model';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Injectable({
  providedIn: 'root',
})
export class LocalDataService {
  qrLogs: QrLog[] = [];
  private readonly KEY_QR_LOGS = 'qrLogs';

  constructor(
    private storage: Storage,
    private navController: NavController,
    private iab: InAppBrowser,
    private platform: Platform
  ) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this.storage = storage;
    this.loadQrLogs();
  }

  async loadQrLogs() {
    try {
      const qrLogs = await this.storage.get(this.KEY_QR_LOGS);
      this.qrLogs = qrLogs || [];
    } catch (error) {
      console.log('Error loading QR Logs', error);
    }
  }

  saveQrLog(format: string, text: string) {
    const newQrLog = new QrLog(format, text);
    this.qrLogs.unshift(newQrLog);

    this.storage.set(this.KEY_QR_LOGS, this.qrLogs);
    this.openQrLog(newQrLog);

    console.log(this.qrLogs);
  }

  openQrLog(qrLog: QrLog) {
    this.navController.navigateForward(`/tabs/tab2`);

    switch (qrLog.type) {
      case 'http':
        // Open in browser
        this.openIab(qrLog.text);
        break;

        case 'geo':
        // Open in Map
        this.navController.navigateForward(`/tabs/tab2/map/${qrLog.text}`);
        break;

      default:
        break;
    }
  }

  private openIab(url: string) {
    if (this.platform.is('ios') || this.platform.is('android')) {
      const browser = this.iab.create(url);
      browser.show();
      return;
    }

    window.open(url, '_blank');
  }
}
