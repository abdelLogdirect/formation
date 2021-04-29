import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { Slide } from '../../models/slide.model';

@Component({
  selector: 'app-movie-slide',
  template: `
    <picture *ngIf="slide">
      <source [srcset]="slide.imgSrcFull" media="(min-width: 960px)">
      <source [srcset]="slide.imgSrc" media="(max-width: 959px)">
      <img [src]="slide.imgSrcFull" [alt]="slide.imgAlt">
    </picture>
  `,
  styleUrls: ['./movie-slide.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieSlideComponent implements OnInit {

  @Input() slide?: Slide;

  constructor() {}

  ngOnInit(): void {}

}
