import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-details',
  template: `
    <article *ngIf="movie">
      <mat-card>
        <iframe *ngIf="videoYoutube" [src]="videoYoutube" mat-card-image></iframe>
        <mat-card-title>{{ movie.title }}</mat-card-title>
        <mat-card-content>
          <p><ng-container i18n="@@movieReleaseDate">Date de sortie</ng-container> : {{ movie.releasedDate | date }}</p>
          <p>{{ movie.summary }}</p>
        </mat-card-content>
      </mat-card>
    </article>
  `,
  styleUrls: ['./movie-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetailsComponent implements OnInit {

  @Input() movie?: Movie;

  get videoYoutube(): SafeResourceUrl | undefined {
    return this.movie ? this.sanitizer.bypassSecurityTrustResourceUrl(this.movie.videoYoutube) : undefined;
  }

  constructor(
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {}

}
