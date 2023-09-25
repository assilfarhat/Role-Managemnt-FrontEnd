import { UserService } from 'src/app/core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { PermissionsService } from 'src/app/core/services/permissions.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customvalidator } from 'src/app/core/utils/custumvalidator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addrole',
  templateUrl: './addrole.component.html',
  styleUrls: ['./addrole.component.css']
})
export class AddroleComponent implements OnInit {
  p: number = 1;
  roles: any[]
  newRoleName: string;
  public length: number;
  addroleForm: FormGroup;
  added: boolean;
  public perm: string = "";
  constructor(private toastr: ToastrService,private router: Router,
    private formBuilder: FormBuilder,private PermissionsService: PermissionsService) {}

  ngOnInit() {
    this.getroles();

    this.added=false;
    this.addroleForm = this.formBuilder.group(
      {
        RoleName: ['', [Validators.minLength(3), Validators.required]],   
      }
      
    )
  }
  getroles(){
   
    this.perm = "Role.View";
    this.PermissionsService.verifiepermissions(this.perm).subscribe(permissionExists => {
      if (permissionExists) {
        this.PermissionsService.getroles()
        .subscribe(res=>{
        this.roles = res;
        this.length = this.roles.length;
        console.log(this.roles)
        
          },
          error => {
            console.log("Error fetching users:", error);
          }
        );
        console.log('Permission exists!');
      } else {
        console.log('Permission does not exist.');
        this.router.navigate(['not-permited']);
      }
    });
  }

 AddRole(){
  this.perm = "Role.Create";
    this.PermissionsService.verifiepermissions(this.perm).subscribe(permissionExists => {
      if (permissionExists) {
        if (this.addroleForm.valid) {
          console.log("1",this.addroleForm.value);
          let role = {
            ...this.addroleForm.value             
          }
          console.log("roleObj",role)
          this.PermissionsService.AddRole(role)
          .subscribe({
            next:(res=>{
              console.log(res);
      
              this.toastr.success('Role created successfully ')   
              window.location.reload()
            }),
            error:(err=>{
              console.log(err.message);
              this.toastr.error('something went wrong')
            })
          });
        console.log('Permission exists!');
      } else {
        console.log('Permission does not exist.');
        this.router.navigate(['not-permited']);
      }
 }})
  
  }
  





  
  delete(role:any): void{
    this.perm = "Role.Delete";
    this.PermissionsService.verifiepermissions(this.perm).subscribe(permissionExists => {
      if (permissionExists) {
        if(confirm("Are you sure to delete "+role.firstName)) {
          console.log("user id :" ,role.id)
          this.PermissionsService.deleteRole(role.id).subscribe(
            {
              next: () => {
                let i = this.roles.indexOf(role)
               this.roles.splice(i, 1);
                this.toastr.success(role.firstName+' has been deleted successfully','Success');
              }, error: (err) => {
                console.log("err" + err.message);
                this.toastr.error('something went wrong !','Error');
        
              }
            }
          )
         
          
        }
        console.log('Permission exists!');
      } else {
        console.log('Permission does not exist.');
        this.router.navigate(['not-permited']);
      }
    });
    
  }
 

}
