import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginFormGroup: FormGroup
  constructor(private fb: FormBuilder, private auth: AuthenticationService, private router: Router) { }
  
  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  async login() {
    if(this.loginFormGroup.valid){
      await this.auth.loginWithRegister(this.loginFormGroup.value.email, this.loginFormGroup.value.password)
      this.router.navigate(['photos'])
    }
  }

  async loginWithGoogle() {
    this.auth.loginWithGoogle().then(logged => {
      this.router.navigate(['photos'])
    })
  }
}
