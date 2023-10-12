import { Component, OnInit, NgZone, Renderer2, ElementRef, AfterContentInit,ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MapService } from 'src/app/services/map.service';
declare var google: any;

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})

export class GoogleMapComponent implements AfterContentInit, OnInit, OnDestroy{
  map: google.maps.Map;
  subscription:Subscription;
  @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement>;
  private autocomplete: google.maps.places.Autocomplete;
  public searchAddress: string = '';
  private marker: google.maps.Marker;
  private infoWindow: google.maps.InfoWindow;

constructor(private mapService: MapService, private el: ElementRef, private ngZone: NgZone){}

ngOnInit(): void {
  // this.mapService.initializeMap(this.el.nativeElement.querySelector('#map'));
  this.marker = this.mapService.getMarker();
  this.initAutocomplete();

 this.subscription =  this.mapService.locationNameUpdated.subscribe((locationName: string) => {
          // console.log(locationName);
          this.searchAddress = locationName;
        });

    // Create infoWindow with a custom content
    this.infoWindow = new google.maps.InfoWindow({
      content: `
      <div> 
      <div class="text-primary fw-bold mb-2" style="font-size: 17px">Your laundry will be picked-up here</div> 
      <div class="text-muted">Please move the map to adjust your location</div>
       </div>
      `
    })

}

ngAfterContentInit(): void {
  this.mapService.initializeMap(this.el.nativeElement.querySelector('#map'));
  this.map = this.mapService.getMap();
  this.marker = this.mapService.getMarker();
}


onCurrentLocationClick(): void {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      this.mapService.setMapCenter(userLocation.lat, userLocation.lng);
      this.infoWindow.open(this.map, this.marker);
    });
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}

searchPlaces(query: string): void {
  const placesService = this.mapService.getPlacesService();

  const request = {
    query: query,
    fields: ['name', 'geometry']
  };

  placesService.findPlaceFromQuery(request, (results, status) => {
    if (status === 'OK' && results && results[0].geometry) {
      const location = results[0].geometry.location;
      this.mapService.setMapCenter(location.lat(), location.lng());
    } else {
      console.error('Error searching for places:', status);
    }
  });
}

private initAutocomplete(): void {
  this.autocomplete = new google.maps.places.Autocomplete(
    document.getElementById('searchInput') as HTMLInputElement,
    {
      types: ['geocode'] // Specify the type of place data to return
    }
  );

  this.autocomplete.addListener('place_changed', () => {
    this.ngZone.run(() => {
      const place: google.maps.places.PlaceResult = this.autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        // Handle the selected place here
        console.log(place);
        const location = place.geometry.location;
        this.mapService.setMapCenter(location.lat(), location.lng());
        this.infoWindow.open(this.map, this.marker);
      } else {
        console.error('Invalid place selected:', place);
      }
    });
  });
}

onSearchInputClick(): void {
  // Clear the input field when clicked
  this.searchAddress = '';
}


ngOnDestroy(): void {
  this.subscription.unsubscribe();
}

}
