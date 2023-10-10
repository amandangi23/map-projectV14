import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-current-location',
  templateUrl: './current-location.component.html',
  styleUrls: ['./current-location.component.css']
})
export class CurrentLocationComponent   {
  // locationName: string | undefined;
  // userLocation: { lat: number; lng: number } | undefined;
 

  // constructor(private mapService: MapService){}


  // ngOnInit(): void {
    
  // }

    
  // getUserLocation() {
  //   if ('geolocation' in navigator) {
  //     const options = {
  //       enableHighAccuracy: true, // Request high accuracy mode
  //       timeout: 10000, // Maximum time to wait for location (in milliseconds)
  //       maximumAge: 0 // Disable cache, always get fresh location
  //     };

  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         // Handle the position data
  //         const userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

  //         // Check if a user location marker exists, and remove it if it does
  //         if (this.mapService.userLocationMarker) {
  //           this.mapService.userLocationMarker.setMap(null);
  //         }

  //         // Create a new user location marker
  //         this.mapService.userLocationMarker = new google.maps.Marker({
  //           position: userLatLng,
  //           map: this.mapService.getMap(),
  //           title: 'Your Location'
  //         });

  //         // Center the map on the user's location
  //         this.mapService.getMap().setCenter(userLatLng);
  //         this.mapService.getMap().setZoom(15);
  //       },
  //       (error) => {
  //         // Handle errors
  //         console.error('Error getting user location:', error);
  //       },
  //       options // Pass the options here
  //     );
  //   } else { 
  //     console.error('Geolocation is not supported by your browser.');
  //   }
  // }   

  
          
  
  // reverseGeocode(lat: number, lng: number) {
  //   this.mapService
  //     .reverseGeocode(lat, lng)
  //     .then((name) => {
  //       this.locationName = name;
  //     })
  //     .catch((error) => {
  //       console.error('Error reverse geocoding:', error);
  //     });
  // }

  
  
}

