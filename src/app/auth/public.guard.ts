import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class PublicGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): Observable<boolean | UrlTree> {
        return this.authService.isInitialized().pipe(
            filter(initStatus => initStatus === 1),
            take(1),
            switchMap(() => this.authService.isAuthenticated$),
            map(isAuthenticated => {
                if (isAuthenticated) {
                    // Si el usuario está autenticado, lo redirigimos a la página principal.
                    return this.router.createUrlTree(['/']);
                }
                // Si no está autenticado, puede ver la página de login.
                return true;
            })
        );
    }
}