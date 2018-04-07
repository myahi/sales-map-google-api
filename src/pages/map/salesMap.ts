import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController} from 'ionic-angular';
import { DataBaseProvider } from '../../providers/database/database';
import { MarketTabs } from '../market/market-tabs.component';
import { MarketModel } from '../../models/market-model';
import { Network } from '@ionic-native/network';
import { GoogleMap, LatLng, GoogleMaps, GoogleMapsEvent, CameraPosition } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationTrackerProvider } from '../../providers/geolocation/location-tracker';
import { Toast } from '@ionic-native/toast';
//declare const google;

@IonicPage()
@Component({
  selector: 'sales-map',
  templateUrl: 'salesMap.html',
})
export class SalesMap {
  @ViewChild('map')
  private mapElement:ElementRef;
  private map:GoogleMap;
  private location:LatLng;
  //map: any;
  //infoWindow = new google.maps.InfoWindow();
  private marketsInMap:Array<MarketModel>=[];
  private items: Array<any>=[];
  private markers:Array<any>=[];
  private displayInMap=true;
  private isNetworkConnected=true;
  private currentPos:any;
  // marketIcon  = {
  //   url: "",
  //   // This marker is 20 pixels wide by 32 pixels high.
  //   size: new google.maps.Size(32, 32),
  //   // The origin for this image is (0, 0).
  //   origin: new google.maps.Point(0, 0),
  //   // The anchor for this image is the base of the flagpole at (0, 32).
  //   anchor: new google.maps.Point(0, 32)
  // };
  
  toggled: boolean;
  constructor(public navCtrl: NavController, public dataProvider: DataBaseProvider,public platform:Platform,private network:Network,private geoLocation: LocationTrackerProvider,private toast:Toast) {
    this.geoLocation.startTracking();
  }

  ionViewDidLoad(){
     this.toggled=false;
     let parent =this;
    
     if (this.network.type === 'wifi' || this.network.type === '3g' || this.network.type === '4g') {
       parent.isNetworkConnected=true
     }
     else {
       parent.isNetworkConnected=false
     }
    this.network.onConnect().subscribe(data =>{
      if (this.network.type === 'wifi' || this.network.type === '3g' || this.network.type === '4g') {
        parent.isNetworkConnected=true;
      //  this.startMap();
      }
      else {
        parent.isNetworkConnected=false;
      }
    }, error => console.error(error));
    
    this.network.onDisconnect().subscribe(data => {
      console.log(data);
      parent.isNetworkConnected=false;
    //  this.startMap();
    }, error => console.error(error));
    this.toggled=false;
    
    this.startMap();
    //this.dataProvider.createDatabase().then(res=>{this.startMap()});
  }
   ionViewWillEnter(){
     this.toggled=false;
     //this.initializeMap(this.currentPos);
   }
  // }

  // updateMarkers(){
  //   let newMarkets:Array<MarketModel>=this.dataProvider.getCurrentMarkets();
  //   this.marketsInMap.forEach(market => {
  //     newMarkets = newMarkets.filter(item => !item.equals(market));  
  //   });
  //    if (newMarkets.length > 0){
  //     newMarkets.forEach(newMarket => {
  //        //this.addMarker(newMarket,this.gMap)
  //        this.marketsInMap.push(newMarket);
  //      });
  //    }
  // }

   startMap() {
    if (!this.isNetworkConnected){
      var content='<p id="noConnectionAlert">No network connection to display the map</p>'+
      '<ion-thumbnail>'+
        '<img id="noConnectionIcon" src="assets/icon/no-connection.png">'+
    '</ion-thumbnail>';
    this.mapElement.nativeElement.innerHTML=content;
    }
    else {
      let currentPos=new LatLng(36.7525000,3.0419700);
      this.platform.ready().then(() => {
        this.geoLocation.getCurrentPosition().then(resp => {
            currentPos.lat = resp.coords.latitude;
            currentPos.lng = resp.coords.longitude; 
            this.initializeMap(currentPos);
          }).catch(() => {
            this.toast.show(`Unable to get your current location`, '5000', 'center').subscribe(
              toast => {
                console.log(toast);
              });
            this.initializeMap(currentPos);
          });
        });
      }
    }

    initializeMap(pos:LatLng){
        let element = this.mapElement.nativeElement;
              this.map = GoogleMaps.create(element);
              this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
                let options = {
                  target:{ lat: pos.lat, lng: pos.lng },
                  zoom: 16,
                };
                this.map.moveCamera(options);
                this.map.setMyLocationEnabled(true);
                this.map.setMyLocationButtonEnabled(true);
              });
    }
      //   else {
