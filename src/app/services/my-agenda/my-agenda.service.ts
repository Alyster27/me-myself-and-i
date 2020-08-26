import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IAgenda } from '../../components/modal/agenda'
import { Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MyAgendaService {
  public sub: Subscription

  constructor(
    private afs: AngularFirestore,
    ) { }

  saveNew(data: IAgenda){
    return this.afs
      .collection<IAgenda>('my-agenda-list')
      .add(data)
  }

  loadAgenda(){
    return this.afs.collection<IAgenda>('my-agenda-list', ref => ref.orderBy('dateBegin', 'asc'))
  }

  deleteAgenda(id:string) {
    return this.afs
      .doc<IAgenda>(`my-agenda-list/${id}`)
      .delete();
  }

  getEventById(id: string){
    return this.afs.doc<IAgenda>(`my-agenda-list/${id}`)
  }

  update(data: IAgenda, currentId: string){
    return this.afs
    .doc<IAgenda>(`my-agenda-list/${currentId}`)
    .update(data)
  }

  getEventByDate(toDay: string, callback: (data: any) => void){
    let result = this.loadAgenda()
    let eventDay = []
    
    this.sub = result.valueChanges().subscribe(data =>{
      console.log('log data --> ', data);
      
      for (const iterator of Object.values(data)) {
        console.log('start --> ',iterator.dateBegin.toString().length, ' -- ',toDay.length);
        console.log('start --> ',iterator.dateBegin.toString(), ' -- ',toDay);
        

        if(iterator.dateBegin.toString() === toDay){
          console.log('prout');
          
          eventDay.push(iterator.title) 
        }
        
      }
      if(eventDay.length > 0) {
        console.log('debug');
        
        return callback(eventDay)
      }
    })
  }
}
