import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { NgxOrgchartComponent } from './ngx-orgchart.component';
import { NODE_HEIGHT, NODE_WIDTH } from './ngx-orgchart.token';
import { NodeComponent } from './node.component';

interface NgxOrgchartConfig {
  nodeWidth: number;
  nodeHeight: number;
}

@NgModule({
  declarations: [NgxOrgchartComponent, NodeComponent],
  imports: [CommonModule],
  exports: [NgxOrgchartComponent],
})
export class NgxOrgchartModule {
  static withConfig(config: NgxOrgchartConfig): ModuleWithProviders<NgxOrgchartModule> {
    return {
      ngModule: NgxOrgchartModule,
      providers: Array.of(
        { provide: NODE_WIDTH, useValue: config.nodeWidth },
        { provide: NODE_HEIGHT, useValue: config.nodeHeight }
      ),
    };
  }
}
