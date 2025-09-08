@@ .. @@
 import { Component } from '@angular/core';
 import { RouterModule } from '@angular/router';
+import { OnInit } from '@angular/core';
+import { AuthService } from './auth/auth.service';

 @Component({
     selector: 'app-root',
     standalone: true,
-    imports: [RouterModule],
+    imports: [RouterModule],
     template: `<router-outlet></router-outlet>`
 })
-export class AppComponent {}
+export class AppComponent implements OnInit {
+    
+    constructor(private authService: AuthService) {}
+
+    async ngOnInit(): Promise<void> {
+        await this.authService.initialize();
+        
+        if (!this.authService.isAuthenticated()) {
+            this.authService.login();
+        }
+    }
+}