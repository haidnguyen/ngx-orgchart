import { render } from '@testing-library/angular';

import { NodeComponent } from '../lib/node.component';
import { normalize } from '../lib/utils';
import { provideMockNodeStore } from '../lib/utils/testing';

interface TestData {
  name: string;
}

interface TestMeta {
  isEditing: boolean;
}

describe(NodeComponent.name, () => {
  it('should match snapshot', async () => {
    const { container } = await render<NodeComponent<TestData, TestMeta>>(NodeComponent, {
      providers: [
        provideMockNodeStore(
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
        ),
      ],
      componentProperties: {
        nodeId: '1',
      },
    });

    expect(container).toMatchSnapshot();
  });
});
