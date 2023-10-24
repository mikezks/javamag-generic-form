import { Component, effect, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { injectBookingFeature } from '../../../+state/booking.state';

@Component({
  selector: 'app-flight-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './edit.component.html'
})
export class EditComponent {
  protected editForm = inject(NonNullableFormBuilder).group({
    id: [0],
    from: [''],
    to: [''],
    date: [new Date().toISOString()],
    delayed: [false]
  });
  #bookingFeature = injectBookingFeature();

  constructor() {
    this.#bookingFeature.activeFlight$
      .subscribe(f => this.editForm.patchValue(f));
  }

  save(): void {
    this.#bookingFeature.save(this.editForm.getRawValue());
  }
}
