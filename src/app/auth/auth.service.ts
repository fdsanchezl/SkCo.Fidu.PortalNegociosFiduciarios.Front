import { Injectable } from '@angular/core';
import { AccountInfo } from '@azure/msal-browser';
import { BehaviorSubject, Observable, ReplaySubject, from, of, forkJoin, lastValueFrom } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { msalInstance } from '../msal.config';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private initialized$ = new ReplaySubject<number>(1);
    private isAuthenticatedSubject$ = new BehaviorSubject<boolean>(false);
    public isAuthenticated$ = this.isAuthenticatedSubject$.asObservable();

    initialize(): Promise<any> {
        console.log('[AuthService] initialize: Starting MSAL initialization process.');
        // Cambiamos a un flujo secuencial para garantizar la estabilidad.
        // 1. Primero, inicializamos MSAL.
        const init$ = from(msalInstance.initialize()).pipe(
            // 2. Una vez inicializado, procesamos la respuesta de la redirección.
            switchMap(() => {
                console.log('[AuthService] initialize: MSAL initialized. Now handling redirect promise.');
                return from(msalInstance.handleRedirectPromise());
            }),
            tap(result => {
                console.log('[AuthService] initialize: handleRedirectPromise completed. Result:', result);
                if (result?.account) {
                    console.log('[AuthService] initialize: Account found in redirect result. Setting active account.');
                    msalInstance.setActiveAccount(result.account);
                }
                this.updateAuthenticationStatus();
                // 3. Notificamos que todo el proceso ha terminado.
                console.log('[AuthService] initialize: Emitting initialized signal (1).');
                this.initialized$.next(1);
                this.initialized$.complete();
            }),
            catchError(error => {
                console.error('[AuthService] initialize: CRITICAL ERROR during initialization.', error);
                // Si algo falla, aún notificamos para no bloquear la app.
                console.log('[AuthService] initialize: Emitting initialized signal (1) despite error to unblock guards.');
                this.initialized$.next(1);
                this.initialized$.complete();
                return of(null);
            })
        );

        return lastValueFrom(init$);
    }

    login(): void {
        msalInstance.loginRedirect({
            scopes: ['api://e1184aad-3d07-49e7-a36a-e96f5ba390f7/nuevoscope']
        });
    }

    logout(): void {
        this.isAuthenticatedSubject$.next(false);
        msalInstance.logoutRedirect();
    }

    getActiveAccount(): AccountInfo | null {
        return msalInstance.getActiveAccount();
    }

    private updateAuthenticationStatus(): void {
        this.isAuthenticatedSubject$.next(!!this.getActiveAccount());
    }

    isAuthenticated(): boolean {
        return this.isAuthenticatedSubject$.value;
    }

    isInitialized(): Observable<number> {
        return this.initialized$.asObservable();
    }


    getAccessToken(): Observable<string | null> {
        const account = msalInstance.getActiveAccount();

        if (!account) {
            return of(null);
        }

        const silentRequest = {
            scopes: ['api://e1184aad-3d07-49e7-a36a-e96f5ba390f7/nuevoscope'],
            account: account
        };

        return from(msalInstance.acquireTokenSilent(silentRequest)).pipe(
            switchMap(response => of(response.accessToken)),
            catchError(error => {
                console.error('Error acquiring token silently:', error);
                // Si la adquisición silenciosa falla, no intentamos la interactiva aquí,
                // ya que eso debería ser manejado por un interceptor o un guard.
                // Devolver null para que el llamador decida qué hacer.
                return of(null);
            })
        );
    }

    /**
     * Verifica si el usuario logueado tiene al menos uno de los roles requeridos.
     * @param requiredRoles Array de roles que se quieren comprobar.
     * @returns `true` si el usuario tiene al menos un rol coincidente, de lo contrario `false`.
     */
    public hasRole(requiredRoles: string[]): boolean {
        const account = this.getActiveAccount();
        if (!account || !account.idTokenClaims) {
          return false;
        }
    
        const userRoles = account.idTokenClaims['roles'] as string[] | undefined;
        if (!userRoles || userRoles.length === 0) {
          return false;
        }
    
        // Comprueba si algún rol del usuario está en la lista de roles requeridos.
        return requiredRoles.some(role => userRoles.includes(role));
      }
}