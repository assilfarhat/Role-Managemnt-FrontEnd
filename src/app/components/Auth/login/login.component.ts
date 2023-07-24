import { UserService } from 'src/app/core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customvalidator } from '../../../core/utils/custumvalidator';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform: FormGroup;
  userNotFound:boolean = false;
  type: string = "password" ;
  isText: boolean = false;
  eyeIcon: string = " bx-hide";
  
  constructor(  private toastr: ToastrService ,
    private router: Router,
    private formBuilder: FormBuilder,
    private AuthService: AuthService,
    private UserService : UserService) { }

  ngOnInit(): void {
    this.loginform = this.formBuilder.group({
      UserEmail: ['', Validators.required],
      Password: ['', Validators.required]
    })
  }
  hideShowPass(){
     this.isText = !this.isText;
     this.isText ? this.eyeIcon = "bx-show" : this.eyeIcon = "bx-hide";
     this.isText ? this.type = "text" : this.type = "password";
  }

  
  Valid(controlname: any, loginform: any) {
    return Customvalidator.Valid(controlname, loginform)

  }

  login() {
    if (this.loginform.valid) {
      console.log(this.loginform.value);
      this.AuthService.login(this.loginform.value).subscribe({
        next: (res) => {
          console.log(res);
          this.loginform.reset();
          this.AuthService.storeToken(res.accessToken);
          this.AuthService.storeRefreshToken(res.refreshToken);
          const tokenPayload = this.AuthService.decodedToken();
          console.log(tokenPayload);
          this.UserService.setFullNameForStore(tokenPayload.name);
          this.UserService.setRoleForStore(tokenPayload.role);
          this.toastr.success("Account created successfully" ," Time to log in, Account created !")

          this.router.navigate(['dashboard'])
        },
        error: (err) => {
          this.toastr.error("ERROR", "Something when wrong!");
          console.log(err);
        },
      });
    }else{

      Customvalidator.validateAllFormFields(this.loginform);

    }
  }

}
