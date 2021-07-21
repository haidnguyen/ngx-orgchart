import { render } from '@testing-library/angular';

import { NodeComponent } from '../lib/node.component';
import { NodeStore } from '../lib/node.store';
import { normalize } from '../lib/utils';

interface TestData {
  name: string;
}

interface TestMeta {
  isEditing: boolean;
}

describe(NodeComponent.name, () => {
  it('should match snapshot', async () => {
    const mockNodeStore = new NodeStore<TestData, TestMeta>();
    mockNodeStore.setEntities(
      normalize([
        {
          id: '1',
          parentId: null,
          data: {
            name: 'Root',
          },
          meta: {
            isEditing: false,
          },
        },
        {
          id: '2',
          parentId: '1',
          data: {
            name: 'Child 1',
          },
        },
        {
          id: '3',
          parentId: '1',
          data: {
            name: 'Child 2',
          },
        },
        {
          id: '4',
          parentId: '2',
          data: {
            name: 'Child 3',
          },
        },
      ])
    );
    const { container } = await render<NodeComponent<TestData, TestMeta>>(NodeComponent, {
      providers: [{ provide: NodeStore, useValue: mockNodeStore }],
      componentProperties: {
        nodeId: '1',
      },
    });

    expect(container).toMatchSnapshot();
  });
});
