import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ModelFormConfig } from '../model/model';
import { injectModelFormsMeta } from '../util/form-inject';
import { ModelFormsGroupComponent } from './form-group';

@Component({
  selector: 'model-forms',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    ModelFormsGroupComponent
  ],
  template: `
    <div
      *ngIf="form"
      class="card"
    >
      <div class="card-header">
        <h2 class="card-title">
          {{ form.meta.initialValue }}
        </h2>
      </div>

      <div class="card-body">
        <form [formGroup]="form.group" >

          <model-forms-group
            *ngIf="form.meta.controlType === 'group'"
            [meta]="form.meta"
            [formGroupName]="form.meta.key"
          />

          <div class="form-group">
            <button
              (click)="save()"
              [disabled]="!form.group.valid"
              class="btn btn-default"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class ModelFormsComponent {
  transform = injectModelFormsMeta();

  @Input() set meta(meta: ModelFormConfig) {
    const group = this.transform(meta);
    group.valueChanges.subscribe(
      formData => this.valueChange.emit(formData)
    );

    this.form = { meta, group };
  }
  @Output() valueChange = new EventEmitter<Record<string, unknown>>();
  @Output() validSubmit = new EventEmitter<Record<string, unknown>>();

  protected form?: {
    meta: ModelFormConfig;
    group: FormGroup;
  };

  save(): void {
    if (this.form?.group && !this.form.group.valid) {
      return;
    }

    this.validSubmit.emit(this.form?.group.value);
  }
}
