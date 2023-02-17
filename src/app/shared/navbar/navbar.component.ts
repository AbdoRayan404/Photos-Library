import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private afa: AngularFireAuth) { }

  ngOnInit(): void {
    
  }

  async logout() {
    try{
      await this.afa.signOut()
      this.router.navigate(['login'])
    }catch(err) {
      console.log(err)
    }
  }

  async goToHome() {
    this.router.navigate(['home'])
  }

  async goToPhotos() {
    this.router.navigate(['photos'])
  }
}
