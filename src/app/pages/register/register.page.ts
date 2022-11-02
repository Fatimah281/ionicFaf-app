import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor( private router: Router, private navCtrl: NavController) { }

  ngOnInit() {
  }
  tohome(){
    this.router.navigate(['home']);
  }
  // goBack() {
  //   this.navCtrl.back();
  //   }
    
}
