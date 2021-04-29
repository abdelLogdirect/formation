import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { Reservation } from '@core/reservations';

@Component({
  selector: 'app-reservations-list',
  template: `
    <div>
      <p i18n="@@profileReservationsNumber">{reservations.length, plural,
      =0 {Vous n'avez pas de réservation}
      =1 {Vous avez une réservation}
      other {Vous avez {{ reservations.length }} réservations}}.</p>
      <div *ngFor="let reservation of reservations; index as i">
        <ul>
          <li><ng-container i18n="@@profileMovie">Film</ng-container> : {{ reservation.movieTitle }}</li>
          <li><ng-container i18n="@@profileTheater">Cinéma</ng-container> : {{ reservation.theaterTitle }}</li>
          <li><ng-container i18n="@@profileSchedule">Séance</ng-container> : {{ reservation.scheduleHour }}</li>
        </ul>
        <button type="button" mat-stroked-button color="primary" (click)="onClick(i)" i18n="@@profileCancel">
          Annuler cette réservation
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./reservations-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReservationsListComponent implements OnInit {

  @Input() reservations: Reservation[] = [];
  @Output() readonly cancel = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  onClick(reservationId: number): void {

    this.cancel.emit(reservationId);

  }

}
