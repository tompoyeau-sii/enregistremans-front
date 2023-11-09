// connexion.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/AuthGuard/auth.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss'],
})
export class ConnexionComponent {
  nomUtilisateur: string = '';
  motDePasse: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    const connexionReussie = this.authService.seConnecter(this.nomUtilisateur, this.motDePasse);

    if (connexionReussie) {
      // Redirigez l'utilisateur vers la page sécurisée après la connexion
      this.router.navigate(['/form']);
    } else {
      console.log('Échec de la connexion. Veuillez vérifier vos informations.');
    }
  }
}
