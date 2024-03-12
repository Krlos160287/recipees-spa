import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-recipees',
  templateUrl: './recipees.component.html',
  styleUrls: ['./recipees.component.scss']
})
export class RecipeesComponent {
  display: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  showModal() {
    this.display = true;
  }
}
