import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

function userNameValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^a/)) {
    return { invalidUser: true };
  }
}
@Component({
  selector: 'login-component-root',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  myForm: FormGroup;

  userName: AbstractControl;

  password: AbstractControl;

  name$: Observable<string>;


  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.myForm = this.fb.group(
      {
        'userName': ['aaa', Validators.compose([Validators.required, userNameValidator])],
        'password': ['', Validators.compose([Validators.required, Validators.minLength(5)])]
      }
    );

    this.userName = this.myForm.controls['userName'];
    this.password = this.myForm.controls['password'];
    this.name$ = this.userName.valueChanges;
    this.userName.valueChanges.subscribe(val => {
      console.log(val);
    });
  }

  onSubmit(value: any) {
    console.log(value);
  }

  ngOnInit(): void {
  }

  login() {
    this.authService.login();
  }
}
