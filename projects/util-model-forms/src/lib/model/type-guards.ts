import { ArrayValueType, ControlConfig, FlatValueType, RecordValueType, ValueType } from "./model";

export function isControlConfig(value: unknown): value is ControlConfig {
  const cfg = value as ControlConfig;

  return cfg?.key !== undefined &&
    cfg?.controlType !== undefined &&
    cfg?.valueType !== undefined &&
    cfg?.label !== undefined;
}

export function isRecord<T>(value: unknown): value is Record<string, T> {
  return value?.constructor === Object;
}

export function isArray<T>(value: unknown): value is Array<T> {
  return value instanceof Array;
}

export function isFlatValue(value: unknown): value is FlatValueType {
  return typeof value === (
    'string' || 'number' || 'boolean'
  );
}

export function isRecordValue(value: ValueType): value is RecordValueType {
  return isArray(value);
}

export function isArrayValue(value: ValueType): value is ArrayValueType {
  return isControlConfig(value) && value.controlType === 'array';
}
