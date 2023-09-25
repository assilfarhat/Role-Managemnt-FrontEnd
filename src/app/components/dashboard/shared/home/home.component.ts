import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tokenPayload : any;
  public length: number;
  public users:any[];
  constructor(private api :UserService ,private AuthService: AuthService) { }

  ngOnInit(): void {
     this.tokenPayload = this.AuthService.decodedToken();
     this.getusers();
  }
  getusers(){
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
          
    }
}
