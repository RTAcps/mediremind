import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@services/auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from '@services/user/user.service';
import { User } from '@models/entity-interface';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  form: FormGroup;
  errorMessage = '';
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group(
      {
        name: ['', Validators.required, Validators.minLength(10)],
        email: ['', [Validators.required, Validators.email]],
        role: ['Paciente', Validators.required],
        password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{12,}$/)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.matchPasswords }
    );
  }

  matchPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  submit() {
    this.submitted = true;
    if (this.form.invalid) return;

    const user: User = this.form.value;

    this.userService.create(user).subscribe({
      next: () => this.auth.register(user).subscribe(() => {
        this.router.navigate(['/login']);
      }),
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Erro ao registrar usuário. Tente novamente.';
      },
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
