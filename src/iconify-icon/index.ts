import { defineDisplay } from '@directus/extensions-sdk'
import DisplayComponent from './display.vue'

export default defineDisplay({
  id: 'iconify-icon',
  name: 'Iconify Icon',
  icon: 'box',
  description: 'Iconify Icon Display',
  component: DisplayComponent,
  options: null,
  types: ['string'],
})
