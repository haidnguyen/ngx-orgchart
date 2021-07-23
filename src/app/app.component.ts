import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrgChartNode, normalize } from 'ngx-orgchart';

interface Data {
  name: string;
}

interface Meta {
  isEditing: boolean;
}

@Component({
  selector: 'app-root',
  template: `
    <ngx-orgchart [datasource]="datasource" [nodeTemplateRef]="nodeTpl"></ngx-orgchart>
    <ng-template #nodeTpl let-data let-meta="meta">
      <div class="chart-node">
        <span>{{ data.name }}</span>
      </div>
    </ng-template>
  `,
  styles: [
    `
      .chart-node {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 300px;
        height: 120px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  datasource = normalize(
    Array.of<OrgChartNode<Data, Meta>>(
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
      }
    )
  );
}
