import { Inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import update from 'immutability-helper';

import { NODE_WIDTH } from './ngx-orgchart.token';
import { Entities, OrgChartNode } from './types';
import { buildTree, calWidth } from './utils';

export interface NodeState<T, K> {
  entities: Entities<OrgChartNode<T, K>>;
  ids: string[];
}

@Injectable()
export class NodeStore<T = any, K = any> extends ComponentStore<NodeState<T, K>> {
  constructor(@Inject(NODE_WIDTH) private nodeWidth: number) {
    super({ entities: {}, ids: [] });
  }

  private readonly entities$ = this.select(state => state.entities);

  private readonly ids$ = this.select(state => state.ids);

  readonly nodes$ = this.select(this.entities$, this.ids$, (entities, ids) => ids.map(id => entities[id]));

  readonly rootIds$ = this.select(this.ids$, this.entities$, (ids, entities) =>
    ids.filter(id => entities[id].parentId === null)
  );

  readonly selectNodeById = (nodeId: OrgChartNode['id']) => this.select(this.entities$, entities => entities[nodeId]);

  readonly selectChildrenIds = (nodeId: OrgChartNode<T, K>['id']) =>
    this.select(this.entities$, this.ids$, (entities, ids) => ids.filter(id => entities[id].parentId === nodeId));

  readonly chartWidth$ = this.select(this.rootIds$, this.entities$, this.ids$, (rootIds, entities, ids) =>
    rootIds.map(rootId => calWidth(buildTree(rootId, ids, entities), this.nodeWidth)).reduce((acc, cur) => acc + cur)
  );

  readonly setEntities = this.updater((state, value: Entities<OrgChartNode<T, K>>) =>
    update(state, {
      entities: { $set: value },
      ids: { $set: Object.keys(value) },
    })
  );
}
