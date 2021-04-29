import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { distinctUntilChanged, debounceTime, filter, switchMap } from 'rxjs/operators';

import { AccountService } from '../../services/account.service';
import { AutocompleteService } from '../../services/autocomplete.service';

@Component({
  template: `
    <mat-card>
      <form method="post" (ngSubmit)="register()">
        <h1 i18n="@@reactiveTitle">Inscription</h1>
        <p i18n="@@reactiveWarning">Attention : il s'agit d'une app de test. E-mail et mot de passe sont stockés en clair.</p>
        <app-errors [errors]="errors"></app-errors>
        <button type="submit" mat-raised-button color="accent" i18n="@@reactiveSubmit">
          Valider l'inscription
        </button>
        <p class="center"><a routerLink="../login" i18n="@@reactiveExistingAccount">Déjà inscrit/e ? Authentifiez-vous.</a></p>
      </form>
    </mat-card>
  `,
  styleUrls: ['./register-reactive.page.css'],
})
export class RegisterReactivePage implements OnInit, OnDestroy {

  errors: string[] = [];

  constructor(
    private account: AccountService,
    private autocomplete: AutocompleteService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {}

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

          this.router.navigate(['../login'], { relativeTo: this.route, queryParamsHandling: 'preserve' }).catch(() => {});

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
