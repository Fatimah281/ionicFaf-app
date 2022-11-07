import { Component, OnInit } from '@angular/core';
import { LocalNotificationSchema } from '@capacitor/local-notifications';

@Component({
  selector: 'app-noti',
  templateUrl: './noti.component.html',
  styleUrls: ['./noti.component.scss'],
})
export class NotiComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // debugger;
    this.simpleNotif();
  }
   
  async simpleNotif() {
  
  
    let options : LocalNotificationSchema ={
      body: 'hi u',
      title: '',
      id: 0
    }
  }}
  
