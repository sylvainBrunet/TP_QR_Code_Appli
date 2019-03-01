import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { QrCodeProvider } from '../../providers/qr-code/qr-code';
import { HistoriqueProvider } from '../../providers/historique/historique';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
      public navCtrl: NavController,
      public qrcode: QrCodeProvider,
      public socialSharing: SocialSharing,
      public storage: HistoriqueProvider) {        

  }

    textInput: string;
    generated: string = '';

    affichageQR() {
        return this.generated !== '';
    }

    create(text) {
      if(text != null && text != ""){
        this.textInput = text;
        this.qrcode.generate(text).then(text => {
          this.generated = text
        });
        this.storage.addQRCode(text);

      }
        
    }
        
    share(image) {
      this.socialSharing.share('Body', 'Subject', image).then(() => {
      }).catch(() => {
      });
    }
}
