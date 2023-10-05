

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-googlemap',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class GooglemapComponent implements OnInit {
  searchCountry: string = '';
  mapOptions: google.maps.MapOptions = {};
  map!: google.maps.Map | undefined;


    constructor() {}

    ngOnInit(): void {
      this.mapOptions = {
        center: { lat: 0, lng: 0 }, // Initial map center
        zoom: 2, // Initial zoom level
      };
    }


    display: any;
    center: google.maps.LatLngLiteral = {
        lat: 24,
        lng: 12
    };
    zoom = 4;
    moveMap(event: google.maps.MapMouseEvent) {
        if (event.latLng != null) this.center = (event.latLng.toJSON());
    }
    move(event: google.maps.MapMouseEvent) {
        if (event.latLng != null) this.display = event.latLng.toJSON();
    };

    onMapReady(event: any) {
      this.map = event;
    }
  
    
  
    locateCountry() {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: this.searchCountry }, (results, status) => {
        console.log('Geocoding Response:', results);
        console.log('Geocoding Status:', status);
        if (status === google.maps.GeocoderStatus.OK && results && results.length > 0) {
          const location = results[0].geometry.location;
          this.map?.setCenter(location);
          this.map?.setZoom(6); // Adjust the zoom level as needed
        } else {
          console.error('Geocoding failed or country not found');
        }
      });
    }
}