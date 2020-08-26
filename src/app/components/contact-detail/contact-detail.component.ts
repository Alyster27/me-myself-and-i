import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { MyContactsService } from 'src/app/services/my-contacts/my-contacts.service';
import { IContact } from '../modal/contacts';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent implements OnInit, OnDestroy {
  private currentId: string
  public contactDetail: AngularFirestoreDocument<IContact>
  public contact: any
  private sub: Subscription

  constructor(
    private route: ActivatedRoute,
    private contactService: MyContactsService,
    ) { }

  async ngOnInit() {
    this.currentId = this.route.snapshot.paramMap.get('id')

    this.contactDetail = await this.contactService.getContactById(this.currentId)

    this.sub = this.contactDetail.valueChanges().subscribe(data => {
      this.contact = data
    })

  }

  ngOnDestroy(){
    this.sub.unsubscribe()
  }
  
}