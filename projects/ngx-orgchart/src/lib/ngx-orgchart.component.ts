import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';

import { NodeStore } from './node.store';
import { Entities, OrgChartNode } from './types';

@Component({
  selector: 'ngx-orgchart',
  template: `
    <ngx-node *ngFor="let id of rootIds$ | async" [nodeId]="id" [nodeTemplateRef]="nodeTemplateRef"></ngx-node>
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

  constructor(private readonly fromNodeStore: NodeStore<T, K>) {}

  readonly rootIds$ = this.fromNodeStore.rootIds$;
}
