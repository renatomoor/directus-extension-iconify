import { defineInterface } from '@directus/extensions-sdk'
import InterfaceComponent from './interface.vue'

export default defineInterface({
  id: 'iconify-dropdown',
  name: 'Iconify Dropdown',
  icon: 'insert_emoticon',
  description: 'Iconify Dropdown',
  component: InterfaceComponent,
  recommendedDisplays: ['iconify-icon'],
  options: () => [
    {
      field: 'whitelist',
      name: 'Whitelist icon libraries',
      type: 'string',
      meta: {
        note: 'Comma separated list of icon libraries to whitelist. Leave empty to allow all.',
        width: 'full',
        interface: 'input',
      },
    },
  ],
  group: 'selection',
  types: ['string'],
})
