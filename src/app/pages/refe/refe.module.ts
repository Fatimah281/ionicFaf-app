import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RefePageRoutingModule } from './refe-routing.module';

import { RefePage } from './refe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RefePageRoutingModule,
    
    
  ],
  declarations: [RefePage]
})
export class RefePageModule {}
