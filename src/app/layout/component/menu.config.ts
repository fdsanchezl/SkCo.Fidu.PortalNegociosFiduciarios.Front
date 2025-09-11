import { MenuItem as PrimeMenuItem } from 'primeng/api';

/**
 * Configuración centralizada para los elementos del menú de la aplicación.
 * Cada elemento puede tener una propiedad `data.roles` para el control de acceso.
 */
export const MENU_CONFIG: PrimeMenuItem[] = [
    {
        label: 'Home',
        items: [
            { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
            { 
                label: 'Valorador de facturas', 
                icon: 'pi pi-fw pi-file', 
                routerLink: ['/pages/invoices-valuator'],
                data: { roles: ['facturas', 'admin'] }
            },
            { 
                label: 'Aprobaciones', 
                icon: 'pi pi-fw pi-check-square', 
                routerLink: ['/pages/process-view'],
                data: { roles: ['retiros', 'admin'] }
            },
        ],
    },
];
