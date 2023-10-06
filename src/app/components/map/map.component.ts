

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
  userLocationMarker: google.maps.Marker | undefined;

  constructor() {}

  ngOnInit(): void {
    this.mapOptions = {
      center: { lat: 0, lng: 0 }, // Initial map center
      zoom: 2, // Initial zoom level
    };
    this.initializeMap();
  }

  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 24,
    lng: 12
  };
  zoom = 4;

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = event.latLng.toJSON();
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }

  onMapReady(event: any) {
    this.map = event; 
    // Call getUserLocation to display the user's current location on the map
    this.getUserLocation();
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

  initializeMap() {
    // Initialize your map with appropriate options
    const mapOptions: google.maps.MapOptions = {
      center: { lat: 0, lng: 0 }, // Default center
      zoom: 8, // Default zoom level
    };

    // Create a new Google Map instance
    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);
  }

  getUserLocation() {

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log('User Location Latitude:', latitude);
        console.log('User Location Longitude:', longitude);

        // Create a LatLng object for the user's location
        const userLatLng = new google.maps.LatLng(latitude, longitude);

        // Center the map on the user's location
        this.map?.setCenter(userLatLng);

        // Create a marker for the user's location
        this.userLocationMarker = new google.maps.Marker({
          position: userLatLng,
          map: this.map,
          title: "Your Location",
        });

        // Optional: Adjust the map zoom level
        this.map?.setZoom(15); // Adjust the zoom level as needed
      });
    } else {
      console.error("Geolocation is not supported by your browser.");
    }
  };

  markerOptions: google.maps.MarkerOptions = {
    draggable: true, // Make the marker draggable
    title: 'Drag me!',
  };

  // ... (existing code)

  // Function to handle marker position changes
  markerPositionChanged(event: google.maps.KmlMouseEvent) {
    if (event.latLng) { 
      this.center = event.latLng.toJSON();
      this.display = event.latLng.toJSON();
    }
  }
}
