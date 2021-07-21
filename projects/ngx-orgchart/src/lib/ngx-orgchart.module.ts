import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgxOrgchartComponent } from './ngx-orgchart.component';
import { NodeComponent } from './node.component';

@NgModule({
  declarations: [NgxOrgchartComponent, NodeComponent],
  imports: [CommonModule],
  exports: [NgxOrgchartComponent],
})
export class NgxOrgchartModule {}
