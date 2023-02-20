import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import firebase from 'firebase/compat/app'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public sessionState: Subject<boolean>
  public errorCodesToMessages: any
  constructor(private afa: AngularFireAuth) { 
    this.sessionState = new Subject<boolean>

    this.afa.onAuthStateChanged((user)=> {
      if(user){
        this.sessionState.next(true)
      }else {
        this.sessionState.next(false)
      }
    })

    this.errorCodesToMessages = {
      'auth/user-not-found': 'This user does not exist.',
      'auth/wrong-password': 'Password is incorrect.',
      'auth/invalid-email': 'Email is invalid.',
      'auth/email-already-in-use': 'This email is already used.',
      'auth/invalid-password': 'Password should be 6-32 characters'
    }
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
