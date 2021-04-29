import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-passwords',
  template: `
    <div *ngIf="form">
      <div>
        <mat-form-field>
          <input type="password"
          matInput required autocomplete="off" placeholder="Votre mot de passe" i18n-placeholder="@@reactivePassword">
          <mat-error i18n="@@reactivePasswordMissing">Le mot de passe est obligatoire</mat-error>
        </mat-form-field>
        <mat-form-field>
          <input type="password"
          matInput autocomplete="off" placeholder="Confirmez-le" i18n-placeholder="@@reactivePasswordConfirm">
        </mat-form-field>
        <!-- i18n: @@reactivePasswordNotMatching -->
    </div>
  `,
  styleUrls: ['./passwords.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordsComponent implements OnInit {

  @Input() form?: FormGroup;

  get group(): FormGroup | null {
    return this.form?.get('password') as FormGroup | null;
  }

  get password1(): FormControl | null {
    return this.group?.get('password1') as FormControl | null;
  }

  get password2(): FormControl | null {
    return this.group?.get('password2') as FormControl | null;
  }

  constructor() {}

  ngOnInit(): void {}

}
