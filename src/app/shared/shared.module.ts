import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  declarations: [],
  exports: [
    DropdownModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    TabViewModule
  ]


})
export class SharedModulesFromPrime { }
