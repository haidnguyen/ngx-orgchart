import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgxOrgchartComponent } from './ngx-orgchart.component';

@NgModule({
  declarations: [
    NgxOrgchartComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    NgxOrgchartComponent
  ]
})
export class NgxOrgchartModule { }
