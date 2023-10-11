import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleMapsModule } from '@angular/google-maps'
import { FormsModule } from '@angular/forms';
import { SearchLocationComponent } from './components/search-location/search-location.component';
import { GoogleMapComponent } from './components/google-map/google-map.component';
import { CurrentLocationComponent } from './components/current-location/current-location.component';


@NgModule({
  declarations: [
    AppComponent, 
    SearchLocationComponent, GoogleMapComponent, CurrentLocationComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule ,
    FormsModule,
    HttpClientModule
   
  ],
  providers: [], 
  bootstrap: [AppComponent]
})
export class AppModule { }
