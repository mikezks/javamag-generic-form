import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { startWith } from 'rxjs';
import { ModelFormsComponent } from '../controls/form';
import { ModelFormsService } from '../logic/model-forms.service';


@Component({
  selector: 'model-forms-demo',
  standalone: true,
  imports: [
    NgIf, AsyncPipe,
    ReactiveFormsModule,
    ModelFormsComponent
  ],
  template: `
    <model-forms
      *ngIf="meta$ | async as meta"
      [meta]="meta"
      (validSubmit)="log($event)"
    />
  `
})
export class UtilModelFormsDemoComponent {
  meta$ = inject(ModelFormsService)
    .loadMetadata().pipe(
      startWith()
    );

  log(formData: Record<string, unknown>): void {
    console.log(formData);
  }
}

