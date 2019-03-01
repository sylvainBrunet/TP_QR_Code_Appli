import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import QRCode from 'qrcode';
import jsQR from "jsqr";
import { Camera, CameraOptions } from '@ionic-native/camera';

/*
  Generated class for the QrCodeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QrCodeProvider {

  constructor(public http: HttpClient, public camera: Camera) {
    console.log('Hello QrCodeProvider Provider');
  }

  generate(text: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      QRCode.toDataURL(text, { errorCorrectionLevel: 'H' }, function (err, url) {
        if (err) {
            reject(err);
        } else {
            resolve(url);
        }
      })
    })
  }
  async read(): Promise<string> {
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.PICTURE,
      encodingType: this.camera.EncodingType.JPEG,
      destinationType: this.camera.DestinationType.DATA_URL
    };

    const imageData = await this.camera.getPicture(options);

    let base64Image = 'data:image/jpeg;base64,' + imageData;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    return await new Promise<string>((resolve, reject) => {
      const qrCode = new Image();
      qrCode.src = base64Image;
      qrCode.onload = () => {
        try {
          canvas.width = qrCode.width;
          canvas.height = qrCode.height;
          context.drawImage(qrCode, 0, 0);
        } catch (e) {
          reject(e);
        }
        const image = context.getImageData(0, 0, canvas.width, canvas.height);
        const response = jsQR(image.data, image.width, image.height);
        if (!response) {
          reject('Pas de QR code sur cette image');
        } else {
          resolve(response.data);
        }

      };
      qrCode.onerror = () => {
        reject('Chargement impossible');
      }
    });
  }

}
