import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AccountService } from '../../services/account.service';

@Component({
  template: `
    <mat-card>
      <form method="post" (ngSubmit)="login()">
        <h1 i18n="@@loginTitle">Authentification</h1>
        <ul *ngIf="errors.length">
          <li *ngFor="let error of errors">{{ error }}</li>
        </ul>
        <mat-form-field>
          <input type="email" name="email" [(ngModel)]="formValues.email"
          matInput required autocomplete="email" placeholder="Votre adresse e-mail" i18n-placeholder="@@loginEmail">
          <mat-error i18n="@@loginEmailMissing">L'e-mail est obligatoire</mat-error>
        </mat-form-field>
        <mat-form-field>
          <input type="password" name="password" [(ngModel)]="formValues.password"
          matInput required autocomplete="off" placeholder="Votre mot de passe" i18n-placeholder="@@loginPassword">
          <mat-error i18n="@@loginPasswordMissing">Le mot de passe est obligatoire</mat-error>
        </mat-form-field>
        <button type="submit" mat-raised-button color="accent" i18n="@@loginSubmit">S'authentifier</button>
        <p class="center"><a routerLink="../register" i18n="@@loginNoAccount">Pas encore inscrit/e ? Créez un compte.</a></p>
      </form>
    </mat-card>
  `,
  styleUrls: ['./login.page.css'],
})
export class LoginPage implements OnInit {

  formValues = {
    email: '',
    password: '',
  };
  errors: string[] = [];

  constructor(
    private router: Router,
    private account: AccountService,
  ) {}

  ngOnInit(): void {}

  login(): void {

    this.account.login(this.formValues).subscribe(({ error }) => {

      if (!error) {

        this.router.navigate(['/account/profile']).catch(() => {});

      } else {

        this.errors = error.errors ?? [];

      }

    });

  }

}

