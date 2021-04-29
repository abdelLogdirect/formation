import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Theater } from '../../models/theater.model';
import { CinemaService } from '../../services/cinema.service';

@Component({
  template: `
    <div>
      <div *ngIf="theater$ | async as theater; else loading">
        <app-theaters-item [theater]="theater"></app-theaters-item>
        <app-theater-schedules [theater]="theater"></app-theater-schedules>
      </div>
      <ng-template #loading>
        <div class="center"><mat-progress-spinner mode="indeterminate"></mat-progress-spinner></div>
      </ng-template>
    </div>
  `,
  styleUrls: ['./theater.page.css'],
})
export class TheaterPage implements OnInit {

  theater$?: Observable<Theater>;

  constructor(
    private cinema: CinemaService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.theater$ = this.route.paramMap.pipe(
      map((params) => params.get('id') ?? '1'),
      switchMap((id) => this.cinema.getTheater(id)),
    );

  }

}
