<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import VueMultiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.css'
import { Icon } from '@iconify/vue'

const props = withDefaults(defineProps<{
  value: string | null
  whitelist: string | null
}>(), {
  value: null,
})

const emit = defineEmits(['input'])

const computedValue = computed({
  get() {
    return props.value
  },
  set(value) {
    emit('input', value)
  },
})

const options = ref([props.value])

function getIconifyUrl(query: string) {
  let url = `https://api.iconify.design/search?query=${query}`
  if (props.whitelist)
    url += `&prefixes=${props.whitelist.replace(/\s+/g, '')}`

  return url
}

async function fetchIcons(query: string) {
  const url = getIconifyUrl(query)
  const data = await fetch(url)
  const json = await data.json()
  return json.icons
}

onMounted(async () => {
  options.value = await fetchIcons('home')
})

async function asyncFindIcons(query: string) {
  if (query.length < 2)
    return
  options.value = await fetchIcons(query)
}
</script>

<template>
  <div class="input v-input full-width has-click">
    <VueMultiselect
      v-model="computedValue"
      :options="options"
      placeholder="Type to search"
      :show-labels="false"
      :close-on-select="true"
      :prevent-autofocus="true"
      :searchable="true"
      @search-change="asyncFindIcons"
    >
      <template #singleLabel="{ option }">
        <div class="display-icon-with-name">
          <Icon
            width="24"
            height="24"
            :icon="option"
          />
          <p class="display-icon-with-name__text">
            {{ option }}
          </p>
        </div>
      </template>
      <template #option="{ option }">
        <div class="display-icon-with-name">
          <Icon
            width="24"
            height="24"
            :icon="option"
          />
          <p class="display-icon-with-name__text">
            {{ option }}
          </p>
        </div>
      </template>
      <template #noResult>
        No icons found.
      </template>
    </VueMultiselect>
  </div>
</template>

<style>
  .display-icon-with-name {
    display: flex;
    align-items: center;
  }

  .display-icon-with-name__text {
    margin-left: 10px;
  }
  .multiselect__tags, .multiselect__input {
    background: var(--theme--background-accent);
    color: var(--v-input-color, var(--theme--form--field--input--foreground));
    font-family: var(--v-input-font-family,var(--theme--fonts--sans--font-family) );
    background-color: var(--v-input-background-color, var(--theme--form--field--input--background));
    border: var(--theme--border-width) solid var(--v-input-border-color, var(--theme--form--field--input--border-color));
    border-radius: var(--v-input-border-radius, var(--theme--border-radius));
    transition: var(--fast) var(--transition);
    transition-property: border-color,box-shadow;
    box-shadow: var(--theme--form--field--input--box-shadow);
  }

  .multiselect__element {
    background: var(--theme--background-accent);
    color: var(--v-input-color, var(--theme--form--field--input--foreground));
    background-color: var(--v-input-background-color, var(--theme--form--field--input--background));
  }

  .multiselect__input {
    padding: 10px;
  }

  .multiselect__select {
    align-self: center;
  }

  .multiselect__single {
    height: 100%;
    color: var(--v-input-color);
    background-color: var(--theme--form--field--input--background);
    border-color: var(--v-input-border-color-hover, var(--theme--form--field--input--border-color-hover));
    box-shadow: var(--theme--form--field--input--box-shadow-hover);
  }

  .listbox-null, .multiselect__content-wrapper {
    background-color: var(--theme--form--field--input--background);
    color: var(--v-input-color);
  }

  .multiselect__option:hover {
    background-color: var(--project-color);
  }

  .multiselect__element::selection {
    background-color: var(--project-color);
  }

  .multiselect__option--highlight {
    background-color: var(--project-color);
  }

  .multiselect__option--selected{
    background-color: var(--project-color);
  }

  .multiselect__option--selected.multiselect__option--highlight::after {
    background: var(--background-normal-alt);
  }

  .multiselect__option--selected.multiselect__option--highlight {
    background: var(--background-normal-alt);
  }
</style>
