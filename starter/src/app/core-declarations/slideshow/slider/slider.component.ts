import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-slider',
  template: `
    <input type="range" min="1" [max]="max" value="1" (change)="onChange($event)">
  `,
  styleUrls: ['./slider.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderComponent implements OnInit {

  @Input() max = 0;
  @Output() pagination = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onChange(event: Event): void {

    const value = Number.parseInt((event.target as HTMLInputElement).value);

    this.pagination.emit(value);

  }

}
