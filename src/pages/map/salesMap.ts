import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import { DataBaseProvider } from '../../providers/database/database';
import { MarketTabs } from '../market/market-tabs.component';
import { MarketModel } from '../../models/market-model';
import { GeolocalisationProvider } from '../../providers/database/geolocalisation';
declare const google;

@IonicPage()
@Component({
  selector: 'sales-map',
  templateUrl: 'salesMap.html',
})
export class SalesMap {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  infoWindow = new google.maps.InfoWindow();
  private marketsInMap:Array<MarketModel>=[];
  private items: Array<any>=[];
  private markers:Array<any>=[];
  private displayInMap=true;
  marketIcon  = {
    url: "",
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(32, 32),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 32)
  };
  
  toggled: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,public dataProvider: DataBaseProvider,public platform:Platform,public geolocalisationProvider:GeolocalisationProvider) {
    
  }

  ionViewDidLoad() {
    this.toggled=false;
    this.startMap();
  }
  ionViewWillEnter(){
    this.toggled=false;
    this.updateMarkers();
  }

  updateMarkers(){
    let newMakets:Array<MarketModel>=this.dataProvider.getCurrentMarkets();
    this.marketsInMap.forEach(market => {
      newMakets = newMakets.filter(item => !item.equals(market));  
    });
     if (newMakets.length > 0){
      newMakets.forEach(newMarket => {
         this.addMarker(newMarket,this.map)
         this.marketsInMap.push(newMarket);
       });
     }
  }

  startMap() {
    let algerCenter = { lat: 36.7525000, lng: 3.0419700 }
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 8,
      center: algerCenter,
      mapTypeId: 'roadmap',
      fullscreenControl:false,
      mapTypeControl:false,
      streetViewControl: false,
      zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_CENTER
    },
    });
    var longpress = false;
    let start=0;
    let end=0;
    let parent=this;
    google.maps.event.addListener(this.map,'click', function (event) {
            if (longpress){
              parent.addMarket();
            }  
        });
    google.maps.event.addListener(this.map, 'mousedown', function(event){
                start = new Date().getTime();           
            });

    google.maps.event.addListener(this.map, 'mouseup', function(event){
                let end = new Date().getTime();
                longpress = (end - start < 500) ? false : true;
            });
    let markets = this.dataProvider.getCurrentMarkets();
    this.markers=[];
    for (let i = 0; i < markets.length; i++) {
      //(markets[i].lat+" : "+markets[i].lng);
      this.addMarker(markets[i],this.map)
    }
    
    //bug connu
    new MarkerClusterer(this.map, this.markers,
      {imagePath: '../../assets/icon/m'});
    this.marketsInMap = Object.assign([], markets);
    //this.getCurrentLocation(this.map);
  }
  
  addMarket (){
    let navCtrl = this.navCtrl;
    this.geolocalisationProvider.getLocation(function(position) {
      if(position==null){
        console.log("unable de get current position");
      }
      else {
        navCtrl.push(MarketTabs,{marketPosition:position});
      }
  })
};
  
    toggleSearch() {
        this.toggled = this.toggled ? false : true;
    }

    initializeItems() {
      this.items=[];
      this.marketsInMap.forEach(market => {
        var item = {
          title:market.toString(),
          id:market.marketId
        }
        this.items.push(item);
      });
   } 
    
   triggerInput(ev: any) {
        // Reset items back to all of the items
        // set val to the value of the searchbar
        let val = ev.target.value;
        if (val.length>0){
          this.initializeItems();
          // if the value is an empty string don't filter the items
          if (val && val.trim() != '') {
            this.items = this.items.filter((item) => {
              return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
          }
        }
        else {
          this.items=[];
        }
  }
  addMarker(market:MarketModel, map) {
    this.marketIcon.url =market.marketCategory=="market" ? "../../assets/icon/market-red.png":"../../assets/icon/market-red.png";
    let marker = new google.maps.Marker({
      position: {lat: Number(market.lat), lng: Number(market.lng)},
      icon:this.marketIcon,
      map: map,
      marketId:market.marketId,
      title: market.marketName,
      address: market.marketAddress,
    });
    
    let parent = this;
    this.markers.push(marker);
    marker.addListener('click', function() {
      parent.infoWindow.close();
      var div = document.createElement('div');
      div.id="marketInfo";
      var content = '<div id="iw-container">' +
      '<div class="firstHeading">' + marker.title +'</div>' +
      '<div class="iw-content">' + marker.address +'</div></div>';
      div.innerHTML=content;
      parent.infoWindow.setContent(div);
      parent.infoWindow.open(map, marker);
      div.onclick = function(){
        parent.showMarket(marker.marketId);
      };
    });
  }
  showMarket(id){
    this.navCtrl.push(MarketTabs,{marketId:id})
  }
  showMarketsOnList(){
    this.displayInMap=false;
  }
  showMarketsOnMaps(){
    this.displayInMap=true;
  }
}