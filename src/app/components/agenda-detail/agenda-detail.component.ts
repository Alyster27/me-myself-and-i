import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';

import { Subscription } from 'rxjs';
import { MyAgendaService } from 'src/app/services/my-agenda/my-agenda.service';
import { IAgenda } from '../modal/agenda';
import { MyContactsService } from 'src/app/services/my-contacts/my-contacts.service';

import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl' //* import everything as=in mapboxgl;
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { IContact } from '../modal/contacts';

@Component({
  selector: 'app-agenda-detail',
  templateUrl: './agenda-detail.component.html',
  styleUrls: ['./agenda-detail.component.scss']
})
export class AgendaDetailComponent implements OnInit {
  private currentId: string
  public agendaDetail: AngularFirestoreDocument<IAgenda>
  public contactDetail: any
  public agenda: any
  public contact: IContact
  private sub: Subscription

  private contactName:string = ''

  private accessToken: string = environment.mapbox.accessToken;
  public map: mapboxgl.Map
  private style = 'mapbox://styles/mapbox/streets-v11'
  private zoom = 10;
  private lat = 46.217250;
  private lng = 6.114000;
  private unit: string = 'metric'
  private language: string = 'fr'
  private dir : [] = []
  private address : string = ''

  constructor(
    private route: ActivatedRoute,
    private agendaService: MyAgendaService,
    private contactService: MyContactsService,
    private _httpClient: HttpClient,
  ) { 
   
  }

  async ngOnInit() {
    console.log('OnInit')
    this.currentId = this.route.snapshot.paramMap.get('id')
   /*  console.log(this.currentId); */
    
    this.agendaDetail = await this.agendaService.getEventById(this.currentId)

    this.sub = this.agendaDetail.valueChanges().subscribe(data => {
      this.agenda = data
     /*  console.log('contact name --> ', data.contactName); */
      //get contact name of the current event
      this.contactName = data.contactName
      //if contact name isn't null
      if(this.contactName != null){
        //call method getContactDetail with param => contactName   
        this.sub.unsubscribe()
        this.getContactDetail(this.contactName.toString())
      }
    });

    //log my property environment.mapbox.accessToken (put all the chaine)
    /* console.log(this.accessToken); */

    //my mapboxgl who as a type of map have an access wich is equal than environment.mapbox.accessToken create in environment
    await this.getMap()
    
    //Geolocation
    this.geolocation()

    //Time to display direction of my location and the address of contact
    setTimeout(() => {
      this.direction();
    }, 2000);
  }
  
  async getMap(){
    console.log('Method getmap');

    (mapboxgl as typeof mapboxgl).accessToken = this.accessToken

    this.map = await new mapboxgl.Map({
      container: 'map-agenda',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng,this.lat]
    });

    //Add full screen control to the map
    this.map.addControl(new mapboxgl.FullscreenControl());
 
    //Fix the bug of the map
    setTimeout(() =>{
      this.map.resize();
      console.log('resize');
    }, 100);
  }

  geolocation(){
    let geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
      enableHighAccuracy: false
    },
      trackUserLocation: false
    });
    // Add the control to the map.
    this.map.addControl(geolocate)
    
    this.map.on('load', function() {
      geolocate.trigger()
    });
    
    geolocate.on('geolocate', (e) => {
      this.lng = e.coords.longitude;
      this.lat = e.coords.latitude

      /* console.log('get current position lat lon ', this.lng, ' <--> ', this.lat); */
    }).off();
  }

  direction(){
    let direction = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: this.unit,
      language: this.language,
    })

    this.map.addControl(direction,'top-left');
    
    /* console.log('log position 3 ', this.lng, ' <--> ', this.lat); */
    
    direction.setOrigin([this.lng, this.lat])// départ 
    /* direction.setDestination([6.22372,46.18718]); */ // destination
    direction.setDestination(this.dir); // destination
  }

  async getContactDetail(contact: string){
    //assign contact detail with return contactByName
    this.contactDetail = await this.contactService.getContactByName(contact)

    this.sub = this.contactDetail.valueChanges().subscribe(data => {
      //assign to contact the value of data
      this.contact = data
      console.log('address ',data[0].address);
      this.address = data[0].address
      this.sub.unsubscribe()
      if(this.address != ''){
        console.log('address is not null', this.address);
        
        this.getCoordByAddress()
      }
    })
  }

  //method who change my contact value and my position address in lat/lng for my location A/B map
  getCoordByAddress(){
    console.log('log address 1 --> ',this.address);
    
    let address = this.address /* address from  */
    let geoCoder = `https://api.mapbox.com/geocoding/v5/mapbox.places/${JSON.stringify(address)}.json?access_token=${this.accessToken}`
   
    this._httpClient.get(geoCoder).toPromise()
    .then(data =>{
        Object.values(data).forEach(el => {
          
          if(el[0].center !== undefined){
            console.log(el[0].center);
            this.dir = el[0].center
          }
        })
    }).catch(err => console.log('error geoCoder --> ',err));
  }
}
