import { UserService } from 'src/app/core/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addrole',
  templateUrl: './addrole.component.html',
  styleUrls: ['./addrole.component.css']
})
export class AddroleComponent implements OnInit {
  p: number = 1;
  roles: string[] = [];
  newRoleName: string;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getRoles();
  }
  getRoles() {
    this.userService.getRoles().subscribe(
      (roles) => {
        this.roles = roles;
      },
      (error) => {
        console.error('Error fetching roles:', error);
      }
    );
  }
 

}
