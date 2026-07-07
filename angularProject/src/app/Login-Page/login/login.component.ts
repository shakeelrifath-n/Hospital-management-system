import {ChangeDetectorRef, Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../security/service/auth.service';
import { Role } from '../../user/user.model';
import { StorageUtil } from '../../util/storage.util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password)
        .subscribe({
          next: res => {
            console.log('success', res);
            this.redirectBasedOnRole();
          },
          error: error => {
            this.errorMessage = 'Invalid login credentials';
          }
        });
    } else {
      this.errorMessage = 'Please fill in all required fields correctly';
    }
  }

  private redirectBasedOnRole() {
    const user = StorageUtil.getFromLocalStorage('sessionUser');
    if (!user) {
      this.router.navigate(['/welcome']);
      return;
    }

    const role = user.role;
    switch (role) {
      case Role.ADMIN:
        this.router.navigate(['/adminprofile']);
        break;
      case Role.DOCTOR:
        this.router.navigate(['/prescriptions']);
        break;
      case Role.PATIENT:
        this.router.navigate(['/patientprofile']);
        break;
      case Role.NURSE:
        this.router.navigate(['/nurseprofile']);
        break;
      case Role.RECEPTIONIST:
        this.router.navigate(['/receptionist-profile']);
        break;
      case Role.PHARMACIST:
        this.router.navigate(['/medicine-bill-list']);
        break;
      case Role.LAB:
        this.router.navigate(['/tests']);
        break;
      default:
        this.router.navigate(['/welcome']);
    }
  }
}
