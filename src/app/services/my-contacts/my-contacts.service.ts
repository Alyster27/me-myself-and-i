import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { IContact } from '../../components/modal/contacts'


@Injectable({
  providedIn: 'root'
})
export class MyContactsService {

  constructor(private afs: AngularFirestore) { }
  
  saveNew(contact: IContact){
    return this.afs
      .collection<IContact>('my-contact-list')
      .add(contact)
  }

  getContactById(id: string){
    return this.afs.doc<IContact>(`my-contact-list/${id}`)
  }
  
  getContactByName(name: string){
    return this.afs.collection<IContact>('my-contact-list', ref => ref.where('name', '==', name))
  }

  loadContact(){
    return this.afs.collection<IContact>('my-contact-list', ref => ref.orderBy('name', 'asc'))
  }
    
  readContact(){
    return this.afs.collection<IContact>('my-contact-list', ref => ref.orderBy('name', 'asc'))
  }
    
  deleteContact(id: string) {
    return this.afs
      .doc<IContact>(`my-contact-list/${id}`)
      .delete().catch(error => console.log(error));
  }

  update(data: IContact, currentId: string){
    return this.afs
    .doc<IContact>(`my-contact-list/${currentId}`)
    .update(data)
  }
}
