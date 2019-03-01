import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QrCodeReaderPage } from './qr-code-reader';

@NgModule({
  declarations: [
    QrCodeReaderPage,
  ],
  imports: [
    IonicPageModule.forChild(QrCodeReaderPage),
  ],
})
export class QrCodeReaderPageModule {}
