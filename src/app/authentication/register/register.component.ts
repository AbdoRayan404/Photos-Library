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
  constructor(private fb: FormBuilder, private authentication: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.registerFormGroup = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  async register() {
    if(this.registerFormGroup.valid) {
      await this.authentication.register(this.registerFormGroup.value.email, this.registerFormGroup.value.password)
      this.router.navigate(['photos'])
    }
  }
}
