import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the HistoriqueProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HistoriqueProvider {

  private listeQR : Array<{text:string, createdAt: Date}> = [];
  public change: EventEmitter<any[]> = new EventEmitter();
  static HISTORY_STORAGE_KEY: string = 'keystorage';

  constructor(public http: HttpClient, public storage:Storage) {
    console.log('Hello HistoriqueProvider Provider');
    this.init();
  }

  addQRCode(text: string) {
    this.listeQR.push({
        text,
        createdAt: new Date()
    });
    this.save();
    this.change.emit(this.listeQR);
    /*this.qrcodes.set(new Date().toISOString(), qrcode);
    this.storage.set('user_qrcodes', this.qrcodes);
    this.change.emit(Array.from(this.qrcodes.values()));
    console.log(this.storage.get('user_qrcodes'));*/
}
save() {
    return this.storage.set(HistoriqueProvider.HISTORY_STORAGE_KEY, this.listeQR);
}

private async init() {
    try {
        this.listeQR = await this.storage.get(HistoriqueProvider.HISTORY_STORAGE_KEY) || [];
        console.log(this.listeQR);
        this.change.emit(this.listeQR);
    } catch (err) {
    }
}

public load() {
    this.change.emit(this.listeQR);
}

public getHisto(){
  return this.storage.get(HistoriqueProvider.HISTORY_STORAGE_KEY);
}


}
