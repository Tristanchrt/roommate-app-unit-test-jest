<template lang="html" src="./CustomProfileFilterModal.html"></template>
<script lang="ts" src="./CustomProfileFilterModal.component.ts"></script>

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
    width: 23em;
    height: 20em;
    padding: 2em;
    border-radius: 20px;

    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    flex-direction: column;
    background: color.$quinary_color;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 0;
    }

    .top {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;

      .CustomProfileFilterVue {
        font-size: 1.2em;
        cursor: pointer;
      }

      .buttons {
        display: flex;
        justify-content: center;
        align-items: center;
        background: color.$quinary_color;
        border-radius: 30px;
        padding: 0.5em 1em;

        i:first-child {
          margin-right: 1em;
        }
        i {
          font-size: 1.4em;
          cursor: pointer;
        }
      }
    }

    section {
      margin-top: 2em;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;

      .title {
        font-size: 1.3em;
        font-weight: 700;
      }
      input {
        width: 15em;
        margin-top: 1em;
        padding-bottom: 0.3em;
        border: none;
        outline: none;
        color: color.$octonary_color;
        border-bottom: 1px solid color.$octonary_color;
        font-family: inherit;
        font-size: 1em;

        &::placeholder {
          color: color.$septenary_color;
        }
      }
      & > .container {
        margin-top: 0.5em;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        .icon {
          font-size: 2em;
          height: 1.6em;
          width: 1.6em;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 20px;
          margin: 0.1em;
          border: 1px solid transparent;
          cursor: pointer;
        }
        .icon.active {
          background: color.$senary_color;
          border: 1px solid #00000015;
        }
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
