import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { NodeStore } from './node.store';
import { Entities, OrgChartNode } from './types';

@Component({
  selector: 'ngx-orgchart',
  template: `
      <div *ngFor="let item of nodes$ | async">
        {{ item | json }}
      </div>
      <div>
        {{ rootIds$ | async | json }}
      </div>
      <div>
        {{ node2$ | async | json }}
      </div>
      <div>
        {{ children$ | async | json }}
      </div>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [NodeStore],
})
export class NgxOrgchartComponent<T, K> implements OnInit {
  @Input()
  set datasource(value: Entities<OrgChartNode<T, K>>) {
    this.fromNodeStore.setEntities(value);
  }

  constructor(private readonly fromNodeStore: NodeStore<T, K>) { }

  readonly nodes$ = this.fromNodeStore.nodes$;
  readonly rootIds$ = this.fromNodeStore.rootIds$;
  readonly node2$ = this.fromNodeStore.selectNodeById('1');
  readonly children$ = this.fromNodeStore.selectChildrenIds('1');

  ngOnInit() {

  }
}
