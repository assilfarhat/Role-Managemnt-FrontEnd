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


@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    AddroleComponent,
    
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxPaginationModule,
  ]
})
export class DashboardModule { }
