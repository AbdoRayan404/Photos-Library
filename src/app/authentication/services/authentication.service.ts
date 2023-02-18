import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import firebase from 'firebase/compat/app'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public sessionState: Subject<boolean>
  constructor(private afa: AngularFireAuth) { 
    this.sessionState = new Subject<boolean>

    this.afa.onAuthStateChanged((user)=> {
      if(user){
        this.sessionState.next(true)
      }else {
        this.sessionState.next(false)
      }
    })
  }

  async register(email: string, password: string) {
    await this.afa.createUserWithEmailAndPassword(email, password)
  }

  async login(email: string, password: string) {
    await this.afa.signInWithEmailAndPassword(email, password)
  }

  loginWithGoogle() {
    return this.afa.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }

  async logout() {
    await this.afa.signOut()
  }
}
