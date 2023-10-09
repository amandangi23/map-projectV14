import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MapService } from 'src/app/services/map.service';

declare var google: any;


@Component({
  selector: 'app-search-location',
  templateUrl: './search-location.component.html',
  styleUrls: ['./search-location.component.css']
})
export class SearchLocationComponent implements OnInit {
  markerTitle: string | undefined;
  searchQuery: string = ''; 

  constructor(private mapService: MapService, private ngZone: NgZone) {}
  


  ngOnInit(): void {
    this.initAutocomplete();
    this.mapService.locationNameUpdated.subscribe((locationName: string) => {
      this.searchQuery = locationName;
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
