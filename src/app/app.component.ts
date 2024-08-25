import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { AppComponentService } from 'src/app/core/services/app-component.service';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [RouterOutlet]
})
export class AppComponent implements OnInit {
  title = 'recetas-spa';

  categorias: any[] = [];

  formData: any = {
    categoria: ""
  };

  constructor(
  
  ) {}

  ngOnInit(): void {
  }

}
