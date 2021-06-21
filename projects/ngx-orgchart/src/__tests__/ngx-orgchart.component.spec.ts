import { render } from '@testing-library/angular';
import { NgxOrgchartComponent } from '../lib/ngx-orgchart.component';

describe('NgxOrgchartComponent', () => {
  it('should match snapshot', async () => {
    const { container } = await render(NgxOrgchartComponent);

    expect(container).toMatchSnapshot();
  })
});
