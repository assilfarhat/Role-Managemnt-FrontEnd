import { SignupComponent } from './components/Auth/signup/signup.component';
import { LoginComponent } from './components/Auth/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { NotfoundpageComponent } from './components/notfoundpage/notfoundpage.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NotPermitedComponent } from './components/not-permited/not-permited.component';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'not-permited', component: NotPermitedComponent },
  { path: 'dashboard', loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate :[AuthGuard] },
   { path: '**', component: NotfoundpageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
