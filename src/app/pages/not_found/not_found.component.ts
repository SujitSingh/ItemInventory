import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <h2 class="not-found">Page not found</h2>
  `,
  styles: [`
    h2.not-found{
      color: red;
    }
  `]
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
