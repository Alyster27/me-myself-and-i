import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl' //* import everything as=in mapboxgl;
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  private accessToken: string = environment.mapbox.accessToken;
  public map: mapboxgl.Map;
  private style = 'mapbox://styles/mapbox/streets-v11';
  private zoom = 13;
  private lat = 46.217250;
  private lng = 6.114000;

  constructor() { }

  async ngOnInit(): Promise<any> {
    //log my property environment.mapbox.accessToken (put all the chaine)
    console.log(this.accessToken);

    //my mapboxgl who as a type of map have an access wich is equal than environment.mapbox.accessToken create in environment
    (mapboxgl as typeof mapboxgl).accessToken = this.accessToken
    this.map = await new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng,this.lat]
    });

    //Fix the bug of the map
    setTimeout(() =>{
      this.map.resize();
    }, 100);

    // Add zoom and rotation controls to the map.
    this.map.addControl(new mapboxgl.NavigationControl());

    //Add full screen control to the map
    this.map.addControl(new mapboxgl.FullscreenControl());

    // Add geolocate control to the map.
    this.map.addControl(
      new mapboxgl.GeolocateControl({
      positionOptions: {
      enableHighAccuracy: true
      },
      trackUserLocation: true
      }));

      this.map.addControl(
        new MapboxDirections({
        accessToken: mapboxgl.accessToken
        }),
        'top-left'
        ) 
  
  }

}
