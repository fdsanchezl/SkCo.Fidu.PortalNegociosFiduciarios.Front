import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem as PrimeMenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { AuthService } from '../../auth/auth.service';
import { MENU_CONFIG } from './menu.config';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu implements OnInit {
    model: PrimeMenuItem[] = [];

    constructor(private readonly authService: AuthService) { }

    ngOnInit() {
        // Usamos una copia profunda para no modificar la configuración original
        const menuStructure = JSON.parse(JSON.stringify(MENU_CONFIG));
        this.model = this.filterMenuByRole(menuStructure);
    }

    private filterMenuByRole(menu: PrimeMenuItem[]): PrimeMenuItem[] {
        const filteredMenu: PrimeMenuItem[] = [];
        for (const item of menu) {
            const requiredRoles = item['data']?.['roles'] as string[];
            let hasAccess: boolean;
            if (!requiredRoles) {
                hasAccess = true;
            } else {
                hasAccess = this.authService.hasRole(requiredRoles);
            }
            if (item.items) {
                item.items = this.filterMenuByRole(item.items);
                // Un grupo de menú solo es accesible si tiene sub-elementos visibles.
                hasAccess = item.items.length > 0;
            }
            if (hasAccess) {
                filteredMenu.push(item);
            }
        }
        return filteredMenu;
    }
}
