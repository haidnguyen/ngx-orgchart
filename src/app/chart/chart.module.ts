import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';

import { ChartContainerComponent } from './chart-container.component';
import { ChartComponent } from './chart.component';
import { DragDropService } from './drag-drop.service';
import { NodeComponent } from './node.component';
import { TransformObserveDirective } from './transform-observe.directive';

export interface ChartModuleConfig {
  nodeWidth: number;
  nodeHeight: number;
  nodeSpacing?: number;
}

export const NODE_WIDTH = new InjectionToken<number>('NODE_WIDTH');
export const NODE_HEIGHT = new InjectionToken<number>('NODE_HEIGHT');
export const NODE_SPACING = new InjectionToken<number>('NODE_SPACING');

@NgModule({
  declarations: [ChartComponent, NodeComponent, ChartContainerComponent, TransformObserveDirective],
  imports: [CommonModule, DragDropModule],
  exports: [ChartComponent, ChartContainerComponent],
})
export class ChartModule {
  static withConfig(config: ChartModuleConfig): ModuleWithProviders<ChartModule> {
    return {
      ngModule: ChartModule,
      providers: [
        { provide: NODE_HEIGHT, useValue: config.nodeHeight },
        { provide: NODE_WIDTH, useValue: config.nodeWidth },
        { provide: NODE_SPACING, useValue: config.nodeSpacing ?? 40 },
        DragDropService,
      ],
    };
  }
}
