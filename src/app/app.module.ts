import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Tabs } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DataBaseProvider } from '../providers/database/database';
import { SQLite } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { MarketPage } from '../pages/market/market-page';
import { MarketTabs } from '../pages/market/market-tabs.component';
import { DataBaseProviderMock } from '../providers/database/data-base-mock';
import { BrMaskerModule } from 'brmasker-ionic-3';
import { GeolocalisationProvider } from '../providers/database/geolocalisation';
import { Geolocation } from '@ionic-native/geolocation';
import { Network } from '@ionic-native/network';
import { GoogleMaps } from '@ionic-native/google-maps';
import { LocationTrackerProvider } from '../providers/geolocation/location-tracker';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';


@NgModule({
  declarations: [
    MyApp,
    MarketTabs,
    MarketPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    BrMaskerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MarketTabs,
    MarketPage
  ],
  providers: [
    GoogleMaps,
    SQLite,
    //DataBaseProvider,
    Network,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide:DataBaseProvider,useClass: DataBaseProviderMock},
    Toast,
    //GeolocalisationProvider,
    Geolocation,
    LocationTrackerProvider,
    BackgroundGeolocation
  ]
})
export class AppModule {}
