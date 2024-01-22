import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root',
  })
  export class AppComponentService {

    endpoint = environment.api.url;

    constructor(
        private http: HttpClient,
      ) {}

    public getAll(): Observable<any> {
        const httpOptions = {
            headers: {
              'Content-Type': 'application/json',
              // Authorization: token !== null ? 'Bearer ' + token : '',
              'x-access-token': '',
              'Access-Control-Allow-Headers': 'Content-Type',
              'Access-Control-Allow-Methods': 'GET',
              'Access-Control-Allow-Origin': '*',
            },
        }
        return this.http.get<any>(`${this.endpoint}`+ "/ingredientes", { headers: httpOptions.headers });
      }
  }