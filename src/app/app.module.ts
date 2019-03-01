import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { QrCodeReaderPage } from './../pages/qr-code-reader/qr-code-reader';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { QrCodeProvider } from '../providers/qr-code/qr-code';
import { HttpClientModule } from '@angular/common/http';
import { SocialSharing } from '@ionic-native/social-sharing';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';
import { HistoriqueProvider } from '../providers/historique/historique';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    QrCodeReaderPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    QrCodeReaderPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    QrCodeProvider,
    SocialSharing,
    BarcodeScanner,
    HistoriqueProvider,
    Camera

  ]
})
export class AppModule {}
