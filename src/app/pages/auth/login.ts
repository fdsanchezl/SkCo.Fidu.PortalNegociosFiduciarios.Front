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
        <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-screen overflow-hidden">
            <div class="flex flex-col items-center justify-center">
                    <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 20px">
                        <div class="text-center mb-8">
                            <picture>
                                <img src="https://migoassetsprd.blob.core.windows.net/customers/migo/public/logo.webp" alt="Skandia Logo" class="w-48 mx-auto mb-3" />
                            </picture>
                            <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Skandia Fiduciaria</div>
                            <span class="text-muted-color font-medium">Login para continuar</span>
                        </div>

                        <div>
                            <div class="mb-8">
                                <p class="text-surface-700 dark:text-surface-100 mb-6">
                                    Inicie sesión con su cuenta de Microsoft para acceder al valorador de facturas.
                                </p>
                                <p-button 
                                    label="Iniciar sesión con Microsoft" 
                                    icon="pi pi-microsoft" 
                                    styleClass="w-full" 
                                    (onClick)="loginWithAzure()"
                                    [loading]="isLoading">
                                </p-button>
                            </div>
                            @if(errorMessage) {
                            <div class="text-red-500 text-center mt-4">
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
