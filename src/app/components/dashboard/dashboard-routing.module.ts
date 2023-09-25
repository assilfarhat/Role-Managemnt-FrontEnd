import { AddroleComponent } from './Roles/addrole/addrole.component';
import { UsersComponent } from './users/users.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { ProductsComponent } from './products/products.component';
import { ProductupdateComponent } from './productupdate/productupdate.component';
import { HomeComponent } from './shared/home/home.component';


const routes: Routes = [
  { path: '', component: DashboardComponent , children: [
    { path: 'home', component: HomeComponent },
    { path: 'Users', component: UsersComponent },
    { path: 'Roles', component: AddroleComponent },
    { path: 'Products', component: ProductsComponent }, 
    { path: 'Products/update/:id', component: ProductupdateComponent },
    { path: 'Roles/Permissions/:id', component: PermissionsComponent },
    
 



]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
