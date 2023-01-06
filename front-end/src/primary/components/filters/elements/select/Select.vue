<template lang="html" src="./Select.html"></template>
<script lang="ts" src="./Select.component.ts"></script>

<style lang="scss" scoped>
@use '@/assets/styles/colors.scss' as color;
@import '@/assets/styles/filter.scss';

.selectFilter {
  input,
  select {
    &:focus {
      border: none;
      outline: none;
    }
  }

  .container {
    margin-top: 1em;
    border: 1px solid color.$primary_color;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    padding: 0.2em 1em;
    align-items: center;

    #select {
      width: 20em;
      border: none;
      background: none;

      height: 2em;
      appearance: none;
      color: color.$primary_color;
      font-weight: 700;
      font-size: 1em;
    }
    i {
      color: color.$primary_color;
    }
  }

  .selectedValues {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    margin-top: 0.2em;

    .value {
      padding: 0.5em 1em;
      background: color.$senary_color;
      border: 1px solid #e4e4e4;
      border-radius: 20px;
      font-size: 0.9em;
      margin: 0.4em;
      margin-left: 0;
      font-weight: 700;

      i {
        margin-left: 0.3em;
        cursor: pointer;
      }
    }
  }
}
</style>
