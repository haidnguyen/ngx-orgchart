import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import update from 'immutability-helper';

import { Entities, OrgChartNode } from './types';

interface NodeState<T, K> {
  entities: Entities<OrgChartNode<T, K>>;
  ids: string[];
}

@Injectable()
export class NodeStore<T, K> extends ComponentStore<NodeState<T, K>> {
  constructor() {
    super({ entities: {}, ids: [] });
  }

  private readonly entities$ = this.select(state => state.entities);
  private readonly ids$ = this.select(state => state.ids);
  readonly nodes$ = this.select(this.entities$, this.ids$, (entities, ids) => ids.map(id => entities[id]));
  readonly rootIds$ = this.select(this.ids$, this.entities$, (ids, entities) =>
    ids.filter(id => entities[id].parentId === null)
  );
  readonly selectNodeById = (nodeId: OrgChartNode<T, K>['id']) =>
    this.select(this.entities$, entities => entities[nodeId]);
  readonly selectChildrenIds = (nodeId: OrgChartNode<T, K>['id']) =>
    this.select(this.entities$, this.ids$, (entities, ids) => ids.filter(id => entities[id].parentId === nodeId));

  readonly setEntities = this.updater((state, value: Entities<OrgChartNode<T, K>>) =>
    update(state, {
      entities: { $set: value },
      ids: { $set: Object.keys(value) },
    })
  );
}
