import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  constructor() {}

  ionViewDidEnter() {
    console.log('Tab 1 ionViewDidEnter');
  }

  ionViewWillLeave() {
    console.log('Tab 1 ionViewWillLeave');
  }

  ionViewDidLeave() {
    console.log('Tab 1 ionViewDidLeave');
  }
}
