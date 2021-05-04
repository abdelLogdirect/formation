import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  template: `
    <ul class="pagination">
      <li *ngFor="let slide of slides; index as i" (click)="onClick(i+1)">{{ i+1 }}</li>
    </ul>
  `,
  styleUrls: ['./pagination.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnInit {

  @Input() slides?: Iterable<unknown>;
  @Output() pagination = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(index: number): void {

    this.pagination.emit(index);

  }

}
