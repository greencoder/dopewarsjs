<template>
  <div id="app">
    <Game></Game>
  </div>
</template>

<script>
import Game from './components/Game.vue';

export default {
  name: 'app',
  components: {
    Game
  }
}
</script>

<style>

* {
  box-sizing: border-box;
  font-family: 'Roboto Mono', monospace;
  user-select: none;
}

html, body {
  width: 100%;
  height: 100%;
  background-color: #ccc;
}

body {
  padding: 0px;
  margin: 0px;
  font-size: 14px;
}

div#app {
  padding: 0px;
  height: 100%;
}

/* Desktop browser or mobile in landscape */
@media screen and (min-width: 480px) {
  body {
    display: flex;
    align-items: top;
    justify-content: center;
  }
}

/* Desktop Browsers */
@media screen and (min-height: 813px) {
  body {
    align-items: center;
  }
  div#app {
    height: 700px;
  }
}

</style>