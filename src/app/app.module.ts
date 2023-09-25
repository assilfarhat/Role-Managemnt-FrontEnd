import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/Auth/login/login.component';
import { SignupComponent } from './components/Auth/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/dashboard/shared/sidebar/sidebar.component';
import { HeaderComponent } from './components/dashboard/shared/header/header.component';
import { FooterComponent } from './components/dashboard/shared/footer/footer.component';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { NotfoundpageComponent } from './components/notfoundpage/notfoundpage.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TokenInterceptor } from './core/helpers/token.interceptor';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NotPermitedComponent } from './components/not-permited/not-permited.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NotfoundpageComponent,
    UnauthorizedComponent,
    NotPermitedComponent,
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    CommonModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3500,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }), // ToastrModule added
   
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi:true

  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
