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

  login(credentials: { email: string; password: string }): Observable<{ token: any }> {

    return this.http.post<{ token: string }>(`${this.endpoint}/login`, credentials)
      .pipe(
        tap(response => {
          localStorage.setItem(this.localStorageKey, response.token);
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
