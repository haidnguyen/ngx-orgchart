import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-node',
  template: `
    <p>
      node works!
    </p>
  `,
  styles: [
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
