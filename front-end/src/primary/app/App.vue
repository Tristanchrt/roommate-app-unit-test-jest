<template lang="html" src="./App.html"></template>
<script lang="ts" src="./App.component.ts"></script>

<style lang="scss">
@use '../../assets/styles/colors.scss' as color;

body {
  padding: 0;
  margin: 0;
}

#app {
  font-family: 'Open Sans', sans-serif;
  height: 100vh;
  width: 100%;

  & > .content,
  & > .loading {
    position: relative;
    display: flex;
    flex-direction: column;

    height: 100%;
    width: 100%;
  }
  & > .content {
    #header {
      flex-shrink: 0;
    }
  }
  & > .loading {
    align-items: center;
    justify-content: center;
    font-size: 1.3em;
    color: color.$primary_color;
  }
}
</style>
