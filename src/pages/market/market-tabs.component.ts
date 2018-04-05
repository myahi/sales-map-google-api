import { Component, ViewChild, NgModule } from '@angular/core';
import { Platform, Tabs, NavParams, NavController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MarketPage } from './market-page';
import { SalesMap } from '../map/salesMap';

@Component({
  selector: 'tabs-root',
  templateUrl: 'market-tabs.html'
})
export class MarketTabs {
  @ViewChild('myTabs') tabRef: Tabs;
  imports: [
    MarketPage
  ]
  tab1Root=MarketPage;
  navigationData :any;

  constructor(public navCtrl: NavController,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public navParams: NavParams) { 
    this.navigationData = {
      marketId: this.navParams.get('marketId'),
      marketPosition: this.navParams.get('marketPosition'),
      navCtrl:this.navCtrl
    };
  }
}