import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { take } from 'rxjs';
import { RecipeesService } from 'src/app/core/services/recipees.service';
import { RecetaModel, Producto } from '../../recipee.model';

export interface Categoria {
  categoria: string;
  ingredientes: Ingredientes[];
}

export interface Ingredientes {
  nombre: string;
}

interface Seleccion {
  categoria: string;
  ingredientesSeleccionados: string[];
}

@Component({
  selector: 'app-recipee-modal',
  templateUrl: './recipee-modal.component.html',
  styleUrls: ['./recipee-modal.component.scss']
})
export class RecipeeModalComponent implements OnInit{
  @ViewChild('TablaIngredientes') tableIngredientes: Table | undefined;

  items: MenuItem[] = [];

  activeIndex: number = 0;

  categories: Categoria[] = [];

  ingredientes: any[] = [];

  productos: Producto[] = [];

  recipee: RecetaModel = {
    nombre: '',
    products: [],
    steps: '',
    createdBy: ''
  };

  formRecipees!: FormGroup;

  selecciones: Seleccion[] = [];

  udsMedida: string[] = [
    "gramos","ml"
  ]

  constructor(
    private fb: FormBuilder,
    private recipeesService: RecipeesService
  ) {
    this.formRecipees = this.fb.group({
      selectedIngredients: ['',]
    });
  }
  ngOnInit(): void {
    this.getCatIng();

    this.items = [
      {
          label: 'Ingredientes',
      },
      {
          label: 'Cantidades',
      },
      {
          label: 'Detalles y Confirmación',
      }
  ];
  }

  getCatIng() {
    this.recipeesService.getAll().pipe(take(1))
    .subscribe({
      next: resp => {
        this.categories = resp;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  getIngredientesByCategoria(categoria: Categoria): any[] {
    return categoria.ingredientes.map(ingrediente => ({ label: ingrediente.nombre, value: ingrediente.nombre }));
  }

  selectsOptions(event: any, categoria: string) {
    const ingredientesSeleccionados = event.value;

    const seleccionExistente = this.selecciones.find(sel => sel.categoria === categoria);

    if (seleccionExistente) {
      seleccionExistente.ingredientesSeleccionados = ingredientesSeleccionados;
    } else {
      this.selecciones.push({ categoria, ingredientesSeleccionados });
    }
  }

  getIngredientsList() {
    if (this.selecciones.length > 0 ) {
      this.selecciones.forEach((seleccion) => {
        seleccion.ingredientesSeleccionados.forEach((nombre) => {
          this.ingredientes.push(nombre);
          this.productos.push({ nombre: nombre, cantidad: undefined, unidadMedida: undefined });
        });
      });
    }
  }  

  previousStep() {
    if(this.activeIndex === 1) {
      this.selecciones = [];
      this.ingredientes = [];
      this.productos = [];
    }
    this.activeIndex --;
  }
  
  nextStep() {
    if(this.activeIndex === 0 && this.selecciones.length == 0) {
      console.log("ERROR");
    } else if (this.activeIndex === 0 && this.selecciones.length > 0) {
      this.activeIndex++;
      this.getIngredientsList();
    } else if (this.activeIndex == 1) {
      this.productos = this.tableIngredientes!.value;
      this.activeIndex++;
    }
    else {
      this.activeIndex ++;
      console.log(this.selecciones);
    }
  }

  confirm() {
    this.recipee.products = this.productos;
    
    this.recipeesService.saveRecipee(this.recipee).pipe(take(1))
    .subscribe({
      next: console.log,
      error: console.error
    });
  }
}
