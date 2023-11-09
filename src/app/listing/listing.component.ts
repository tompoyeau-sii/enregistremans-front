import { Component } from '@angular/core';
import { RegistersService } from '../services/registers/registers.service';
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
  manager: {
    id: number;
    fullname: string;
  } | null;
  estimateTime: string;
  startedAt: string;
  otherManager: string | null;
}

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})

export class ListingComponent {
  constructor(private registersService: RegistersService) { }
  registers: any[] = [];
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
    // Utilisation du modèle dans le composant
    this.registersService.getManagers().subscribe((data: Register[]) => {
      this.registers = data.map(entry => ({
        ...entry,
        startedAt: format(parseISO(entry.startedAt), 'dd MMMM yyyy H\'h\'mm', { locale: fr }),
        managerName: entry.manager?.fullname || entry.otherManager || "N/A"
      }));
    });
  }


}
