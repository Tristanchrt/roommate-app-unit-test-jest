<template lang="html" src="./Header.html"></template>
<script lang="ts" src="./Header.component.ts"></script>

<style lang="scss" scoped>
@use '@/assets/styles/colors.scss' as color;

$border_radius: 10px;

#header {
  background: color.$primary_color;
  padding: 0.8em 1em;
  width: 100%;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    text-decoration: none;
  }

  .cont.search {
    justify-content: flex-start;
  }
  .cont {
    position: relative;
    height: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    .logo {
      width: 2em;
      height: 2em;
      background: color.$secondary_color;
      border-radius: $border_radius;
      cursor: pointer;
    }
    .search {
      margin-left: 1em;
      width: 20em;
      background: color.$secondary_color;
      border-radius: $border_radius;
      height: 100%;

      display: flex;
      justify-content: flex-start;
      align-items: center;

      color: color.$text_main_color;

      padding: 0 0.8em;

      input {
        margin-left: 0.5em;
        background: none;
        border: none;
        outline: none;

        color: inherit;
        font-size: 1.1em;
        width: 100%;
      }
    }

    .icon {
      position: relative;
      margin: 0 2em;

      i {
        font-size: 1.6em;
        color: color.$text_main_color;
        padding-right: 0.5em;
        cursor: pointer;
      }
      .notification {
        position: absolute;
        width: 0.5em;
        height: 0.5em;
        border-radius: 50%;
        background: color.$tertiary_color;
        top: 0;
        right: 0;
      }
    }
  }

  .profile {
    justify-content: flex-end;
    .picture {
      background: color.$secondary_color;
      border-radius: 50%;
      width: 2.5em;
      height: 2.5em;
      cursor: pointer;
    }
    .name {
      color: color.$text_main_color;
      margin-left: 1em;
    }
    .more {
      color: color.$text_main_color;
      padding: 0.5em;
      height: 1em;
      width: 1em;
      background: color.$secondary_color;
      border-radius: 50%;
      margin-left: 1em;
      cursor: pointer;

      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

@media (max-width: 900px) {
  #header {
    .cont.search > .search {
      display: none;
    }
  }
}
</style>
