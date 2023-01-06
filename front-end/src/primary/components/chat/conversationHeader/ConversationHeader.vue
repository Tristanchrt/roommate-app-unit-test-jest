<template lang="html" src="./ConversationHeader.html"></template>
<script lang="ts" src="./ConversationHeader.component.ts"></script>

<style lang="scss" scoped>
@use '@/assets/styles/colors.scss' as color;

.ConversationHeader {
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  align-items: center;
  padding: 1em 1em;
  overflow: hidden;
  cursor: pointer;

  border-bottom: 1px solid rgb(243, 243, 243);

  & > .images {
    position: relative;
    height: 3.2em;
    width: 5em;
    margin-right: 1em;
    font-size: 0.8em;

    .image {
      position: absolute;
      width: 2.1em;
      height: 2.1em;
      bottom: 0;
      margin-right: 0;
    }
    .image:last-child {
      left: 1.6em;
    }
    .image:first-child {
      position: relative;
      top: initial;
      width: 2.5em;
      height: 2.5em;
      left: 0.75em;
      top: 0;
    }
  }
  .image {
    width: 3em;
    height: 3em;
    flex-shrink: 0;
    border-radius: 50%;
    background: color.$tertiary_color;
    background-size: cover;
    background-position: center;
    margin-right: 1em;
  }

  .cont {
    width: 100%;
    height: 100%;
    overflow: hidden;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    .name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 100%;
      font-weight: bold;
    }
  }
}
</style>
