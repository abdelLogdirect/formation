import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Theater } from '../../models/theater.model';
import { CinemaService } from '../../services/cinema.service';

@Component({
  template: `
    <div>
      <app-theaters-list *ngIf="theaters$ | async as theaters; else loading" [theaters]="theaters"></app-theaters-list>
      <ng-template #loading>
        <div class="center"><mat-progress-spinner mode="indeterminate"></mat-progress-spinner></div>
      </ng-template>
    </div>
  `,
  styleUrls: ['./theaters.page.css'],
})
export class TheatersPage implements OnInit {

  theaters$?: Observable<Theater[]>;

  constructor(
    private cinema: CinemaService,
  ) { }

  ngOnInit(): void {

    this.theaters$ = this.cinema.getTheaters();

  }

}
