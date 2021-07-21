import { NO_ERRORS_SCHEMA } from '@angular/core';
import { render } from '@testing-library/angular';

import { NgxOrgchartComponent } from '../lib/ngx-orgchart.component';

describe(NgxOrgchartComponent.name, () => {
  it('should match snapshot', async () => {
    const { container } = await render(NgxOrgchartComponent, {
      schemas: [NO_ERRORS_SCHEMA],
    });

    expect(container).toMatchSnapshot();
  });
});
