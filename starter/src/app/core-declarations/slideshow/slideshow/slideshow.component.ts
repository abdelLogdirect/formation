import { Component, OnInit, ChangeDetectionStrategy, Input, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { SlideComponent } from '../slide/slide.component';

@Component({
  selector: 'app-slideshow',
  template: `
    <div class="slideshow">
      <div class="slides" [style.transform]="transform" [style.transitionDuration.ms]="speed">
        <ng-content></ng-content>
      </div>
      <app-pagination [slides]="slides" (pagination)="onPagination($event)"></app-pagination>
    </div>
  `,
  styleUrls: ['./slideshow.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlideshowComponent implements OnInit, AfterContentInit {

  /** Delay between each automatic move */
  @Input() delay = 5000;
  /** Speed for one move */
  @Input() speed = 1000;
  /** Total of slides */
  total = 0;
  /** Currently displayed slide */
  current = 1;
  /** Reference to the current timer */
  timer = 0;
  @ContentChildren(SlideComponent) slides?: QueryList<SlideComponent>;
  transform = '';

  constructor() {}

  ngOnInit(): void {}

  ngAfterContentInit(): void {

    this.total = this.slides?.length ?? 0;

  }

  /**
   * Move to another slide
   * @param next Position of the destination slide
   */
  move(next = (this.current < this.total) ? (this.current + 1) : 1): void {

    /* Translate the slides container */
    this.transform = `translateX(${(next - 1) * -100}%)`;

    /* Update the new current position */
    this.current = next;

    /* The transitionend event (registered in constructor) will relaunch a new timer */

  }

  onPagination(index: number): void {

    this.move(index);

  }

}
