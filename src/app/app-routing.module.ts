import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard'

const redirectToLogin = () => redirectUnauthorizedTo(['login'])

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'photos', loadChildren: () => import('./photos/photos.module').then(m => m.PhotosModule), canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectToLogin } },
  { path: 'auth', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
