import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MyContactsService } from 'src/app/services/my-contacts/my-contacts.service';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {
  addContactForm: FormGroup
  result
  public editDocument: AngularFirestoreDocument
  private sub: Subscription
  private currentId: string = null
  private isEditable: boolean = false

  constructor(
    private fb: FormBuilder,
    private rs: MyContactsService,
    private contactService: MyContactsService,
    private route: ActivatedRoute,

    private router: Router
    ){ 
      if((this.currentId = this.route.snapshot.paramMap.get('id')) != null){
        console.log(this.currentId);
        
        if(this.currentId != 'contact'){
          this.loadContactById(this.currentId)
          this.isEditable = true
          console.log(this.currentId);
        }
      }
  }

  ngOnInit(): void {
    // build groupe for name email phone and address
    this.addContactForm = this.fb.group({
      name: ['', Validators.required],
      mail: ['', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
      ]],
      phone: ['', Validators.required],
      address: ['', [
        Validators.required,
        Validators.maxLength(200)
      ]],
      type: ['', [Validators.required]]
    })
  }

  async loadContactById(id: string){
    
    this.editDocument = await this.contactService.getContactById(id)

    this.sub = this.editDocument.valueChanges().subscribe(data =>{
      for (let [key, value] of Object.entries(data)){

        console.log(`${key} - ${value}`);

        if(this.addContactForm.contains(key)){
          this.addContactForm.controls[key].setValue(value)
        }
      }
    })
  }

  addContact(){
    let result

    if(this.addContactForm.valid){
      //new event      
      if(!this.isEditable){
        result = this.contactService.saveNew(this.addContactForm.value)
        this.addContactForm.reset()
        this.router.navigate(['contact'])
      }
      //update
      else {
        result = this.contactService.update(this.addContactForm.value, this.currentId)
        
        if(result){
          this.router.navigate(['contact'])
        }
      }
    }
  }
  
}
