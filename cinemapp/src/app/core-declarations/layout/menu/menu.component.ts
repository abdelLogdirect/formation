import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-menu',
  template: `
    <mat-toolbar color="primary">
      <a routerLink="/cinema/movies" routerLinkActive="nav-active">
        <mat-icon>movie</mat-icon>
        <ng-container i18n="@@menuMovies">Films</ng-container>
      </a>
      <a routerLink="/cinema/theaters" routerLinkActive="nav-active">
        <mat-icon>theaters</mat-icon>
        <ng-container i18n="@@menuTheaters">Cinémas</ng-container>
      </a>
      <a *ngIf="isAuthenticated" routerLink="/account/profile" routerLinkActive="nav-active">
        <mat-icon [matBadge]="reservationsCountBadge" matBadgePosition="above before"
        matBadgeColor="accent" matBadgeSize="small">event</mat-icon>
        <ng-container i18n="@@menuReservations">Mes résas</ng-container>
      </a>
      <a *ngIf="!isAuthenticated" routerLink="/account/login" routerLinkActive="nav-active">
        <mat-icon>account_circle</mat-icon>
        <ng-container i18n="@@menuAccount">Compte</ng-container>
      </a>
    </mat-toolbar>
  `,
  styleUrls: ['./menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnInit {

  @Input() isAuthenticated?: boolean | null = false;
  @Input() reservationsCount?: number | null = 0;

  get reservationsCountBadge(): string | undefined {
    return this.reservationsCount?.toString();
  }

  constructor() {}

  ngOnInit(): void {}

}
