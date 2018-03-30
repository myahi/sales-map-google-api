import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Tabs } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DataBaseProvider } from '../providers/database/database';
import { SQLite } from '@ionic-native/sqlite';
//import { SQLiteMock } from '../pages/add-market/SQLiteMock';
import { Toast } from '@ionic-native/toast';

import { AddMarketPage } from '../pages/market/add-market';
import { MarketTabs } from '../pages/market/market-tabs.component';



@NgModule({
  declarations: [
    MyApp,
    MarketTabs,
    AddMarketPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MarketTabs,
    AddMarketPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
   SQLite,
    DataBaseProvider,
   // {provide: SQLite, useClass: SQLiteMock},
    Toast
  ]
})
export class AppModule {}