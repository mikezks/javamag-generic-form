import { inject } from "@angular/core";
import { FormGroup, FormGroupName, UntypedFormBuilder } from "@angular/forms";
import { isFlatValue, isArrayValue, isControlConfig, isRecordValue } from "../model/type-guards";
import { ControlConfig } from "../model/model";

export function injectRxControl(): { group: () => FormGroup, name: () => string } {
  const formControlName = inject(FormGroupName);

  return {
    group: () => formControlName.control?.parent as FormGroup,
    name: () => formControlName.name as string
  };
}

export function injectModelFormsMeta(): (model: ControlConfig) => FormGroup {
  const fb = inject(UntypedFormBuilder);

  const addFlatControl = (group: FormGroup, model: ControlConfig): void => {
    if (isFlatValue(model.valueType)) {
      group.addControl(model.key, fb.control(model.initialValue));
    }
  }

  const addArrayControl = (group: FormGroup, model: ControlConfig): void => {
    if (isArrayValue(model)) {
      const arr = fb.array([]);
      group.addControl(model.key, arr);
      if (isControlConfig(model.valueType)) {
        arr.controls.push(transformModelToFormGroup(model.valueType));
      }
    }
  }

  const addRecordControl = (group: FormGroup, model: ControlConfig): void => {
    if (isRecordValue(model.valueType)) {
      model.valueType.forEach(m => {
        addFlatControl(group, m);
        addArrayControl(group, m);
        addRecordControl(group, m);
      });
    }
  }

  const transformModelToFormGroup = (model: ControlConfig): FormGroup => {
    const group = fb.group({});
    const root = fb.group({ root: group });

    if (isControlConfig(model)) {
      addFlatControl(group, model);
      addArrayControl(group, model);
      addRecordControl(group, model);
    }

    return root;
  }


  return transformModelToFormGroup;
}
