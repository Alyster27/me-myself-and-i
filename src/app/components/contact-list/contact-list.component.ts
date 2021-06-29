import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { IContact } from '../modal/contacts';
import { MyContactsService } from '../../services/my-contacts/my-contacts.service'
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';



@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  private contactsCollection: AngularFirestoreCollection<IContact>
  public contacts: IContact[] = []
  private sub: Subscription

  constructor(
    private route: Router,
    private rs: MyContactsService,
    private alertController: AlertController
    ) {}
  
  ngOnInit() {

    this.contactsCollection = this.rs.readContact();
    this.sub = this.contactsCollection.valueChanges({
      idField: 'id'
    }).subscribe(data =>{
      this.contacts = data;
      console.log(this.contacts);
    })

  }

  deleteContact(id: string){
    let header = ''
    let message = ''
    let buttons = []
    console.log(id);
    this.rs.deleteContact(id)
    
    header = 'Success'
    message = 'This contact has been deleted.'
    buttons = ['OK']

    /* this.handleButtonClick(header, message, buttons) */
  }

  navigateToEditContact(id : string){
    this.route.navigate([`${id}/contact-edit`])
  }

  async handleButtonClick(header: string, message: string, buttons: string[]) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: buttons
    });

    await alert.present();
  }

  viewDetailContact(id : string){
    this.route.navigate([`${id}/contact-detail`])
  }
}
