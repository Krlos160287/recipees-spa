import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { RecetaModel } from "src/app/modules/recipees/recipee.model";
import { environment } from "src/environments/environment";

@Injectable()
export class RecipeesService {
    
    endpoint = environment.api.url;

    constructor(
      private http: HttpClient,
    ) {}

    public getAll(): Observable<any> {
      return this.http.get<any>(`${this.endpoint}`+ "/ingredientes");
    }

    public saveRecipee(body: RecetaModel): Observable<void> {
      return this.http.post<void>(`${this.endpoint}`+ "/recipees", body);
    }

    public getRecipeesByUser(userMail: string): Observable<RecetaModel[]> {
      return this.http.get<RecetaModel[]>(`${this.endpoint}/recipees/${userMail}`);
    }

    public updateRecipee(body: RecetaModel): Observable<void> {
      return this.http.put<void>(`${this.endpoint}/recipees`, body);
    }

    public deleteRecipee(body: RecetaModel) : Observable<void> {
      return this.http.delete<void>(`${this.endpoint}/recipees/${body.id}`);
    }

    public getRecipeePDF(body: RecetaModel) : Observable<any> {
      return this.http.get(`${this.endpoint}/recipees/pdf/${body.id}`, {
        responseType: 'blob'
      }).pipe(
        tap((blob: Blob) => {
          const blobUrl = URL.createObjectURL(blob);
          window.open(blobUrl, '_blank');
        })
      );
    }
}