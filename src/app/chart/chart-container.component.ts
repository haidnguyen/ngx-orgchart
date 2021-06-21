import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { NODE_SPACING, NODE_WIDTH } from './chart.module';
import { ChartNode } from './chart.types';
import { calWidth } from './chart.utils';

@Component({
  selector: '[app-chart-container]',
  template: `
    <div [ngStyle]="{ 'width.px': width$ | async }">
      <div app-node *ngIf="datasource" [chartNode]="datasource" [nodeTemplate]="nodeTemplate"></div>
    </div>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartContainerComponent implements OnChanges {
  @Input() datasource: ChartNode | null = null;
  @Input() nodeTemplate!: TemplateRef<any>;

  private readonly $width = new BehaviorSubject(0);

  readonly width$ = this.$width.asObservable();

  constructor(@Inject(NODE_SPACING) private nodeSpacing: number, @Inject(NODE_WIDTH) private nodeWidth: number) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.datasource) {
      this.$width.next(calWidth(changes.datasource.currentValue, this.nodeWidth + this.nodeSpacing));
    }
  }
}
