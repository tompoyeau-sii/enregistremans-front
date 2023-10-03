import { Component } from '@angular/core';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent {
  managers = [
    { firstname: 'Ovilac Loison', lastname: 'option1', mail: 'mail', phone: '01 02 03 04 05' },
    { name: 'Eric Gourmel', value: 'option2' },
    { name: 'Rachel Vincent', value: 'option3' },
    { name: 'Chloé Maillard', value: 'option4' },
    { name: 'Nicolas Pettazzoni', value: 'option5' }
  ];

}
