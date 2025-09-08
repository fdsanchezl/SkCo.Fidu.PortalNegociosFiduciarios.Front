import { Injectable } from '@angular/core';
import { AccountInfo } from '@azure/msal-browser';
import { BehaviorSubject, Observable, ReplaySubject, from, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { msalInstance } from '../msal.config';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private initialized$ = new ReplaySubject<void>(1);
    private isAuthenticatedSubject$ = new BehaviorSubject<boolean>(false);
    public isAuthenticated$ = this.isAuthenticatedSubject$.asObservable();

    async initialize(): Promise<void> {
        await msalInstance.initialize(); // Then initialize

        const result = await msalInstance.handleRedirectPromise(); // Handle redirect first

        if (result?.account) {
            msalInstance.setActiveAccount(result.account);
        }
        this.updateAuthenticationStatus();
        this.initialized$.next();
        this.initialized$.complete();
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

    isInitialized(): Observable<void> {
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
}