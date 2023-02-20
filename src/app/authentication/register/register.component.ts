import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerFormGroup: FormGroup
  registerState: string
  constructor(private fb: FormBuilder, private auth: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.registerFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]]
    })
  }

  async register() {
    if(this.registerFormGroup.valid) {
      try{
        await this.auth.register(this.registerFormGroup.value.email, this.registerFormGroup.value.password)
        this.router.navigate(['photos'])
      }catch(err: any) {
        this.registerState = this.auth.errorCodesToMessages[err.code]

        setTimeout(()=>{
          this.registerState = ''
        }, 2000)
      }
    }
  }
}
