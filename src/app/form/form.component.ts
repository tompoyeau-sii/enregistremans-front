import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  managers = [
    { name: 'Ovilac Loison', value: 'option1' },
    { name: 'Eric Gourmel', value: 'option2' },
    { name: 'Rachel', value: 'option3' }
  ];

  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required,]],
      organisation: ['', [Validators.required,]],
      correspondant: ['', [Validators.required,]],
      motif: ['', [Validators.required,]],
      startDate: ['', [Validators.required,]],
    });
  }

  selectedOption: any;
  onOptionSelect(option: any) {
    this.selectedOption = option;
  }

  onSubmit() {
    if (this.userForm.valid) {
      // Traitez les données du formulaire ici
      console.log(this.userForm.value);
    }

  }
}
