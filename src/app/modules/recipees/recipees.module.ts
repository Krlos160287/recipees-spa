import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SharedModulesFromPrime } from 'src/app/shared/shared.module';
import { RecipeesComponent } from './recipees.component';
import { RecipeesPageRoutingModule } from './recipees-routing.module';
import { RecipeeModalComponent } from './components/recipee-modal/recipee-modal.component';
import { RecipeesService } from 'src/app/core/services/recipees.service';


@NgModule({
  imports: [
    CommonModule,
    SharedModulesFromPrime,
    RecipeesPageRoutingModule
  ],
  providers: [MessageService, ConfirmationService, RecipeesService],
  declarations: [RecipeesComponent, RecipeeModalComponent]
})
export class RecipeesPageModule { }
