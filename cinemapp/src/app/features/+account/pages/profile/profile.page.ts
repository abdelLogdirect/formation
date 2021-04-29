import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

import { Store } from '@core/store';
import { Reservation } from '@core/reservations';

import { BookingService } from '../../services/booking.service';

@Component({
  template: `
    <mat-card>
      <h1 i18n="@@profileTitle">Profil</h1>
      <p *ngIf="bookingProgress" i18n="@@profileInProgress">Réservation en cours...</p>
      <app-reservations-list *ngIf="reservations$ | async as reservations"
      [reservations]="reservations" (cancel)="cancel($event)"></app-reservations-list>
      <br>
      <button type="button" mat-stroked-button color="accent" routerLink="../logout" i18n="@@profileLogout">Se désauthentifier</button>
    </mat-card>
  `,
  styleUrls: ['./profile.page.css'],
})
export class ProfilePage implements OnInit {

  reservations$?: Observable<Reservation[]>;
  bookingProgress = false;

  constructor(
    private store: Store,
    private booking: BookingService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {

    this.reservations$ = this.store.select('reservations');

    this.initBooking();

  }

  /**
   * Check if a booking is provided in the URL, and if so try to do the booking
   */
  private initBooking(): void {

    const schedule = this.route.snapshot.queryParamMap.get('schedule');

    if (schedule) {

      this.bookingProgress = true;

      this.booking.book(schedule).subscribe({
        next: ({ error }) => {

          this.bookingProgress = false;

          if (!error) {
            this.snackBar.open($localize`:@@bookingSuccess:Réservation confirmée`, `OK`, { duration: 2000 });
          } else {
            this.snackBar.open(error.message, $localize`:@@ok:OK`, { duration: 2000 });
          }

        },
        error: () => {

          this.bookingProgress = false;

          this.snackBar.open(
            $localize`:@@bookingError:Echec de la réservation (pas de connexion Internet)`,
            $localize`:@@ok:OK`,
            { duration: 2000 },
          );

        }
      });

    }

  }

  /**
   * Cancel a reservation
   */
  cancel(id: number): void {

    this.booking.unbook(id);

  }

}
