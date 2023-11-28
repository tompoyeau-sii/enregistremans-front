// connexion.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/AuthGuard/auth.service';
import { StateService } from '../services/state/state.service';
import { NotificationService } from '../services/notification/notification.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss'],
})
export class ConnexionComponent {
  username: string = '';
  password: string = '';
  authReussie: any;
  loading: boolean = false;
  tempsDebutExecution: number = 0;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService,
    private stateService: StateService,
  ) { }


  ngOnInit() {
    this.stateService.setUtilisateurConnecte(false);
  }
  onSubmit(): void {
    // Utilisez la nouvelle méthode seConnecter qui renvoie un boolean
    // Enregistrez le temps de début
    this.loading = true;

    this.authReussie = this.authService.seConnecter(this.username, this.password);

    this.authService.seConnecter(this.username, this.password)
      .subscribe(
        (connexionReussie) => {
          const tempsExecution = performance.now() - this.tempsDebutExecution;
          console.log(`La méthode a mis ${tempsExecution} millisecondes à s'exécuter.`);
          if (connexionReussie) {
            // Rediriger l'utilisateur vers la page sécurisée après la connexion réussie
            this.loading = false;
            this.router.navigate(['/form']);
          } else {

            // Gérer l'échec de la connexion ici
            this.loading = false;
            console.log('Échec de la connexion. Veuillez vérifier vos informations.');
            this.notificationService.showError('Identifiants incorrect.', '<strong>Contenu HTML sécurisé</strong>');
          }
        }
      );
  }
}
