import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
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
}