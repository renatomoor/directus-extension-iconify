import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'n/prefer-global/process': 'off',
    'no-undef': 'off',
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 1,
      },
      multiline: {
        max: 1,
      },
    }],
  },
})
