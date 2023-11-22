import { Component } from '@angular/core';
import { RegistersService } from '../services/registers/registers.service';
import { ManagerService } from '../services/manager/manager.service';
import { parseISO, format } from 'date-fns';
import { fr } from 'date-fns/locale';

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

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})

export class ListingComponent {
  constructor(private registersService: RegistersService, private managersService: ManagerService) { }

  registers: any[] = [];
  managers: any[] = [];
  selectedRegister: any = null;
  visible: boolean = false;

  filteredRegisters: Register[] = [];

  filter: any = {
    fullname: null,
    managerName: null,
    reason: null,
    startedAt: null
  };

  reasons = [
    { label: 'Entretien' },
    { label: 'Visite' },
    { label: 'Affaire' }
  ];
  


  showDialog(register: any) {
    this.selectedRegister = register;
    this.visible = true;
  }

  formatDate(date: Date): string {
    return format(date, 'dd MMMM yyyy HH:mm', { locale: fr });
  }

  ngOnInit() {
    this.managersService.getManagers().subscribe((data: Manager[]) => {
      this.managers = data.map(entry => ({
        ...entry,
      }))
    })
    this.registersService.getRegisters().subscribe((data: Register[]) => {
      this.registers = data.map(entry => ({
        ...entry,
        startedAt: format(parseISO(entry.startedAt), 'dd MMMM yyyy H\'h\'mm', { locale: fr }),
        managerName: this.getManagerName(entry.manager, entry.otherManager)
      }));
      this.filteredRegisters = [...this.registers]; // Initialisation des données filtrées
      console.log(this.registers)
    });
  }

  getManagerName(manager: Manager | number | null, otherManager: string | null): string {
    if (!manager) {
      // Si le manager est null, utilisez otherManager
      return otherManager || "N/A";
    }

    // Si l'ID du manager est fourni, recherchez dans la liste des managers
    if (typeof manager === 'number') {
      const matchingManager = this.managers.find(m => m.id === manager);
      return matchingManager ? matchingManager.fullname : "N/A";
    }

    // Sinon, c'est déjà un objet Manager complet
    return manager.fullname;
  }

  applyFilters() {
    // Appliquez le filtre directement sur la liste filteredRegisters
    this.filteredRegisters = this.registers.filter(register => {
      return Object.keys(this.filter).every(key => {
        const value = this.filter[key];

        // Si le champ est fullname, combinez prénom et nom de famille et comparez avec filter.fullname
        if (key === 'fullname') {
          const fullname = (register.firstname + ' ' + register.lastname).toLowerCase();
          return value === null || fullname.includes(value.toString().toLowerCase());
        }

        // Si le champ est managerName, comparez avec le fullname du manager
        if (key === 'managerName') {
          const managerFullname = this.getManagerFullname(register.manager);
          return !value || managerFullname.includes(value.fullname);
        }

        if (key === 'reason') {
          return !value || register.reason.includes(value.label);
        }

        if (key === 'startedAt') {
          if(value) {
            const date = format(value, 'dd MMMM yyyy', { locale: fr })
            return !value || register.startedAt.includes(date);
          }
        }

        return value === null || register[key].toString().toLowerCase().includes(value.toString().toLowerCase());
      });
    });
  }

  getManagerFullname(manager: Manager | number | null): string {
    if (manager === null || typeof manager === 'number') {
      // Gérer les cas où manager est null ou un nombre
      const matchingManager = this.managers.find(m => m.id === (manager as number));
      return matchingManager ? matchingManager.fullname : "N/A";
    }

    // Cas où manager est déjà un objet Manager
    return manager.fullname;
  }

  resetFilters() {
    // Réinitialisez les filtres en remettant la liste à sa valeur d'origine
    this.filter.fullname = null
    this.filter.managerName = null
    this.filter.reason = null
    this.filter.startedAt = null

    this.filteredRegisters = [...this.registers];
  }



}

