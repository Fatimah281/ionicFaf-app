import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  @ViewChild('map') mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  center: any = {
    lat: 21.4504684,
    lng: 39.7716504,
  };
  markerId: string;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.createMap();
  
  }
  
    async createMap() {
     try {
      this.newMap = await GoogleMap.create({
        id: 'my-cool-map',
        element: this.mapRef.nativeElement,
        apiKey: environment.apiKey,
        config: {
          center: this.center,
          zoom: 13,
        },
      });
      this.addMarker(this.center.lat, this.center.lng);
  
     } catch (e) {
      console.log(e);
      
     }
    }
  
  
    async addMarker(lat,lng) {
      this.markerId = await this.newMap.addMarker({
        coordinate:{
          lat: lat,
          lng: lng,
        },
        draggable: true
      });
    }
  
    async removeMarker(id?) {
    await this.newMap.removeMarker(id ? id : this.markerId);
    }
  
    backToHome(){
      this.router.navigate(['home']);

    }
  
}
