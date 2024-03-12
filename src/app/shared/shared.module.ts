import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { StepsModule } from 'primeng/steps';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
  declarations: [],
  exports: [
    FormsModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    TabViewModule,
    TableModule,
    StepsModule,
    MultiSelectModule,
    InputTextareaModule
  ]


})
export class SharedModulesFromPrime { }
