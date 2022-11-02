import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RefePage } from './refe.page';

const routes: Routes = [
  {
    path: '',
    component: RefePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RefePageRoutingModule {}
