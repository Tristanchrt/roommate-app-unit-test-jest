<template lang="html" src="./ConversationButton.html"></template>
<script lang="ts" src="./ConversationButton.component.ts"></script>

<style lang="scss" scoped>
@use '@/assets/styles/colors.scss' as color;

.conversationButton {
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  align-items: center;
  padding: 0.5em 1em;
  overflow: hidden;
  cursor: pointer;

  &.selected {
    background: color.$quinary_color;
    background-size: cover;
    background-position: center;
    border: 1px solid #f5f5f5;
  }
  & > .images {
    position: relative;
    height: 3.2em;
    width: 5em;
    margin-right: 1em;

    .image {
      position: absolute;
      width: 2.1em;
      height: 2.1em;
      bottom: 0;
      margin-right: 0;
    }
    .image:nth-child(3) {
      left: 1.6em;
    }
    .image:nth-child(1) {
      position: relative;
      top: initial;
      width: 2.5em;
      height: 2.5em;
      left: 0.75em;
      top: 0;
    }
    .image:nth-child(n + 4) {
      display: none;
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

    .name,
    .content {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 100%;
    }
    .content {
      font-size: 0.9em;
    }
    .name {
      font-weight: bold;
    }
  }
}
.conversationButton.mini {
  .cont {
    display: none;
  }

  display: flex;
  justify-content: center;
  & > .images,
  .image {
    margin-right: 0;
  }
}
</style>
