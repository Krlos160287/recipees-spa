import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { RecipeesService } from 'src/app/core/services/recipees.service';
import { RecetaModel } from './recipee.model';

@Component({
  selector: 'app-recipees',
  templateUrl: './recipees.component.html',
  styleUrls: ['./recipees.component.scss']
})
export class RecipeesComponent implements OnInit{

  display: boolean = false;

  recipees: RecetaModel[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private recipeesService: RecipeesService
  ) {}

  ngOnInit(): void {
    this.getRecipeesByUserName();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  showModal() {
    this.display = true;
  }

  getRecipeesByUserName() {
    this.recipeesService.getRecipeesByUser(localStorage.getItem('userMail')!).pipe(take(1)).subscribe({
      next: (resp) => {
        this.recipees = resp;
      },
      error: console.error
    })
  }
  
  closeDialog() {
    this.display = false;
    this.getRecipeesByUserName();
  }

  selectRecipee(recipee: RecetaModel) {
    console.log(recipee);
  }
}

