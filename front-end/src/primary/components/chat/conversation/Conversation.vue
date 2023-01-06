<template lang="html" src="./Conversation.html"></template>
<script lang="ts" src="./Conversation.component.ts"></script>

<style lang="scss" scoped>
@use '@/assets/styles/colors.scss' as color;

.conversation {
  &,
  .messagesContainer,
  .blank {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    overflow-x: auto;
    overflow-y: auto;

    .messages {
      height: 100%;
      overflow-y: auto;
    }
  }
  .input_container {
    flex-shrink: 0;
    width: 100%;
    min-height: 5em;
    background-color: color.$quinary_color;

    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.5em 2em;
    box-sizing: border-box;
    z-index: 20;

    textarea {
      background-color: color.$senary_color;
      border: 0;
      outline: 0;
      padding: 0.6em 2em;
      width: 100%;
      height: 100%;
      border-radius: 15px;
      font-size: 0.9em;
      margin: 0 1em;

      font-family: inherit;
      resize: none;
      height: 38px;
      box-sizing: border-box;
    }

    i {
      font-size: 1.5em;
      color: color.$primary_color;
      margin: 0 0.4em;
      cursor: pointer;
    }
  }

  & > .loading {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3em;
    color: color.$primary_color;
  }
}
</style>
