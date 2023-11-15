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


}
