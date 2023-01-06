<template lang="html" src="./SignInPage.html"></template>
<script lang="ts" src="./SignInPage.component.ts"></script>

<style lang="scss" scoped>
.signInPage {
  position: relative;
  height: 100vh;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  overflow: hidden;

  .background {
    position: absolute;
    bottom: -20em;

    @media (min-width: 1920px) {
      display: none;
    }
  }

  .title {
    position: relative;
    color: #7e35ff;
    margin-bottom: 1em;
    font-size: 1.8em;
    font-weight: 700;
  }
  .container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    height: 20em;
    width: 30em;
    max-width: 90%;

    background: #ffffff;

    -webkit-box-shadow: 0px 0px 32px 12px rgba(0, 0, 0, 0.04);
    -moz-box-shadow: 0px 0px 32px 12px rgba(0, 0, 0, 0.04);
    box-shadow: 0px 0px 32px 12px rgba(0, 0, 0, 0.04);

    input {
      width: 18em;
      max-width: 80%;
      border: 0;
      border-bottom: 1px solid #ababab;
      margin: 1em 0;
      padding: 0.5em 0.5em;
      font-size: 1em;
      &::placeholder {
        opacity: 0.8;
        color: inherit;
      }
    }
    .signButton {
      position: relative;
      margin-top: 2em;
      width: 17em;
      max-width: 80%;
      padding: 0.5em 1em;
      color: #ffffff;
      background: #937fff;
      cursor: pointer;

      transition: background 100ms linear;
      text-align: center;
      overflow: hidden;

      & > div {
        position: relative;
      }

      &:before {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        display: inline-block;
        content: '';
        height: 0;
        width: 0;
        background: #7e35ff;

        transition: width linear 200ms, height linear 200ms, border-radius linear 200ms 200ms;
        border-radius: 50%;
      }

      &:hover {
        &:before {
          width: 20em;
          height: 20em;
          border-radius: 0%;
        }
      }
    }
  }
}
</style>
