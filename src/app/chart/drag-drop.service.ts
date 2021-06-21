import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ChartDragDropEvent, ChartNode } from './chart.types';

@Injectable()
export class DragDropService<T> {
  private readonly $dropEvent = new Subject<ChartDragDropEvent<T>>();
  private readonly $changeOffsetX = new Subject<{ observerId: string | number; offset: number }>();
  readonly dropEvent$ = this.$dropEvent.asObservable();

  drop(node: ChartNode<T>, event: CdkDragDrop<ChartNode<T>>) {
    this.$dropEvent.next({
      previousIndex: event.previousIndex,
      currentIndex: event.currentIndex,
      chartNode: node,
    });
  }

  change(event: { observerId: string | number; offset: number }) {
    this.$changeOffsetX.next(event);
  }

  select(id: string | number) {
    return this.$changeOffsetX.pipe(filter(e => e.observerId === id));
  }
}
