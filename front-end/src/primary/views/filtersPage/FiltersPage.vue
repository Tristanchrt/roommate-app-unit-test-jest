<template lang="html" src="./FiltersPage.html"></template>
<script lang="ts" src="./FiltersPage.component.ts"></script>

<style lang="scss" scoped>
@use '@/assets/styles/colors.scss' as color;

.filtersPage {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow: hidden;

  .rightContainer,
  .leftContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 50%;

    .container {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
    }
    .uppercase {
      text-transform: uppercase;
      line-height: 1em;
    }
    .title1 {
      font-size: 4em;
      font-weight: 800;
      color: color.$primary_color;
    }
    .subtitle1 {
      font-size: 3em;
      color: color.$septenary_color;
      font-weight: 600;
    }
    .title2 {
      margin-top: 0.1em;
      font-size: 3.5em;
      font-weight: 800;
      color: color.$secondary_color;
    }
    .categories {
      margin-top: 4em;
      border-left: 4px solid color.$secondary_color;
      padding: 0.5em 0;

      .categorie {
        margin: 0.5em 0;
        margin-left: 1em;
        color: color.$secondary_color;
        font-size: 1.5em;
        cursor: pointer;

        transition: all 100ms ease-in;

        &.selected {
          font-size: 1.6em;
          font-weight: 700;
          color: color.$primary_color;
        }
      }
    }
  }
  .rightContainer {
    display: flex;
    justify-content: flex-start;
    height: 100%;
    overflow-y: auto;
    padding: 4em 1em;
    box-sizing: border-box;

    /* width */
    &::-webkit-scrollbar {
      width: 10px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: color.$senary_color;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: color.$septenary_color;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: color.$septenary_color;
    }
  }
}
</style>
