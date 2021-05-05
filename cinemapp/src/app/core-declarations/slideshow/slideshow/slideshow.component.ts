import {
  Component, OnInit, Input, AfterContentInit, OnDestroy, ContentChildren,
  QueryList, Inject, PLATFORM_ID, ChangeDetectionStrategy, ChangeDetectorRef, ApplicationRef
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { first } from 'rxjs/operators';

import { SlideComponent } from './slide/slide.component';

@Component({
  selector: 'app-slideshow',
  template: `
    <div class="app-slideshow">
      <div class="app-slides" [style.transform]="transform" [style.transitionDuration.ms]="speed" (transitionend)="onTransitionEnd()">
        <ng-content></ng-content>
      </div>
      <div class="app-pagination">
        <app-pagination [current]="current" [total]="total" (pagination)="onPagination($event)"></app-pagination>
      </div>
    </div>
  `,
  styleUrls: ['./slideshow.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideshowComponent implements OnInit, AfterContentInit, OnDestroy {

  /** Delay between each automatic move */
  @Input() delay = 5000;
  /** Speed for one move */
  @Input() speed = 1000;
  /** Slides list */
  @ContentChildren(SlideComponent) slides?: QueryList<SlideComponent>;
  /** Total of slides */
  total = 0;
  /** Currently displayed slide */
  current = 1;
  /** Transform value to move the slide */
  transform = '';
  /** Reference to the current timer */
  private timer = 0;

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    private appRef: ApplicationRef,
    private changeDetector: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {}

  /* Slides are in the content, so we need to wait for content to be ready */
  ngAfterContentInit(): void {

    this.initTimer();

  }

  ngOnDestroy(): void {

    this.stop();

  }

  /**
   * Initializate the first timer, which needs some special steps
   */
  private initTimer(): void {

    if (this.slides) {

      this.total = this.slides.length;

      /* We need to wait Angular to be ready before lauching a native timer,
       * otherwise it could block some features like service workers */
      this.appRef.isStable.pipe(
        /* Wait for stabilization and we need just one value */
        first((isStable) => isStable),
      ).subscribe(() => {

        /* Use animation timer only in browsers, otherwise it would break server-side rendering,
         * where `window` does not exist */
        if (isPlatformBrowser(this.platformId)) {

          /* Launches a new timer and then move */
          this.timer = window.setTimeout(() => {

            this.move();

            /* Tell Angular to launch change detection as `isStable` is outside Angular zone */
            this.changeDetector.detectChanges();

          }, this.delay);

        }

      });

    }

  }

  /**
   * Launch a new timer
   */
  start(): void {

    /* Use animation timer only in browsers, otherwise it would break server-side rendering,
     * where `window` does not exist */
    if (isPlatformBrowser(this.platformId)) {

      /* Stop any current timer to avoid concurrent timers */
      this.stop();

      /* Launch a new timer and then move */
      this.timer = window.setTimeout(() => {

        this.move();

        this.changeDetector.markForCheck();

      }, this.delay);

    }

  }

  /**
   * Stop the current timer
   */
  stop(): void {

    /* Use animation timer only in browsers, otherwise it would break server-side rendering,
     * where `window` does not exist */
    if (isPlatformBrowser(this.platformId)) {

      window.clearTimeout(this.timer);

    }

  }

  /**
   * Move to another slide
   * @param next Position of the destination slide
   */
  move(next = this.getNextPosition()): void {

    /* Translate the slides container */
    this.transform = `translateX(${(1 - next) * 100}%)`;

    /* Update the new current position */
    this.current = next;

    /* The transitionend event (registered in constructor) will relaunch a new timer */

  }

  /**
   * Transition listener handler
   */
  onTransitionEnd(): void {

    /* Relaunch a new timer */
    this.start();

  }

  /**
   * Pagination listener handler
   */
  onPagination(page: number): void {

    /* Stop the automatic delay as the user interacts */
    this.stop();

    /* Move to the wanted slide */
    this.move(page);

  }

  /**
   * Calculate next position
   * @returns Next position
   */
  private getNextPosition(): number {

    return (this.current < this.total) ? (this.current + 1) : 1;

  }

}
