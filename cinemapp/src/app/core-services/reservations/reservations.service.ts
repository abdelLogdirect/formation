import { Injectable } from '@angular/core';
import { StorageMap, JSONSchema } from '@ngx-pwa/local-storage';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Store } from '@core/store';

import { Reservation } from './reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  private readonly storageKey = 'booking';
  private readonly reservationsSchema: JSONSchema = {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        movieTitle: { type: 'string' },
        theaterTitle: { type: 'string' },
        scheduleId: { type: 'number' },
        scheduleHour: { type: 'string' },
      },
      required: ['movieTitle', 'theaterTitle', 'scheduleId', 'scheduleHour'],
    }
  };

  constructor(
    private store: Store,
    private storage: StorageMap,
  ) {

    this.storage.get<Reservation[]>(this.storageKey, this.reservationsSchema).pipe(
      /* Error catching must be first to be sure to have a default value */
      catchError(() => of([])),
      /* Storage could be empty */
      map((reservations) => reservations ?? []),
    ).subscribe((reservations) => {
      this.store.update({
        reservations,
        reservationsCount: reservations.length,
      });
    });

  }

  /**
   * Add a reservation in the store and in the client-side storage
   */
  add(reservation: Reservation): Observable<undefined> {

    const reservations = [...(this.store.selectSnapshot('reservations') ?? []), reservation];

    return this.save(reservations);

  }

  /**
   * Remove a reservation in the store and in the client-side storage
   */
  remove(reservationId: number): Observable<undefined> {

    const reservations = this.store.selectSnapshot('reservations');

    if (reservations && (reservations.length >= reservationId)) {

      reservations.splice(reservationId, 1);

      return this.save(reservations);

    }

    return of(undefined);

  }

  /**
   * Update reservations in the store and in client-side storage
   */
  private save(reservations: Reservation[]): Observable<undefined> {

    this.store.update({
      reservations,
      reservationsCount: reservations.length,
    });

    return this.storage.set(this.storageKey, reservations);

  }

}
