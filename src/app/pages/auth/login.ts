import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
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
        <div class="flex items-center justify-center min-h-screen min-w-screen overflow-hidden" style="background-color: var(--skandia-gray-12);">
            <div class="flex flex-col items-center justify-center">
                    <div class="w-full py-20 px-8 sm:px-20 skandia-card" style="background-color: var(--skandia-surface-primary); border-radius: var(--skandia-border-radius-xl); box-shadow: var(--skandia-shadow-medium); border: 1px solid var(--skandia-gray-10); max-width: 500px;">
                        <div class="text-center mb-8">
                            <picture>
                                <img src="https://migoassetsprd.blob.core.windows.net/customers/migo/public/logo.webp" alt="Skandia Logo" class="w-48 mx-auto mb-3" />
                            </picture>
                            <div class="skandia-h2 mb-4" style="color: var(--skandia-text-primary);">Skandia Fiduciaria</div>
                            <span class="skandia-body2" style="color: var(--skandia-text-secondary);">Login para continuar</span>
                        </div>

                        <div>
                            <div class="mb-8">
                                <p class="skandia-body1 mb-6" style="color: var(--skandia-text-primary);">
                                    Inicie sesión con su cuenta de Microsoft para acceder al valorador de facturas.
                                </p>
                                <p-button
                                    styleClass="w-full"
                                    [style]="{ 
                                        'background-color': 'var(--skandia-green)', 
                                        'color': 'var(--skandia-white)', 
                                        'border': 'none', 
                                        'border-radius': 'var(--skandia-border-radius-md)', 
                                        'padding': 'var(--skandia-spacing-md) var(--skandia-spacing-lg)', 
                                        'font-family': 'var(--skandia-font-body)', 
                                        'font-weight': '500', 
                                        'font-size': 'var(--skandia-body1-size)', 
                                        'box-shadow': 'var(--skandia-shadow-subtle)', 
                                        'transition': 'all var(--skandia-transition-fast)' 
                                    }"
                                    label="Iniciar sesión con Microsoft" 
                                    icon="pi pi-microsoft" 
                                    (onClick)="loginWithAzure()"
                                    [loading]="isLoading">
                                </p-button>
                            </div>
                            @if(errorMessage) {
                            <div class="skandia-body2 text-center mt-4 skandia-alert" style="background-color: rgba(220, 38, 38, 0.1); border-left: 4px solid #dc2626; color: #dc2626; padding: var(--skandia-spacing-sm); border-radius: var(--skandia-border-radius-sm);">
                                {{ errorMessage }}
                            </div>
                            }

                        </div>
                    </div>
            </div>
        </div>
    `
})
export class Login implements OnInit, OnDestroy {
    isLoading: boolean = false;
    errorMessage: string = '';
    private authSubscription: Subscription | undefined;

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
        // Espera a que MSAL se inicialice y luego verifica el estado de autenticación.
        this.authSubscription = this.authService.isInitialized().pipe(
            take(1) // Solo necesitamos saber que se inicializó una vez.
        ).subscribe(() => {
            if (this.authService.isAuthenticated()) {
                // Redirige si el usuario ya está autenticado.
                window.location.href = '/';
            }
        });
    }

    ngOnDestroy(): void {
        this.authSubscription?.unsubscribe();
    }

    loginWithAzure(): void {
        try {
            this.isLoading = true;
            this.errorMessage = '';
            this.authService.login();
        } catch (error) {
            this.errorMessage = 'Error al iniciar sesión. Por favor, inténtelo de nuevo.';
            console.error('Login error:', error);
        }
    }
}
