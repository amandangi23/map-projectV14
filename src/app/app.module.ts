import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleMapsModule } from '@angular/google-maps'
import { FormsModule } from '@angular/forms';
import { SearchLocationComponent } from './components/search-location/search-location.component';
import { GoogleMapComponent } from './components/google-map/google-map.component';


@NgModule({
  declarations: [
    AppComponent, 
    SearchLocationComponent, GoogleMapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule ,
    FormsModule
  ],
  providers: [], 
  bootstrap: [AppComponent]
})
export class AppModule { }
