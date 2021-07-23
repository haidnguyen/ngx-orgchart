import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';

import { NodeStore } from './node.store';
import { Entities, OrgChartNode } from './types';

@Component({
  selector: 'ngx-orgchart',
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <div [ngStyle]="{ 'width.px': vm.chartWidth }">
        <ngx-node *ngFor="let id of vm.rootIds" [nodeId]="id" [nodeTemplateRef]="nodeTemplateRef"></ngx-node>
      </div>
    </ng-container>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [NodeStore],
})
export class NgxOrgchartComponent<T, K> {
  @Input()
  set datasource(value: Entities<OrgChartNode<T, K>>) {
    this.fromNodeStore.setEntities(value);
  }

  @Input() nodeTemplateRef!: TemplateRef<T>;

  readonly vm$ = this.fromNodeStore.select(
    this.fromNodeStore.rootIds$,
    this.fromNodeStore.chartWidth$,
    (rootIds, chartWidth) => ({ rootIds, chartWidth })
  );

  constructor(private readonly fromNodeStore: NodeStore<T, K>) {}
}
