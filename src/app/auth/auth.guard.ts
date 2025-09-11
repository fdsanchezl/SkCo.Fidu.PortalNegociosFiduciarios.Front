import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { MENU_CONFIG } from '../layout/component/menu.config'
@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
        private readonly router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
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
                    // El usuario está autenticado, ahora verificamos los roles.
                    const findMenuItemByUrl: any = (menu: any[], url: string) => {
                        for (const item of menu) {
                            if (item.routerLink && item.routerLink[0] === url) return item;
                            if (item.items) { const found = findMenuItemByUrl(item.items, url); if (found) return found; }
                        } return undefined;
                    };
                    const requiredRoles = findMenuItemByUrl(MENU_CONFIG, state.url)?.['data']?.['roles'];
                    if (!requiredRoles || requiredRoles.length === 0) {
                        return true; // No se requieren roles, permitir acceso.
                    }

                    if (this.authService.hasRole(requiredRoles)) {
                        return true; // El usuario tiene el rol requerido.
                    }

                    // El usuario no tiene el rol, redirigir a acceso denegado.
                    return this.router.createUrlTree(['/auth/access']);
                }
                // El usuario no está autenticado, redirigir a la página de login.
                return this.router.createUrlTree(['/auth/login']);
            })
        );
    }
}