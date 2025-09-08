import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { msalInstance } from '../msal.config';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(): boolean {
        const account = msalInstance.getActiveAccount();
        
        if (account) {
            return true;
        } else {
            // Redirect to login if not authenticated
            msalInstance.loginRedirect({
                scopes: ['api://e1184aad-3d07-49e7-a36a-e96f5ba390f7/nuevoscope']
            });
            return false;
        }
    }
}