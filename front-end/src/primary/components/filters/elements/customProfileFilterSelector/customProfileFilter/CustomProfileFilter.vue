<template lang="html" src="./CustomProfileFilter.html"></template>
<script lang="ts" src="./CustomProfileFilter.component.ts"></script>

<style lang="scss" scoped>
@use '@/assets/styles/colors.scss' as color;

.customProfile {
  padding: 0.3em 1.5em;
  border: 1px solid #00000015;
  background: color.$senary_color;
  border-radius: 20px;
  display: flex;
  font-size: 0.9em;
  max-width: 9em;
  overflow: hidden;
  white-space: nowrap;
  .icon {
    margin-right: 0.5em;
  }
  .text {
    font-weight: 600;
  }
  i {
    display: flex;
    align-items: center;
    margin-left: 1em;
  }
}
</style>
