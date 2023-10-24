import { FlatValueType, ValueType } from "../model/model";
import { isFlatValue } from "../model/type-guards";

export function transformMetaValueTypeToInputType(value: ValueType): string {
  let inputType = '';

  if (isFlatValue(value)) {
    const convert: Record<FlatValueType, string> = {
      string: 'text',
      number: 'number',
      boolean: 'checkbox'
    };

    inputType = convert[value] || convert.string;
  }

  return inputType;
}
