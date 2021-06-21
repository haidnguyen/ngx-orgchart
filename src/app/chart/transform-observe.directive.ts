import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { animationFrameScheduler, BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import { filter, map, throttleTime } from 'rxjs/operators';
import { DragDropService } from './drag-drop.service';

@Directive({
  selector: '[appTransformObserve]',
})
export class TransformObserveDirective implements OnInit, OnDestroy {
  private readonly $currentTranform = new BehaviorSubject('');
  private readonly $transform = new BehaviorSubject('');

  @Input() observerId!: string | number;

  observer!: MutationObserver;
  subscription!: Subscription;

  constructor(private el: ElementRef, private dragDropService: DragDropService<any>) {}

  ngOnInit() {
    this.$currentTranform.next(getComputedStyle(this.el.nativeElement).transform);
    this.observer = new MutationObserver(() => {
      const computedStyled = getComputedStyle(this.el.nativeElement);
      if (computedStyled.userSelect !== 'none') {
        this.$transform.next(getComputedStyle(this.el.nativeElement).transform);
      }
    });
    this.observer.observe(this.el.nativeElement, { attributes: true, childList: false, subtree: false });

    this.subscription = combineLatest([this.$currentTranform, this.$transform])
      .pipe(
        throttleTime(0, animationFrameScheduler),
        filter(([currentTranform, tranform]) => tranform.startsWith('matrix') && tranform !== currentTranform),
        map(([, tranform]) => ({
          observerId: this.observerId,
          offset: +tranform.replaceAll(/matrix()/g, '').split(',')[4],
        }))
      )
      .subscribe(this.dragDropService.change.bind(this.dragDropService));
  }

  ngOnDestroy() {
    this.observer.disconnect();
    this.subscription.unsubscribe();
  }
}
