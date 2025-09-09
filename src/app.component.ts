import { AuthService } from '@/auth/auth.service';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule],
    template: `<router-outlet></router-outlet>`
})
export class AppComponent {
    constructor() {
        console.log('[AppComponent] Constructor: Component is ready. Auth should be initialized by now.');
    }
}
