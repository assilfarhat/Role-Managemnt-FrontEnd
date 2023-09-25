import { NgxPaginationModule } from 'ngx-pagination';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { UsersComponent } from './users/users.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AddroleComponent } from './Roles/addrole/addrole.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PermissionsComponent } from './permissions/permissions.component';
import { ProductsComponent } from './products/products.component';
import { ProductupdateComponent } from './productupdate/productupdate.component';
import { HomeComponent } from './shared/home/home.component';


@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    AddroleComponent,
    PermissionsComponent,
    ProductsComponent,
    ProductupdateComponent,
    HomeComponent,
    
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
