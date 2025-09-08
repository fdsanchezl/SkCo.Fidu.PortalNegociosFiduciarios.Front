import { Configuration, PublicClientApplication } from '@azure/msal-browser';

// MSAL configuration
const msalConfig: Configuration = {
    auth: {
        clientId: 'e1184aad-3d07-49e7-a36a-e96f5ba390f7', // Your Azure AD app registration client ID
        authority: 'https://login.microsoftonline.com/common', // Replace 'common' with your tenant ID if needed
        redirectUri: window.location.origin,
        postLogoutRedirectUri: window.location.origin
    },
    cache: {
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie: false
    }
};

// Create MSAL instance
export const msalInstance = new PublicClientApplication(msalConfig);