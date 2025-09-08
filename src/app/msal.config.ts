// src/app/msal.config.ts
import { PublicClientApplication, Configuration, LogLevel } from '@azure/msal-browser';

export const msalConfig: Configuration = {
  auth: {
    clientId: 'e1184aad-3d07-49e7-a36a-e96f5ba390f7',
    authority: 'https://login.microsoftonline.com/08271f42-81ef-45d6-81ac-49776c4be615',
    redirectUri: 'https://skcofiduvaloradorfacturasangular.azurewebsites.net',
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: any, message: any, containsPii: any) => {
        if (!containsPii) {
          console.log('[MSAL]', message);
        }
      },
      logLevel: LogLevel.Warning,
    },
  }
};

export const msalInstance = new PublicClientApplication(msalConfig);