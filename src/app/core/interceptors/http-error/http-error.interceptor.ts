import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ErrorService } from "../../services/error.service";
import { Observable, catchError, throwError } from "rxjs";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private errorService: ErrorService) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler)
        :Observable<HttpEvent<unknown>> {
            return next.handle(request).pipe(
                catchError((error) => {
                    let errorMessage = '';
                    if (error instanceof ErrorEvent) {
                        errorMessage = `Client-side error: ${error.error.message}`;
                    } else {
                        errorMessage = `Server-side error: ${error.status} ${error.message}`;
                    }
                    this.errorService.show(errorMessage);
                    return throwError(() => error);
                })
            );
        }
}