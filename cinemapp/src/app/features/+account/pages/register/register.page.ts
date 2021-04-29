import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { switchMap, distinctUntilChanged, debounceTime, filter } from 'rxjs/operators';

import { AccountService } from '../../services/account.service';

@Component({
  template: `
    <mat-card>
      <form method="post">
        <h1 i18n="@@registerTitle">Inscription</h1>
        <p i18n="@@registerWarning">
          Attention : il s'agit d'une app de test. E-mail et mot de passe sont stockés en clair.
        </p>
        <ul *ngIf="errors.length">
          <li *ngFor="let error of errors">{{ error }}</li>
        </ul>
        <mat-form-field>
          <input type="email" name="email"
          matInput required autocomplete="email" placeholder="Votre adresse e-mail" i18n-placeholder="@@registerEmail">
          <!-- i18n: @@registerEmailMissing -->
        </mat-form-field>
        <mat-form-field>
          <input type="password" name="password"
          matInput required autocomplete="off" placeholder="Votre mot de passe" i18n-placeholder="@@registerPassword">
          <mat-error i18n="@@registerPasswordMissing">Le mot de passe est obligatoire</mat-error>
        </mat-form-field>
        <div>
          <p i18n="@@registerCard">J'ai une carte :</p>
          <mat-radio-group name="card">
            <mat-radio-button value="" checked i18n="@@registerCardNo">Non</mat-radio-button>
            <mat-radio-button value="ugc">UGC</mat-radio-button>
            <mat-radio-button value="gaumont">Gaumont</mat-radio-button>
          </mat-radio-group>
        </div>
        <mat-form-field>
          <mat-select name="category" placeholder="Genre de film préféré" i18n-placeholder="@@registerGenre">
            <mat-option value="" i18n="@@registerGenreNone">Non spécifié</mat-option>
            <mat-option value="action" i18n="@@registerGenreAction">Action</mat-option>
            <mat-option value="comedy" i18n="@@registerGenreComedy">Comédie</mat-option>
            <mat-option value="drama" i18n="@@registerGenreDrama">Drame</mat-option>
            <mat-option value="horror" i18n="@@registerGenreHorror">Horreur</mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field>
          <textarea name="profile"
          matInput cdkTextareaAutosize placeholder="A propos de vous" i18n-placeholder="@@registerAboutYou"></textarea>
        </mat-form-field>
        <mat-form-field>
          <input type="text" name="city" [matAutocomplete]="cityAuto"
          matInput placeholder="Votre ville" i18n-placeholder="@@registerCity" autocomplete="off">
        </mat-form-field>
        <mat-autocomplete #cityAuto></mat-autocomplete>
        <div>
          <mat-checkbox name="conditions" required>
            <ng-container i18n="@@registerConditions">J'accepte les conditions d'utilisation</ng-container>. *
          </mat-checkbox>
        </div>
        <button type="submit" mat-raised-button color="accent" i18n="@@registerSubmit">
          Valider l'inscription
        </button>
        <p class="center"><a routerLink="../login" i18n="@@registerExistingAccount">Déjà inscrit/e ? Authentifiez-vous.</a></p>
      </form>
    </mat-card>
  `,
  styleUrls: ['./register.page.css'],
})
export class RegisterPage implements OnInit, AfterViewInit, OnDestroy {

  errors: string[] = [];

  constructor(
    private account: AccountService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {}

  /**
   * Send form data to the API, then redirect to profile on success or display error
   */
  register(): void {

    const loading = this.snackBar.open($localize`:@@registerInProgress:Inscription en cours...`);

    this.account.register({ email: '', password: '' }).subscribe({
      next: ({ error }) => {

        loading.dismiss();

        if (!error) {

          this.snackBar.open($localize`:@@registerSuccess:Inscription réussie`, $localize`:@@ok:OK`, { duration: 2000 });

          this.router.navigate(['/account/login']).catch(() => {});

        } else {
          this.errors = error.errors ?? [error.message];
        }

      },
      error: () => {

        loading.dismiss();

        this.errors = [$localize`:@@noInternet:Pas de connexion Internet`];

      },
    });

  }

}
