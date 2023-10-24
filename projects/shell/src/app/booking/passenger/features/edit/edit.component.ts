import { NgIf } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { validatePassengerStatus } from '../../util/validation/passenger-status.validator';
import { PassengerService } from './../../logic/data-access/passenger.service';

@Component({
  selector: 'app-passenger-edit',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
  @Input() id = 0;

  editForm = inject(NonNullableFormBuilder).group({
    id: [0],
    firstName: [''],
    name: [''],
    bonusMiles: [0],
    passengerStatus: ['', [
      validatePassengerStatus(['A', 'B', 'C'])
    ]]
  });
  #passengerService = inject(PassengerService);

  ngOnInit(): void {
    this.#passengerService.findById(this.id)
      .subscribe(p => this.editForm.patchValue(p));
  }

  save(): void {
    this.#passengerService.save(this.editForm.getRawValue())
      .subscribe();
  }
}
