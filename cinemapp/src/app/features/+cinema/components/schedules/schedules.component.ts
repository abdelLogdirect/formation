import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { Schedule } from '../../models/schedule.model';

@Component({
  selector: 'app-schedules',
  template: `
    <mat-card>
      <ng-content></ng-content>
      <mat-card-actions>
        <a mat-raised-button color="accent" *ngFor="let schedule of schedules"
        (click)="book(schedule.id)" (keyup)="book(schedule.id)">{{ schedule.hour }}</a>
      </mat-card-actions>
    </mat-card>
  `,
  styleUrls: ['./schedules.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchedulesComponent implements OnInit {

  @Input() schedules: Schedule[] = [];

  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {}

  /**
   * Redirect to the profile with the reservation id in URL
   */
  book(schedule: number): void {

    this.router.navigate(['/account/profile'], {
      queryParams: { schedule },
    }).catch(() => {});

  }

}
