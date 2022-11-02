import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [ ];
  constructor(private router: Router,
    private menu: MenuController
    ) {}

  logout(){
    this.router.navigate(['login']);
    this.menu.close()

  }
}

