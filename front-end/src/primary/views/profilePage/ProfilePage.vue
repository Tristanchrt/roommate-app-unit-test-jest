<template lang="html" src="./ProfilePage.html"></template>
<script lang="ts" src="./ProfilePage.component.ts"></script>

<style lang="scss" scoped>
@use '@/assets/styles/colors.scss' as color;

.profilePage {
  display: flex;
  height: 100%;
  width: 100%;
  overflow: hidden;
  .cont {
    width: 100%;
    background: color.$senary_color;
  }
  .cont:first-child {
    width: 26em;
    flex-shrink: 0;
    background: color.$quinary_color;
    border-right: 1px solid #eeeeee;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .avatar {
      width: 10em;
      height: 10em;
      border-radius: 50%;

      background: color.$senary_color;
      background-image: cover;
      background-position: center;
      margin-bottom: 1.5em;
    }
    .firstName,
    .lastName {
      font-size: 1.5em;
      line-height: 0.9em;
    }
    .firstName {
      font-weight: 800;
    }
    .lastName {
      margin-bottom: 1.3em;
    }
    .description {
      border: dashed color.$septenary_color 2px;
      outline: none;
      font-family: inherit;
      background: none;
      width: 18em;
      max-width: 80%;
      box-sizing: border-box;
      resize: none;
      overflow: hidden;
      text-align: center;
      padding: 1.5em;
      border-radius: 10px;
    }
    .flexCont {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 2em;

      .bar {
        height: 100%;
        width: 2px;
        background: color.$octonary_color;
        margin: 0 2em;
      }
      .element {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        line-height: 1em;

        b {
          font-size: 1.4em;
        }
      }
    }
    .button {
      cursor: pointer;
      position: relative;
      margin-top: 2em;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1em 2em;

      border: 4px solid color.$secondary_color;
      border-radius: 20px;
      overflow: hidden;

      line-height: 1em;
      font-size: 0.9em;

      &:hover {
        .background {
          width: 100% !important;
        }
      }

      .background {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;

        background: color.$primary_color;
        transition: width ease-out 200ms;
      }

      * {
        position: relative;
        color: color.$quinary_color;
        text-shadow: 3px 3px 10px rgba(0, 0, 0, 0.4);
      }

      i {
        font-size: 2em;
        margin-right: 0.7em;
      }
      b {
        font-size: 1.2em;
      }
    }
  }
}
</style>
