<template lang="html" src="./ImageSelector.html"></template>
<script lang="ts" src="./ImageSelector.component.ts"></script>

<style lang="scss" scoped>
@use '@/assets/styles/colors.scss' as color;
@import '@/assets/styles/filter.scss';

.images {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  .image {
    background-size: cover;
    background-position: center;
    margin: 1em;
    margin-left: 0;

    width: 5.5em;
    height: 6.5em;
    border-radius: 20px;

    cursor: pointer;
    opacity: 0.4;
    transition: opacity 200ms linear;
  }
  .image.selected {
    border-radius: 20px;
    opacity: 1;
  }
}
</style>
