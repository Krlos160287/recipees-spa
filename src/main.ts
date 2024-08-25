import { environment } from './environments/environment';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AppRoutingModule } from './app/app-routing.module';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { ErrorService } from './app/core/services/error.service';
import { authInterceptor, errorHandlerInterceptor } from './app/core/interceptors/interceptors';
import { HttpClientModule, withInterceptorsFromDi, provideHttpClient, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RecipeesService } from './app/core/services/recipees.service';
import { AuthService } from './app/core/services/auth.service';
import { UsersService } from './app/core/services/users.service';

if (environment.production) {
  enableProdMode();
}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http);
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule, TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
            defaultLanguage: 'es',
        })),
        HttpClientModule, authInterceptor, errorHandlerInterceptor, ErrorService,
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations(),
        RecipeesService,
        AuthService,
        UsersService
    ]
})
  .catch(err => console.error(err));
