<template lang="html" src="./Slider.html"></template>
<script lang="ts" src="./Slider.component.ts"></script>

<style lang="scss" scoped>
@use '@/assets/styles/colors.scss' as color;
@import '@/assets/styles/filter.scss';

.sliderFilter {
  .title {
    margin-bottom: 2.3em;
  }
  .vue-slider {
    &::v-deep .vue-slider-process {
      background: color.$primary_color;
    }
    &::v-deep .vue-slider-dot-handle {
      border: 3px solid color.$primary_color;
    }
    &::v-deep .vue-slider-dot-handle-focus {
      box-shadow: 0 0 0 5px #a03aff33;
    }
    &::v-deep .vue-slider-dot-tooltip-inner {
      box-shadow: unset;
      background: color.$primary_color;
      border-color: color.$primary_color;
    }
  }
}
</style>
