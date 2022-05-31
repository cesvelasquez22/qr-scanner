import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { QrLog } from '../models/qr-log.model';

@Injectable({
  providedIn: 'root',
})
export class LocalDataService {
  qrLogs: QrLog[] = [];
  private readonly KEY_QR_LOGS = 'qrLogs';

  constructor(private storage: Storage) {
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

    console.log(this.qrLogs);
  }
}
