import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public users:any[];
  public role!:string;
  public fullName : string = "";
  p: number = 1;
  public length: number;
  constructor(private api :UserService 
    , private auth: AuthService) { }

  ngOnInit(): void {
    this.api.getUsers()
    .subscribe(res=>{
    this.users = res;
    this.length = this.users.length;
    console.log(this.users)
    });
   



  }
}
