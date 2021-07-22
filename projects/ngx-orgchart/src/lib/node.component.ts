import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { NodeStore } from './node.store';
import { OrgChartNode } from './types';

@Component({
  selector: 'ngx-node',
  template: `
    <div *ngIf="vm$ | async as vm" class="ngx-node-container">
      <ng-container *ngTemplateOutlet="nodeTemplateRef; context: { $implicit: vm.node.data, meta: vm.node.meta }">
        {{ vm.node | json }}
      </ng-container>
      <div class="ngx-node-children">
        <ngx-node *ngFor="let id of vm.childIds" [nodeId]="id" [nodeTemplateRef]="nodeTemplateRef"></ngx-node>
      </div>
    </div>
  `,
  styles: [
    `
      .ngx-node-container {
        display: flex;
        flex-direction: column;
      }
      .ngx-node-children {
        display: flex;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodeComponent<T, K> {
  @Input() nodeTemplateRef!: TemplateRef<T>;
  @Input()
  set nodeId(id: OrgChartNode<T, K>['id']) {
    this.$nodeId.next(id);
  }
  private readonly $nodeId = new ReplaySubject<OrgChartNode<T, K>['id']>(1);
  vm$ = this.$nodeId.pipe(
    switchMap(id =>
      this.fromNodeStore.select(
        this.fromNodeStore.selectNodeById(id),
        this.fromNodeStore.selectChildrenIds(id),
        (node, childIds) => ({ node, childIds })
      )
    )
  );

  constructor(private readonly fromNodeStore: NodeStore<T, K>) {}
}
