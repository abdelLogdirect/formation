import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-city',
  template: `
    <div *ngIf="form" [formGroup]="form">
      <mat-form-field>
        <input type="text" name="city" [matAutocomplete]="cityAuto" formControlName="city"
        matInput placeholder="Votre ville" i18n-placeholder="@@registerCity" autocomplete="off">
      </mat-form-field>
      <mat-autocomplete #cityAuto>
        <mat-option *ngFor="let suggestion of suggestions" [value]="suggestion">{{ suggestion }}</mat-option>
      </mat-autocomplete>
    </div>
  `,
  styleUrls: ['./city.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CityComponent implements OnInit {

  @Input() form?: FormGroup;
  @Input() suggestions: string[] | null = [];

  constructor() {}

  ngOnInit(): void {}

}
