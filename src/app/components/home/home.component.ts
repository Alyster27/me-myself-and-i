import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { MyAgendaService } from 'src/app/services/my-agenda/my-agenda.service';
import { IAgenda } from '../modal/agenda';
import { AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public isLoading
  public agendaDetail: AngularFirestoreDocument<IAgenda>
  private currentDate : Date = new Date()
  
  constructor(private alertController: AlertController, private agendaService: MyAgendaService) { }

  async ngOnInit() {
    const month = ("0" + (this.currentDate.getMonth() + 1)).slice(-2)
    const year = this.currentDate.getFullYear()
    const day = ("0" + this.currentDate.getDate()).slice(-2)
    const toDay = `${year}-${month}-${day}`
   
    //get event by Date Start (add hour !!!)
    this.agendaService.getEventByDate(toDay, res =>{
      console.log(res);
      
      const header = 'Votre programe du jour'
      let message = res
      const buttons = []
      
      setTimeout(() => {
        this.isLoading = true
        this.handleAlert(header, message, buttons)
      }, 2000);
    })
    
  }
  //method who display
  async handleAlert(header: string, message: string, buttons: string[]) {
    console.log('message', message.toString());
    //create
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: buttons
    });
    
    await alert.present();
  }
}


