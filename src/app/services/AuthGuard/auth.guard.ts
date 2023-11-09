// auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(): boolean {
        if (this.authService.estConnecte()) {
            return true;
        } else {
            // L'utilisateur n'est pas connecté, redirigez-le vers la page de connexion
            this.router.navigate(['/connexion']);
            return false;
        }
    }
}
