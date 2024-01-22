import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  formRegister: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private authService: AuthService
  ) {
    this.formRegister = this.fb.group({
      nickname: ['',],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  saveUser() {
   this.formRegister.get('nickname')?.setValidators(Validators.required);
   this.formRegister.get('nickname')?.updateValueAndValidity();
   this.userService.saveUser(this.formRegister.value).
   pipe(take(1))
   .subscribe((data) => {
    console.log(data);
   })
  }

  getUser() {
    this.formRegister.get('nickname')?.clearValidators();
    this.formRegister.get('nickname')?.updateValueAndValidity();
   this.authService.login(this.formRegister.value).
    pipe(take(1))
    .subscribe((data) => {
      console.log(data);
    })
  }
}
