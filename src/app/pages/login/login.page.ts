import { Component, OnInit,  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginPageForm } from './login.page.form';
import { LocalNotifications } from '@capacitor/local-notifications';
import { from } from 'rxjs';
import { Plugins } from 'protractor/built/plugins';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form:FormGroup;
  constructor( private router: Router, private formBuilder: FormBuilder) { }
  
 async ngOnInit() {
  // debugger;
    this.form= new LoginPageForm(this.formBuilder).createForm();
    await LocalNotifications.requestPermissions();
  }

  async scheduleBasic(){

await LocalNotifications.schedule({
  notifications:[ {
    smallIcon: "ic_stat_icon_config_sample",
    iconColor: "#488AFF",
    sound: "beep.wav",
    title: 'reminder',
    body: 'join us',
    id:1
  },
]
})}

  toHome(){
    this.router.navigate(['home']);
  
  }
  toRegister(){
    this.router.navigate(['register']);
  
  }
  }
  


