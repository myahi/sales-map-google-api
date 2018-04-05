import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { DataBaseProvider } from '../../providers/database/database';
import { Toast } from '@ionic-native/toast';
import { MarketModel } from '../../models/market-model';
import { MarketTabs } from './market-tabs.component';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'market-page',
  templateUrl: 'market-page.html',
})

export class MarketPage {
  marketPosition:Position;
  marketId:string;
  parentCtrl:NavController;
  marketForm : FormGroup;
  marketData = { "marketName": "", "marketCategory":"", "marketAddress":"","marketPhone":"","lat":"", "lng": ""};
  constructor(public navCtrl: NavController, public navParams: NavParams, public dataBaseProvider: DataBaseProvider,private toast: Toast) {
    this.marketId = this.navParams.get('marketId');
    this.marketPosition = this.navParams.get('marketPosition');
    this.parentCtrl = this.navParams.get('navCtrl');
    if (this.marketId!=null){
      this.getMarket(this.marketId);
    }
  }
  ngOnInit() {
    this.marketForm = new FormGroup({
      marketName: new FormControl('', [Validators.required,Validators.minLength(4), Validators.maxLength(30)]),
      marketCategory: new FormControl('', [Validators.required,Validators.minLength(6), Validators.maxLength(12)]),
      emptyConrole: new FormControl(''),
      emptyPhone: new FormControl('')
    });
}

  goHome(){
    this.parentCtrl.popToRoot();
  }
  addMarket(){
  let newMarket = new MarketModel(this.dataBaseProvider.getCurrentMarkets().length + 1,
  this.marketData.marketName,this.marketData.marketCategory,this.marketData.marketAddress,String(this.marketPosition.coords.latitude),String(this.marketPosition.coords.longitude),this.marketData.marketPhone);
  this.dataBaseProvider.addMarket(newMarket).then(
      (res) => {
        this.navCtrl.popToRoot();
        // this.toast.show('Data saved', '5000', 'center').subscribe(
        //   toast => {
        //     this.navCtrl.popToRoot();
        //   }
        // );
      });
  }
  getMarket(rowid){
    this.dataBaseProvider.getMarket(rowid).then(
      res => {
          this.marketData.marketName = res.marketName;
          this.marketData.marketAddress = res.marketAddress;
          this.marketData.marketCategory = res.marketCategory;
          this.marketData.marketPhone = res.marketPhone;
          this.marketData.lat = res.lat;
          this.marketData.lng = res.lng;
          });
  }
  public updateMarket(){
    alert("test");
  }
}