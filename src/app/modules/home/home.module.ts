import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomePageRoutingModule } from './home-routing.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SharedModulesFromPrime } from 'src/app/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    HomePageRoutingModule,
    SharedModulesFromPrime
  ],
  providers: [MessageService, ConfirmationService],
  declarations: [HomeComponent]
})
export class HomePageModule { }
