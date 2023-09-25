import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { PermissionsService } from 'src/app/core/services/permissions.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public users:any[];
  public per:any[];
  public role!:string;
  public fullName : string = "";
  public perm: string = "";
  p: number = 1;
  authorized:boolean
  public length: number;
  constructor(private api :UserService ,private PermissionsService: PermissionsService
   , private toastr: ToastrService , private auth: AuthService,private router: Router) { }

  ngOnInit(): void {
  this.getusers();

  }

  getusers(){
    this.perm = "User.View";
      this.PermissionsService.verifiepermissions(this.perm).subscribe(permissionExists => {
        if (permissionExists) {
          this.api.getUsers().subscribe(
            res => {
              this.users = res;
              this.length = this.users.length;
              console.log(this.users);
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
    
    

    
  
  delete(user:any): void{
    this.perm = "User.Delete";
    this.PermissionsService.verifiepermissions(this.perm).subscribe(permissionExists => {
      if (permissionExists) {  
        if(confirm("Are you sure to delete "+user.firstName)) {
          console.log("user id :" ,user.id)
          this.api.deleteUser(user.id).subscribe(
            {
              next: () => {
                let i = this.users.indexOf(user)
               this.users.splice(i, 1);
                this.toastr.success(user.firstName+' has been deleted successfully','Success');
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
    
  })}
  

   
        
      
    
  }

