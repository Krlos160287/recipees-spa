import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { AppComponentService } from 'src/app/core/services/app-component.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'recetas-spa';

  categorias: any[] = [];

  formData: any = {
    categoria: ""
  };

  constructor(
    private service: AppComponentService,

  ) {}

  ngOnInit(): void {
    this.getService();
  }

  getService() {
    this.service.getAll().pipe(take(1)).subscribe((resp) => {
      resp.forEach((element: any) => {
        this.categorias.push(element.categoria)
      })
    })
  }
}
