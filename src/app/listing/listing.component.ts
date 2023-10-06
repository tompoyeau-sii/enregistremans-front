import { Component } from '@angular/core';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})

export class ListingComponent {
  registers = [
    {
      firstname: 'Paul',
      lastname: 'Mars',
      mail: 'paul.mars@gmail.com',
      phone: '01 02 03 04 05',
      company: 'Aucune',
      manager: 'Rachel Vincent',
      reason: 'Entretien',
      startedAt: '12 Février 10:30'
    },
    {
      firstname: 'Marie',
      lastname: 'Large',
      mail: 'marie.large@gmail.com',
      phone: '01 02 03 04 05',
      company: 'SII',
      manager: 'Eric Gourmel',
      reason: 'Visite',
      startedAt: '27 Avril 9:27'
    },
  ];

}
