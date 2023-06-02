<template>
  <label for="select-sort"><h3>Отсортировать:</h3></label>
  <div class="form-control">
    <select
      id="select-sort"
      class="select"
      :v-model="modelValue"
      @change="changeOption"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'my-select',
  props: {
    modelValue: {
      type: String,
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    changeOption(event) {
      this.$emit('update:modelValue', event.target.value)
    },
  },
}
</script>

<style scoped></style>
