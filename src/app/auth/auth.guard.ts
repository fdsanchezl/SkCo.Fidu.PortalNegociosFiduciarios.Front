import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): Observable<boolean | UrlTree> {
        console.log('[AuthGuard] canActivate: Triggered. Waiting for initialization...');
        return this.authService.isInitialized().pipe(
            tap(status => console.log(`[AuthGuard] isInitialized status: ${status}`)),
            filter(initStatus => initStatus === 1),
            tap(() => console.log('[AuthGuard] Initialization complete. Checking authentication status...')),
            take(1), // Tomar solo el primer valor emitido para evitar re-evaluaciones
            switchMap(() => this.authService.isAuthenticated$), // Ahora sí, verificar el estado de autenticación
            map(isAuthenticated => {
                console.log(`[AuthGuard] isAuthenticated: ${isAuthenticated}`);
                if (isAuthenticated) {
                    console.log('[AuthGuard] Decision: Access GRANTED.');
                    return true; // El usuario está autenticado, permitir acceso.
                }
                // El usuario no está autenticado, redirigir a la página de login.
                console.log('[AuthGuard] Decision: Access DENIED. Redirecting to /auth/login.');
                return this.router.createUrlTree(['/auth/login']);
            })
        );
    }
}