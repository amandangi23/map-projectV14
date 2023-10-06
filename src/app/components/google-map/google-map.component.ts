import { Component, OnInit } from '@angular/core';
declare var google: any;

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})



export class GoogleMapComponent implements OnInit  {

  
  constructor() {}

   ngOnInit(): void {
      this.initMap();
   } 

 initMap(): void {

  
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 40.7128, lng: -74.0060 },
    zoom: 10, 
    
  });
 

}
}
