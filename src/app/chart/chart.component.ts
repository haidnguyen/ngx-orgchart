import { ChangeDetectionStrategy, Component, Input, Output, TemplateRef, ViewEncapsulation } from '@angular/core';

import { ChartNode } from './chart.types';
import { DragDropService } from './drag-drop.service';

@Component({
  selector: 'app-chart',
  template: `
    <div app-chart-container [datasource]="datasource" [nodeTemplate]="nodeTemplate" style="width: fit-content"></div>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent<T> {
  @Input() datasource: ChartNode<T> | null = null;
  @Input() nodeTemplate!: TemplateRef<any>;

  @Output() dragDrop = this.dragDropService.dropEvent$;

  constructor(public dragDropService: DragDropService<T>) {}
}
