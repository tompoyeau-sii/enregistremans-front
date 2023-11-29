// Importation des modules nécessaires depuis Angular et d'autres bibliothèques tierces
import { Component } from '@angular/core';
import { RegistersService } from '../services/registers/registers.service';
import { ManagerService } from '../services/manager/manager.service';
import { parseISO, format } from 'date-fns';
import { fr } from 'date-fns/locale';

// Définition des interfaces pour décrire la structure des données utilisées dans le composant
interface Register {
  id: number;
  firstname: string;
  lastname: string;
  mail: string;
  phone: string;
  company: string;
  reason: string;
  manager: Manager | number | null;
  estimateTime: string;
  startedAt: string;
  otherManager: string | null;
}

interface Manager {
  id: number;
  fullname: string;
  active: boolean;
}

// Définition du composant Angular
@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent {
  // Déclaration des variables membres du composant
  loading: boolean = true; // Indique si les données sont en cours de chargement
  registers: any[] = []; // Tableau des enregistrements
  managers: any[] = []; // Tableau des gestionnaires
  selectedRegister: any = null; // Enregistrement sélectionné
  visible: boolean = false; // Indique si la boîte de dialogue est visible

  filteredRegisters: Register[] = []; // Tableau des enregistrements filtrés

  // Objet de filtre pour les propriétés spécifiques
  filter: any = {
    fullname: null,
    managerName: null,
    reason: null,
    startedAt: null
  };

  // Liste des raisons possibles
  reasons = [
    { label: 'Entretien' },
    { label: 'Visite' },
    { label: 'Affaire' }
  ];

  // Constructeur du composant
  constructor(private registersService: RegistersService, private managersService: ManagerService) { }

  // Méthode pour afficher la boîte de dialogue avec un enregistrement spécifique
  showDialog(register: any) {
    this.selectedRegister = register;
    this.visible = true;
  }

  // Méthode pour formater une date en utilisant la bibliothèque date-fns
  formatDate(date: Date): string {
    return format(date, 'dd MMMM yyyy HH:mm', { locale: fr });
  }

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit() {
    // Récupération des gestionnaires depuis le service dédié
    this.managersService.getManagers().subscribe((data: Manager[]) => {
      this.managers = data.map(entry => ({ ...entry }));
    });

    // Récupération des enregistrements depuis le service dédié
    this.registersService.getRegisters().subscribe((data: Register[]) => {
      // Transformation des données avant leur utilisation dans le composant
      this.registers = data.map(entry => ({
        ...entry,
        startedAt: format(parseISO(entry.startedAt), 'dd MMMM yyyy H\'h\'mm', { locale: fr }),
        managerName: this.getManagerName(entry.manager, entry.otherManager)
      }));

      // Initialisation des données filtrées avec toutes les données disponibles
      this.filteredRegisters = [...this.registers];
      console.log(this.registers);

      // Indique que le chargement est terminé
      this.loading = false;
    });
  }

  // Méthode pour obtenir le nom complet du gestionnaire, en prenant en compte différentes situations
  getManagerName(manager: Manager | number | null, otherManager: string | null): string {
    if (!manager) {
      // Si le manager est null, utilisez otherManager
      return otherManager ?? "N/A";
    }

    // Si l'ID du manager est fourni, recherchez dans la liste des managers
    if (typeof manager === 'number') {
      const matchingManager = this.managers.find(m => m.id === manager);
      return matchingManager ? matchingManager.fullname : "N/A";
    }

    // Sinon, c'est déjà un objet Manager complet
    return manager.fullname;
  }

  // Méthode pour appliquer les filtres définis par l'utilisateur
  applyFilters() {
    // Appliquez le filtre directement sur la liste filteredRegisters
    this.filteredRegisters = this.registers.filter(register => {
      return Object.keys(this.filter).every(key => {
        const value = this.filter[key];

        // Différentes conditions de filtrage en fonction de la clé
        if (key === 'fullname') {
          const fullname = (register.firstname + ' ' + register.lastname).toLowerCase();
          return value === null || fullname.includes(value.toString().toLowerCase());
        }

        if (key === 'managerName') {
          const managerFullname = this.getManagerFullname(register.manager);
          return !value || managerFullname.includes(value.fullname);
        }

        if (key === 'reason') {
          return !value || register.reason.includes(value.label);
        }

        if (key === 'startedAt') {
          if (value) {
            const date = format(value, 'dd MMMM yyyy', { locale: fr });
            return register.startedAt.includes(date);
          }
        }

        return value === null || register[key].toString().toLowerCase().includes(value.toString().toLowerCase());
      });
    });
  }

  // Méthode pour obtenir le nom complet du gestionnaire, en prenant en compte différentes situations
  getManagerFullname(manager: Manager | number | null): string {
    if (manager === null || typeof manager === 'number') {
      const matchingManager = this.managers.find(m => m.id === (manager as number));
      return matchingManager ? matchingManager.fullname : "N/A";
    }

    return manager.fullname;
  }

  // Méthode pour réinitialiser les filtres en remettant la liste à sa valeur d'origine
  resetFilters() {
    this.filter.fullname = null;
    this.filter.managerName = null;
    this.filter.reason = null;
    this.filter.startedAt = null;

    this.filteredRegisters = [...this.registers];
  }
}
