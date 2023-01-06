<template lang="html" src="./ChatPage.html"></template>
<script lang="ts" src="./ChatPage.component.ts"></script>

<style lang="scss" scoped>
@use '@/assets/styles/colors.scss' as color;

.chatPage {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: hidden;

  & > .container {
    position: relative;
    display: flex;
    align-items: stretch;
    height: 100%;
    width: 100%;

    .conversations {
      height: 100%;
      width: 18em;
      background: color.$senary_color;
      border-right: 1px solid #eeeeee;
      flex-shrink: 0;

      overflow-y: auto;
      padding: 0 1em;

      .title {
        font-weight: 700;
        font-size: 2em;
        margin-top: 0.7em;
        margin-bottom: 0.5em;
        text-align: left;
      }

      .conversationButton {
        margin: 1em 0;
      }
    }

    .conversations.tablet {
      min-width: 0em;
      width: 6em;
      flex-shrink: 0;
      font-size: 0.8em;
      padding: 0;

      .title {
        display: none;
      }
    }

    .noConversation {
      height: 100%;
      width: 100%;
      position: relative;

      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .image {
        width: 20em;
      }
    }
  }
  & > .loading {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2em;
    color: color.$primary_color;
  }
}
</style>
