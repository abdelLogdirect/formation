import { Component, OnInit } from '@angular/core';

import { AccountService } from '../../services/account.service';

@Component({
  template: `
    <mat-card>
      <h1 i18n="@@logoutTitle">Désauthentification</h1>
      <p i18n="@@logoutSuccess">Désauthentification réussie.</p>
      <p><a routerLink="../login" i18n="@@logoutLogAgain">Se réauthentifier</a></p>
    </mat-card>
  `,
  styleUrls: ['./logout.page.css'],
})
export class LogoutPage implements OnInit {

  constructor(
    private account: AccountService,
  ) {}

  ngOnInit(): void {

    this.account.logout().subscribe();

  }

}
