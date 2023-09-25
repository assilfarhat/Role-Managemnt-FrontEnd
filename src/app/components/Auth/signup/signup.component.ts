import { AuthService } from '../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customvalidator } from '../../../core/utils/custumvalidator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  type: string = "password" ;
  isText: boolean = false;
  eyeIcon: string = " bx-hide";
  signupForm: FormGroup;
   submitted = false;
   usernameExists: boolean;
   emailExists: boolean;
   added: boolean;
  constructor( private formBuilder: FormBuilder,
    private router: Router,private auth: AuthService ,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.added=false;
    this.signupForm = this.formBuilder.group(
      {
        UserName: ['', [Validators.minLength(3), Validators.required]],
        UserEmail: ['', [Validators.email, Validators.required]],
        FirstName: ['', [ Validators.required]],
        LastName: ['', [ Validators.required]],
        Password: ['', Validators.compose([
          // 1. Password Field is Required
          Validators.required,
          // 2. check whether the entered password has a number
          Customvalidator.patternValidator(/\d/, { hasNumber: true }),
          // 3. check whether the entered password has upper case letter
         // Customvalidator.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
          // 4. check whether the entered password has a lower-case letter
          //Customvalidator.patternValidator(/[a-z]/, { hasSmallCase: true }),
          // 5. check whether the entered password has a special character
          Customvalidator.patternValidator(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/, { hasSpecialCharacters: true }),
          Validators.minLength(6)])
        ],
        confirmpassword: ['', Validators.required]
       
      },
      {
        validator: this.matchPassword.bind(this)
      } 
    )
  }
  matchPassword(formGroup: FormGroup) {
    const passwordControl = formGroup.get('Password');
    const confirmPasswordControl = formGroup.get('confirmpassword');

    if (passwordControl?.value !== confirmPasswordControl?.value) {
      confirmPasswordControl?.setErrors({ 'passwordMismatch': true });
    } else {
      confirmPasswordControl?.setErrors(null);
    }
  }
  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "bx-show" : this.eyeIcon = "bx-hide";
    this.isText ? this.type = "text" : this.type = "password";
 }
 Valid(controlname: any, signupForm: any) {
  return Customvalidator.Valid(controlname, signupForm)

}

// canLeave(): boolean {
//   if ((this.signupForm.dirty) && (this.added==false)) {
//     return confirm('You have unsaved changes are you sure you wanne leave this page ?');
//   }
//   return true;

// }
Signup() {
  if (this.signupForm.valid) {
    console.log(this.signupForm.value);
    let signUpObj = {
      ...this.signupForm.value,
      Role:'',
      Token:''
    }
    console.log("signUpObj",signUpObj)
    this.auth.signUp(signUpObj)
    .subscribe({
      next:(res=>{
        console.log(res.message);
        this.signupForm.reset();
        this.toastr.success('Account created successfully , Time to log in', 'Account created !')
        this.router.navigate(['login']);
        
      }),
      error:(err=>{
        console.log(err.message);
        this.toastr.error('something went wrong')
      })
    })
  } else {
    Customvalidator.validateAllFormFields(this.signupForm);  }
      }


}

