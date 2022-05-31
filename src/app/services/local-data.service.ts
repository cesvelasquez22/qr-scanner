import { Injectable } from '@angular/core';
import { QrLog } from '../models/qr-log.model';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {
  qrLogs: QrLog[] = [];

  constructor() { }

  saveQrLog(format: string, text: string) {
    const newQrLog = new QrLog(format, text);
    this.qrLogs.unshift(newQrLog);

    console.log(this.qrLogs);
  }
}
