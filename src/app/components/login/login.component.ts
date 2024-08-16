import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IpService } from '../../shared/services/ip/ip.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  userIp!: string;
  session_date = new Date()
  unsuscriber$: Subject<any> = new Subject<any>();

  constructor(private fb: FormBuilder, private ipService: IpService) {}
  
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.getIp();
  }

  onSubmit(): void {
    if(this.loginForm.valid) {
      const data = {
        email: this.loginForm.controls['email'].value,
        password: this.loginForm.controls['password'].value,
      }
      console.log("enviado", data, this.userIp);
    }
  }

  getIp(): void {
    this.ipService.getIpAddress().pipe(takeUntil(this.unsuscriber$)).subscribe((data: any) => {
      this.userIp = data.ip;
    });
  }
}
