<template lang="html" src="./StarsRating.html"></template>
<script lang="ts" src="./StarsRating.component.ts"></script>

<style lang="scss" scoped>
@use '@/assets/styles/colors.scss' as color;
.stars {
  display: flex;
  justify-content: center;
  align-items: center;
  .star {
    margin: 0 0.5em;
    color: color.$octonary_color;
  }
}
</style>
