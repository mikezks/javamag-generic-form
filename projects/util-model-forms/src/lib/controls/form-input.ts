import { NgIf } from "@angular/common";
import { Component, Input } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';
import { injectRxControl } from "../util/form-inject";
import { injectUniqueId } from "../util/form-unique-id";
import { ControlConfig, initalModelFormConfig } from "../model/model";
import { transformMetaValueTypeToInputType } from "../util/form-meta-to-type";


@Component({
  selector: 'model-forms-input',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  template: `
    <form
      [formGroup]="rxForms.group()"
      class="form-group"
    >
      <label [attr.for]="uniqueId + '-001'">
        {{ meta.label }}
      </label>
      <input
        [formControlName]="rxForms.name()"
        [type]="type"
        [placeholder]="meta.placeholder"
        [attr.id]="uniqueId + '-001'"
        class="form-control"
      />
    </form>
  `
})
export class ModelFormsInputControl {
  protected rxForms = injectRxControl();
  protected uniqueId = injectUniqueId();

  private _meta = initalModelFormConfig;
  @Input() set meta(config: ControlConfig) {
    this.type = transformMetaValueTypeToInputType(config.valueType);
    this._meta = config;
  }
  get meta() {
    return this._meta;
  }

  protected type = 'text';
}
