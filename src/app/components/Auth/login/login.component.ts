import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customvalidator } from '../utils/custumvalidator';

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
  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginform = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
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
    if(this.loginform.valid){
      console.log(this.loginform.value)
    }else{

      Customvalidator.validateAllFormFields(this.loginform);

    }
  }

}
