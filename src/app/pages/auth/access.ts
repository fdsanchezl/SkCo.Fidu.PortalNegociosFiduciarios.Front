import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';

@Component({
    selector: 'app-access',
    standalone: true,
    imports: [ButtonModule, RouterModule, RippleModule, AppFloatingConfigurator, ButtonModule],
    template: ` <app-floating-configurator />
        <div class="flex items-center justify-center min-h-screen min-w-screen overflow-hidden bg-surface-50 dark:bg-surface-950">
            <div class="card w-full max-w-md">
                <div class="p-8 text-center">
                    <img src="https://migoassetsprd.blob.core.windows.net/customers/migo/public/logo.webp" alt="Skandia Logo" class="w-48 mx-auto mb-8" />
                    
                    <div class="flex justify-center items-center bg-orange-100 dark:bg-orange-900/50 text-orange-500 dark:text-orange-400 rounded-full mx-auto mb-6" style="width: 4rem; height: 4rem;">
                        <i class="pi pi-fw pi-lock text-4xl"></i>
                    </div>
                    
                    <h1 class="text-2xl font-bold mb-2 text-surface-900 dark:text-surface-0">Acceso Denegado</h1>
                    <p class="text-muted-color mb-6">
                        No tienes los permisos necesarios para ver esta página. Por favor, contacta al administrador.
                    </p>
                    
                    <p-button label="Volver al Inicio" routerLink="/" styleClass="w-full" severity="warn" />
                </div>
            </div>
        </div>`
})
export class Access {}
