import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required, Validators.minLength(6)]
    });
  }

  onSubmit(): void {
    if(this.registerForm.valid) {
      const data = {
        email: this.registerForm.controls['emai'].value,
        password: this.registerForm.controls['password'].value
      }
      console.log("registrado", data);
      this.authService.register(data);
    }
  }
}
