import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsComponent } from './components/tabs/tabs.component';
import { MapComponent } from './components/map/map.component';
import { HomeComponent } from './components/home/home.component';
import { AgendaListComponent } from './components/agenda-list/agenda-list.component';
import { AgendaEditComponent } from './components/agenda-edit/agenda-edit.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactEditComponent } from './components/contact-edit/contact-edit.component';
import { ContactDetailComponent } from './components/contact-detail/contact-detail.component';
import { AgendaDetailComponent } from './components/agenda-detail/agenda-detail.component';


const routes: Routes = [
      {
        path: 'tabs',
        component: TabsComponent,
      },
      {
        path: '',
        component: HomeComponent,
      },
      
      {
        path: 'agenda',
        component: AgendaListComponent,
      },
      {
        path: 'agenda-edit',
        component: AgendaEditComponent,
      },
      {
        path: ':id/agenda-edit',
        component: AgendaEditComponent,
      },
      {
        path: ':id/agenda-detail',
        component: AgendaDetailComponent,
      },
      {
        path: 'contact',
        component: ContactListComponent,
      },
      {
        path: 'contact-edit',
        component: ContactEditComponent,
      },
      {
        path: ':id/contact-edit',
        component: ContactEditComponent,
      },
      {
        path: ':id/contact-detail',
        component: ContactDetailComponent,
      },
      {
        path: 'map',
        component: MapComponent
      },
       
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
