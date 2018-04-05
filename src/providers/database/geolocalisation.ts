import { Injectable } from "@angular/core";
import { Platform } from "ionic-angular";
import { Geolocation } from '@ionic-native/geolocation';

@Injectable()
export class GeolocalisationProvider {
    constructor(private platform:Platform,private geolocation: Geolocation){

    }
    isInWeb(){
        return (this.platform.is('core') || this.platform.is('mobileweb'));
      }

      getLocation(callback){
          // Try HTML5 geolocation.
          if (this.isInWeb() && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){
                callback(position);
            },function(){
                callback(null);
            },{
                enableHighAccuracy: false,
                timeout: 300,
                maximumAge: 0
              });
          }
        else {
            this.geolocation.getCurrentPosition().then((position) => {
                callback(position);
            }).catch((error) => {
                callback(null);
            });
        }
        }
}
