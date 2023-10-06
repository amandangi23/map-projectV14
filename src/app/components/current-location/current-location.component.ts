import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-current-location',
  templateUrl: './current-location.component.html',
  styleUrls: ['./current-location.component.css']
})
export class CurrentLocationComponent implements OnInit  {

  constructor(private mapService: MapService){}

  ngOnInit(): void {
     
  }

  UserLocation() {
    this.mapService.getUserLocation().then((location) => {
      // Mark the user's location on the map
      const userLatLng = new google.maps.LatLng(location.lat, location.lng);
      const marker = new google.maps.Marker({
        position: userLatLng,
        map: this.mapService.getMap(),
        title: 'Your Location'
      });
      this.mapService.getMap().setCenter(userLatLng);
      this.mapService.getMap().setZoom(15);
    }).catch((error) => {
      console.error('Error getting user location:', error);
    });
  }
}

