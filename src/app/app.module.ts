import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import angularfire to use firebase
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
//key for using angular
import { environment } from 'src/environments/environment';
//to make request on url
import { HttpClientModule } from '@angular/common/http';
//my components
import { TabsComponent } from './components/tabs/tabs.component';
import { MapComponent } from './components/map/map.component';
import { IonicModule } from '@ionic/angular';
import { HomeComponent } from './components/home/home.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactEditComponent } from './components/contact-edit/contact-edit.component';
import { AgendaEditComponent } from './components/agenda-edit/agenda-edit.component';
import { AgendaListComponent } from './components/agenda-list/agenda-list.component';
import { AgendaDetailComponent } from './components/agenda-detail/agenda-detail.component';
import { ContactDetailComponent } from './components/contact-detail/contact-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    MapComponent,
    HomeComponent,
    ContactListComponent,
    ContactEditComponent,
    AgendaEditComponent,
    AgendaListComponent,
    AgendaDetailComponent,
    ContactDetailComponent,
  ],
  imports: [
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment),
    AngularFirestoreModule,
    IonicModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
