import { Component, Input } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { initalModelFormConfig } from "../model/model";
import { injectRxControl } from "../util/form-inject";
import { NgFor, NgIf } from "@angular/common";
import { isRecordValue } from "../model/type-guards";
import { ModelFormsInputControl } from "./form-input";

@Component({
  selector: 'model-forms-group',
  standalone: true,
  imports: [
    NgIf, NgFor,
    ReactiveFormsModule,
    ModelFormsInputControl
  ],
  template: `
    <ng-container
      [formGroup]="rxForms.group()"
    >
      <div
        [formGroupName]="rxForms.name()"
        class="form-group"
        style="margin-left: 10px"
      >
        <h4 class="card-title">
          {{ meta.label }}
        </h4>

        <ng-container
          *ngFor="let control of controls"
        >

          <model-forms-input
            *ngIf="control.controlType === 'input'"
            [formGroupName]="control.key"
            [meta]="control"
          />

        </ng-container>
      </div>
    </ng-container>
  `
})
export class ModelFormsGroupComponent {
  protected rxForms = injectRxControl();

  @Input() meta = initalModelFormConfig;

  protected get controls() {
    return isRecordValue(this.meta.valueType) ?
      this.meta.valueType :
      [];
  }
}
