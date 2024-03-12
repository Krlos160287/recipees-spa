import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { UsersService } from 'src/app/core/services/users.service';
import { UsersModel } from 'src/app/models/users.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  register: boolean = false;

  login: boolean = false;

  formRegister: FormGroup;

  user!: UsersModel;

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.formRegister = this.fb.group({
      nickname: ['',],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  clickRegister() {
    this.register = true;
    this.login = false;
  }

  clickLogin() {
    this.login = true;
    this.register = false;
  }

  getBack() {
    this.login = false;
    this.register = false;
  }

  saveUser() {
   this.formRegister.get('nickname')?.setValidators(Validators.required);
   this.formRegister.get('nickname')?.updateValueAndValidity();
  
   if(this.formRegister.invalid) {
    console.error("ERROR")
   } else {
     this.userService.saveUser(this.formRegister.value).
     pipe(take(1))
     .subscribe({
      next: (response: UsersModel) => {
        this.user = response;
        this.register = false;
        this.login = true;
    },
    error: (error: any) => {
      console.error("Error al guardar el usuario:", error);
    }});
   }
  }

  getUser() {
    this.formRegister.get('nickname')?.clearValidators();
    this.formRegister.get('nickname')?.updateValueAndValidity();
   this.authService.login(this.formRegister.value).
    pipe(take(1))
    .subscribe({
      next: (response: any) => {
        localStorage.setItem('userMail', this.formRegister.controls['email'].value);
        this.router.navigate(['/recetas']);
      },
      error: (error: any) => {
        console.error("Error al obtener el usuario", error);
      }
    })
  }
}
