import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TextInputComponent } from '../../shared/components/text-input/text-input.component';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { debounce, debounceTime, finalize, map, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TextInputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {}

  errors: string[] | null = null;
  complexPassword =
    "(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$";

  registerForm = this.fb.group({
    displayName: ['', Validators.required],
    email: [
      '',
      [Validators.required, Validators.email],
      [this.validateEmailNotTaken()],
    ],
    password: [
      '',
      [Validators.required, Validators.pattern(this.complexPassword)],
    ],
  });

  ngOnInit() {}

  onSubmit() {
    this.accountService
      .register({
        displayName: this.registerForm.value.displayName,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
      })
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/Shop');
        },
        error: (error) => {
          this.errors = error.errors;
          console.log(this.errors);
        },
      });
  }

  onChange(event: any) {}

  validateEmailNotTaken(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      // We will wait a secound after the user type to call the API
      // After that we're switching the result with the switch map operator to return the value of validator
      return control.valueChanges.pipe(
        debounceTime(500),
        take(1),
        switchMap(() =>
          this.accountService.checkEmailExists(control.value).pipe(
            map((result) => (result ? { emailExists: true } : null)),
            finalize(() => control.markAllAsTouched())
          )
        )
      );
    };
  }
}
