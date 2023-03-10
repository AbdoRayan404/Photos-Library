import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard'
import { HomeComponent } from './home/home.component';

const redirectToLogin = () => redirectUnauthorizedTo(['auth/login'])

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectToLogin } },
  { path: 'photos', loadChildren: () => import('./photos/photos.module').then(m => m.PhotosModule), canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectToLogin } },
  { path: 'auth', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
