import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movies-item',
  template: `
    <article *ngIf="movie">
      <mat-card>
        <a [routerLink]="['../movie', movie.id]">
          <img [src]="movie.imgSrc" [alt]="movie.title" mat-card-image loading="lazy" width="412">
        </a>
        <mat-card-title><a [routerLink]="['../movie', movie.id]">{{ movie.title }}</a></mat-card-title>
      </mat-card>
    </article>
  `,
  styleUrls: ['./movies-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviesItemComponent implements OnInit {

  @Input() movie?: Movie;

  constructor() {}

  ngOnInit(): void {}

}
