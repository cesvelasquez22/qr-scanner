import { Injectable } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { QrLog } from '../models/qr-log.model';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';

@Injectable({
  providedIn: 'root',
})
export class LocalDataService {
  qrLogs: QrLog[] = [];
  private readonly KEY_QR_LOGS = 'qrLogs';
  private readonly CSV_FILE = 'qr-logs.csv';

  constructor(
    private storage: Storage,
    private navController: NavController,
    private iab: InAppBrowser,
    private platform: Platform,
    private file: File
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

  sendHistoryEmail() {
    const csv = this.parseToCSV();
    this._createCsvFile(csv.join(''));
  }

  private parseToCSV() {
    const headers = 'Tipo, Formato, Creado en, Texto\n';
    return [
      headers,
      ...this.qrLogs.map(
        (qrLog) =>
          `${qrLog.type}, ${qrLog.format}, ${qrLog.created}, ${qrLog.text.replace(',', ' ')}\n`
      ),
    ];
  }

  private _createCsvFile(csv: string) {
    this.file.checkFile(this.file.dataDirectory, this.CSV_FILE).then(exists => {
      console.log('File exists', exists);
      return this._writeCsvFile(csv);
    }).catch(error => {
      console.log('File does not exist', error);
      return this.file.createFile(this.file.dataDirectory, this.CSV_FILE, false).then(() => {
        this._writeCsvFile(csv);
      }).catch(() => {
        console.log('Error creating file');
      });
    });
    console.log('File created', this.file.dataDirectory + this.CSV_FILE);
  }

  private async _writeCsvFile(csv: string) {
    await this.file.writeExistingFile(this.file.dataDirectory, this.CSV_FILE, csv);
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
