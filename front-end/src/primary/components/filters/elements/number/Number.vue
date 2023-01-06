<template lang="html" src="./Number.html"></template>
<script lang="ts" src="./Number.component.ts"></script>

<style lang="scss" scoped>
@use '@/assets/styles/colors.scss' as color;
@import '@/assets/styles/filter.scss';

.numberFilter {
  .content {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .text {
      margin-right: 1em;
      font-weight: 600;
    }
    input {
      border: 1px solid #e9e9e9;
      background: none;
      border-radius: 10px;

      width: 2em;
      height: 2em;
      padding: 0.5em;
      text-align: center;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
}
</style>
