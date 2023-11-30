<script lang="ts" setup>
import { Icon } from '@iconify/vue'

defineProps<{
  value: string | null
}>()
</script>

<template>
  <Icon
    width="100%"
    height="100%"
    :icon="value"
  />
</template>
