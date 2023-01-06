<template lang="html" src="./ElementSelector.html"></template>
<script lang="ts" src="./ElementSelector.component.ts"></script>

<style lang="scss" scoped>
@use '@/assets/styles/colors.scss' as color;
@import '@/assets/styles/filter.scss';

.elementSelector {
  .values {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    margin-top: 0.2em;

    .value {
      padding: 0.5em 1em;
      background: color.$senary_color;
      border: 1px solid #757575;
      border-radius: 20px;
      font-size: 0.9em;
      margin: 0.4em;
      margin-left: 0;
      font-weight: 700;

      opacity: 0.3;
      cursor: pointer;
      transition: opacity 200ms linear;
    }
    .value.selected {
      border: 1px solid #e4e4e4;
      opacity: 1;
    }
  }
}
</style>
