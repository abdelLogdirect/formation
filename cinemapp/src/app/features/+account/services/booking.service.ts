import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '@core/environment';
import { Reservation, ReservationsService } from '@core/reservations';
import { APIData } from '@core/api';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(
    private http: HttpClient,
    private reservations: ReservationsService,
  ) {}

  /**
   * Send the reservation to the API and save it locally on success
   */
  book(scheduleId: string | number): Observable<APIData<Reservation>> {

    /* id is a number if it comes from the API data but a string it comes from the URL */
    const schedule = {
      schedule: (typeof scheduleId === 'number') ? scheduleId : Number.parseInt(scheduleId, 10),
    };

    return this.http.post<APIData<Reservation>>(`${environment.apiUrl}/api/v2/book`, schedule).pipe(
      tap(({ data, error }) => {
        if (!error) {
          this.reservations.add(data).subscribe();
        }
      }),
    );

  }

  /**
   * Remove the reservation locally
   */
  unbook(id: number): void {

    this.reservations.remove(id).subscribe();

  }

}
