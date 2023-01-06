<template lang="html" src="./MatchPage.html"></template>
<script lang="ts" src="./MatchPage.component.ts"></script>

<style lang="scss" scoped>
@use '@/assets/styles/colors.scss' as color;

.matchPage {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  overflow: hidden;

  .filters {
    width: 20em;
    background: color.$senary_color;
    border-right: 1px solid rgb(235, 235, 235);

    display: flex;
    flex-direction: column;
    height: 100%;
    flex-shrink: 0;
  }
  .container {
    width: 100%;
    height: 100%;
    overflow-y: auto;

    .info {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      height: 70%;
      width: 100%;
      text-align: center;
      font-size: 1.5em;
      .title {
        font-weight: 800;
        font-size: 2em;
        margin-bottom: -0.3em;
      }
    }

    .matchs {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-wrap: wrap;
      margin-bottom: 5em;
      .userCard {
        height: 13em;
        width: 10em;
        margin: 1em;
      }
    }
  }
}
</style>
