// connexion.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/AuthGuard/auth.service';
import { HttpClient } from '@angular/common/http';
import { StateService } from '../services/state/state.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss'],
})
export class ConnexionComponent {
  username: string = '';
  password: string = '';
  authReussie: any;
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private stateService: StateService
    ) { }
    
  ngOnInit() {
    this.stateService.setUtilisateurConnecte(false);
  }
  onSubmit(): void {
    // Utilisez la nouvelle méthode seConnecter qui renvoie un boolean
    this.authReussie = this.authService.seConnecter(this.username, this.password);

    this.authService.seConnecter(this.username, this.password)
      .subscribe(
        (connexionReussie) => {
          if (connexionReussie) {
            // Rediriger l'utilisateur vers la page sécurisée après la connexion réussie

            this.router.navigate(['/form']);
          } else {
            // Gérer l'échec de la connexion ici
            console.log('Échec de la connexion. Veuillez vérifier vos informations.');
          }
        }
      );
  }
}
