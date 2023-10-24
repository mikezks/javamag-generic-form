
export type ControlType =
  'group' |
  'array' |
  'input' |
  'checkbox' |
  'select';

export type RecordValueType = Array<ControlConfig>;
export type ArrayValueType = ControlConfig;
export type FlatValueType =
  'string' |
  'number' |
  'boolean';

export type ValueType =
  RecordValueType |
  ArrayValueType |
  FlatValueType;

export interface ValidatorConfig {
  key: string;
  params: Record<string, unknown> | Array<unknown>;
}

export interface ControlConfig {
  key: string;
  controlType: ControlType;
  valueType: ValueType;
  label: string;
  initialValue?: FlatValueType;
  placeholder?: FlatValueType;
  masterdataSourceKey?: string;
  disabled?: boolean;
  validator?: Array<ValidatorConfig>;
}

export type ModelFormConfig = ControlConfig;

export const initalModelFormConfig: ModelFormConfig = {
  key: '',
  controlType: 'group',
  valueType: [],
  label: ''
};
