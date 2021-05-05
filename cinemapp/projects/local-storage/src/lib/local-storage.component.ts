import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'logdirect-local-storage',
  template: `
    <p>
      local-storage works!
    </p>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      p {
        color: var(--color-primary, blue);
      }
    `
  ]
})
export class LocalStorageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