//     this.platform.ready().then(() => {
//       let element = this.mapElement.nativeElement;
//       this.map = GoogleMaps.create(element);
//       this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
//         let options = {
//           target: this.location,
//           zoom: 8,
//         };
//         this.map.moveCamera(options);
//         this.map.setMyLocationButtonEnabled(true);
//         //setTimeout(() => {this.addMarker()}, 2000);
//         //setTimeout(() => {this.addCluster()}, 500);
//       });
//     });
//   }
// }
  //let markets = this.dataProvider.getCurrentMarkets();
        //this.markers=[];
        // for (let i = 0; i < markets.length; i++) {
        //   //(markets[i].lat+" : "+markets[i].lng);
        //   this.addMarker(markets[i]);
        // }
        // this.marketsInMap = Object.assign([], markets);
        //setTimeout(() => {this.addMarker()}, 2000);
        //setTimeout(() => {this.addCluster()}, 500);
    //let algerCenter = { lat: 36.7525000, lng: 3.0419700 }
    // this.map = new google.maps.Map(this.mapElement.nativeElement, {
    //   zoom: 8,
    //   center: algerCenter,
    //   mapTypeId: 'roadmap',
    //   fullscreenControl:false,
    //   mapTypeControl:false,
    //   streetViewControl: false,
    //   zoomControlOptions: {
    //     position: google.maps.ControlPosition.LEFT_CENTER
    // }
    // });
    // var longpress = false;
    // let start=0;
    // let end=0;
    // google.maps.event.addListener(this.map,'click', function (event) {
    //         if (longpress){
    //           parent.addMarket();
    //         }  
    //     });
    // google.maps.event.addListener(this.map, 'mousedown', function(event){
    //             start = new Date().getTime();           
    //         });

    // google.maps.event.addListener(this.map, 'mouseup', function(event){
    //             let end = new Date().getTime();
    //             longpress = (end - start < 500) ? false : true;
    //         });
    
    
    //bug connu
    // new MarkerClusterer(this.map, this.markers,
    //   {imagePath: '../../assets/icon/m'});
    
    //this.getCurrentLocation(this.map);
  //this.getCurrentLocation();
  
  // getCurrentLocation(map){
  //   let parent=this;
  //   this.geolocalisationProvider.getLocation(function(position) {
  //     if (position!=null){
  //       let location = new LatLng(position.coords.lat, position.coords.lng);
  //       alert(position.coords.lat +":" +position.coords.lng);
  //     let options = {
  //       target: location,
  //       zoom: 16
  //     };
  //     map.moveCamera(options);
  //     }
  //     else {
  //       alert("no position found");
  //     }
  //   //parent.map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
  // });
  // }
  addMarket (){
    let navCtrl = this.navCtrl;
    //this.geolocalisationProvider.getLocation(function(position) {
  //     if(position==null){
  //       console.log("unable de get current position");
  //     }
  //     else {
  //       navCtrl.push(MarketTabs,{marketPosition:position});
  //     }
  // })
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
  // addMarker(market:MarketModel) {
  //   this.map.addMarker({
  //     title: 'My Marker',
  //     icon: 'blue',
  //     animation: 'DROP',
  //     position: {
  //       lat: this.location.lat,
  //       lng: this.location.lng
  //     }
  //   })
  //   .then(marker => {
  //     marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
  //       alert('Marker Clicked');
  //     });
  //   });
    // this.marketIcon.url =market.marketCategory=="market" ? "assets/icon/market-red.png":"assets/icon/market-red.png";
    // let marker = new google.maps.Marker({
    //   position: {lat: Number(market.lat), lng: Number(market.lng)},
    //   icon:this.marketIcon,
    //   map: map,
    //   marketId:market.marketId,
    //   title: market.marketName,
    //   address: market.marketAddress,
    // });
    
    // let parent = this;
    // this.markers.push(marker);
    // marker.addListener('click', function() {
    //   parent.infoWindow.close();
    //   var div = document.createElement('div');
    //   div.id="marketInfo";
    //   var content = '<div id="iw-container">' +
    //   '<div class="firstHeading">' + marker.title +'</div>' +
    //   '<div class="iw-content">' + marker.address +'</div></div>';
    //   div.innerHTML=content;
    //   parent.infoWindow.setContent(div);
    //   parent.infoWindow.open(map, marker);
    //   div.onclick = function(){
    //     parent.showMarket(marker.marketId);
    //   };
    // });
  //}
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