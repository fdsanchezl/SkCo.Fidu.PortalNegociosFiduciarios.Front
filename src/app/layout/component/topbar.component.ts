import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, MenuModule, ButtonModule, AvatarModule],
  template: `<div class="flex items-center justify-end p-4 bg-white dark:bg-gray-800 shadow-md">
    <div class="relative">
        <p-menu #menu [model]="userMenuItems" [popup]="true" />
        <button (click)="menu.toggle($event)" class="flex items-center gap-3 cursor-pointer">
            <div class="text-right">
                <span class="block font-semibold text-gray-700 dark:text-gray-200">{{ userName }}</span>
                <span class="text-sm text-gray-500 dark:text-gray-400">Usuario Fiduciario</span>
            </div>
            <p-avatar 
                [label]="userInitials" 
                size="large" 
                shape="circle" 
                class="bg-blue-500 text-white" />
        </button>
    </div>
</div>`, 
})
export class TopbarComponent implements OnInit {

  userMenuItems: MenuItem[] = [];
  userName: string = '';
  userInitials: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const account = this.authService.getActiveAccount();
    if (account) {
      this.userName = account.name || 'Usuario';
      this.userInitials = this.getInitials(this.userName);

      this.userMenuItems = [
        {
          label: 'Cerrar Sesión',
          icon: 'pi pi-fw pi-power-off',
          command: () => this.logout()
        }
      ];
    }
  }

  private getInitials(name: string): string {
    const names = name.split(' ');
    const initials = names.map(n => n[0]).join('');
    return initials.substring(0, 2).toUpperCase();
  }

  logout(): void {
    this.authService.logout();
  }
}
