import { QrCodeProvider } from './../../providers/qr-code/qr-code';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
/**
 * Generated class for the QrCodeReaderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qr-code-reader',
  templateUrl: 'qr-code-reader.html',
})
export class QrCodeReaderPage {

  public scannedData: String;
  constructor(public navCtrl: NavController, public navParams: NavParams,private barcodeScanner: BarcodeScanner, public QrCodeProvider: QrCodeProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrCodeReaderPage');
  }
  read() {
    this.QrCodeProvider.read()
      .then((text) => {
        this.scannedData = text
      }).catch(
      
      );
  }
  scan() {
    this.barcodeScanner.scan()
      .then(barcodeData => {
        if (!barcodeData.cancelled) {
          this.scannedData = barcodeData.text;
        }
      }).catch();
  }

}
