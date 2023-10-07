import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private map: google.maps.Map ;
  private autocompleteService: google.maps.places.AutocompleteService;
  private marker: google.maps.Marker | undefined;
  locationNameUpdated: EventEmitter<string> = new EventEmitter<string>();


  constructor() {
    this.autocompleteService = new google.maps.places.AutocompleteService();

  }

  initMap(): void { 
    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: {
        lat: 20.5937, // Default center latitude for India
        lng: 78.9629, // Default center longitude for India
      }, 
      zoom: 4, 
    }); 
  }

  getMap(): google.maps.Map | undefined {
    return this.map;
  }

  getUserLocation(): Promise<{ lat: number; lng: number }> {
    return new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            resolve({ lat: latitude, lng: longitude });
          },
          (error) => { 
            reject(error);
          }
        ); 
      } else {
        reject('Geolocation is not supported by your browser.');
      }
    });
  }


  searchLocation(query: string) {
    return new Observable((observer) => {
      this.autocompleteService.getPlacePredictions(
        {
          input: query,
          types: ['geocode'], // You can adjust the types if needed
        },
        (results: google.maps.places.AutocompletePrediction[] | null) => {
          if (results) {
            observer.next(results);
            observer.complete();
          } else {
            observer.error('No results found');
          }
        }
      );
    });
  }
  
  setMapLocation(lat: number, lng: number) {
    if (this.map) {
      const location = new google.maps.LatLng(lat, lng);
  
      // Clear previous markers if any
      if (this.marker) {
        this.marker.setMap(null);
      }
  
      // Add a new marker
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Selected Location',
      });
  
      // Center the map on the selected location
      this.map.setCenter(location);
      this.map.setZoom(15);
    }
  }
  
  getTitle(): string | undefined {
    if (this.marker) {
      return this.marker.getTitle();
    }
    return undefined;
  }


  updateLocationName(name: string) {
    this.locationNameUpdated.emit(name);
  }

  addMarker(location: { lat: number; lng: number }, title: string): void {
    if (this.map) {
      if (this.marker) {
        this.marker.setMap(null); // Remove existing marker
      }
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: title,
        draggable: true, // Make the marker draggable
      }); 

      this.marker.addListener('dragend', () => {
        // Emit the location name when the marker is dragged
        this.updateLocationName(this.marker.getTitle());
      });

      // Center the map on the selected location
      this.map.setCenter(location);
      this.map.setZoom(15);

      this.updateLocationName(title);

      // Add a dragend event listener to update the marker's position
      this.marker.addListener('dragend', () => {
        const newPosition = this.marker.getPosition();
        if (newPosition) {
          const newLat = newPosition.lat();
          const newLng = newPosition.lng();
          

          console.log(`Marker Dragged to Lat: ${newLat}, Lng: ${newLng}`);
          // You can update the marker's position as needed here
        }
      });
    }
  }


  getPlaceDetails(placeId: string): Observable<any> {
    return new Observable((observer) => {
      const service = new google.maps.places.PlacesService(this.map);

      service.getDetails(
        {
          placeId: placeId,
        },
        (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            observer.next(place);
            observer.complete();
          } else {
            observer.error('Error fetching place details');
          }
        }
      ); 
    }); 
  }
}