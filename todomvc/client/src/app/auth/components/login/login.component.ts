import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';


import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import { selectUser } from '../../store/selector';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public form!: FormGroup;

  private readonly destroy$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private store: Store,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) {
  };

  public ngOnInit(): void {
    this.initializeForm();
    this.chacUserAndInitForm();
  };

  public onSubmit(): void {
    this.form.disable();

    this.authService.login(this.form.value)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
        () => this.router.navigate(['todoList-form']),
        error => {
          this._snackBar.open(error.error.message, '', {duration: 3000});
          console.warn(error);
          this.form.enabled
        }
      )
  };

  public ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  };

  private initializeForm(): void {
    this.form = this.fb.group({
      email: ['', [
        Validators.email,
        Validators.required]
      ],
      password: ['', [
        Validators.required,
        Validators.minLength(6)]]
    });
  };

  private chacUserAndInitForm(): void {
    this.store.select(selectUser)
      .pipe(filter((user: RegisterRequestInterface) => !!user))
      .subscribe((user: RegisterRequestInterface) => {
          console.log(user);
          debugger
          this.form.get("email").setValue(user?.email);
          this.form.get("password").setValue(user?.password);
        }
      )
  };
}
