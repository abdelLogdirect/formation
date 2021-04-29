import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-pagination',
  template: `
    <mat-slider min="1" [max]="total" [value]="current" (change)="onChange($event)"></mat-slider>
  `,
  styleUrls: ['./pagination.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnInit {

  @Input() total = 0;
  @Input() current = 1;
  @Output() readonly pagination = new EventEmitter<number>();

  onChange(event: MatSliderChange): void {

    this.pagination.emit(event.value ?? 1);

  }

  ngOnInit(): void {}

}
