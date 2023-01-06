<template lang="html" src="./UserCard.html"></template>
<script lang="ts" src="./UserCard.component.ts"></script>

<style lang="scss" scoped>
@use '@/assets/styles/colors.scss' as color;
.userCard {
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  background-color: color.$senary_color;
  .image {
    background-size: cover;
    background-position: center;
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .name {
    position: absolute;
    bottom: 0;
    border-top-right-radius: 20px;
    padding: 0.5em 1em;

    background: color.$quinary_color;
  }
}
</style>
