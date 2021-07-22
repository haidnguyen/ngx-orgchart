import { Provider } from '@angular/core';

import { NodeStore } from '../node.store';
import { Entities, OrgChartNode } from '../types';

export const provideMockNodeStore = <T extends OrgChartNode>(entities: Entities<T>): Provider => {
  const instance = new NodeStore();
  instance.setEntities(entities);
  return { provide: NodeStore, useValue: instance };
};
