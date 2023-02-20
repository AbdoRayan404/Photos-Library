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
  loginState: string
  constructor(private fb: FormBuilder, private auth: AuthenticationService, private router: Router) { }
  
  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]]
    })
  }

  async login() {
    if(this.loginFormGroup.valid){
      try{
        await this.auth.login(this.loginFormGroup.value.email, this.loginFormGroup.value.password)
        this.router.navigate(['photos'])
      }catch(err: any) {
        this.loginState = this.auth.errorCodesToMessages[err.code]

        setTimeout(()=>{
          this.loginState = ''
        }, 2000)
      }
    }
  }

  async loginWithGoogle() {
    this.auth.loginWithGoogle().then(logged => {
      this.router.navigate(['photos'])
    })
  }
}
