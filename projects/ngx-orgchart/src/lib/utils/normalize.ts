import update from 'immutability-helper';

import { Entities, OrgChartNode } from '../types';

export const normalize = <T, K>(items: OrgChartNode<T, K>[]): Entities<OrgChartNode<T, K>> =>
  items.reduce(
    (acc, cur) =>
      update(acc, {
        [cur.id]: { $set: cur },
      }),
    {}
  );
