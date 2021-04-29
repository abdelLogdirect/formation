import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-slide',
  template: `
    <ng-content></ng-content>
  `,
  styleUrls: ['./slide.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideComponent implements OnInit {

  ngOnInit(): void {}

}
