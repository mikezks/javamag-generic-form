import { ModelFormConfig } from "./model";

const flightConfig: ModelFormConfig = {
  key: 'root',
  controlType: 'group',
  label: 'Flight',
  valueType: [
    {
      key: 'id',
      controlType: 'input',
      valueType: 'number',
      label: 'ID'
    },
    {
      key: 'from',
      controlType: 'input',
      valueType: 'string',
      label: 'From'
    },
    {
      key: 'adresses',
      controlType: 'array',
      label: 'Adresses',
      valueType: [
        {
          key: 'street',
          controlType: 'input',
          valueType: 'string',
          label: 'Street'
        },
        {
          key: 'number',
          controlType: 'input',
          valueType: 'number',
          label: 'Number'
        }
      ]
    }
  ]
}
