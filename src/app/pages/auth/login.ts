import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, AppFloatingConfigurator],
    template: `
        <app-floating-configurator />
        <div class="flex items-center justify-center min-h-screen min-w-screen overflow-hidden bg-surface-50 dark:bg-surface-950">
            <div class="card w-full max-w-md">
                <div class="p-8">
                    <div class="text-center mb-8">
                        <picture>
                            <img src="https://migoassetsprd.blob.core.windows.net/customers/migo/public/logo.webp" alt="Skandia Logo" class="w-48 mx-auto mb-3" />
                        </picture>
                        <div class="text-2xl font-bold mb-1 text-surface-900 dark:text-surface-0">Skandia Fiduciaria</div>
                        <span class="text-muted-color">Login para continuar</span>
                    </div>
                    <div class="mb-6">
                        <p class="text-muted-color mb-6 text-center">
                            Inicie sesión con su cuenta de Microsoft para acceder al portal.
                        </p>
                        <p-button
                            styleClass="w-full sk-button-primary"
                            label="Iniciar sesión con Microsoft" 
                            icon="pi pi-microsoft" 
                            (onClick)="loginWithAzure()"
                            [loading]="isLoading">
                        </p-button>
                    </div>
                    @if(errorMessage) {
                    <div class="text-center mt-4 sk-alert-error">
                        {{ errorMessage }}
                    </div>
                    }
                    </div>
                </div>
            </div>
    `
})
export class Login implements OnInit, OnDestroy {
    isLoading: boolean = false;
    errorMessage: string = '';
    private authSubscription: Subscription | undefined;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit(): void { }

    ngOnDestroy(): void {
        // El authSubscription ya no existe, pero dejamos el hook por si se necesita en el futuro.
    }

    loginWithAzure(): void {
        this.isLoading = true;
        this.errorMessage = '';
        // Simplemente iniciamos el flujo. MSAL se encargará de la redirección.
        this.authService.login();
    }
}
