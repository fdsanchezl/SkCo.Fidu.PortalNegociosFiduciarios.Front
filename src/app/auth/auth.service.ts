import { Injectable } from '@angular/core';
import { AccountInfo } from '@azure/msal-browser';
import { msalInstance } from '../msal.config';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    
    async initialize(): Promise<void> {
        await msalInstance.initialize();
        
        const result = await msalInstance.handleRedirectPromise();
        
        if (result?.account) {
            msalInstance.setActiveAccount(result.account);
        }
    }

    login(): void {
        msalInstance.loginRedirect({
            scopes: ['api://e1184aad-3d07-49e7-a36a-e96f5ba390f7/nuevoscope']
        });
    }

    logout(): void {
        msalInstance.logoutRedirect();
    }

    getActiveAccount(): AccountInfo | null {
        return msalInstance.getActiveAccount();
    }

    isAuthenticated(): boolean {
        return !!msalInstance.getActiveAccount();
    }

    async getAccessToken(): Promise<string | null> {
        const account = msalInstance.getActiveAccount();
        
        if (!account) {
            return null;
        }

        try {
            const response = await msalInstance.acquireTokenSilent({
                scopes: ['api://e1184aad-3d07-49e7-a36a-e96f5ba390f7/nuevoscope'],
                account: account
            });
            
            return response.accessToken;
        } catch (error) {
            console.error('Error acquiring token silently:', error);
            // If silent token acquisition fails, try interactive
            try {
                const response = await msalInstance.acquireTokenRedirect({
                    scopes: ['api://e1184aad-3d07-49e7-a36a-e96f5ba390f7/nuevoscope'],
                    account: account
                });
                return response.accessToken;
            } catch (interactiveError) {
                console.error('Error acquiring token interactively:', interactiveError);
                return null;
            }
        }
    }
}