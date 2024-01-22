import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint = environment.api.url;
  private localStorageKey = 'access_token';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<{ access_token: string }> {
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

    return this.http.post<{ access_token: string }>(`${this.endpoint}/users/login`, credentials, { headers: httpOptions.headers })
      .pipe(
        tap(response => {
          localStorage.setItem(this.localStorageKey, response.access_token);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.localStorageKey);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.localStorageKey);
  }
}
