<template lang="html" src="./Message.html"></template>
<script lang="ts" src="./Message.component.ts"></script>

<style lang="scss" scoped>
@use '@/assets/styles/colors.scss' as color;

.message {
  .container {
    display: flex;
    align-items: flex-end;
    margin: 2em 1em;

    & > .image {
      background-size: cover;
      background-position: center;
      background-color: color.$senary_color;
      width: 3em;
      height: 3em;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .cont {
      max-width: 30em;
      margin: 0 1em;

      @media (max-width: 740px) {
        max-width: 75%;
      }

      .name {
        text-align: left;
        margin: 0 0.5em;
        margin-bottom: 0.5em;
        color: color.$septenary_color;
        font-size: 0.9em;
      }

      .content {
        background: color.$senary_color;
        padding: 1em 1em;
        border-radius: 20px;
        box-sizing: border-box;

        text-align: left;
        white-space: pre-wrap;

        &.image {
          padding: 0;
          background: none !important;
          border-radius: 0;
          width: 30em;
          max-width: 100%;
          img {
            max-width: 100%;
            border-radius: 20px;
          }
        }
      }
    }
  }

  .container.right {
    flex-direction: row-reverse;

    .cont {
      .name {
        text-align: right;
      }
      .content {
        background: color.$primary_color;
        color: color.$quinary_color;

        &.error {
          background: color.$secondary_color;
        }
      }
    }
  }
}
</style>
