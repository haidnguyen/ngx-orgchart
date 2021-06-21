import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { combineLatest, Observable, ReplaySubject, Subject, zip } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { NODE_HEIGHT, NODE_SPACING, NODE_WIDTH } from './chart.module';
import { ChartNode, Point } from './chart.types';
import { calWidth } from './chart.utils';
import { DragDropService } from './drag-drop.service';

@Component({
  selector: '[app-node]',
  template: `
    <div class="flex flex-col items-center relative" #container>
      <div
        class="flex flex-col items-center relative"
        [ngStyle]="{ 'padding-left.px': nodeSpacing / 2, 'padding-right.px': nodeSpacing / 2 }"
      >
        <ng-container *ngTemplateOutlet="nodeTemplate; context: { $implicit: chartNode }"></ng-container>
      </div>
      <ng-container *ngIf="pathD$ | async as pathD">
        <svg xmlns="http://www.w3.org/2000/svg" style="height: 100px" class="w-full overflow-visible" #link>
          <svg:path [attr.d]="pathD" stroke="grey" fill="transparent" *ngIf="parentNode" />
        </svg>
      </ng-container>

      <div
        *ngIf="chartNode.isShowChildren && chartNode.children"
        class="flex"
        cdkDropList
        (cdkDropListDropped)="drop($event)"
        cdkDropListOrientation="horizontal"
      >
        <div
          *ngFor="let child of chartNode.children; let i = index"
          app-node
          cdkDrag
          appTransformObserve
          [chartNode]="child"
          [parentNode]="container"
          [siblingNodes]="chartNode.children | slice: 0:i"
          [nodeTemplate]="nodeTemplate"
          [observerId]="child.id"
        ></div>
      </div>
    </div>
  `,
  styles: [
    `
      .cdk-drag-preview {
        & > div > svg {
          opacity: 0;
        }
      }

      .cdk-drag-placeholder {
        opacity: 0;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodeComponent<T> implements OnInit, OnDestroy {
  @ViewChild('container', { static: true }) containerRef!: ElementRef<HTMLDivElement>;

  @Input() chartNode!: ChartNode<T>;
  @Input() siblingNodes: ChartNode[] | null = null;
  @Input() parentNode: HTMLElement | null = null;
  @Input() nodeTemplate!: TemplateRef<any>;

  private readonly $currentNodeLinkPoint = new ReplaySubject<Point>(1);
  private readonly $parentNodeLinkPoint = new ReplaySubject<Point>(1);
  private readonly $destroy = new Subject<void>();

  pathD$!: Observable<string>;

  constructor(
    @Inject(NODE_SPACING) public nodeSpacing: number,
    @Inject(NODE_WIDTH) private nodeWidth: number,
    @Inject(NODE_HEIGHT) private nodeHeight: number,
    private dragDropService: DragDropService<T>
  ) {}

  ngOnInit() {
    setTimeout(() => {
      const relativeOffsetX =
        this.siblingNodes
          ?.filter(node => node.id !== this.chartNode.id)
          .reduce((acc, cur) => acc + calWidth(cur, this.nodeWidth + this.nodeSpacing), 0) ?? 0;

      this.$currentNodeLinkPoint.next({
        x: (this.containerRef.nativeElement.clientWidth ?? 0) / 2,
        y: -this.nodeHeight,
      });
      this.$parentNodeLinkPoint.next({
        x: (this.parentNode?.clientWidth ?? 0) / 2 - relativeOffsetX,
        y: -100 - this.nodeHeight,
      });
    }, 0);

    this.pathD$ = combineLatest([
      zip([this.$currentNodeLinkPoint, this.$parentNodeLinkPoint]),
      this.dragDropService.select(this.chartNode.id).pipe(
        map(v => v.offset),
        startWith(0)
      ),
    ]).pipe(
      map(([[a, b], offset]) => `M${a.x},${a.y} C${a.x},${a.y - 75} ${b.x - offset},${b.y + 75} ${b.x - offset},${b.y}`)
    );
  }

  ngOnDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
  }

  drop(event: CdkDragDrop<ChartNode<T>>) {
    this.dragDropService.drop(this.chartNode, event);
  }
}
