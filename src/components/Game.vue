<template>
  <div id="container" v-bind:class="{ dark: isShowingOverlay }">
    <Bank v-if="shouldShowScreen('bank')" />
    <Buy v-if="shouldShowScreen('buy')" />
    <Doctor v-if="shouldShowScreen('doctor')" />
    <Dump v-if="shouldShowScreen('dump')" />
    <GameOver v-if="shouldShowScreen('game over')" />
    <GunShop v-if="shouldShowScreen('gun shop')" />
    <LoanShark v-if="shouldShowScreen('loan shark')" />
    <Main v-if="shouldShowScreen('main')" />
    <Menu v-if="shouldShowScreen('menu')"  />
    <Police v-if="shouldShowScreen('police')" />
    <Prices v-if="shouldShowScreen('prices')" />
    <Sell v-if="shouldShowScreen('sell')" />
    <Tailor v-if="shouldShowScreen('tailor')" />
    <Travel v-if="shouldShowScreen('travel')" />
  </div>
</template>

<script>
import Bank from './Bank.vue';
import Buy from './Buy.vue';
import Doctor from './Doctor.vue';
import Dump from './Dump.vue';
import GameOver from './GameOver.vue';
import GunShop from './GunShop.vue';
import LoanShark from './LoanShark.vue';
import Main from './Main.vue';
import Menu from './Menu.vue';
import Police from './Police.vue';
import Prices from './Prices.vue';
import Sell from './Sell.vue';
import Tailor from './Tailor.vue';
import Travel from './Travel.vue';

export default {
  name: 'Game',
  components: {
    Bank,
    Buy,
    Doctor,
    Dump,
    GameOver,
    GunShop,
    LoanShark,
    Main,
    Menu,
    Police,
    Prices,
    Sell,
    Tailor,
    Travel
  },
  mounted: function() {
    this.$manager.startGame();
  },
  computed: {
    isShowingOverlay: function() {
      return this.$store.getters.isShowingOverlay;
    },
    netWorth: function() {
      return this.$store.getters.netWorth;
    }
  },
  methods: {
    shouldShowScreen: function(screen) {
      return screen === this.$store.getters.currentScreen;
    }
  }
}
</script>

<style>

div#container {
  height: 100%;
  background-color: #fff;
}

div#container.dark {
  background-color: #464646;
}

@media screen and (min-width: 480px) {
  div#container {
    width: 375px;
    position: relative;
    padding-bottom: 100px;
  }
}

/* General Styles */

button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 1px solid #353A3F;
  background-color: inherit;
  border-radius: 8px;
  padding: 0px 16px;
  font-size: 1.0em;
  outline: none;
  font-weight: normal;
  height: 40px;
}

button:active {
  background-color: #353A3F;
  color: #fff;
}

button:disabled {
  border: 1px solid #C0C0C0;
  color: #C0C0C0;
}

button.full-width {
  width: 100%;
  margin-bottom: 10px;
}

p {
  margin: 0px;
}

/* Fullscreen Section */

section.fullscreen {
  background-color: #fff;
  height: 100%;
}

section.fullscreen > div {
  padding: 12px 15px 0px 15px;
}

/* Overlay Section */

section.overlay {
  background-color: #464646;
  border: 15px solid #464646;
  padding: 0px;
}

section.overlay div {
  height: 100%;
  width: 100%;
  background-color: #fff;
}

section.overlay header {
  background-color: #efefef;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  justify-content: left;
  border-bottom: 1px solid #353A3F;
  font-weight: bold;
}

section.overlay header img {
  height: 15px;
  width: 15px;
  margin-left: auto;
}

section.overlay div.inner {
  background-color: #fff;
  padding: 10px;
}

section.overlay div.inner p {
  margin: 10px 0px 20px 5px;
  line-height: 1.5em;
}

</style>
