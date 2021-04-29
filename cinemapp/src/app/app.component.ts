import { Component, OnInit } from '@angular/core';
import { Network } from '@ngx-pwa/offline';
import { Observable } from 'rxjs';

import { Store } from '@core/store';
import { ReservationsService } from '@core/reservations';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <app-header [isAuthenticated]="isAuthenticated$" [reservationsCount]="reservationsCount$"></app-header>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  isAuthenticated$?: boolean;
  reservationsCount$?: number;

  constructor(
    protected store: Store,
    protected reservations: ReservationsService,
    protected network: Network,
  ) {}

  ngOnInit(): void {

    this.isAuthenticated$ = false;

    this.reservationsCount$ = 0;

  }

}
