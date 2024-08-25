import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { RecipeesService } from 'src/app/core/services/recipees.service';
import { RecetaModel } from './recipee.model';
import { RecipeeModalComponent } from './components/recipee-modal/recipee-modal.component';
import { DialogModule } from 'primeng/dialog';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-recipees',
    templateUrl: './recipees.component.html',
    styleUrls: ['./recipees.component.scss'],
    standalone: true,
    imports: [ButtonModule, TableModule, SharedModule, DialogModule, RecipeeModalComponent]
})
export class RecipeesComponent implements OnInit{

  display: boolean = false;

  displayEdit: boolean = false;

  recipees: RecetaModel[] = [];

  selectedRecipee!: RecetaModel;

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
    this.displayEdit = false;
    this.getRecipeesByUserName();
  }

  editRecipee(recipee: RecetaModel) {
    this.selectedRecipee = recipee;
    this.displayEdit = true;
  }
  
  deleteRecipee(recipee: RecetaModel) {
    this.recipeesService.deleteRecipee(recipee).pipe(take(1))
    .subscribe({
      next: () => {
        this.getRecipeesByUserName();
      },
      error: console.error
    });
  }

  getRecipeePDF(recipee: RecetaModel) {
    this.recipeesService.getRecipeePDF(recipee).pipe(take(1))
    .subscribe({
      next: console.log,
      error: console.error
    });
  }
}

