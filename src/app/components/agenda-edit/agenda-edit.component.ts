import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MyAgendaService } from 'src/app/services/my-agenda/my-agenda.service';
import { AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { IContact } from '../modal/contacts';
import { IContactOption } from '../modal/contact-option';
import { MyContactsService } from 'src/app/services/my-contacts/my-contacts.service';

@Component({
  selector: 'app-agenda-edit',
  templateUrl: './agenda-edit.component.html',
  styleUrls: ['./agenda-edit.component.scss']
})
export class AgendaEditComponent implements OnInit {
  selectedDayString : string = new Date().toISOString();
  minDate : string = new Date().toISOString();
  maxDate : string = new Date().toISOString();
  private currentId: string = null
  eventAgenda
  public editDocument: AngularFirestoreDocument
  private sub: Subscription
  private isEditable: boolean = false
  public contactsCollection: AngularFirestoreCollection<IContact>
  public contactOption: IContactOption[] = []
  public selectContact: string

  currentDate = new Date()
  formEvent: FormGroup
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private agendaService: MyAgendaService,
    private router: Router,
    private contactService: MyContactsService
  ) { 
    if((this.currentId = this.route.snapshot.paramMap.get('id')) != null){
      if(this.currentId != 'agenda'){
        this.loadEventById(this.currentId)
        this.isEditable = true
        console.log(this.currentId);
      }
    }
  }

  ngOnInit(): void {
    this.formEvent = this.fb.group({
      title : ['', Validators.required],
      area : ['', Validators.required],
      dateBegin : ['', Validators.required],
      dateEnd : ['', Validators.required],
      contactName : ['', Validators.required]
    })
    this.getContactSelect()
  }

  async loadEventById(id: string){
    this.editDocument = await this.agendaService.getEventById(id)

    this.sub = this.editDocument.valueChanges().subscribe(data =>{
      for (let [key, value] of Object.entries(data)){

        console.log(`${key} - ${value}`);

        if(this.formEvent.contains(key)){
          this.formEvent.controls[key].setValue(value)
        }
      }
    })
  }

  async getContactSelect(){
    this.contactsCollection = await this.contactService.loadContact()
    this.sub = this.contactsCollection.valueChanges({
      idField: 'id'
    }).subscribe(data =>{
      for (let value of data) {
       /*  this.contactOption.push({value: `${value.id}`, viewValue: `${value.name}`}) */
        this.contactOption.push({value: `${value.name}`, viewValue: `${value.name}`})
      }
      console.log(this.contactOption);
    })
  }

  saveEvent(){
    console.log(this.formEvent.valid);
    console.log(this.formEvent.value);
    let result

    if(this.formEvent.valid){
      //new event
      console.log('isEditable --> ',this.isEditable);
      
      if(!this.isEditable){
        console.log('save new agenda --> ', this.formEvent.value);
  
        result = this.agendaService.saveNew(this.formEvent.value)
        this.formEvent.reset()
        this.router.navigate(['agenda'])
      }
      //update
      else {
        console.log('update current event --> ', this.formEvent.value);
        result = this.agendaService.update(this.formEvent.value, this.currentId)
        
        if(result){
          this.router.navigate(['agenda'])
        }
      }
    }
  }
}
