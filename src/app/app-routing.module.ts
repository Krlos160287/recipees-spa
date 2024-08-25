import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./modules/home/home.component').then( m => m.HomeComponent)
  },
  {
    path: 'recetas',
    loadComponent: () => import('./modules/recipees/recipees.component').then( m => m.RecipeesComponent),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
