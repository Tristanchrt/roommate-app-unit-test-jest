<template lang="html" src="./UserModal.html"></template>
<script lang="ts" src="./UserModal.component.ts"></script>

<style lang="scss" scoped>
@use '@/assets/styles/colors.scss' as color;

.modal {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;

  .background {
    position: absolute;
    top: 0;
    left: 0;
    background: rgb(0, 0, 0);
    height: 100%;
    width: 100%;
    opacity: 0.4;
  }

  & > .container {
    position: relative;
    margin-top: 0;
    width: 33em;
    height: 35em;
    padding: 1.5em;
    border-radius: 20px;

    display: flex;
    justify-content: space-between;
    align-items: stretch;
    flex-direction: column;
    background: color.$quinary_color;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 0;
    }

    .info {
      display: flex;
      width: 100%;
      height: 100%;
      overflow: hidden;

      .section-title {
        font-size: 1em;
        font-weight: 600;
        line-height: 0.8em;

        & + .content {
          font-size: 1.4em;
          font-weight: 700;
          line-height: 1.3em;
        }
      }
      .left,
      .right {
        width: 50%;
        height: 100%;

        &::-webkit-scrollbar {
          width: 0;
        }
      }
      .left {
        width: 55%;
        .close {
          color: color.$primary_color;
          font-size: 1.5em;
          margin-top: 0;
          cursor: pointer;
        }
        & > div {
          margin: 1.5em 0;
        }
      }
      .right {
        height: 100%;
        overflow-y: auto;
        .image {
          height: 20em;
          width: 100%;
          border-radius: 20px;
          background-size: cover;
          background-position: center;
        }
        .review {
          width: 100%;
          display: flex;
          justify-content: flex-end;
          margin-top: 0.9em;
          font-size: 0.9em;
        }
        .description {
          margin-top: 1em;
          margin-bottom: 2em;
          .content {
            font-size: 0.8em;
            margin-top: 1em;
            overflow: hidden;
            font-weight: 400;
          }
        }
      }
    }

    .input_container {
      width: 100%;
      background-color: color.$quinary_color;

      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 1em;
      box-sizing: border-box;

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
  }
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  & > .container {
    margin-top: 5em;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms linear;
  & > .container {
    transition: margin-top 100ms ease-out;
  }
}
</style>
