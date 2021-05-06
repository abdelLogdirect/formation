import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fromEvent, Observable, of, Subscription } from 'rxjs';
import { distinctUntilChanged, debounceTime, filter, switchMap, debounce, catchError } from 'rxjs/operators';

import { AccountService } from '../../services/account.service';
import { AutocompleteService } from '../../services/autocomplete.service';

@Component({
  template: `
    <mat-card>
      <form method="post" (ngSubmit)="register()" [formGroup]="form">
        <h1 i18n="@@reactiveTitle">Inscription</h1>
        <p i18n="@@reactiveWarning">Attention : il s'agit d'une app de test. E-mail et mot de passe sont stockés en clair.</p>
        <app-email [form]="form"></app-email>
        <app-passwords [form]="form"></app-passwords>
        <app-city [form]="form" [suggestions]="citySuggestions"></app-city>
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

  form = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormGroup({
      password1: new FormControl('', Validators.required),
      password2: new FormControl(''),
    }),
    city: new FormControl(''),
  });
  errors: string[] = [];
  citySuggestions: string[] = [];
  citySubscription?: Subscription;

  constructor(
    private account: AccountService,
    private autocomplete: AutocompleteService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {

    const city = this.form.get('city') as FormControl;

    this.citySubscription = (city.valueChanges as Observable<string>).pipe(
      filter((value) => value.length > 2),
      debounceTime(500),
      switchMap((value) => this.autocomplete.getCitySuggestions(value)),
      catchError(() => of([])),
    ).subscribe((suggestions) => {
      this.citySuggestions = suggestions;
    });

  }

  ngOnDestroy(): void {

    this.citySubscription?.unsubscribe();

  }

  /**
   * Send form data to the API, then redirect to profile on success or display error
   */
  register(): void {

    const loading = this.snackBar.open($localize`:@@registerInProgress:Inscription en cours...`);

    this.account.register(this.form.value).subscribe({
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
