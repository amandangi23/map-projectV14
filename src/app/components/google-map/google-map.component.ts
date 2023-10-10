import { Component, OnInit, NgZone, Renderer2, ElementRef } from '@angular/core';
import { MapService } from 'src/app/services/map.service';
declare var google: any;

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})



export class GoogleMapComponent implements OnInit  {
  locationName: string | undefined;
  userLocation: { lat: number; lng: number } | undefined;

  markerTitle: string | undefined;
  searchQuery: string = '';

  
  constructor(private mapService: MapService, private ngZone: NgZone, private renderer: Renderer2, private el: ElementRef) {}

   ngOnInit(): void {
       this.mapService.initMap();
       this.initAutocomplete();
    this.mapService.locationNameUpdated.subscribe((locationName: string) => {
      this.searchQuery = locationName;
    });

    const searchInput = this.el.nativeElement.querySelector('#searchInput');

    // Add event listeners for input focus and blur
    this.renderer.listen(searchInput, 'focus', () => {
      this.renderer.addClass(this.el.nativeElement.querySelector('.map-container'), 'faded');
    });

    this.renderer.listen(searchInput, 'blur', () => {
      this.renderer.removeClass(this.el.nativeElement.querySelector('.map-container'), 'faded');
    });
  
   };

   getUserLocation() {
    if ('geolocation' in navigator) {
      const options = {
        enableHighAccuracy: true, // Request high accuracy mode
        timeout: 10000, // Maximum time to wait for location (in milliseconds)
        maximumAge: 0 // Disable cache, always get fresh location
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Handle the position data
          const userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

          // Check if a user location marker exists, and remove it if it does
          if (this.mapService.userLocationMarker) {
            this.mapService.userLocationMarker.setMap(null);
          }

          // Create a new user location marker
          this.mapService.userLocationMarker = new google.maps.Marker({
            position: userLatLng,
            map: this.mapService.getMap(),
            title: 'Your Location'
          });

          // Center the map on the user's location
          this.mapService.getMap().setCenter(userLatLng);
          this.mapService.getMap().setZoom(15);
        },
        (error) => {
          // Handle errors
          console.error('Error getting user location:', error);
        },
        options // Pass the options here
      );
    } else { 
      console.error('Geolocation is not supported by your browser.');
    }
  }   

  
          
  
  reverseGeocode(lat: number, lng: number) {
    this.mapService
      .reverseGeocode(lat, lng)
      .then((name) => {
        this.locationName = name;
      })
      .catch((error) => {
        console.error('Error reverse geocoding:', error);
      });
  }

  
  search() {
    if (!this.searchQuery) {
      // Display an error message or provide user feedback here
      console.log('Invalid location. Please enter a valid location.');
      alert('Please enter a valid location.');
      return; 
    }
  
    if (this.searchQuery) {
      this.mapService.searchLocation(this.searchQuery).subscribe((results: any) => {
        if (results && results.length > 0) {
          const suggestion = results[0]; 
          // console.log('Selected Suggestion:', suggestion);
  
          if (suggestion.place_id) {
            this.mapService.getPlaceDetails(suggestion.place_id).subscribe((placeDetails: any) => {
              if (placeDetails.geometry && placeDetails.geometry.location) {
                const lat = placeDetails.geometry.location.lat();
                const lng = placeDetails.geometry.location.lng();
                const locationName = suggestion.description;
  
                this.mapService.addMarker({ lat, lng }, suggestion.description);
                this.markerTitle = this.mapService.getTitle();
  
                console.log(`Selected Location: ${locationName}  - Lat: ${lat}, Lng: ${lng}`); 
              } else {  
                console.error('Selected suggestion does not have a valid location.');
              }
              
             

              
              
            });
          } else {
            console.error('Selected suggestion does not have a place_id.');
          }
        }
      });
    }; 
  }
  
  initAutocomplete() {
    const input = document.getElementById('searchInput') as HTMLInputElement;
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
      });
    });

    this.mapService.locationNameUpdated.subscribe((locationName: string) => {
      this.searchQuery = locationName;
    }); 
    
  };


    
          

}  
