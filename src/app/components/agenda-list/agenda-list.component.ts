import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MyAgendaService } from './../../services/my-agenda/my-agenda.service'


@Component({
  selector: 'app-agenda-list',
  templateUrl: './agenda-list.component.html',
  styleUrls: ['./agenda-list.component.scss']
})
export class AgendaListComponent implements OnInit {
  private agendaCollection
  public agendaList
  private sub: Subscription
  public contact

  constructor(
    private route : Router,
    private agendaService: MyAgendaService
    ) { }

  ngOnInit(): void {
    this.agendaCollection = this.agendaService.loadAgenda();
    this.sub = this.agendaCollection.valueChanges({
      idField: 'id'
    }).subscribe(data =>{
      this.agendaList = data;
      console.log(this.agendaList);
    })

  }

  deleteAgendaEvent(id: string){
    console.log(id);
    this.agendaService.deleteAgenda(id)
  }

  navigateTo(id: string, url: string){
    this.route.navigate([`${id}/${url}`])
  }
}
