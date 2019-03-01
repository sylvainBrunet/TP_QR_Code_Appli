import { HistoriqueProvider } from './../../providers/historique/historique';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{text:string, createdAt: Date}>;

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage) {
    // If we navigated to this page, we will have an item available as a nav param
    
  }
  ionViewWillEnter(){
    this.storage.get(HistoriqueProvider.HISTORY_STORAGE_KEY).then(text => {
      this.items = text
    });
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }
}
