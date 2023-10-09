import { Component, OnInit } from '@angular/core';
import { MapService } from 'src/app/services/map.service';
declare var google: any;

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})



export class GoogleMapComponent implements OnInit  {
 

  
  constructor(private mapService: MapService) {}

   ngOnInit(): void {
       this.mapService.initMap();
   };



  



    
          

}  
