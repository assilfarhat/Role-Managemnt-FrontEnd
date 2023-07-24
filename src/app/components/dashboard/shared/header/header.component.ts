import { UserService } from 'src/app/core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userIsAuthenticated = false;
  public role!:string;

  public fullName : string = "";
  constructor(private auth: AuthService, private userService:UserService) { }

  ngOnInit(): void {
    this.userIsAuthenticated = this.auth.isLoggedIn();

    this.userService.getFullNameFromStore()
    .subscribe(val=>{
      const fullNameFromToken = this.auth.getfullNameFromToken();
      this.fullName = val || fullNameFromToken
     
    });

    this.userService.getRoleFromStore()
    .subscribe(val=>{
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
     
    })
  }
  
  loggingout(){
    this.auth.signOut();
  }

}
